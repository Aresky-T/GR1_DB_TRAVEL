package com.gr1.dtos.request;

import com.gr1.entity.Chat;
import com.gr1.entity.ESender;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ChatForm {
    private String message;
    private ESender sender;

    public Chat buildChat(){
        return new Chat(this.message, this.sender);
    }
}
