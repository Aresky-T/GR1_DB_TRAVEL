package com.gr1.dtos.request;

import com.gr1.dtos.response.TouristAttractionResponse;
import com.gr1.entity.TourAttBlogContent;
import com.gr1.entity.TouristAttraction;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class TourAttBlogContentUpdateRequest {
    private Integer id;
    private String name;
    private String imageUrl;
    private String title;
    private String intro;
    private List<TourAttBlogContentDTO> listContents;

    @Data
    @NoArgsConstructor
    public static class TourAttBlogContentDTO {
        private Integer id;
        private String subTitle;
        private String content;
        private String image;

        public TourAttBlogContent buildEntity(){
            return new TourAttBlogContent(id, subTitle, content, image);
        }
    }

    public TouristAttraction buildEntity(){
        return new TouristAttraction(name, imageUrl, title, intro);
    }
}
