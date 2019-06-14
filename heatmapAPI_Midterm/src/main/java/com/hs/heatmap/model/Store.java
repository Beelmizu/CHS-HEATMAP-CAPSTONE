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
public class Store implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sto_id")
    private int id;

    @Basic
    @Column(name = "sto_name")
    private String name;

    @Basic
    @Column(name = "sto_address")
    private String address;

    @Basic
    @Column(name = "sto_phone")
    private String phone;

    @Basic
    @Column(name = "sto_date_created")
    private String createDate;

    @Basic
    @Column(name = "sto_date_updated")
    private String updateDate;

    @Basic
    @Column(name = "sto_status")
    private String status;

    @Basic
    @Column(name = "sto_update_by")
    private String updatedBy;

    @Basic
    @Column(name = "cpn_store_id")
    private int cpn_store_id;

    @ManyToOne
    @JoinColumn(name = "cpn_store_id", insertable = false, updatable = false)
    private Company company;

}
