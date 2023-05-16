package com.gr1.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookTourInfoPK implements Serializable {
    @Column(name = "account_id", nullable = false)
    private Integer accountId;

    @Column(name = "tour_id", nullable = false)
    private Integer tourId;
}
