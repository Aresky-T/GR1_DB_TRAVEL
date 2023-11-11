package com.gr1.dtos.response;

import com.gr1.entity.MailBox;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
public class MailBoxForCustomer {
    private int id;
    private int employeeId;

    public MailBoxForCustomer (MailBox mailBox) {
        this.id = mailBox.getId();
        this.employeeId = mailBox.getEmployee().getId();
    }
}
