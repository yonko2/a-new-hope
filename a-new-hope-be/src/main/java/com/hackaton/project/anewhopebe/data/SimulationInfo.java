package com.hackaton.project.anewhopebe.data;

import java.util.Map;

public record SimulationInfo(long population,
                             Map<String, Resource> resources,
                             long deathsFromNatural,
                             long deathsFromStarvation,
                             long births) {
}
