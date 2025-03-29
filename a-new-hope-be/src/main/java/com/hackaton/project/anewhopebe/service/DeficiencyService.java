package com.hackaton.project.anewhopebe.service;

import com.hackaton.project.anewhopebe.data.Deficiency;
import com.hackaton.project.anewhopebe.data.DeficiencyGroup;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class DeficiencyService {

    //resourceName -> Deficiency -> Queue<DeficiencyGroup> -> DeficiencyGroup -> numberOfPeople, starvingDays
    private final Map<String, Deficiency> deficiencies;
    private final ResourcesService resourcesService;

    public DeficiencyService(ResourcesService resourcesService) {
        this.deficiencies = new HashMap<>();
        this.resourcesService = resourcesService;
    }

    public long calculateNumberOfPeopleInDeficiency() {
        return deficiencies.values()
                .stream()
                .map(deficiency -> deficiency
                        .groupWithDeficiency()
                        .stream()
                        .map(DeficiencyGroup::numberOfPeople)
                        .reduce(0L, Long::sum))
                .max(Long::compare)
                .orElse(0L);
    }

    public long supplyResourcesForPeopleInDeficiency() {
        supplyResourcesToPeopleInDeficiency();
        updateDaysOfStarving();
        //see which groups are dying
        return calculateNumberOfDyingPeople();
    }

   //Ba private long getDyingLackingResource()

    private long calculateNumberOfDyingPeople() {
        //also remove the dying ones
        //dyingForSpecificResource
        final Map<String, Long> dyingForSpecificResource = deficiencies.entrySet()
                .stream()
                .map(entry -> {
                    final Deficiency deficiency = entry.getValue();
                    final DeficiencyGroup longestDeficientGroup = deficiency.groupWithDeficiency().peek();
                    if (longestDeficientGroup.starvingDays() > resourcesService.getResource(entry.getKey()).getDaysTillDeath()) {
                        deficiency.groupWithDeficiency().poll();
                        return Map.entry(entry.getKey(), longestDeficientGroup.numberOfPeople());
                    }
                    return Map.entry(entry.getKey(), 0L);
                })
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));

        // iterate through this map and get the entry with most dying people
        return dyingForSpecificResource.entrySet()
                .stream()
                .max(Map.Entry.comparingByValue())
                .orElse(Map.entry("", 0L))
                .getValue();

    }

    private void updateDaysOfStarving() {
        deficiencies.forEach((resourceName, deficiency) -> {
            PriorityQueue<DeficiencyGroup> updatedQueue = new PriorityQueue<>(Comparator.comparingLong(DeficiencyGroup::starvingDays));
            while (!deficiency.groupWithDeficiency().isEmpty()) {
                DeficiencyGroup group = deficiency.groupWithDeficiency().poll();
                updatedQueue.add(new DeficiencyGroup(group.numberOfPeople(), group.starvingDays() + 1));
            }
            deficiency.groupWithDeficiency().addAll(updatedQueue);
        });
    }

    private void supplyResourcesToPeopleInDeficiency() {
        deficiencies.forEach((resourceName, deficiency) -> {
            while(!deficiency.groupWithDeficiency().isEmpty()) {
                final DeficiencyGroup mostStarvingGroup = deficiency.groupWithDeficiency().poll();
                final long peopleInDeficiency = mostStarvingGroup.numberOfPeople();
                final long leftPeopleWithDeficiency = resourcesService.decreaseResourceVolume(resourceName, peopleInDeficiency);
                if (leftPeopleWithDeficiency > 0) {
                    deficiency.groupWithDeficiency().add(new DeficiencyGroup(leftPeopleWithDeficiency, mostStarvingGroup.starvingDays()));
                    break;
                }
            }
        });
    }

    public void addDeficiencyGroup(String resourceName, DeficiencyGroup deficiencyGroup) {
        Deficiency deficiency = deficiencies.get(resourceName);
        if (deficiency != null) {
            deficiency.groupWithDeficiency().add(deficiencyGroup);
            return;
        }
        Queue<DeficiencyGroup> newQueue = new PriorityQueue<>(Comparator.comparingLong(DeficiencyGroup::starvingDays));
        newQueue.add(deficiencyGroup);
        deficiencies.put(resourceName, new Deficiency(newQueue));
    }

    public void printDeficiencies() {
        deficiencies.forEach((resourceName, deficiency) -> {
            System.out.println("Resource: " + resourceName);
            deficiency.groupWithDeficiency().forEach(deficiencyGroup -> {
                System.out.println("Number of people: " + deficiencyGroup.numberOfPeople() + ", starving days: " + deficiencyGroup.starvingDays());
            });
        });
    }

}
