package com.hackaton.project.anewhopebe.data;

import java.util.Map;

public abstract class Resource {

    private long consumptionPerPersonForADay;
    private String name;
    private double daysTillDeath;
    private long volume;

    public Resource(long consumptionPerPersonForADay, String name, double daysTillDeath, long volume) {
        this.consumptionPerPersonForADay = consumptionPerPersonForADay;
        this.name = name;
        this.daysTillDeath = daysTillDeath;
        this.volume = volume;
    }

    public String getName() {
        return name;
    }

    public double getDaysTillDeath() {
        return daysTillDeath;
    }

    public long getVolume() {
        return volume;
    }

    //number of people with deficiency
    public long decreaseVolume(long numberOfPeopleToFeed) {
        final long volumeToDecrease = numberOfPeopleToFeed * consumptionPerPersonForADay;
        final long leftVolume = this.volume - volumeToDecrease;
        if (leftVolume > 0) {
            this.volume = leftVolume;
            return 0;
        }

        final long peopleInDeficiency = numberOfPeopleToFeed - (this.volume / consumptionPerPersonForADay);
        this.volume %= consumptionPerPersonForADay;
        return peopleInDeficiency;

    }

    public void increaseVolume(long volume) {
        this.volume += volume;
    }
}
