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
public class Report implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rep_id")
    private int id;

    @Basic
    @Column(name = "rep_time")
    private String ip;

    @Basic
    @Column(name = "rep_count")
    private int count;

    @Basic
    @Column(name = "area_id")
    private int areaID;

}