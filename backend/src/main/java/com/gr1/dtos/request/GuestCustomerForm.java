package com.gr1.dtos.request;

import com.gr1.entity.GuestCustomer;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GuestCustomerForm {
    private String fullName;
    private String email;

    public GuestCustomer buildGuestCustomer() {
        return new GuestCustomer(this.fullName, this.email);
    }
}
