package com.hs.heatmap.service;

import com.hs.heatmap.model.Report;

import java.util.List;

public interface ReportService {

    List<Report> getAllReports();

    Report getDetailReport(int id);

    List<Report> getReportsByTime(String searchValue);

    Report createNewReport(Report report);

    Report updateReport(Report report);

    Report deleteReport(Report report);

}