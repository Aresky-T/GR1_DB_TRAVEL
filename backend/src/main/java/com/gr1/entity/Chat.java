package com.gr1.entity;

import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.persistence.Table;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "Chat")
public class Chat extends Message{
    private String message;
    private EMessageStatus status;
}
