package com.gr1.dtos.response;

import com.gr1.entity.RegisteredCustomer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisteredCustomerDTO {
    private Integer id;
    private String status;
    private String email;
    private String fullName;
    private String avatarUrl;

    public RegisteredCustomerDTO(RegisteredCustomer customer){
        this.id = customer.getId();
        this.status = customer.getStatus().toString();
        this.email = customer.getAccount().getEmail();
        this.fullName = customer.getAccount().getProfile().getFullName();
        this.avatarUrl = customer.getAccount().getProfile().getAvatarUrl();
    }
}
