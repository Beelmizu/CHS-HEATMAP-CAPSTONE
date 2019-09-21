package com.hs.heatmap.implService;

import com.hs.heatmap.model.Zone;
import com.hs.heatmap.model.Camera;
import com.hs.heatmap.model.Report;
import com.hs.heatmap.model.ReportAgeGender;
import com.hs.heatmap.repository.ZoneRepository;
import com.hs.heatmap.repository.CameraRepository;
import com.hs.heatmap.repository.ReportRepository;
import com.hs.heatmap.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class ReportServiceImpl implements ReportService {

    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private CameraRepository cameraRepository;

    @Autowired
    private ZoneRepository zoneRepository;

    @Override
    public List<Report> getAllReport() {
        return reportRepository.findAll();
    }

    @Override
    public List<Report> getReportByDate(String date, int cameraID) {
        return reportRepository.getReportByDate(date, cameraID);
    }

    @Override
    public List<Report> getReportCameraByMonth(String month, int cameraID) {
        List<Report> reports = reportRepository.getReportByDate(month, cameraID);
        List<Report> result = new ArrayList<>();
        Report element;
        float sum = 0;
        float count = 0;
        int id = 1, male = 0, female = 0;
        String day;
        String gender;
        if (reports.size() != 0) {
            Collections.sort(reports, (o1, o2) -> {
                if (o1.getTime() == null || o2.getTime() == null)
                    return 0;
                return o1.getTime().compareTo(o2.getTime());
            });
            sum += reports.get(0).getCount();
            count++;
            for (int i = 0; i < reports.size() - 1; i++) {
                if (Integer.parseInt(reports.get(i).getTime().split(" ")[0].split("-")[2]) == Integer.parseInt(reports.get(i + 1).getTime().split(" ")[0].split("-")[2])) {
                    sum += reports.get(i + 1).getCount();
                    count++;
                    if (i == reports.size() - 2) {
                        day = reports.get(i).getTime().split(" ")[0].split("-")[2];
                        element = setElementForReportByMonth(id, sum, count, cameraID, month, day);
                        result.add(element);
                    }
                } else {
                    day = reports.get(i).getTime().split(" ")[0].split("-")[2];
                    element = setElementForReportByMonth(id, sum, count, cameraID, month, day);
                    result.add(element);
                    sum = reports.get(i + 1).getCount();
                    count = 1;
                    id++;
                    if (i == reports.size() - 2) {
                        day = reports.get(i + 1).getTime().split(" ")[0].split("-")[2];
                        element = setElementForReportByMonth(id, sum, count, cameraID, month, day);
                        result.add(element);
                    }
                }
            }
        } else {
            System.out.println("Reports is null");
            result = null;
        }
        return result;
    }

    @Override
    public List getReportZoneByMonth(String month, int zoneID) {
        List<Camera> cameras = cameraRepository.findActiveCameraByZoneID(zoneID);
        List<Report> flag;
        List<List<Report>> result = new ArrayList<>();
        if (cameras != null) {
            for (int i = 0; i < cameras.size(); i++) {
                flag = getReportCameraByMonth(month, cameras.get(i).getId());
                if (flag != null) {
                    result.add((flag));
                }
            }
            if (result.size() == 0) {
                return null;
            }
        } else {
            System.out.println("Report is null");
            return null;
        }
        return result;
    }

    @Override
    public List getReportStoreByMonth(String month, int storeID) {
        List<List<Report>> result = new ArrayList<>();
        List<List<Report>> reportZone;
        List<Report> flag = new ArrayList<>();
        Report reportDate;
        List<Zone> zones = zoneRepository.findActiveZoneByStoID(storeID);
        String time, comparedTime;
        int id = 1;
        float sum, count;
        if (zones != null) {
            for (int i = 0; i < zones.size(); i++) {
                flag = new ArrayList<>();
                id = 1;
                reportZone = getReportZoneByMonth(month, zones.get(i).getId());
                if (reportZone != null) {
                    for (int j = 0; j < reportZone.get(0).size(); j++) {
                        time = reportZone.get(0).get(j).getTime();
                        sum = reportZone.get(0).get(j).getCount();
                        count = 1;
                        for (int k = 1; k < reportZone.size(); k++) {
                            for (int l = 0; l < reportZone.get(k).size(); l++) {
                                comparedTime = reportZone.get(k).get(l).getTime();
                                if (time.equals(comparedTime)) {
                                    sum += reportZone.get(k).get(l).getCount();
                                    count++;
                                }
                            }
                        }
                        reportDate = setElementForReportStoreByMonth(id, sum, count, zones.get(i).getId(), time);
                        id++;
                        flag.add(reportDate);
                    }
                    result.add(flag);
                }
            }
            if (result.size() == 0) {
                return null;
            }
        } else {
            System.out.println("Reports is null");
            return null;
        }
        return result;
    }

    @Override
    public List getReportAgeGenderStoreByMonth(String month, int storeID) {
        return null;
    }

    @Override
    public List<Report> getReportCameraByTime(String date, int cameraID, String timeFrom, String timeTo) {
        List<Report> reports = reportRepository.getReportByDateInTime(cameraID, date + " " + timeFrom, date + " " + timeTo);
        List<Report> result = new ArrayList<>();
        Report element;
        int start = Integer.parseInt(timeFrom);
        int end = Integer.parseInt(timeTo);
        float sum = 0;
        float count = 0;
        int id = 1;
        String time, min;
        String nextElement, timeNext;
        if (reports.size() != 0) {
            Collections.sort(reports, (o1, o2) -> {
                if (o1.getTime() == null || o2.getTime() == null)
                    return 0;
                return o1.getTime().compareTo(o2.getTime());
            });
            sum += reports.get(0).getCount();
            count++;
            if (end - start > 3) {
                for (int i = 0; i < reports.size() - 1; i++) {
                    time = reports.get(i).getTime().split(" ")[1].split(":")[0];
                    nextElement = reports.get(i + 1).getTime().split(" ")[1].split(":")[0];
                    if (Integer.parseInt(time) == Integer.parseInt((nextElement))) {
                        sum += reports.get(i + 1).getCount();
                        count++;
                        if (i == reports.size() - 2) {
                            element = setElementForCameraReport(id, sum, count, cameraID, date, time);
                            result.add(element);
                        }
                    } else {
                        element = setElementForCameraReport(id, sum, count, cameraID, date, time);
                        result.add(element);
                        sum = reports.get(i + 1).getCount();
                        count = 1;
                        id++;
                        if (i == reports.size() - 2) {
                            element = setElementForCameraReport(id, sum, count, cameraID, date, nextElement);
                            result.add(element);
                        }
                    }
                }
            } else {
                for (int i = 0; i < reports.size() - 1; i++) {
                    time = reports.get(i).getTime().split(" ")[1].split(":")[0];
                    timeNext = reports.get(i + 1).getTime().split(" ")[1].split(":")[0];
                    min = String.valueOf(reports.get(i).getTime().split(" ")[1].split(":")[1].charAt(0));
                    nextElement = String.valueOf(reports.get(i + 1).getTime().split(" ")[1].split(":")[1].charAt(0));
                    if (Integer.parseInt(time) == Integer.parseInt(timeNext)) {
                        if (Integer.parseInt(min) == Integer.parseInt((nextElement))) {
                            count++;
                            sum += reports.get(i + 1).getCount();
                            if (i == reports.size() - 2) {
                                element = setElementForCameraReportWithMin(id, sum, count, cameraID, date, time, min);
                                result.add(element);
                            }
                        } else {
                            element = setElementForCameraReportWithMin(id, sum, count, cameraID, date, time, min);
                            result.add(element);
                            sum = reports.get(i + 1).getCount();
                            count = 1;
                            id++;
                            if (i == reports.size() - 2) {
                                element = setElementForCameraReportWithMin(id, sum, count, cameraID, date, time, nextElement);
                                result.add(element);
                            }
                        }
                    } else {
                        System.out.println(time + " --- " + timeNext);
                        element = setElementForCameraReportWithMin(id, sum, count, cameraID, date, time, min);
                        result.add(element);
                        sum = reports.get(i + 1).getCount();
                        count = 1;
                        id++;
                        if (i == reports.size() - 2) {
                            element = setElementForCameraReportWithMin(id, sum, count, cameraID, date, timeNext, nextElement);
                            result.add(element);
                        }
                    }

                }
            }
        } else {
            System.out.println("Reports is null");
            result = null;
        }
        return result;
    }


    @Override
    public List<List<Report>> getReportZoneByTime(String date, int zoneID, String timeFrom, String timeTo) {
        List<Camera> cameras = cameraRepository.findActiveCameraByZoneID(zoneID);
        List<List<Report>> result = new ArrayList<>();
        List<Report> flag;
        if (cameras != null) {
            for (int i = 0; i < cameras.size(); i++) {
                flag = getReportCameraByTime(date, cameras.get(i).getId(), timeFrom, timeTo);
                if (flag != null) {
                    result.add((flag));
                }
            }
            if (result.size() == 0) {
                return null;
            }
        } else {
            System.out.println("Reports is null");
            return null;
        }
        return result;
    }

    @Override
    public List<List<ReportAgeGender>> getReportAgeGenderZoneByTime(String date, int zoneID, String timeFrom, String timeTo) {
        return null;
    }

    @Override
    public List getReportStoreByTime(String date, int storeID, String timeFrom, String timeTo) {
        List<List<Report>> result = new ArrayList<>();
        List<List<Report>> reportZone;
        List<Report> flag;
        Report reportDate;
        int id = 1;
        float sum, count;
        String time, comparedTime;
        List<Zone> zones = zoneRepository.findActiveZoneByStoID(storeID);
        if (zones != null) {
            for (int i = 0; i < zones.size(); i++) {
                flag = new ArrayList<>();
                id = 1;
                reportZone = getReportZoneByTime(date, zones.get(i).getId(), timeFrom, timeTo);
                if (reportZone != null) {
                    for (int j = 0; j < reportZone.get(0).size(); j++) {
                        time = reportZone.get(0).get(j).getTime();
                        sum = reportZone.get(0).get(j).getCount();
                        count = 1;
                        for (int k = 1; k < reportZone.size(); k++) {
                            for (int l = 0; l < reportZone.get(k).size(); l++) {
                                comparedTime = reportZone.get(k).get(l).getTime();
                                if (time.equals(comparedTime)) {
                                    sum += reportZone.get(k).get(l).getCount();
                                    count++;
                                }
                            }
                        }
                        reportDate = setElementForReportStore(id, sum, count, zones.get(i).getId(), time);
                        id++;
                        flag.add(reportDate);
                    }
                    result.add(flag);
                }
            }
            if (result.size() == 0) {
                return null;
            }
        } else {
            System.out.println("Reports is null");
            return null;
        }
        return result;
    }

    @Override
    public List<Report> getHeatmapByDate(String date, int cameraID) {
        return reportRepository.getHeatmapByDate(date, cameraID);
    }

    @Override
    public Report createReport(Report report) {
        return reportRepository.save(report);
    }

    @Override
    public List getReportAgeGenderStoreByTime(String selectedDate, int storeID, String timeFrom, String timeTo) {
        return null;
    }

    public List<ReportAgeGender> getReportAgeGenderByTime(String date, int cameraID, String timeFrom, String timeTo) {
        return null;
    }

    private Report setElementForReportStore(int id, float sum, float count, int zoneID, String time) {
        Report element;
        element = new Report();
        element.setId(id);
        element.setCount(Math.round(sum / count));
        element.setCameraID(zoneID);
        element.setTime(time.split(" ")[1]);
        return element;
    }


    private Report setElementForCameraReport(int id, float sum, float count, int cameraID, String date, String time) {
        Report element;
        element = new Report();
        element.setId(id);
        element.setCount(Math.round(sum / count));
        element.setCameraID(cameraID);
        element.setTime(date + " " + time + ":00");
        return element;
    }


    private Report setElementForCameraReportWithMin(int id, float sum, float count, int cameraID, String date, String time, String min) {
        Report element;
        element = new Report();
        element.setId(id);
        element.setCount(Math.round(sum / count));
        element.setCameraID(cameraID);
        element.setTime(date + " " + time + ":" + min + "0");
        return element;
    }

    private Report setElementForReportByMonth(int id, float sum, float count, int cameraID, String month, String day) {
        Report element;
        element = new Report();
        element.setId(id);
        element.setCount(Math.round(sum / count));
        element.setTime(month + "-" + day);
        element.setCameraID(cameraID);
        return element;
    }

    private Report setElementForReportStoreByMonth(int id, float sum, float count, int zoneID, String date) {
        Report element;
        element = new Report();
        element.setId(id);
        element.setCount(Math.round(sum / count));
        element.setTime(date);
        element.setCameraID(zoneID);
        return element;
    }
}
