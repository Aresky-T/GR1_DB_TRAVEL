package com.gr1.dtos.response;

import com.gr1.entity.MailReply;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MailReplyResponse {
    private int id;
    private String title;
    private String content;
    private String repliedAt;

    public MailReplyResponse (MailReply mailReply) {
        this.id = mailReply.getId();
        this.title = mailReply.getTitle();
        this.content = mailReply.getContent();
        this.repliedAt = mailReply.getRepliedAt().toString();
    }
}
