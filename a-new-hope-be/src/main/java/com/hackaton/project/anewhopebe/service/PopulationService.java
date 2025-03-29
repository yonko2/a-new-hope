package com.hackaton.project.anewhopebe.service;

import com.hackaton.project.anewhopebe.data.DeficiencyGroup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class PopulationService {
    public static final double BIRTH_RATE_PER_DAY = 0.004;
    public static final double DEATH_RATE_PER_DAY = 0.001;
    private static final long DEFAULT_POPULATION = 10_000;

    private long numberOfPeople;
    private long numberOfPeopleWithoutDeficiency;

    @Autowired
    ResourcesService resourcesStorage;
    @Autowired
    DeficiencyService deficiencyService;

    public PopulationService() {
        this.numberOfPeople = DEFAULT_POPULATION;
        this.numberOfPeopleWithoutDeficiency = DEFAULT_POPULATION;
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

    public long consumeDailyResources() {
        final long peopleWithDeficiencyToDecrease = deficiencyService.calculateNumberOfPeopleInDeficiency();
        final long dyingPeople = deficiencyService.supplyResourcesForPeopleInDeficiency();
        this.numberOfPeopleWithoutDeficiency = numberOfPeople - peopleWithDeficiencyToDecrease;
        resourcesStorage.getResources().keySet().forEach(this::handleResourceConsumption);
        return dyingPeople;
    }

    private void handleResourceConsumption(String resourceName) {
        final long peopleInDeficiencyForResource = resourcesStorage.decreaseResourceVolume(resourceName, numberOfPeopleWithoutDeficiency);
        if (peopleInDeficiencyForResource > 0) {
            final DeficiencyGroup deficiencyGroup = new DeficiencyGroup(1, peopleInDeficiencyForResource);
            deficiencyService.addDeficiencyGroup(resourceName, deficiencyGroup);
        }
    }

    public void addDeliveryResources(Map<String, Long> resourcesToBeAdded) {
        resourcesToBeAdded.forEach(resourcesStorage::increaseResourceVolume);
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
}
