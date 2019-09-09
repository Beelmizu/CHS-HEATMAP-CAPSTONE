package com.hs.heatmap.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Company implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cpn_id")
    private int id;

    @Basic
    @Column(name = "cpn_name")
    private String name;

    @Basic
    @Column(name = "cpn_address")
    private String address;

    @Basic
    @Column(name = "cpn_date_created")
    private String createdDate;

    @Basic
    @Column(name = "cpn_date_updated")
    private String updatedDate;

    @Basic
    @Column(name = "cpn_status")
    private String status;

    @Basic
    @Column(name = "cpn_updated_by")
    private String updatedBy;

}
