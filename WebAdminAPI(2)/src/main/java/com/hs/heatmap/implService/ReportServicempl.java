package com.hs.heatmap.implService;

import com.hs.heatmap.model.Report;
import com.hs.heatmap.repository.ReportRepository;
import com.hs.heatmap.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ReportServiceImpl implements ReportService {

    @Autowired
    private ReportRepository reportRepository;

    @Override
    public List<Report> getAllReports() {
        return reportRepository.findAll();
    }

    @Override
    public Report getDetailReport(int id) { return reportRepository.findReportById(id); }

    @Override
    public List<Report> getReportsByTime(String searchValue) { return reportRepository.findReportsByTime(searchValue); }

    @Override
    public Report updateReport(Report report) {
        report.setUpdateDate(LocalDate.now().toString());
        report.setUpdatedBy("cuongdq");
        return reportRepository.save(report);
    }

    @Override
    public Report deleteReport(Report report) {
        report.setDeletedDate(LocalDate.now().toString());
        return reportRepository.save(report);
    }

    @Override
    public Report createNewReport(Report report) {
        report.setCreateDate(LocalDate.now().toString());
        return reportRepository.save(report);
    }


}
