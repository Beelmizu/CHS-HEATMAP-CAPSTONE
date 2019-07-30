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
public class Analysis implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "als_id")
    private int id;

    @Basic
    @Column(name = "als_gender")
    private String gender;

    @Basic
    @Column(name = "als_age")
    private String age;

    @Basic
    @Column(name = "als_time")
    private String time;

    @Basic
    @Column(name = "als_cam_id")
    private int cameraID;

    @ManyToOne
    @JoinColumn(name = "als_cam_id", insertable = false, updatable = false)
    private Camera camera;
}
