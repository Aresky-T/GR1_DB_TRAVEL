package com.gr1.dtos.response;

import com.gr1.entity.EGender;
import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Builder
@Data
public class EmployeeDetails {
    private Integer id;
    private Integer accountId;
    private String status;
    private String fullName;
    private String avatarUrl;
    private String address;
    private String phone;
    private Date dateOfBirth;
    private EGender gender;
}
