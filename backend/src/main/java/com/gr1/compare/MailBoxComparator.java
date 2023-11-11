package com.gr1.compare;

import com.gr1.entity.Mail;
import com.gr1.entity.MailBox;

import java.util.Comparator;

public class MailBoxComparator implements Comparator<MailBox> {
    @Override
    public int compare (MailBox o1, MailBox o2) {
        Mail latestMail1 = o1.getLatestMail();
        Mail latestMail2 = o2.getLatestMail();
        return latestMail2.getSentAt().compareTo(latestMail1.getSentAt());
    }
}
