package com.hs.heatmap.service;

import com.hs.heatmap.model.Report;
import com.hs.heatmap.model.ReportAgeGender;

import java.util.List;

public interface ReportService {

    List<Report> getAllReport();

    List<Report> getReportByDate(String date, int cameraID);

    List<Report> getReportCameraByMonth(String month, int cameraID);

    List getReportZoneByMonth(String month, int zoneID);

    List getReportStoreByMonth(String month, int storeID);

    List getReportTrafficByMonth(String month, int storeID);

    List getReportAgeGenderStoreByMonth(String month, int storeID);

    List<Report> getReportCameraByTime(String date, int cameraID, String timeFrom, String timeTo);

    List<ReportAgeGender> getReportAgeGenderByTime(String date, int cameraID, String timeFrom, String timeTo);

    List getReportZoneByTime(String date, int zoneID, String timeFrom, String timeTo);

    List getReportZoneTrafficByTime(String date, int zoneID, String timeFrom, String timeTo);

    List getReportAgeGenderZoneByTime(String date, int zoneID, String timeFrom, String timeTo);

    List getReportStoreByTime(String date, int storeID, String timeFrom, String timeTo);

    List getReportTrafficByTime(String date, int storeID, String timeFrom, String timeTo);

    List getReportTrafficDetailByTime(String date, int zoneID, String timeFrom, String timeTo);

    List<Report> getHeatmapByDate(String date, int cameraID);

    Report createReport(Report report);

    List getReportAgeGenderStoreByTime(String selectedDate, int storeID, String timeFrom, String timeTo);
}
