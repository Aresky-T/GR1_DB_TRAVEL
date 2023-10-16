package com.gr1.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@NoArgsConstructor
@Table(name = "Customer")
@Inheritance(strategy = InheritanceType.JOINED)
public class Customer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private ECustomerStatus status;

    @Enumerated(EnumType.STRING)
    @Column(name = "`type`", nullable = false)
    private ECustomerType type;
}
