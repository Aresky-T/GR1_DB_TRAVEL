package com.gr1.entity;

import lombok.EqualsAndHashCode;

import javax.persistence.*;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "Guest_customer")
public class GuestCustomer extends Customer{
    @Column(name = "full_name", length = 100, nullable = false)
    private String fullName;

    @Column(name = "email", length = 100, nullable = false)
    private String email;

    @OneToOne
    @JoinColumn(name = "cs_id", nullable = false, unique = true)
    private Customer customer;

    public GuestCustomer() {
        super();
    }
}
