package com.gr1.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@NoArgsConstructor
@Entity
@Table(name = "Mail_reply")
public class MailReply implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "content", nullable = false)
    private String content;

    @ManyToOne
    @JoinColumn(name = "original_mail", nullable = false, foreignKey = @ForeignKey(name = "mail_reply_fk1"))
    private Mail originalMail;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "replied_at", nullable = false)
    private Date repliedAt;

    public MailReply (String title, String content) {
        this.title = title;
        this.content = content;
    }
}
