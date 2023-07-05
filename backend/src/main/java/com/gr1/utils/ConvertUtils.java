package com.gr1.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

public class ConvertUtils {
    public static Date convertStringToDate(String time){
        String pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'";
        SimpleDateFormat dateFormat = new SimpleDateFormat(pattern);
        TimeZone timeZone = TimeZone.getTimeZone("UTC");
        dateFormat.setTimeZone(timeZone);
        try {
            return dateFormat.parse(time);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }

    public ConvertUtils (){
        // TODO document why this constructor is empty
    }
}
