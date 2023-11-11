package com.gr1.dtos.request;

import com.gr1.entity.ESender;

import com.gr1.entity.Mail;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MailForm {
    private String fullName;
    private String email;
    private ESender sender;
    private String title;
    private String content;

    public Mail buildMail(){
        return new Mail(this.sender, this.title, this.content);
    }
}
