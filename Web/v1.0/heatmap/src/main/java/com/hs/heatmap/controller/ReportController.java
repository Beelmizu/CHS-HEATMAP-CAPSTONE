package com.hs.heatmap.controller;

import com.hs.heatmap.model.Report;
import com.hs.heatmap.model.ReportAgeGender;
import com.hs.heatmap.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins="*")
public class ReportController {

    @Autowired
    ReportService reportService;

    @GetMapping("/report/getAll")
    public List<Report> getAllReport() {
        return reportService.getAllReport();
    }

    @PostMapping("/report/createReport")
    public Report createReport(@RequestBody Report report) {
        return reportService.createReport(report);
    }

    @GetMapping("/report/getReportByDate/{selectedDate}/{cameraID}")
    public List<Report> getReportByDate(@PathVariable(value = "selectedDate") String selectedDate,
                                        @PathVariable(value = "cameraID") int cameraID) {
        return reportService.getReportByDate(selectedDate, cameraID);
    }


    @GetMapping("/report/getReportByTime/{selectedDate}/{cameraID}/{timeFrom}/{timeTo}")
    public List<Report> getReportByTime(@PathVariable(value = "selectedDate") String selectedDate,
                                        @PathVariable(value = "cameraID") int cameraID,
                                        @PathVariable(value = "timeFrom") String timeFrom,
                                        @PathVariable(value = "timeTo") String timeTo) {
        return reportService.getReportCameraByTime(selectedDate, cameraID, timeFrom, timeTo);
    }

    @GetMapping("/report/getReportAgeGenderByTime/{selectedDate}/{cameraID}/{timeFrom}/{timeTo}")
    public List<ReportAgeGender> getReportAgeGenderByDate(@PathVariable(value = "selectedDate") String selectedDate,
                                                          @PathVariable(value = "cameraID") int cameraID,
                                                          @PathVariable(value = "timeFrom") String timeFrom,
                                                          @PathVariable(value = "timeTo") String timeTo) {
        return reportService.getReportAgeGenderByTime(selectedDate, cameraID, timeFrom, timeTo);
    }

    @GetMapping("/report/getReportAreaByTime/{selectedDate}/{areaID}/{timeFrom}/{timeTo}")
    public List getReportAreaByDate(@PathVariable(value = "selectedDate") String selectedDate,
                                    @PathVariable(value = "areaID") int areaID,
                                    @PathVariable(value = "timeFrom") String timeFrom,
                                    @PathVariable(value = "timeTo") String timeTo) {
        return reportService.getReportAreaByTime(selectedDate, areaID, timeFrom, timeTo);
    }

    @GetMapping("/report/getReportStoreByTime/{selectedDate}/{storeID}/{timeFrom}/{timeTo}")
    public List getReportStoreByDate(@PathVariable(value = "selectedDate") String selectedDate,
                                     @PathVariable(value = "storeID") int storeID,
                                     @PathVariable(value = "timeFrom") String timeFrom,
                                     @PathVariable(value = "timeTo") String timeTo) {
        return reportService.getReportStoreByTime(selectedDate, storeID, timeFrom, timeTo);
    }

    @GetMapping("/report/getReportAgeGenderStoreByTime/{selectedDate}/{storeID}/{timeFrom}/{timeTo}")
    public List getReportAgeGenderStoreByDate(@PathVariable(value = "selectedDate") String selectedDate,
                                              @PathVariable(value = "storeID") int storeID,
                                              @PathVariable(value = "timeFrom") String timeFrom,
                                              @PathVariable(value = "timeTo") String timeTo) {
        return reportService.getReportStoreByTime(selectedDate, storeID, timeFrom, timeTo);
    }

    @GetMapping("/report/getReportByMonth/{selectedMonth}/{cameraID}")
    public List<Report> getReportByMonth(@PathVariable(value = "selectedMonth") String selectedMonth,
                                         @PathVariable(value = "cameraID") int cameraID) {
        return reportService.getReportCameraByMonth(selectedMonth, cameraID);
    }

    @GetMapping("/report/getReportAreaByMonth/{selectedMonth}/{areaID}")
    public List getReportAreaByMonth(@PathVariable(value = "selectedMonth") String selectedMonth,
                                     @PathVariable(value = "areaID") int areaID) {
        return reportService.getReportAreaByMonth(selectedMonth, areaID);
    }

    @GetMapping("/report/getReportStoreByMonth/{selectedMonth}/{storeID}")
    public List getReportStoreByMonth(@PathVariable(value = "selectedMonth") String selectedMonth,
                                      @PathVariable(value = "storeID") int storeID) {
        return reportService.getReportStoreByMonth(selectedMonth, storeID);
    }

    @GetMapping("/report/getReportAgeGenderStoreByMonth/{selectedMonth}/{storeID}")
    public List getReportAgeGenderStoreByMonth(@PathVariable(value = "selectedMonth") String selectedMonth,
                                               @PathVariable(value = "storeID") int storeID) {
        return reportService.getReportAgeGenderStoreByMonth(selectedMonth, storeID);
    }

    @GetMapping("/report/getHeatmapByDate/{date}/{cameraID}")
    public List<Report> getHeatmapByDate(@PathVariable(value = "date") String date,
                                         @PathVariable(value = "cameraID") int camID) {
        return reportService.getHeatmapByDate(date, camID);
    }

}
