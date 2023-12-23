package com.gr1.entity;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "Booked_tour_information", uniqueConstraints = @UniqueConstraint(name = "uk_account_tour",columnNames = {"account_id", "tour_id"}))
public class BookedTour implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "full_name", length = 100, nullable = false)
    private String fullName;

    @Email
    @Column(name = "email", length = 100, nullable = false)
    private String email;

    @Column(name = "phone", length = 20, nullable = false)
    private String phone;

    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "total_persons", nullable = false)
    private Integer totalPersons;

    @Column(name = "adult_number", nullable = false)
    private Integer adultNumber;

    @Column(name = "children_number", nullable = false)
    private Integer childrenNumber;

    @Column(name = "baby_number", nullable = false)
    private Integer babyNumber;

    @Column(name = "note")
    private String note;

    @Column(name = "total_price", nullable = false)
    private Integer totalPrice;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "book_time", nullable = false)
    private Date bookTime;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private EBookedTour status;

    @Enumerated(EnumType.STRING)
    @Column(name = "form_of_payment")
    private EFormOfPayment formOfPayment;

    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false, referencedColumnName = "id")
    private Account account;

    @ManyToOne
    @JoinColumn(name = "tour_id", nullable = false, referencedColumnName = "id")
    private Tour tour;

    @OneToMany(mappedBy = "bookedTour", fetch = FetchType.EAGER)
    private List<TouristList> touristList;
}
