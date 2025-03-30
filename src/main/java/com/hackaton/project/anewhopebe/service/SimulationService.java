package com.hackaton.project.anewhopebe.service;

import com.hackaton.project.anewhopebe.data.SimulationInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class SimulationService {

    @Autowired
    private PopulationService populationService;

    public SimulationInfo getSimulationInfo() {
        return simulateDay();
    }

    private SimulationInfo simulateDay() {
        final long deathsFromNaturalCauses = populationService.deathsFromNaturalCauses();
        final long deathsFromStarvation = populationService.consumeDailyResources();
        populationService.decreasePopulation(deathsFromStarvation);
        final long births = populationService.births();
        final Map<String, Double> resourcesRatio = populationService.getResourceRatio();

        return new SimulationInfo(populationService.getNumberOfPeople(),
                populationService.resourcesStorage.getResources(),
                deathsFromNaturalCauses,
                deathsFromStarvation,
                births,
                resourcesRatio);
    }

    public void addRocketDeliveryResources(Map<String, Long> deliveredResources) {
        populationService.addDeliveryResources(deliveredResources);
    }

    public void resetSimulation() {
        populationService.reset();
    }
}
