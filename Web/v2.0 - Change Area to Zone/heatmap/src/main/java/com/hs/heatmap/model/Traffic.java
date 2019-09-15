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
public class Traffic implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tra_id")
    private int id;

    @Basic
    @Column(name = "tra_get_in_time")
    private String getIn;

    @Basic
    @Column(name = "tra_get_out_time")
    private String getOut;

    @Basic
    @Column(name = "tra_zone_id")
    private int zoneID;

    @ManyToOne
    @JoinColumn(name = "tra_zone_id", insertable = false, updatable = false)
    private Zone zone;

}
