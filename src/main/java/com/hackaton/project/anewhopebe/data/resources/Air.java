package com.hackaton.project.anewhopebe.data.resources;

public class Air extends Resource {
    private static final long CONSUMPTION_PER_PERSON_FOR_A_DAY = 10; //m^3
    public static final String NAME = "Air";
    private static final int DAYS_TILL_DEATH = 3;
    public Air(long volume) {
        super(CONSUMPTION_PER_PERSON_FOR_A_DAY, NAME, DAYS_TILL_DEATH, volume);
    }
}
