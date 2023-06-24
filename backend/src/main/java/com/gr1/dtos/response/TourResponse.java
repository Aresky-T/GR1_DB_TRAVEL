package com.gr1.dtos.response;

import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
public class TourResponse {
    private Integer id;
    private String title;
    private String image1;
    private String image2;
    private String image3;
    private String image4;
    private String startTime;
    private String time;
    private String startAddress;
    private String destinationList;
    private Integer availableSeats;
    private Integer totalSeats;
    private String vehicle;
    private String scheduleDescription;
    private Integer price1;
    private Integer price2;
    private Integer price3;
    private String tourCode;
    private String createdTime;
    private TourGuideDTO tourGuide;

    @Data
    @NoArgsConstructor
    public static class TourGuideDTO {
        private String fullName;
        private String avatarUrl;
        private Integer age;
        private String description;
    }
}
