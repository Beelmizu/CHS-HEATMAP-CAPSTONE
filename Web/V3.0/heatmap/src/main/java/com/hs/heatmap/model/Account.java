package com.hs.heatmap.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

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

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "cpn_acc_id", insertable = false, updatable = false)
    private Company company;


//    @ManyToMany(fetch = FetchType.LAZY,
//            cascade = {
//                    CascadeType.PERSIST,
//                    CascadeType.MERGE
//            })
//    @JoinTable(name = "account_store",
//            joinColumns = { @JoinColumn(name = "account_id", referencedColumnName = "acc_id")},
//            inverseJoinColumns = { @JoinColumn(name = "store_id", referencedColumnName = "sto_id")})
//    private Set<Store> stores = new HashSet<>();

}
