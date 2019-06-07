package com.hs.heatmap.controller;

import com.hs.heatmap.model.Report;
import com.hs.heatmap.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins="http://localhost:4200")
public class ReportController {

    @Autowired
    ReportService reportService;

    @GetMapping("/reports/getAll")
    public List<Report> getAllReports(){ return reportService.getAllReports(); }

    @GetMapping("reports/getDetail/{id}")
    public Report getDetailReport(@PathVariable(value = "id") int id){ return reportService.getDetailReport(id); }

    @GetMapping("/reports/search/{searchValue}")
    public List<Report> searchReport(@PathVariable(value = "searchValue") String searchValue) { return reportService.getReportsByTime(searchValue); }

    @DeleteMapping("/reports/delete")
    public Report deleteReportByID(@RequestBody Report report) { return reportService.deleteReport(report); }

    @PostMapping("/reports/update")
    public Report updateReport(@RequestBody Report report) { return reportService.updateReport(report); }

    @PostMapping("/reports/create")
    public Report createReport(@RequestBody Report report) { return reportService.createNewReport(report); }

}
