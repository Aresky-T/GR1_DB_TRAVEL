package com.gr1.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@NoArgsConstructor
@MappedSuperclass
public class Message implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(name = "sender", nullable = false)
    private ESender sender;

    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    @Column(name = "sent_at", nullable = false)
    private Date sentAt;

    public Message (ESender sender) {
        this.sender = sender;
    }
}
