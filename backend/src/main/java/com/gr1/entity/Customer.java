package com.gr1.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@NoArgsConstructor
@Table(name = "Customer")
public class Customer implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private ECustomerStatus status;

    @Column(name = "full_name", nullable = false, length = 100)
    private String fullName;

    @Column(name = "email", nullable = false, length = 100)
    private String email;

    @OneToOne
    @JoinColumn(name = "account_id", nullable = true, unique = true, foreignKey = @ForeignKey(name = "cus_fk_1"))
    private Account account;

    public Customer(String fullName, String email){
        this.fullName = fullName;
        this.email = email;
        this.status = ECustomerStatus.ONLINE;
    }

    public Customer(String fullName, String email, ECustomerStatus status){
        this.fullName = fullName;
        this.email = email;
        this.status = status;
    }

    public Customer(Account account){
        this.fullName = account.getProfile().getFullName();
        this.email = account.getEmail();
    }

    public Customer(Account account, ECustomerStatus status){
        this.fullName = account.getProfile().getFullName();
        this.email = account.getEmail();
        this.status = status;
        this.setAccount(account);
    }
}