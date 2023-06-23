package com.gr1.dtos.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CancelBookedTourForm {
    private Integer bookedTourId;
    private String reason;
}
