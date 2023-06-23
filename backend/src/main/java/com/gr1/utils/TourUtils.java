package com.gr1.utils;

import org.apache.commons.lang3.RandomStringUtils;

import java.util.Date;

public class TourUtils {
    public static String generateTourCode(){
        String string1 = RandomStringUtils.random(20, true, true).toUpperCase().substring(0, 10);
        String string2 = "BKTRAVEL";
        Date now = new Date(System.currentTimeMillis());
        String string3 = String.valueOf(now.getTime());
        return string1 + "-" + string2 + "-" + string3;
    }
}
