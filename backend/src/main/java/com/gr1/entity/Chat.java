package com.gr1.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "Chat")
public class Chat extends Message{
    @Column(name = "message", nullable = false)
    private String message;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private EMessageStatus status = EMessageStatus.NEW;

    @ManyToOne
    @JoinColumn(name = "chat_box", nullable = false, foreignKey = @ForeignKey(name = "chat_fk_1"))
    private ChatBox chatBox;

    public Chat () {

    }

    public Chat (String message, ESender sender) {
        this.message = message;
        this.setSender(sender);
        this.status = EMessageStatus.NEW;
    }
}
