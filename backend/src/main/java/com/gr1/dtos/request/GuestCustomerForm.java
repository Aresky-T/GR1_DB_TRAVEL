package com.gr1.dtos.request;

import com.gr1.entity.Customer;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GuestCustomerForm {
    private String fullName;
    private String email;

    public Customer buildCustomer() {
        return new Customer(this.fullName, this.email);
    }
}
