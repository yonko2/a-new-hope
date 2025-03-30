package com.hackaton.project.anewhopebe.data;

import com.hackaton.project.anewhopebe.data.resources.Resource;

import java.util.Map;

public record SimulationInfo(long population,
                             Map<String, Resource> resources,
                             long deathsFromNatural,
                             long deathsFromStarvation,
                             long births,
                             Map<String, Double> resourceRatio) {
}
