package com.gr1.dtos.request;

import com.gr1.entity.MailReply;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MailFormForEmployee {
    private String recipient;
    private String title;
    private String content;
    private Integer originalMail;

    public MailReply buildMailReply(){
        return new MailReply(this.title, this.content);
    }
}
