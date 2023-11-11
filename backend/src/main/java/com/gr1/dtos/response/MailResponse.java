package com.gr1.dtos.response;

import com.gr1.entity.Mail;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
public class MailResponse {
    private int id;
    private String title;
    private String content;
    private String sender;
    private String sentAt;
    private List<MailReplyResponse> reply;

    public MailResponse(Mail mail){
        this.id = mail.getId();
        this.title = mail.getTitle();
        this.content = mail.getContent();
        this.sender = mail.getSender().toString();
        this.sentAt = mail.getSentAt().toString();
        if(mail.getMailReply() != null){
            this.reply = mail.getMailReply().stream().map(MailReplyResponse::new).collect(Collectors.toList());
        } else {
            this.reply = new ArrayList<>();
        }
    }
}
