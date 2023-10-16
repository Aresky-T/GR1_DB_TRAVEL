package com.gr1.dtos.request;

import com.gr1.entity.Review;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ReviewForm {
    private Integer stars;
    private String comment;
    private Integer tourId;

    public Review buildEntity(){
        return new Review(stars, comment);
    }
}
