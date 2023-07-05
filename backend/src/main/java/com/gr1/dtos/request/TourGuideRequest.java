package com.gr1.dtos.request;

import com.gr1.entity.EGender;
import com.gr1.entity.ETourGuideStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Getter
@NoArgsConstructor
public class TourGuideRequest {
    private String fullName;
    private String avatarUrl;
    private Date birthDate;
    private EGender gender;
    private String description;
    private String phone;
    private String address;
    private ETourGuideStatus status;
}
