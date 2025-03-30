package com.hackaton.project.anewhopebe.service;

import com.hackaton.project.anewhopebe.data.resources.Air;
import com.hackaton.project.anewhopebe.data.resources.Food;
import com.hackaton.project.anewhopebe.data.resources.Resource;
import com.hackaton.project.anewhopebe.data.resources.Water;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class ResourcesService {
    final static Map<String, Resource> INITIAL_RESOURCES = Map.of(Food.NAME, new Food(2_000_000L),
            Water.NAME, new Water(3_000_000L),
            Air.NAME, new Air(10_000_000L));
    Map<String, Resource> resources = INITIAL_RESOURCES;

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
        this.resources.get(Food.NAME).increaseVolume(2_000_000L);
        this.resources.get(Water.NAME).increaseVolume(3_000_000L);
        this.resources.get(Air.NAME).increaseVolume(10_000_000L);
    }
}
