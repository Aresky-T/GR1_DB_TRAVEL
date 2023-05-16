package com.gr1.dtos.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class TourGuideRequest {
    private String fullName;
    private String avatarUrl;
    private Integer age;
    private String description;
    private String phone;
    private String address;
}
