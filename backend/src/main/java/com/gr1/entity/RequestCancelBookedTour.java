package com.gr1.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@NoArgsConstructor
@Table(name = "Request_cancel_booked_tour")
public class RequestCancelBookedTour {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "reason", nullable = false)
    private String reason;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "request_time", nullable = false)
    private Date requestTime;

    @OneToOne
    @JoinColumn(name = "booked_tour_id", referencedColumnName = "id", nullable = false)
    private BookedTour bookedTour;
}
