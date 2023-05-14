package com.gr1.entity;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@Table(name = "`Account`")
public class Account implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "`id`", nullable = false)
    private Integer id;

    @Column(name = "`username`", length = 30, nullable = false, unique = true)
    private String username;

    @Column(name = "`password`", nullable = false)
    private String password;

    @Email
    @Column(name = "`email`", length = 100, nullable = false, unique = true)
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(name = "`status`", nullable = false)
    private EStatus status;

    @Enumerated(EnumType.STRING)
    @Column(name = "`role`", nullable = false)
    private ERole role;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "`created_time`", nullable = false)
    private Date createdTime;

    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "`updated_time`", nullable = false)
    private Date updatedTime;
}
