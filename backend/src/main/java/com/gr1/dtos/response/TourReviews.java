package com.gr1.dtos.response;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class TourReviews {
    private int tourId;
    private int numberOfReviews;
    private float avgStars;
    private List<ReviewDTO> reviewList;

    @Data
    @NoArgsConstructor
    public static class ReviewDTO {
        private Integer id;
        private Integer stars;
        private String comment;
        private String reviewTime;
        private Reviewer reviewer;

        @Data
        @NoArgsConstructor
        public static class Reviewer {
            private String fullName;
            private String avatarUrl;

            public Reviewer (String fullName, String avatarUrl){
                this.avatarUrl = avatarUrl;
                this.fullName = fullName;
            }
        }
    }
}
