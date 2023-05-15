package com.gr1.utils;

import org.apache.commons.lang3.RandomStringUtils;

public class PasswordUtils {

    private PasswordUtils(){
    }

    public static String generateRandomPassword(){
        String randomString = RandomStringUtils.randomAlphabetic(20);
        return randomString.substring(0, 10);
    }
}
