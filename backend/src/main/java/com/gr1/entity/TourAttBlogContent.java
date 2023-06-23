package com.gr1.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@NoArgsConstructor
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

    public TourAttBlogContent(String subTitle, String content, String image){
        this.subTitle = subTitle;
        this.content = content;
        this.image = image;
    }

    public TourAttBlogContent(int id, String subTitle, String content, String image){
        this.id = id;
        this.subTitle = subTitle;
        this.content = content;
        this.image = image;
    }
}
