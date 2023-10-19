package com.gr1.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.persistence.Table;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "Chat")
public class Chat extends Message{
    private String message;
    private EMessageStatus status;

    public Chat () {

    }

    public Chat (String message, ESender sender) {
        this.message = message;
        this.setSender(sender);
        this.status = EMessageStatus.NEW;
    }
}
