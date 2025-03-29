package com.hackaton.project.anewhopebe.data;

public class Food extends Resource {
    private static final long CONSUMPTION_PER_PERSON_FOR_A_DAY = 2;
    public static final String NAME = "Food";
    private static final int DAYS_TILL_DEATH = 21;
    public Food(long volume) {
        super(CONSUMPTION_PER_PERSON_FOR_A_DAY, NAME, DAYS_TILL_DEATH, volume);
    }
}
