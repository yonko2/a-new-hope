package com.hackaton.project.anewhopebe.service;

import com.hackaton.project.anewhopebe.data.Air;
import com.hackaton.project.anewhopebe.data.Food;
import com.hackaton.project.anewhopebe.data.Resource;
import com.hackaton.project.anewhopebe.data.Water;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class ResourcesService {
    Map<String, Resource> resources = Map.of(Food.NAME, new Food(600_000),
            Water.NAME, new Water(900_000),
            Air.NAME, new Air(3_000_000));

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
}
