package com.gr1.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Data
@NoArgsConstructor
@Entity
@Table(name = "vnpay_payment_info")
public class VnPayPaymentInfo implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "order_info", nullable = false)
    private String orderInfo;

    @Column(name = "txn_ref", nullable = false)
    private String txnRef;

    @Column(name = "transaction_no", nullable = false)
    private String transactionNo;

    @Column(name = "amount", nullable = false)
    private String amount;

    @OneToOne
    @JoinColumn(name = "booked_tour_id", nullable = false, referencedColumnName = "id", foreignKey = @ForeignKey(name = "booked_tour_id"))
    private BookedTour bookedTour;
}
