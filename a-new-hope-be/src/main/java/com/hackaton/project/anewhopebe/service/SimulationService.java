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
        SimulationInfo simulationInfo = simulateDay();
        //simulationInfo.setResources(resourcesStorage.resources);
        return simulationInfo;
    }

    private SimulationInfo simulateDay() {
        final long deathsFromNaturalCauses = populationService.deathsFromNaturalCauses();
        final long deathsFromStarvation = populationService.consumeDailyResources();
        populationService.decreasePopulation(deathsFromStarvation);
        final long births = populationService.births();


        // calculate new born based on birth rate, etc
        // calculate new deaths from natural causes
        // update population
        // currPop - deaths) * birthRate
        return new SimulationInfo(populationService.getNumberOfPeople(),
                populationService.resourcesStorage.getResources(),
                deathsFromNaturalCauses,
                deathsFromStarvation,
                births);
    }

    public void addRocketDeliveryResources(Map<String, Long> deliveredResources) {
        populationService.resourcesStorage.addDeliveryResources(deliveredResources);
    }


}
