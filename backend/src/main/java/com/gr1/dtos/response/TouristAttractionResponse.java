package com.gr1.dtos.response;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class TouristAttractionResponse {
    private Integer id;
    private String name;
    private String imageUrl;
    private String title;
    private String intro;
    private String createdTime;
    private List<TourAttBlogContentDTO> listContents;

    @Data
    @NoArgsConstructor
    public static class TourAttBlogContentDTO {
        private Integer id;
        private String subTitle;
        private String content;
        private String image;
    }
}
