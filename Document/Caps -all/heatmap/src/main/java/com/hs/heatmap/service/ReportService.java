package com.hs.heatmap.service;

import com.hs.heatmap.model.Report;
import com.hs.heatmap.model.ReportAgeGender;

import java.util.List;

public interface ReportService {

    List<Report> getAllReport();

    List<Report> getReportByDate(String date, int cameraID);

    List<Report> getReportByMonth(String month, int cameraID);

    List getReportAreaByMonth(String month, int areaID);

    List getReportStoreByMonth(String month, int storeID);

    List getReportAgeGenderStoreByMonth(String month, int storeID);

    List<Report> getReportByTime(String date, int cameraID, String timeFrom, String timeTo);

    List<ReportAgeGender> getReportAgeGenderByTime(String date, int cameraID, String timeFrom, String timeTo);

    List getReportAreaByTime(String date, int areaID, String timeFrom, String timeTo);

    List getReportAgeGenderAreaByTime(String date, int areaID, String timeFrom, String timeTo);

    List getReportStoreByTime(String date, int storeID, String timeFrom, String timeTo);

    List<Report> getHeatmapByDate(String date, int cameraID);

    Report createReport(Report report);

    List getReportAgeGenderStoreByTime(String selectedDate, int storeID, String timeFrom, String timeTo);
}
