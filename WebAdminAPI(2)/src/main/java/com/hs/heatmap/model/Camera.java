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
    @Column(name = "camera_id")
    private int id;

    @Basic
    @Column(name = "camera_ip")
    private String ip;

    @Basic
    @Column(name = "camera_account")
    private String account;

    @Basic
    @Column(name = "camera_password")
    private String password;

    @Basic
    @Column(name = "camera_date_created")
    private String createDate;

    @Basic
    @Column(name = "camera_date_updated")
    private String updateDate;

    @Basic
    @Column(name = "camera_date_deleted")
    private String deletedDate;

    @Basic
    @Column(name = "camera_updated_by")
    private String updatedBy;

    @Basic
    @Column(name = "area_id")
    private int areaID;

}
