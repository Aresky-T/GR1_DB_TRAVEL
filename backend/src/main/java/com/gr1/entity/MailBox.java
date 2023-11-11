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
@Table(name = "Mail_box")
public class MailBox extends CustomerSupport{

    @OneToMany(mappedBy = "mailBox", fetch = FetchType.EAGER)
    private List<Mail> mailList;

    @Transient
    private Mail latestMail;

    public MailBox (Customer customer, Employee employee) {
        super(customer, employee);
    }
}
