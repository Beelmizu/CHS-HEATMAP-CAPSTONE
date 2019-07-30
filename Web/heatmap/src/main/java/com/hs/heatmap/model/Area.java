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
public class Area implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "area_id")
    private int id;

    @Basic
    @Column(name = "area_floor")
    private int floor;

    @Basic
    @Column(name = "area_name")
    private String name;

    @Basic
    @Column(name = "area_date_created")
    private String createDate;

    @Basic
    @Column(name = "area_date_updated")
    private String updateDate;

    @Basic
    @Column(name = "area_status")
    private String status;

    @Basic
    @Column(name = "area_updated_by")
    private String updatedBy;

    @Basic
    @Column(name = "sto_id")
    private int stoID;

    @ManyToOne
    @JoinColumn(name = "sto_id", insertable = false, updatable = false)
    private Store store;
}
