package com.gr1.entity;

import com.gr1.dtos.response.GuestCustomerDTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "Guest_customer")
@PrimaryKeyJoinColumn(name = "cs_id", referencedColumnName = "id")
public class GuestCustomer extends Customer{
    @Column(name = "full_name", length = 100, nullable = false)
    private String fullName;

    @Column(name = "email", length = 100, nullable = false)
    private String email;

    public GuestCustomer() {
        super();
    }

    public GuestCustomer (String fullName, String email) {
        this.fullName = fullName;
        this.email = email;
        this.setType(ECustomerType.GUEST);
        this.setStatus(ECustomerStatus.ONLINE);
    }
}
