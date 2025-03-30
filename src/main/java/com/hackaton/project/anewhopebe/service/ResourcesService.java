package com.hackaton.project.anewhopebe.service;

import com.hackaton.project.anewhopebe.data.resources.Air;
import com.hackaton.project.anewhopebe.data.resources.Food;
import com.hackaton.project.anewhopebe.data.resources.Resource;
import com.hackaton.project.anewhopebe.data.resources.Water;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class ResourcesService {
    private static final long INITIAL_FOOD_VOLUME = 2_000_000L;
    private static final long INITIAL_WATER_VOLUME = 3_000_000L;
    private static final long INITIAL_AIR_VOLUME = 10_000_000L;
    private Map<String, Resource> resources;

    public ResourcesService() {
        this.reset();
    }

    public Resource getResource(String name) {
        return resources.get(name);
    }

    public long decreaseResourceVolume(String name, long peopleToFeed) {
        return resources.get(name).decreaseVolume(peopleToFeed);
    }

    public void increaseResourceVolume(String name, long volume) {
        resources.get(name).increaseVolume(volume);
    }

    public Map<String, Resource> getResources() {
        return resources;
    }

    public void reset() {
        this.resources = Map.of(Food.NAME, new Food(INITIAL_FOOD_VOLUME),
                Water.NAME, new Water(INITIAL_WATER_VOLUME),
                Air.NAME, new Air(INITIAL_AIR_VOLUME));
    }
}
