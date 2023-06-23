package com.gr1.dtos.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TourFilter {
    private String startAddress;
    private String destination;
    private String vehicle;
}
