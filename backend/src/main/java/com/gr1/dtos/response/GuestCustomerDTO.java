package com.gr1.dtos.response;

import com.gr1.entity.GuestCustomer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GuestCustomerDTO {
    private Integer id;
    private String status;
    private String fullName;
    private String email;

    public GuestCustomerDTO(GuestCustomer customer){
        this.id = customer.getId();
        this.status = customer.getStatus().toString();
        this.fullName = customer.getFullName();
        this.email = customer.getEmail();
    }
}
