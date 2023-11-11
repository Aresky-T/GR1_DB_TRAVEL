package com.gr1.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "Mail")
public class Mail extends Message{

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "content", nullable = false)
    private String content;

    @ManyToOne
    @JoinColumn(name = "mail_box", nullable = false, foreignKey = @ForeignKey(name = "mail_fk_1"))
    private MailBox mailBox;

    @OneToMany(mappedBy = "originalMail", fetch = FetchType.EAGER)
    private List<MailReply> mailReply;

    public Mail(){
    }

    public Mail (ESender sender, String title, String content) {
        super(sender);
        this.title = title;
        this.content = content;
    }
}
