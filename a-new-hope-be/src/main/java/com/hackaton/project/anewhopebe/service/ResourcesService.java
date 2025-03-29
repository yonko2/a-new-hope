package com.hackaton.project.anewhopebe.service;

import com.hackaton.project.anewhopebe.data.Air;
import com.hackaton.project.anewhopebe.data.Food;
import com.hackaton.project.anewhopebe.data.Resource;
import com.hackaton.project.anewhopebe.data.Water;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class ResourcesService {
    Map<String, Resource> resources = Map.of(Food.FOOD_NAME, new Food(1000),
            Water.WATER_NAME, new Water(500),
            Air.AIR_NAME, new Air(700));

    public void addResource(Resource resource) {
        resources.put(resource.getName(), resource);
    }

    public Resource getResource(String name) {
        return resources.get(name);
    }

    //new with deficiency
    public long decreaseResourceVolume(String name, long volume) {
        //updateMap
        return resources.get(name).decreaseVolume(volume);
    }

    public void increaseResourceVolume(String name, long volume) {
        resources.get(name).increaseVolume(volume);
    }

    public void addDeliveryResources(Map<String, Long> deliveredResources) {
        deliveredResources.forEach(this::increaseResourceVolume);
    }

    public Map<String, Resource> getResources() {
        return resources;
    }
}
