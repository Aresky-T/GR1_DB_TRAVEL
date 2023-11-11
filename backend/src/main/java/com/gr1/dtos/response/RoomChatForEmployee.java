package com.gr1.dtos.response;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class RoomChatForEmployee {
    private Integer id;
    private CustomerDTO customer;
    private Integer newMessagesCount;
    private ChatResponse latestChat;
    private String createdAt;
    private List<ChatResponse> chatList;
}
