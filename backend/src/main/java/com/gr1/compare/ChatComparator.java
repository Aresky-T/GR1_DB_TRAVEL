package com.gr1.compare;

import com.gr1.entity.Chat;

import java.util.Comparator;

public class ChatComparator implements Comparator<Chat> {

    @Override
    public int compare(Chat c1, Chat c2){
        return c1.getSentAt().compareTo(c2.getSentAt());
    }
}
