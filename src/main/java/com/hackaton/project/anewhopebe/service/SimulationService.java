package com.hackaton.project.anewhopebe.service;

import com.hackaton.project.anewhopebe.data.SimulationInfo;
import com.hackaton.project.anewhopebe.data.resources.Air;
import com.hackaton.project.anewhopebe.data.resources.Food;
import com.hackaton.project.anewhopebe.data.resources.Water;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class SimulationService {

    @Autowired
    private PopulationService populationService;

    public SimulationInfo getSimulationInfo() {
        if (populationService.getNumberOfPeople() <= 0) {
            return new SimulationInfo(0,
                    populationService.resourcesStorage.getResources(),
                    0,
                    0,
                    0,
                    Map.of(Water.NAME, 0.0, Food.NAME, 0.0, Air.NAME, 0.0));
        }

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
