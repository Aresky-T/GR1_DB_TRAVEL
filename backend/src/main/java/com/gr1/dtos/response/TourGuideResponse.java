package com.gr1.dtos.response;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TourGuideResponse {
    private Integer id;
    private String fullName;
    private String avatarUrl;
    private String birthDate;
    private String gender;
    private String description;
    private String phone;
    private String address;
    private String status;
    private Integer TourId;
}
