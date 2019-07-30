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
public class Report  implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rep_id")
    private int id;

    @Basic
    @Column(name = "rep_time")
    private String time;

    @Basic
    @Column(name = "rep_count")
    private int count;

    @Basic
    @Column(name = "rep_heatmap")
    private String heatmap;

    @Basic
    @Column(name = "rep_people_gender")
    private String people_gender;

    @Basic
    @Column(name = "rep_people_age")
    private String people_age;

    @Basic
    @Column(name = "rep_cam_id")
    private int cameraID;

    @ManyToOne
    @JoinColumn(name = "rep_cam_id", insertable = false, updatable = false)
    private Camera camera;
//
//    @Override
//    public int compareTo(Report o) {
//        if (getTime() == null || o.getTime() == null)
//            return 0;
//        return getTime().compareTo(o.getTime());
//    }
}
