package com.hackaton.project.anewhopebe.service;

import com.hackaton.project.anewhopebe.data.SimulationInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SimulationService {

    @Autowired
    PopulationService populationService;

    public SimulationInfo getSimulationInfo() {
        SimulationInfo simulationInfo = new SimulationInfo();
        //simulationInfo.setResources(resourcesStorage.resources);
        return simulationInfo;
    }

    private SimulationInfo simulateDay() {
        populationService.consumeDailyResources();
        return null;
    }


}
