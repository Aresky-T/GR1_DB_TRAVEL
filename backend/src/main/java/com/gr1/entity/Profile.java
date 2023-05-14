package com.gr1.entity;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@Table(name = "`Profile`")
public class Profile implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "`id`", nullable = false)
    private Integer id;

    @Column(name = "`avatar_url`")
    private String avatarUrl;

    @Column(name = "`full_name`", length = 100)
    private String fullName;

    @Column(name = "`address`")
    private String address;

    @Size(max = 20)
    @Column(name = "`phone`", length = 20)
    private String phone;

    @Temporal(TemporalType.DATE)
    @Column(name = "`date_of_birth`")
    private Date dateOfBirth;

    @Enumerated(EnumType.STRING)
    @Column(name = "`gender`")
    private EGender gender;

    @OneToOne
    @JoinColumn(name = "`account_id`", nullable = false, unique = true)
    private Account account;

}
