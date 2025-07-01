package com.hackaton.project.anewhopebe.data.resources;

public class Water extends Resource {
    private static final long CONSUMPTION_PER_PERSON_FOR_A_DAY = 3;
    private static final int DAYS_TILL_DEATH = 3;
    public static final String NAME = "Water";

    public Water(long volume) {
        super(CONSUMPTION_PER_PERSON_FOR_A_DAY, NAME, DAYS_TILL_DEATH, volume);
    }
}
