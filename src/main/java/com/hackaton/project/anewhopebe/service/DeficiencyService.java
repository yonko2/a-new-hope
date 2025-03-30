package com.hackaton.project.anewhopebe.service;

import com.hackaton.project.anewhopebe.data.Deficiency;
import com.hackaton.project.anewhopebe.data.DeficiencyGroup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class DeficiencyService {

    //resourceName -> Deficiency -> Queue<DeficiencyGroup> -> DeficiencyGroup -> starvingDays, numberOfPeople
    private final Map<String, Deficiency> deficiencies;

    @Autowired
    private ResourcesService resourcesService;

    public DeficiencyService() {
        this.deficiencies = new HashMap<>();
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

    private long calculateNumberOfDyingPeople() {
        //dyingForSpecificResource
        final Map<String, Long> dyingForSpecificResource = deficiencies.entrySet()
                .stream()
                .map(this::updateAllDeficienciesForDyingPeople)
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));

        // iterate through this map and get the entry with most dying people
        return getEntryWithMostDyingPeople(dyingForSpecificResource);
    }

    private static Long getEntryWithMostDyingPeople(Map<String, Long> dyingForSpecificResource) {
        return dyingForSpecificResource.entrySet()
                .stream()
                .max(Map.Entry.comparingByValue())
                .orElse(Map.entry("", 0L))
                .getValue();
    }

    private Map.Entry<String, Long> updateAllDeficienciesForDyingPeople(Map.Entry<String, Deficiency> entry) {
        final Deficiency deficiency = entry.getValue();
        final DeficiencyGroup longestDeficientGroup = deficiency.groupWithDeficiency().peek();
        if (longestDeficientGroup != null && longestDeficientGroup.starvingDays() > resourcesService.getResource(entry.getKey()).getDaysTillDeath()) {
            DeficiencyGroup deficiencyGroup = deficiency.groupWithDeficiency().poll();
            removeDuplicateDyingPeople(entry, deficiencyGroup);
            return Map.entry(entry.getKey(), longestDeficientGroup.numberOfPeople());
        }
        return Map.entry(entry.getKey(), 0L);
    }

    private void removeDuplicateDyingPeople(Map.Entry<String, Deficiency> entry, DeficiencyGroup deficiencyGroup) {
        deficiencies.forEach((resourceName, def) -> {
            if (resourceName.equals(entry.getKey())) {
                return;
            }

            long peopleToDecrease = deficiencyGroup.numberOfPeople();

            while (peopleToDecrease != 0 && !def.groupWithDeficiency().isEmpty()) {
                DeficiencyGroup maxDeficiencyGroup = def.groupWithDeficiency().poll();

                if (peopleToDecrease >= maxDeficiencyGroup.numberOfPeople()) {
                    peopleToDecrease -= maxDeficiencyGroup.numberOfPeople();
                } else {
                    long leftPeople = maxDeficiencyGroup.numberOfPeople() - peopleToDecrease;
                    DeficiencyGroup updatedDeficiencyGroup = new DeficiencyGroup(maxDeficiencyGroup.starvingDays(), leftPeople);
                    def.groupWithDeficiency().add(updatedDeficiencyGroup);
                    peopleToDecrease = 0;
                }
            }
        });
    }

    private void updateDaysOfStarving() {
        deficiencies.forEach((resourceName, deficiency) -> {
            Queue<DeficiencyGroup> updatedQueue = new PriorityQueue<>(Comparator.comparingLong(DeficiencyGroup::starvingDays).reversed());
            while (!deficiency.groupWithDeficiency().isEmpty()) {
                DeficiencyGroup group = deficiency.groupWithDeficiency().poll();
                updatedQueue.add(new DeficiencyGroup(group.starvingDays() + 1, group.numberOfPeople()));
            }
            deficiency.groupWithDeficiency().addAll(updatedQueue);
        });
    }

    private Map<String, Long> calculateOtherResourcesForDeficientGroups() {
        if (!deficiencies.isEmpty()) {
            // get the sum of people in deficiency for each resource
            final Map<String, Long> resourceSumOfPeopleDeficient = getResourceSumOfPeopleDeficient();
            addMissingResources(resourceSumOfPeopleDeficient);
            return getResourcesToBeConsumed(resourceSumOfPeopleDeficient);
        }

        return Collections.emptyMap();
    }

    private void addMissingResources(Map<String, Long> resourceSumOfPeopleDeficient) {
        resourcesService.getResources()
                .keySet()
                .forEach(resourceName -> {
                    if (!resourceSumOfPeopleDeficient.containsKey(resourceName)) {
                        resourceSumOfPeopleDeficient.put(resourceName, 0L);
                    }
                });
    }

    private Map<String, Long> getResourceSumOfPeopleDeficient() {
        return deficiencies.entrySet()
                .stream()
                .map(entry -> Map.entry(entry.getKey(), entry.getValue()
                        .groupWithDeficiency()
                        .stream()
                        .map(DeficiencyGroup::numberOfPeople)
                        .reduce(0L, Long::sum)))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }

    private static Map<String, Long> getResourcesToBeConsumed(Map<String, Long> resourceSumOfPeopleDeficient) {
        final Map.Entry<String, Long> entry = resourceSumOfPeopleDeficient.entrySet().stream().max(Map.Entry.comparingByValue()).get();

        return resourceSumOfPeopleDeficient.entrySet().stream()
                .map(e -> Map.entry(e.getKey(), entry.getValue() - e.getValue()))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }

    private void supplyResourcesToPeopleInDeficiency() {
        deficiencies.forEach(this::supplyPeopleInDeficiencyGroups);
        addNewDeficiencyGroupOfResource();
    }

    private void supplyPeopleInDeficiencyGroups(String resourceName, Deficiency deficiency) {
        while (!deficiency.groupWithDeficiency().isEmpty()) {
            final DeficiencyGroup mostStarvingGroup = deficiency.groupWithDeficiency().poll();
            final long peopleInDeficiency = mostStarvingGroup.numberOfPeople();
            final long leftPeopleWithDeficiency = resourcesService.decreaseResourceVolume(resourceName, peopleInDeficiency);
            if (leftPeopleWithDeficiency > 0) {
                deficiency.groupWithDeficiency().add(new DeficiencyGroup(mostStarvingGroup.starvingDays(), leftPeopleWithDeficiency));
                break;
            }
        }
    }

    private void addNewDeficiencyGroupOfResource() {
        final Map<String, Long> restResourcesToConsume = calculateOtherResourcesForDeficientGroups();
        restResourcesToConsume.forEach((resourceName, numberOfPeople) -> {
            final long leftPeopleWithDeficiency = resourcesService.decreaseResourceVolume(resourceName, numberOfPeople);
            if (leftPeopleWithDeficiency > 0) {
                addDeficiencyGroup(resourceName, new DeficiencyGroup(0, leftPeopleWithDeficiency));
            }
        });
    }

    public void addDeficiencyGroup(String resourceName, DeficiencyGroup deficiencyGroup) {
        final Deficiency deficiency = deficiencies.get(resourceName);
        if (deficiency != null) {
            if (deficiency.groupWithDeficiency().stream().anyMatch(group -> group.starvingDays() == deficiencyGroup.starvingDays())) {
                handleDuplicatingGroups(deficiencyGroup, deficiency);
                return;
            }
            deficiency.groupWithDeficiency().add(deficiencyGroup);
            return;
        }
        final Queue<DeficiencyGroup> newQueue = new PriorityQueue<>(Comparator.comparingLong(DeficiencyGroup::starvingDays).reversed());
        newQueue.add(deficiencyGroup);
        deficiencies.put(resourceName, new Deficiency(newQueue));
    }

    private static void handleDuplicatingGroups(DeficiencyGroup deficiencyGroup, Deficiency deficiency) {
        final Queue<DeficiencyGroup> groupWithoutExisting = new PriorityQueue<>(Comparator.comparingLong(DeficiencyGroup::starvingDays).reversed());
        while (!deficiency.groupWithDeficiency().isEmpty()) {
            final DeficiencyGroup group = deficiency.groupWithDeficiency().poll();
            if (group.starvingDays() != deficiencyGroup.starvingDays()) {
                groupWithoutExisting.add(group);
            } else {
                groupWithoutExisting.add(new DeficiencyGroup(group.starvingDays(), group.numberOfPeople() + deficiencyGroup.numberOfPeople()));
            }
        }
        deficiency.groupWithDeficiency().addAll(groupWithoutExisting);
    }

    public Map<String, Long> getNumberOfPeoplePerResource() {
        return deficiencies.entrySet()
                .stream()
                .collect(Collectors.toMap(Map.Entry::getKey, entry -> entry.getValue()
                        .groupWithDeficiency()
                        .stream()
                        .map(DeficiencyGroup::numberOfPeople)
                        .reduce(0L, Long::sum)));
    }

    public void reset() {
        deficiencies.clear();
    }

}
