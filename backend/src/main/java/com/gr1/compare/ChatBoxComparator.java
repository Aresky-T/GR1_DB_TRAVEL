package com.gr1.compare;

import com.gr1.entity.Chat;
import com.gr1.entity.ChatBox;

import java.util.Comparator;
import java.util.Date;

public class ChatBoxComparator implements Comparator<ChatBox> {
    @Override
    public int compare (ChatBox o1, ChatBox o2) {
        Chat latestChat1 = o1.getLatestChat();
        Chat latestChat2 = o2.getLatestChat();
        Date time1 = (latestChat1 != null) ? latestChat1.getSentAt() : o1.getCreatedAt();
        Date time2 = (latestChat2 != null) ? latestChat2.getSentAt() : o2.getCreatedAt();

        return time2.compareTo(time1);
    }
}
