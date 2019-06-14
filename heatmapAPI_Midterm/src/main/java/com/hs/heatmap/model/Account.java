package com.hs.heatmap.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Account implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "acc_id")
    private int id;

    @Basic
    @Column(name = "acc_username")
    private String username;

    @Basic
    @Column(name = "acc_password")
    private String password;

    @Basic
    @Column(name = "acc_fullname")
    private String fullName;

    @Basic
    @Column(name = "acc_email")
    private String email;

    @Basic
    @Column(name = "acc_phone")
    private String phone;

    @Basic
    @Column(name = "acc_gender")
    private int gender;

    @Basic
    @Column(name = "acc_role")
    private boolean role;

    @Basic
    @Column(name = "acc_date_created")
    private String createdDate;

    @Basic
    @Column(name = "acc_date_updated")
    private String updatedDate;

    @Basic
    @Column(name = "acc_status")
    private String status;

    @Basic
    @Column(name = "acc_updated_by")
    private String updatedBy;

    @Basic
    @Column(name = "cpn_acc_id")
    private int cpn_acc_id;

    @ManyToOne
    @JoinColumn(name = "cpn_acc_id", insertable = false, updatable = false)
    private Company company;
}
