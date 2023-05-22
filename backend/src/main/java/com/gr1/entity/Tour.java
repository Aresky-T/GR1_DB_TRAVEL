package com.gr1.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "`Tour`")
public class Tour implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "title", nullable = false, unique = true)
    private String title;

    @Column(name ="image1", nullable = false)
    private String image1;

    @Column(name ="image2", nullable = false)
    private String image2;

    @Column(name ="image3", nullable = false)
    private String image3;

    @Column(name ="image4", nullable = false)
    private String image4;

    @Column(name = "start_time", nullable = false)
    private Date startTime;

    @Column(name = "time", length = 100, nullable = false)
    private String time;

    @Column(name = "start_address", nullable = false)
    private String startAddress;

    @Column(name = "destination_list", nullable = false)
    private String destinationList;

    @Column(name = "available_seats", nullable = false)
    private Integer availableSeats;

    @Column(name = "total_seats", nullable = false)
    private Integer totalSeats;

    @Column(name = "vehicle", length = 50, nullable = false)
    private String vehicle;

    @Column(name = "schedule_description", nullable = false)
    private String scheduleDescription;

    @Column(name = "price1", nullable = false)
    private Integer price1;

    @Column(name = "price2", nullable = false)
    private Integer price2;

    @Column(name = "price3", nullable = false)
    private Integer price3;

    @OneToOne
    @JoinColumn(name = "tour_guide")
    private TourGuide tourGuide;

    @Column(name = "tour_code", length = 100, nullable = false, unique = true)
    private String tourCode;

    @OneToMany(mappedBy = "tour")
    private List<BookTourInfo> tourInfoList;
}
