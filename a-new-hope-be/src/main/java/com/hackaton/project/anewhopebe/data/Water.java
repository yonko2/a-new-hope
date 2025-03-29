package com.hackaton.project.anewhopebe.data;

public class Water extends Resource{
    private static final long CONSUMPTION_PER_PERSON_FOR_A_DAY = 2;
    private static final int DAYS_TILL_DEATH = 2;
    private static final String WATER_NAME = "Water";

    public Water(long volume) {
        super(CONSUMPTION_PER_PERSON_FOR_A_DAY, WATER_NAME, DAYS_TILL_DEATH, volume);
    }
}
