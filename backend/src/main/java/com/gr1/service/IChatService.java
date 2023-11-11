package com.gr1.service;

import com.gr1.entity.Chat;
import com.gr1.entity.ChatBox;
import com.gr1.entity.CustomerSupport;

import java.util.List;

public interface IChatService {
    Chat save(Chat chat);
    List<Chat> saveAll(List<Chat> chats);
    List<Chat> findAllByChatBox(ChatBox chatBox);
}
