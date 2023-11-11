package com.gr1.dtos.response;

import com.gr1.entity.Customer;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CustomerDTO {
    private Integer id;
    private String status;
    private String fullName;
    private String email;
    private String avatarUrl;

    public CustomerDTO(Customer customer){
        this.id = customer.getId();
        this.status = customer.getStatus().toString();
        this.fullName = customer.getFullName();
        this.email = customer.getEmail();
        if(customer.getAccount() != null){
            this.avatarUrl = customer.getAccount().getProfile().getAvatarUrl();
        }
    }
}
