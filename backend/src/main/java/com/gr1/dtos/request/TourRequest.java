package com.gr1.dtos.request;

import com.gr1.entity.Tour;
import com.gr1.utils.TourUtils;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
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
    private Integer totalSeats;
    private String vehicle;
    private String scheduleDescription;
    private Integer price1;
    private Integer price2;
    private Integer price3;

    public Tour buildEntity (){
        Tour tour = new Tour();
        tour.setTitle((this.title));
        tour.setImage1(this.image1);
        tour.setImage2(this.image2);
        tour.setImage3(this.image3);
        tour.setImage4(this.image4);
        tour.setStartTime(this.startTime);
        tour.setTime(this.time);
        tour.setStartAddress(this.startAddress);
        tour.setDestinationList(this.destinationList);
        tour.setTotalSeats(this.totalSeats);
        tour.setVehicle(this.vehicle);
        tour.setScheduleDescription(this.scheduleDescription);
        tour.setPrice1(this.price1);
        tour.setPrice2(this.price2);
        tour.setPrice3(this.price3);
        tour.setTourCode(TourUtils.generateTourCode());
        return tour;
    }
}
