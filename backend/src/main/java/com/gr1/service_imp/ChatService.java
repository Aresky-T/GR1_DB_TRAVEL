package com.gr1.service_imp;

import com.gr1.entity.Chat;
import com.gr1.entity.ChatBox;
import com.gr1.repository.ChatRepository;
import com.gr1.service.IChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class ChatService implements IChatService {

    @Autowired
    private ChatRepository chatRepository;

    @Transactional
    @Override
    public Chat save (Chat chat) {
        return chatRepository.save(chat);
    }

    @Transactional
    @Override
    public List<Chat> saveAll (List<Chat> chats) {
        return chatRepository.saveAll(chats);
    }

    @Override
    public List<Chat> findAllByChatBox (ChatBox chatBox) {
        return chatRepository.findAllByChatBoxOrderBySentAtAsc(chatBox);
    }
}
