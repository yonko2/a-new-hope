package com.hackaton.project.anewhopebe.data;

public abstract class Resource {

    private final long consumptionPerPersonForADay;
    private final String name;
    private final double daysTillDeath;
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

    // number of people with deficiency
    public long decreaseVolume(long numberOfPeopleToFeed) {
        if (numberOfPeopleToFeed == 0) {
            return 0;
        }

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
