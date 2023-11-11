package com.gr1.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "Chat_box")
public class ChatBox extends CustomerSupport {
    @OneToMany(mappedBy = "chatBox", fetch = FetchType.EAGER)
    private List<Chat> chatList;

    @Transient
    private Chat latestChat;

    public ChatBox (Customer customer, Employee employee) {
        super(customer, employee);
    }
}
