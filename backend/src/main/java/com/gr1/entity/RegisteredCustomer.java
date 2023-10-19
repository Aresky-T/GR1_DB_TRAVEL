package com.gr1.entity;

import com.gr1.dtos.response.RegisteredCustomerDTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "Registered_customer")
@PrimaryKeyJoinColumn(name = "cs_id", referencedColumnName = "id")
public class RegisteredCustomer extends Customer{

    @OneToOne
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;
}
