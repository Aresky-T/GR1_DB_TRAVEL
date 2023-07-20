package com.gr1.dtos.request;

import java.util.Date;

import com.gr1.entity.EGender;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProfileUpdate {
    private String avatarUrl;
    private String fullName;
    private String address;
    private String phone;
    private Date dateOfBirth;
    private EGender gender;
}
