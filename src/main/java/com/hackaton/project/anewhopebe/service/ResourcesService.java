package com.hackaton.project.anewhopebe.service;

import com.hackaton.project.anewhopebe.data.Air;
import com.hackaton.project.anewhopebe.data.Food;
import com.hackaton.project.anewhopebe.data.Resource;
import com.hackaton.project.anewhopebe.data.Water;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class ResourcesService {
    Map<String, Resource> INITIAL_RESOURCES = Map.of(Food.NAME, new Food(2_000_000L),
            Water.NAME, new Water(3_000_000L),
            Air.NAME, new Air(100_000_000L));
    Map<String, Resource> resources = INITIAL_RESOURCES;

    public Resource getResource(String name) {
        return resources.get(name);
    }

    public long decreaseResourceVolume(String name, long volume) {
        return resources.get(name).decreaseVolume(volume);
    }

    public void increaseResourceVolume(String name, long volume) {
        resources.get(name).increaseVolume(volume);
    }

    public Map<String, Resource> getResources() {
        return resources;
    }

    public void reset() {
        this.resources = INITIAL_RESOURCES;
    }
}
