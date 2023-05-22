package com.gr1.dtos.request;

import com.gr1.entity.TourAttBlogContent;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class TourAttBlogContentRequest {
    private String subTitle;
    private String content;
    private String image;

    public TourAttBlogContent buildEntity(){
        return new TourAttBlogContent(subTitle, content, image);
    }
}
