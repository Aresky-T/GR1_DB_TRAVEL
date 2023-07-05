package com.gr1.dtos.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PriceFilter {
    private Integer minPrice;
    private Integer maxPrice;

    public PriceFilter (Integer minPrice, Integer maxPrice) {
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;
    }
}
