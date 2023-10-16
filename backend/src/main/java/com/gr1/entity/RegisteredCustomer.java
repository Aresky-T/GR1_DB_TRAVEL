package com.gr1.entity;

import lombok.EqualsAndHashCode;

import javax.persistence.*;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "Registered_customer")
public class RegisteredCustomer extends Customer{

    @OneToOne
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;

    @OneToOne
    @JoinColumn(name = "cs_id", nullable = false)
    private Customer customer;
}
