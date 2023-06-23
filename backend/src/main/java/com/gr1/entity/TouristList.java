package com.gr1.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@NoArgsConstructor
@Entity
@Table(name = "`Tourist_list`")
public class TouristList implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "full_name", length = 100, nullable = false)
    private String fullName;

    @Column(name = "birth_date", nullable = false)
    private Date birthDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender", nullable = false)
    private EGender gender;

    @ManyToOne
    @JoinColumn(name = "booked_tour_id", referencedColumnName = "id", nullable = false)
    private BookedTour bookedTour;

    public TouristList (String fullName, Date birthDate, EGender gender) {
        this.fullName = fullName;
        this.birthDate = birthDate;
        this.gender = gender;
    }
}
