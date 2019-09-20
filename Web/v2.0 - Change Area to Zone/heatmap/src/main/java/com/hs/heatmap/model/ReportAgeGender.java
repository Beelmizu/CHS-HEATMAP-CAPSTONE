package com.hs.heatmap.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReportAgeGender {

    private int id;

    private String time;

    private int count;

    private String heatmap;

    private int gender_male;

    private int gender_female;

    private int age_0_2;

    private int age_4_6;

    private int age_8_12;

    private int age_15_20;

    private int age_25_32;

    private int age_38_43;

    private int age_48_53;

    private int age_60_100;

    private int cameraID;

}
