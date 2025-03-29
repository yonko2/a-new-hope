package com.hackaton.project.anewhopebe.service;

import com.hackaton.project.anewhopebe.data.DailyInfo;
import com.hackaton.project.anewhopebe.data.DeficiencyGroup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.stream.Collectors;

@Service
public class PopulationService {
    public static final double BIRTH_RATE_PER_DAY = 0.002;
    public static final double DEATH_RATE_PER_DAY = 0.001;
    private static final long DEFAULT_POPULATION = 100;
    private static final Map<String, Long> CONSUMPTION_PER_DAY_FOR_PERSON = Map.of(
            "Food", 1L,
            "Water", 2L,
            "Air", 3L
    );

    private long numberOfPeople;
    //equal to numberOfPeople - max starving people
    private long numberOfPeopleWithoutDeficiency;

    @Autowired
    ResourcesService resourcesStorage;
    @Autowired
    DeficiencyService deficiencyService;

    public PopulationService() {
        this.numberOfPeople = DEFAULT_POPULATION;
        this.numberOfPeopleWithoutDeficiency = DEFAULT_POPULATION;
        //deficiencyService = new DeficiencyService(resourcesStorage);
    }

    public long getNumberOfPeople() {
        return numberOfPeople;
    }

    public long decreasePopulation(long numberOFPeople) {
        this.numberOfPeople -= numberOFPeople;
        return this.numberOfPeople;
    }

    public long increasePopulation(long numberOFPeople) {
        this.numberOfPeople += numberOFPeople;
        return this.numberOfPeople;
    }

//    public Map<String, Long> calculateConsumptionPerDay() {
//        return CONSUMPTION_PER_DAY_FOR_PERSON.entrySet()
//                .stream()
//                .collect(Collectors.toMap(
//                        Map.Entry::getKey,
//                        entry -> entry.getValue() * numberOfPeopleWithoutDeficiency
//                ));
//    }

    public long consumeDailyResources() {
        final long peopleWithDeficiencyToDecrease = deficiencyService.calculateNumberOfPeopleInDeficiency();
        final long dyingPeople = deficiencyService.supplyResourcesForPeopleInDeficiency();
        //final long satisfiedPeopleFromDeficiencies = dailyInfo.satisfiedDeficinecies();
        this.numberOfPeopleWithoutDeficiency = numberOfPeople - peopleWithDeficiencyToDecrease;
        resourcesStorage.getResources().keySet().forEach(resourceName -> {
            final long peopleInDeficiencyForResource = resourcesStorage.decreaseResourceVolume(resourceName, numberOfPeopleWithoutDeficiency);
            if (peopleInDeficiencyForResource > 0) {
                final DeficiencyGroup deficiencyGroup = new DeficiencyGroup(1, peopleInDeficiencyForResource);
                deficiencyService.addDeficiencyGroup(resourceName, deficiencyGroup);
            }
        });

        //provide rest resources for people with deficiencies

        //this.numberOfPeopleWithoutDeficiency += satisfiedPeopleFromDeficiencies;
//        this.numberOfPeopleWithoutDeficiency = numberOfPeople - peopleWithDeficiencyToDecrease;

        return dyingPeople;
    }

    public void addResources(Map<String, Long> resourcesToBeAdded) {
        resourcesToBeAdded.forEach(resourcesStorage::increaseResourceVolume);
    }

    private long getSatisfiedPeopleFromDeficiencies() {
        //final long peopleInDeficiencyBeforeSupply = deficiencyService.calculateNumberOfPeopleInDeficiency();
        final long dyingPeople = deficiencyService.supplyResourcesForPeopleInDeficiency();
        //final long currentPeopleInDeficiencyAfterSupply = deficiencyService.calculateNumberOfPeopleInDeficiency();
        //final long satisfiedPeopleFromDeficiencies = peopleInDeficiencyBeforeSupply - currentPeopleInDeficiencyAfterSupply;
        return dyingPeople;
    }

    public long deathsFromNaturalCauses() {
        //rounding
        final long deathsFromNaturalCauses = (long) (numberOfPeople * DEATH_RATE_PER_DAY);
        decreasePopulation(deathsFromNaturalCauses);
        return deathsFromNaturalCauses;
    }

    public long births() {
        final long births = (long) (numberOfPeople * BIRTH_RATE_PER_DAY);
        increasePopulation(births);
        return births;
    }

    public void addDeliveredResources(Map<String, Long> deliveredResources) {
        resourcesStorage.addDeliveryResources(deliveredResources);
    }


}
