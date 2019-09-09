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
public class Zone implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "zone_id")
    private int id;

    @Basic
    @Column(name = "zone_floor")
    private int floor;

    @Basic
    @Column(name = "zone_name")
    private String name;

    @Basic
    @Column(name = "zone_date_created")
    private String createdDate;

    @Basic
    @Column(name = "zone_date_updated")
    private String updatedDate;

    @Basic
    @Column(name = "zone_status")
    private String status;

    @Basic
    @Column(name = "zone_updated_by")
    private String updatedBy;

    @Basic
    @Column(name = "sto_id")
    private int stoID;

    @ManyToOne
    @JoinColumn(name = "sto_id", insertable = false, updatable = false)
    private Store store;
}
