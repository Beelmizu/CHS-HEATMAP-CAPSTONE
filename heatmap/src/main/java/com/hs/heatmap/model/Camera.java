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
public class Camera implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cam_id")
    private int id;

    @Basic
    @Column(name = "cam_ip")
    private String ip;

    @Basic
    @Column(name = "cam_account")
    private String account;

    @Basic
    @Column(name = "cam_password")
    private String password;

    @Basic
    @Column(name = "cam_date_created")
    private String createDate;

    @Basic
    @Column(name = "cam_date_updated")
    private String updateDate;

    @Basic
    @Column(name = "cam_status")
    private String status;

    @Basic
    @Column(name = "cam_updated_by")
    private String updatedBy;

    @Basic
    @Column(name = "cam_area_id")
    private int areaID;

    @ManyToOne
    @JoinColumn(name = "cam_area_id", insertable = false, updatable = false)
    private Area area;

}
