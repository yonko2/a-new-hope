package com.hackaton.project.anewhopebe.data;

public class Food extends Resource {
    private static final long CONSUMPTION_PER_PERSON_FOR_A_DAY = 3;
    public static final String FOOD_NAME = "Food";
    private static final int DAYS_TILL_DEATH = 5;
    public Food(long volume) {
        super(CONSUMPTION_PER_PERSON_FOR_A_DAY, FOOD_NAME, DAYS_TILL_DEATH, volume);
    }
}
