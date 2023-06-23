package com.gr1.dtos.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class BookTourRequest {
    private String fullName;
    private String email;
    private String phone;
    private String address;
    private Integer adultNumber;
    private Integer childrenNumber;
    private Integer babyNumber;
    private String note;
    private Integer tourId;
    private List<TouristListRequest> touristList;
}
