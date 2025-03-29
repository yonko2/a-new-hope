package com.hackaton.project.anewhopebe.data;

public class Air extends Resource {
    private static final long CONSUMPTION_PER_PERSON_FOR_A_DAY = 1;
    public static final String AIR_NAME = "Air";
    private static final int DAYS_TILL_DEATH = 1;
    public Air(long volume) {
        super(CONSUMPTION_PER_PERSON_FOR_A_DAY, AIR_NAME, DAYS_TILL_DEATH, volume);
    }
}
