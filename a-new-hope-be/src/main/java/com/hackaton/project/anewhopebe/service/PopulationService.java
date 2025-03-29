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
            "Water", 2L
    );

    private long numberOfPeople;
    private long numberOfPeopleWithoutDeficiency;

    @Autowired
    ResourcesService resourcesStorage;
    DeficiencyService deficiencyService;

    public PopulationService() {
        this.numberOfPeople = DEFAULT_POPULATION;
        this.numberOfPeopleWithoutDeficiency = DEFAULT_POPULATION;
        deficiencyService = new DeficiencyService(resourcesStorage);
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

    public Map<String, Long> calculateConsumptionPerDay() {
        return CONSUMPTION_PER_DAY_FOR_PERSON.entrySet()
                .stream()
                .peek(entry -> entry.setValue(entry.getValue() * numberOfPeopleWithoutDeficiency))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }

    public long consumeDailyResources() {
        final DailyInfo dailyInfo = getSatisfiedPeopleFromDeficiencies();
        final long satisfiedPeopleFromDeficiencies = dailyInfo.satisfiedDeficinecies();

        final Map<String, Long> consumptionPerDay = calculateConsumptionPerDay();
        consumptionPerDay.forEach((resourceName, consumption) -> {
            final long peopleInDeficiencyForResource = resourcesStorage.decreaseResourceVolume(resourceName, consumption);
            if (peopleInDeficiencyForResource > 0) {
                final DeficiencyGroup deficiencyGroup = new DeficiencyGroup(1, peopleInDeficiencyForResource);
                deficiencyService.addDeficiencyGroup(resourceName, deficiencyGroup);
            }
        });

        this.numberOfPeopleWithoutDeficiency += satisfiedPeopleFromDeficiencies;

        return dailyInfo.dyingPeople();
    }

    public void addResources(Map<String, Long> resourcesToBeAdded) {
        resourcesToBeAdded.forEach(resourcesStorage::increaseResourceVolume);
    }

    private DailyInfo getSatisfiedPeopleFromDeficiencies() {
        final long peopleInDeficiencyBeforeSupply = deficiencyService.calculateNumberOfPeopleInDeficiency();
        final long dyingPeople = deficiencyService.supplyResourcesForPeopleInDeficiency();
        final long currentPeopleInDeficiencyAfterSupply = deficiencyService.calculateNumberOfPeopleInDeficiency();
        final long satisfiedPeopleFromDeficiencies = peopleInDeficiencyBeforeSupply - currentPeopleInDeficiencyAfterSupply;
        return new DailyInfo(satisfiedPeopleFromDeficiencies, dyingPeople);
    }

    public long deathsFromNaturalCauses() {
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
