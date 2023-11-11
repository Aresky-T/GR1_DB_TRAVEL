package com.gr1.compare;

import com.gr1.entity.Mail;

import java.util.Comparator;

public class MailComparator implements Comparator<Mail> {
    @Override
    public int compare (Mail o1, Mail o2) {
        return o2.getSentAt().compareTo(o1.getSentAt());
    }
}