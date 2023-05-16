package com.gr1.entity;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "`Tourist_attraction`")
public class TouristAttraction implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "`name`", nullable = false, unique = true)
    private String name;

    @Column(name = "image_url", nullable = false)
    private String imageUrl;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "intro", nullable = false)
    private String intro;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_time", nullable = false)
    private Date createdTime;

    @OneToMany(mappedBy = "touristAttraction")
    private List<TourAttBlogContent> contents;
}
