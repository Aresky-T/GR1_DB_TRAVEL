package com.gr1.dtos.request;

import com.gr1.entity.TouristAttraction;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class TouristAttRequest {
    private String name;
    private String imageUrl;
    private String title;
    private String intro;
    private List<TourAttBlogContentRequest> listContents;

    public TouristAttraction buildEntity() {
        return new TouristAttraction(name, imageUrl, title, intro);
    }
}
