package com.gr1.entity;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Table(name = "`TourAtt_blog_content`")
public class TourAttBlogContent implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "sub_title", nullable = false)
    private String subTitle;

    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "image")
    private String image;

    @ManyToOne
    @JoinColumn(name = "tourAtt_id", nullable = false)
    private TouristAttraction touristAttraction;
}
