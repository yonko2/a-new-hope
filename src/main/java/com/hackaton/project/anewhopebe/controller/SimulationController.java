package com.hackaton.project.anewhopebe.controller;

import com.hackaton.project.anewhopebe.data.SimulationInfo;
import com.hackaton.project.anewhopebe.service.SimulationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.Map;

@Controller("api/v1")
public class SimulationController {

    @Autowired
    private SimulationService simulationService;

    @GetMapping("/simulate")
    public ResponseEntity<SimulationInfo> simulateDay() {
        return ResponseEntity.ok(simulationService.getSimulationInfo());
    }

    @PostMapping("/add-resources")
    public ResponseEntity<Void> addRocketDeliveryResources(Map<String, Long> deliveredResources) {
        simulationService.addRocketDeliveryResources(deliveredResources);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/reset")
    public ResponseEntity<Void> resetSimulation() {
        simulationService.resetSimulation();
        return ResponseEntity.ok().build();
    }

}
