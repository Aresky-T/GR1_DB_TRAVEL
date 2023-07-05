package com.gr1.entity;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@Table(name = "`Tour_guide`")
public class TourGuide implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "full_name", length = 100, nullable = false)
    private String fullName;

    @Column(name = "avatar_url", nullable = false)
    private String avatarUrl;

    @Column(name = "birth_date", nullable = false)
    private Date birthDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender", nullable = false)
    private EGender gender;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "phone", length = 20, nullable = false)
    private String phone;

    @Column(name = "address", length = 200, nullable = false)
    private String address;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private ETourGuideStatus status;

    @OneToOne(mappedBy = "tourGuide")
    private Tour tour;
}
