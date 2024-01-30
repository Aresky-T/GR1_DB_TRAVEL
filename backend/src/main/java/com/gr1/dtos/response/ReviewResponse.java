package com.gr1.dtos.response;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ReviewResponse {
    private int stars;
    private String comment;
    private String reviewTime;
}
