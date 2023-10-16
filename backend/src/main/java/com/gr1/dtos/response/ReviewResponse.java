package com.gr1.dtos.response;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class ReviewResponse {
    private Integer id;
    private Integer stars;
    private String comment;
    private Date reviewTime;
    private Reviewer reviewer;

    @Data
    @NoArgsConstructor
    public static class Reviewer {
        private String fullName;
        private String avatarUrl;
    }
}
