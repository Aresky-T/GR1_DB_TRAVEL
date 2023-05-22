package com.gr1.dtos.request;

import com.gr1.entity.TourGuide;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Getter
@NoArgsConstructor
public class TourRequest {
    private String title;
    private String image1;
    private String image2;
    private String image3;
    private String image4;
    private Date startTime;
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
    private TourGuide tourGuide;
}
