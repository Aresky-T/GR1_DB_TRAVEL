package com.gr1.dtos.response;

import com.gr1.entity.Mail;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class MailBoxForEmployee {
    private int id;
    private CustomerDTO customer;
    private MailDTO latestMail;
    private int unrepliedEmailsCount;
    private List<MailResponse> mailList;

    @Data
    @NoArgsConstructor
    public static class MailDTO {
        private int id;
        private String title;
        private String content;
        private String sender;
        private String sentAt;

        public MailDTO(Mail mail){
            this.id = mail.getId();
            this.title = mail.getTitle();
            this.content = mail.getContent();
            this.sender = mail.getSender().toString();
            this.sentAt = mail.getSentAt().toString();
        }
    }
}
