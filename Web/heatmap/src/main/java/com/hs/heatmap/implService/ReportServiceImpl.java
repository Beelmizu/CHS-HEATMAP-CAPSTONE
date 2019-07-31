package com.hs.heatmap.implService;

import com.hs.heatmap.model.Area;
import com.hs.heatmap.model.Camera;
import com.hs.heatmap.model.Report;
import com.hs.heatmap.model.ReportAgeGender;
import com.hs.heatmap.repository.AreaRepository;
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
    private AreaRepository areaRepository;

    @Override
    public List<Report> getAllReport() { return reportRepository.findAll(); }

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
                if (Integer.parseInt(reports.get(i).getTime().split(" ")[0].split("-")[2]) == Integer.parseInt(reports.get(i+1).getTime().split(" ")[0].split("-")[2])){
                        sum += reports.get(i+1).getCount();
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
                        sum = reports.get(i+1).getCount();
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
    public List getReportAreaByMonth(String month, int areaID) {
        List<Camera> cameras = cameraRepository.findActiveCameraByAreaID(areaID);
        List<Report> flag;
        List<List<Report>> result = new ArrayList<>();
        if (cameras != null) {
            for (int i = 0; i < cameras.size(); i++) {
                flag = getReportCameraByMonth(month, cameras.get(i).getId());
                if (flag != null) {
                    result.add((flag));
                }
            }
            if (result.size() == 0 ){
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
        List<List<Report>> reportArea;
        List<Report> flag = new ArrayList<>();
        Report reportDate;
        List<Area> areas = areaRepository.findActiveAreaByStoID(storeID);
        String time, comparedTime;
        int id = 1;
        float sum, count;
        for (int i = 0; i < areas.size(); i++) {
            flag = new ArrayList<>();
            id = 1;
            reportArea = getReportAreaByMonth(month, areas.get(i).getId());
            if (reportArea != null) {
                for (int j = 0; j < reportArea.get(0).size(); j++) {
                    time = reportArea.get(0).get(j).getTime();
                    sum = reportArea.get(0).get(j).getCount();
                    count = 1;
                    for (int k = 1; k < reportArea.size(); k++) {
                        for (int l = 0; l < reportArea.get(k).size(); l++) {
                            comparedTime = reportArea.get(k).get(l).getTime();
                            if (time.equals(comparedTime)) {
                                sum += reportArea.get(k).get(l).getCount();
                                count++;
                            }
                        }
                    }
                    reportDate = setElementForReportStoreByMonth(id, sum, count, areas.get(i).getId(), time);
                    id++;
                    flag.add(reportDate);
                }
                result.add(flag);
            }
        }
        if (result.size() == 0 ){
            return null;
        }
        return result;
    }

    @Override
    public List getReportAgeGenderStoreByMonth(String month, int storeID) {
//        List<List<Report>> result = new ArrayList<>();
//        List<List<Report>> reportArea;
//        List<Report> flag = new ArrayList<>();
//        Report reportDate;
//        List<Area> areas = areaRepository.findActiveAreaByStoID(storeID);
//        String time, comparedTime;
//        int id = 1;
//        float sum, count;
//        for (int i = 0; i < areas.size(); i++) {
//            flag = new ArrayList<>();
//            id = 1;
//            reportArea = getReportAreaByMonth(month, areas.get(i).getId());
//            if (reportArea != null) {
//                for (int j = 0; j < reportArea.get(0).size(); j++) {
//                    time = reportArea.get(0).get(j).getTime();
//                    sum = reportArea.get(0).get(j).getCount();
//                    count = 1;
//                    for (int k = 1; k < reportArea.size(); k++) {
//                        for (int l = 0; l < reportArea.get(k).size(); l++) {
//                            comparedTime = reportArea.get(k).get(l).getTime();
//                            if (time.equals(comparedTime)) {
//                                sum += reportArea.get(k).get(l).getCount();
//                                count++;
//                            }
//                        }
//                    }
//                    reportDate = setElementForReportStoreByMonth(id, sum, count, areas.get(i).getId(), time);
//                    id++;
//                    flag.add(reportDate);
//                }
//                result.add(flag);
//            }
//        }
//        if (result.size() == 0 ){
//            return null;
//        }
        return null;
    }

    @Override
    public List<Report> getReportCameraByTime(String date, int cameraID, String timeFrom, String timeTo) {
        List<Report> reports = reportRepository.getReportByDate(date, cameraID);
        List<Report> result = new ArrayList<>();
        List<Report> flag = new ArrayList<>();

        Report element;
        int start = Integer.parseInt(timeFrom);
        int end = Integer.parseInt(timeTo);
        float sum = 0;
        float count = 0;
        int id = 1;
        String time, min;
        String nextElement;
        if (reports.size() != 0) {
            for (int j = 0; j < reports.size(); j++) {
                time = reports.get(j).getTime().split(" ")[1].split(":")[0];
                if (start <= Integer.parseInt(time) && Integer.parseInt(time) < end) {
                    flag.add(reports.get(j));
                }
            }
            Collections.sort(flag, (o1, o2) -> {
                if (o1.getTime() == null || o2.getTime() == null)
                    return 0;
                return o1.getTime().compareTo(o2.getTime());
            });
            if (flag.size() == 0) {
                return null;
            } else {
                sum += flag.get(0).getCount();
                count++;
                if (end - start > 3) {
                    for (int i = 0; i < flag.size() - 1; i++) {
                        time = flag.get(i).getTime().split(" ")[1].split(":")[0];
                        nextElement = flag.get(i + 1).getTime().split(" ")[1].split(":")[0];
                        if (Integer.parseInt(time) == Integer.parseInt((nextElement))) {
                            sum += flag.get(i + 1).getCount();
                            count++;
                            if (i == flag.size() - 2) {
                                element = setElementForCameraReport(id, sum, count, cameraID, date, time);
                                result.add(element);
                            }
                        } else {
                            element = setElementForCameraReport(id, sum, count, cameraID, date, time);
                            result.add(element);
                            sum = reports.get(i + 1).getCount();
                            count = 1;
                            id++;
                            if (i == flag.size() - 2) {
                                element = setElementForCameraReport(id, sum, count, cameraID, date, nextElement);
                                result.add(element);
                            }
                        }
                    }
                } else {
                    for (int i = 0; i < flag.size() - 1; i++) {
                        time = flag.get(i).getTime().split(" ")[1].split(":")[0];
                        min = String.valueOf(flag.get(i).getTime().split(" ")[1].split(":")[1].charAt(0));
                        nextElement = String.valueOf(flag.get(i + 1).getTime().split(" ")[1].split(":")[1].charAt(0));
                        if (Integer.parseInt(min) == Integer.parseInt((nextElement))) {
                            count++;
                            sum += flag.get(i + 1).getCount();
                            if (i == flag.size() - 2) {
                                element = setElementForCameraReportWithMin(id, sum, count, cameraID, date, time, min);
                                result.add(element);
                            }
                        } else {
                            element = setElementForCameraReportWithMin(id, sum, count, cameraID, date, time, min);
                            result.add(element);
                            sum = reports.get(i + 1).getCount();
                            count = 1;
                            id++;
                            if (i == flag.size() - 2) {
                                element = setElementForCameraReportWithMin(id, sum, count, cameraID, date, time, nextElement);
                                result.add(element);
                            }
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
    public List<List<Report>> getReportAreaByTime(String date, int areaID, String timeFrom, String timeTo) {
        List<Camera> cameras = cameraRepository.getCameraByArea(areaID);
        List<List<Report>> result = new ArrayList<>();
        List<Report> flag;
        if (cameras != null) {
            for (int i = 0; i < cameras.size(); i++) {
                flag = getReportCameraByTime(date, cameras.get(i).getId(), timeFrom, timeTo);
                if (flag != null) {
                    result.add((flag));
                }
            }
            if (result.size() == 0 ){
                return null;
            }
        } else {
            System.out.println("Reports is null");
            return null;
        }
        return result;
    }

    @Override
    public List<List<ReportAgeGender>> getReportAgeGenderAreaByTime(String date, int areaID, String timeFrom, String timeTo) {
//        List<Camera> cameras = cameraRepository.getCameraByArea(areaID);
//        List<List<ReportAgeGender>> result = new ArrayList<>();
//        List<ReportAgeGender> flag;
//        if (cameras != null) {
//            for (int i = 0; i < cameras.size(); i++) {
//                flag = getReportAgeGenderStoreByTime(date, cameras.get(i).getId(), timeFrom, timeTo);
//                if (flag != null) {
//                    result.add((flag));
//                }
//            }
//            if (result.size() == 0 ){
//                return null;
//            }
//        } else {
//            System.out.println("Reports is null");
//            return null;
//        }
        return null;
    }

    @Override
    public List getReportStoreByTime(String date, int storeID, String timeFrom, String timeTo) {
        List<List<Report>> result = new ArrayList<>();
        List<List<Report>> reportArea;
        List<Report> flag;
        Report reportDate;
        int id = 1;
        float sum, count;
        String time, comparedTime;
        List<Area> areas = areaRepository.findActiveAreaByStoID(storeID);
        for (int i = 0; i < areas.size(); i++) {
            flag = new ArrayList<>();
            id = 1;
            reportArea = getReportAreaByTime(date, areas.get(i).getId(), timeFrom, timeTo);
            if (reportArea != null){
                for (int j = 0; j < reportArea.get(0).size(); j++) {
                    time = reportArea.get(0).get(j).getTime();
                    sum = reportArea.get(0).get(j).getCount();
                    count = 1;
                    for (int k = 1; k < reportArea.size(); k++) {
                        for (int l = 0; l < reportArea.get(k).size(); l++) {
                            comparedTime = reportArea.get(k).get(l).getTime();
                            if (time.equals(comparedTime)) {
                                sum += reportArea.get(k).get(l).getCount();
                                count++;
                            }
                        }
                    }
                    reportDate = setElementForReportStore(id, sum, count, areas.get(i).getId(), time);
                    id++;
                    flag.add(reportDate);
                }
                result.add(flag);
            }
        }
        if (result.size() == 0 ){
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
//        List<List<ReportAgeGender>> result = new ArrayList<>();
//        List<List<Report>> reportArea;
//        List<ReportAgeGender> flag;
//        ReportAgeGender reportDate;
//        String[] listGender, listAge;
//        int id = 1;
//        float sum, count;
//        float numFemale = 0, numMale = 0;
//        float a1 = 0, a2 = 0, a3 = 0, a4 = 0, a5 = 0, a6 = 0, a7 = 0, a8 = 0;
//        String time, comparedTime;
//        List<Area> areas = areaRepository.findActiveAreaByStoID(storeID);
//        for (int i = 0; i < areas.size(); i++) {
//            flag = new ArrayList<>();
//            id = 1;
//            reportArea = getReportAreaByTime(selectedDate, areas.get(i).getId(), timeFrom, timeTo);
//            if (reportArea != null){
//                for (int j = 0; j < reportArea.get(0).size(); j++) {
//                    time = reportArea.get(0).get(j).getTime();
//                    sum = reportArea.get(0).get(j).getCount();
//                    count = 1;
//                    for (int k = 1; k < reportArea.size(); k++) {
//                        for (int l = 0; l < reportArea.get(k).size(); l++) {
//                            comparedTime = reportArea.get(k).get(l).getTime();
//                            if (time.equals(comparedTime)) {
//                                sum += reportArea.get(k).get(l).getCount();
//                                count++;
//                            }
//                        }
//                    }
//                    reportDate = setElementForReportAgeGenderStore(id, sum, count, areas.get(i).getId(), time,);
//                    id++;
//                    flag.add(reportDate);
//                }
//                result.add(flag);
//            }
//        }
//        if (result.size() == 0 ){
//            return null;
//        }
//        return result;
        return null;
    }

    public List<ReportAgeGender> getReportAgeGenderByTime(String date, int cameraID, String timeFrom, String timeTo) {
//        List<Report> reports = reportRepository.getReportAgeGenderByDate(date, cameraID);
//        List<ReportAgeGender> result = new ArrayList<>();
//        List<Report> flag = new ArrayList<>();
//        ReportAgeGender element;
//        int start = Integer.parseInt(timeFrom);
//        int end = Integer.parseInt(timeTo);
//        float sum = 0;
//        float count = 0;
//        int id = 1;
//        float numFemale = 0, numMale = 0;
//        float a1 = 0, a2 = 0, a3 = 0, a4 = 0, a5 = 0, a6 = 0, a7 = 0, a8 = 0;
//        String time, min;
//        String nextElement;
//        String[] listGender, listAge;
//        if (reports.size() != 0) {
//            for (int j = 0; j < reports.size(); j++) {
//                time = reports.get(j).getTime().split(" ")[1].split(":")[0];
//                if (start <= Integer.parseInt(time) && Integer.parseInt(time) < end) {
//                    flag.add(reports.get(j));
//                }
//            }
//            Collections.sort(flag, (o1, o2) -> {
//                if (o1.getTime() == null || o2.getTime() == null)
//                    return 0;
//                return o1.getTime().compareTo(o2.getTime());
//            });
//            if (flag.size() == 0) {
//                return null;
//            } else {
//                sum += flag.get(0).getCount();
//                listGender = flag.get(0).getPeople_gender().split(";");
//                listAge = flag.get(0).getPeople_age().split(";");
//                for (int i = 0; i < listGender.length; i++) {
//                    if (listGender[i].equals("Male")){
//                        numMale++;
//                        System.out.println("Male: " + flag.get(0).getTime() + " - " + numMale);
//                    }
//                    if (listGender[i].equals("Female")) {
//                        numFemale++;
//                    }
//                }
//                for (int i = 0; i < listAge.length; i++) {
//                   switch (listAge[i]) {
//                       case "(0-2)": a1++; break;
//                       case "(4-6)": a2++; break;
//                       case "(8-12)": a3++; break;
//                       case "(15-20)": a4++; break;
//                       case "(25-32)": a5++; break;
//                       case "(38-43)": a6++; break;
//                       case "(48-53)": a7++; break;
//                       default: a8++;
//                   }
//                }
//                count++;
//                if (end - start > 3) {
//                    for (int i = 0; i < flag.size() - 1; i++) {
//                        time = flag.get(i).getTime().split(" ")[1].split(":")[0];
//                        nextElement = flag.get(i + 1).getTime().split(" ")[1].split(":")[0];
//                        if (Integer.parseInt(time) == Integer.parseInt((nextElement))) {
//                            sum += flag.get(i + 1).getCount();
//                            listGender = flag.get(i + 1).getPeople_gender().split(";");
//                            listAge = flag.get(i + 1).getPeople_age().split(";");
//                            for (int j = 0; j < listGender.length; j++) {
//                                if (listGender[j].equals("Male")){
//                                    numMale++;
//                                    System.out.println("Male: " + flag.get(i + 1).getTime() + " - " + numMale);
//                                }
//                                if (listGender[j].equals("Female")) {
//                                    numFemale++;
//                                }
//                            }
//                            for (int j = 0; j < listAge.length; j++) {
//                                switch (listAge[j]) {
//                                    case "(0-2)": a1++; break;
//                                    case "(4-6)": a2++; break;
//                                    case "(8-12)": a3++; break;
//                                    case "(15-20)": a4++; break;
//                                    case "(25-32)": a5++; break;
//                                    case "(38-43)": a6++; break;
//                                    case "(48-53)": a7++; break;
//                                    default: a8++;
//                                }
//                            }
//                            count++;
//                            if (i == flag.size() - 2) {
//                                element = setElementForCameraReportAgeGender(id, sum, count, cameraID, date, time,
//                                                                             numMale, numFemale, a1, a2, a3, a4, a5, a6, a7, a8);
//                                result.add(element);
//                            }
//                        } else {
//                            element = setElementForCameraReportAgeGender(id, sum, count, cameraID, date, time,
//                                    numMale, numFemale, a1, a2, a3, a4, a5, a6, a7, a8);
//                            result.add(element);
//                            sum = flag.get(i + 1).getCount() ;
//                            listGender = new String[0];
//                            listAge = new String[0];
//                            listGender = flag.get(i + 1).getPeople_gender().split(";");
//                            listAge = flag.get(i + 1).getPeople_age().split(";");
//                            for (int j = 0; j < listGender.length; j++) {
//                                if (listGender[j].equals("Male")){
//                                    System.out.println("Male: " + flag.get(i + 1).getTime() + " - " + numMale);
//                                    numMale++;
//                                }
//                                if (listGender[j].equals("Female")) {
//                                    numFemale++;
//                                }
//                            }
//                            for (int j = 0; j < listAge.length; j++) {
//                                switch (listAge[j]) {
//                                    case "(0-2)": a1++; break;
//                                    case "(4-6)": a2++; break;
//                                    case "(8-12)": a3++; break;
//                                    case "(15-20)": a4++; break;
//                                    case "(25-32)": a5++; break;
//                                    case "(38-43)": a6++; break;
//                                    case "(48-53)": a7++; break;
//                                    default: a8++;
//                                }
//                            }
//                            count = 1;
//                            id++;
//                            if (i == flag.size() - 2) {
//                                element = setElementForCameraReportAgeGender(id, sum, count, cameraID, date, nextElement,
//                                                                             numMale, numFemale, a1, a2, a3, a4, a5, a6, a7, a8);
//                                result.add(element);
//                            }
//                        }
//                    }
//                } else {
//                    for (int i = 0; i < flag.size() - 1; i++) {
//                        time = flag.get(i).getTime().split(" ")[1].split(":")[0];
//                        min = String.valueOf(flag.get(i).getTime().split(" ")[1].split(":")[1].charAt(0));
//                        nextElement = String.valueOf(flag.get(i + 1).getTime().split(" ")[1].split(":")[1].charAt(0));
//                        if (Integer.parseInt(min) == Integer.parseInt((nextElement))) {
//                            sum += flag.get(i + 1).getCount();
//                            listGender = flag.get(i + 1).getPeople_gender().split(";");
//                            listAge = flag.get(i + 1).getPeople_age().split(";");
//                            for (int j = 0; j < listGender.length; j++) {
//                                if (listGender[j].equals("Male")){
//                                    numMale++;
//                                }
//                                if (listGender[j].equals("Female")) {
//                                    numFemale++;
//                                }
//                            }
//                            for (int j = 0; j < listAge.length; j++) {
//                                switch (listAge[j]) {
//                                    case "(0-2)": a1++; break;
//                                    case "(4-6)": a2++; break;
//                                    case "(8-12)": a3++; break;
//                                    case "(15-20)": a4++; break;
//                                    case "(25-32)": a5++; break;
//                                    case "(38-43)": a6++; break;
//                                    case "(48-53)": a7++; break;
//                                    default: a8++;
//                                }
//                            }
//                            count++;
//                            if (i == flag.size() - 2) {
//                                element = setElementForCameraReportAgeGenderWithMin(id, sum, count, cameraID, date, time, min,
//                                                                                    numMale, numFemale, a1, a2, a3, a4, a5, a6, a7, a8);
//                                result.add(element);
//                            }
//                        } else {
//                            element = setElementForCameraReportAgeGenderWithMin(id, sum, count, cameraID, date, time, min,
//                                                                                numMale, numFemale, a1, a2, a3, a4, a5, a6, a7, a8);
//                            result.add(element);
//                            sum = reports.get(i + 1).getCount();
//                            listGender = new String[0];
//                            listAge = new String[0];
//                            listGender = flag.get(i + 1).getPeople_gender().split(";");
//                            listAge = flag.get(i + 1).getPeople_age().split(";");
//                            for (int j = 0; j < listGender.length; j++) {
//                                if (listGender[j].equals("Male")){
//                                    numMale++;
//                                }
//                                if (listGender[j].equals("Female")) {
//                                    numFemale++;
//                                }
//                            }
//                            for (int j = 0; j < listAge.length; j++) {
//                                switch (listAge[j]) {
//                                    case "(0-2)": a1++; break;
//                                    case "(4-6)": a2++; break;
//                                    case "(8-12)": a3++; break;
//                                    case "(15-20)": a4++; break;
//                                    case "(25-32)": a5++; break;
//                                    case "(38-43)": a6++; break;
//                                    case "(48-53)": a7++; break;
//                                    default: a8++;
//                                }
//                            }
//                            count = 1;
//                            id++;
//                            if (i == flag.size() - 2) {
//                                element = setElementForCameraReportAgeGenderWithMin(id, sum, count, cameraID, date, time, nextElement,
//                                                                                    numMale, numFemale, a1, a2, a3, a4, a5, a6, a7, a8);
//                                result.add(element);
//                            }
//                        }
//                    }
//                }
//            }
//        } else {
//            System.out.println("Reports is null");
//            result = null;
//        }
        return null;
    }

    private Report setElementForReportStore(int id, float sum, float count, int areaID, String time){
        Report element;
        element = new Report();
        element.setId(id);
        element.setCount(Math.round(sum / count));
        element.setCameraID(areaID);
        element.setTime(time.split(" ")[1]);
        return element;
    }

//    private ReportAgeGender setElementForReportAgeGenderStore(int id, float sum, float count, int areaID, String time,
//                                                     float numMale, float numFemale,
//                                                     float a1, float a2, float a3, float a4, float a5, float a6, float a7, float a8){
//        ReportAgeGender element;
//        element = new ReportAgeGender();
//        element.setId(id);
//        element.setCount(Math.round(sum / count));
//        element.setCameraID(areaID);
//        element.setGender_male(Math.round(numMale / count));
//        element.setGender_female(Math.round(numFemale / count));
//        element.setAge_0_2(Math.round(a1 / count));
//        element.setAge_4_6(Math.round(a2 / count));
//        element.setAge_8_12(Math.round(a3 / count));
//        element.setAge_15_20(Math.round(a4 / count));
//        element.setAge_25_32(Math.round(a5 / count));
//        element.setAge_38_43(Math.round(a6 / count));
//        element.setAge_48_53(Math.round(a7 / count));
//        element.setAge_60_100(Math.round(a8 / count));
//        element.setTime(time.split(" ")[1]);
//        return element;
//    }

    private Report setElementForCameraReport(int id, float sum, float count, int cameraID, String date, String time){
        Report element;
        element = new Report();
        element.setId(id);
        element.setCount(Math.round(sum / count));
        element.setCameraID(cameraID);
        element.setTime(date + " " + time + ":00");
        return element;
    }

//    private ReportAgeGender setElementForCameraReportAgeGender(int id, float sum, float count, int cameraID,
//                                                      String date, String time, float numMale, float numFemale,
//                                                      float a1, float a2, float a3, float a4, float a5, float a6, float a7, float a8){
//        ReportAgeGender element;
//        element = new ReportAgeGender();
//        element.setId(id);
//        element.setCount(Math.round(sum / count));
//        element.setGender_male(Math.round(numMale / count));
//        element.setGender_female(Math.round(numFemale / count));
//        element.setAge_0_2(Math.round(a1 / count));
//        element.setAge_4_6(Math.round(a2 / count));
//        element.setAge_8_12(Math.round(a3 / count));
//        element.setAge_15_20(Math.round(a4 / count));
//        element.setAge_25_32(Math.round(a5 / count));
//        element.setAge_38_43(Math.round(a6 / count));
//        element.setAge_48_53(Math.round(a7 / count));
//        element.setAge_60_100(Math.round(a8 / count));
//        element.setCameraID(cameraID);
//        element.setTime(date + " " + time + ":00");
//        return element;
//    }

    private Report setElementForCameraReportWithMin(int id, float sum, float count, int cameraID, String date, String time,String min){
        Report element;
        element = new Report();
        element.setId(id);
        element.setCount(Math.round(sum / count));
        element.setCameraID(cameraID);
        element.setTime(date + " " + time + ":" + min + "0");
        return element;
    }

//    private ReportAgeGender setElementForCameraReportAgeGenderWithMin(int id, float sum, float count, int cameraID, String date, String time,String min,
//                                                             float numMale, float numFemale, float a1, float a2, float a3, float a4, float a5, float a6, float a7, float a8){
//        ReportAgeGender element;
//        element = new ReportAgeGender();
//        element.setId(id);
//        element.setCount(Math.round(sum / count));
//        element.setGender_male(Math.round(numMale / count));
//        element.setGender_female(Math.round(numFemale / count));
//        element.setAge_0_2(Math.round(a1 / count));
//        element.setAge_4_6(Math.round(a2 / count));
//        element.setAge_8_12(Math.round(a3 / count));
//        element.setAge_15_20(Math.round(a4 / count));
//        element.setAge_25_32(Math.round(a5 / count));
//        element.setAge_38_43(Math.round(a6 / count));
//        element.setAge_48_53(Math.round(a7 / count));
//        element.setAge_60_100(Math.round(a8 / count));
//        element.setCameraID(cameraID);
//        element.setTime(date + " " + time + ":" + min + "0");
//        return element;
//    }

    private Report setElementForReportByMonth(int id, float sum, float count, int cameraID, String month, String day){
        Report element;
        element = new Report();
        element.setId(id);
        element.setCount(Math.round(sum / count));
        element.setTime(month + "-" + day);
        element.setCameraID(cameraID);
        return element;
    }

    private Report setElementForReportStoreByMonth(int id, float sum, float count, int areaID, String date){
        Report element;
        element = new Report();
        element.setId(id);
        element.setCount(Math.round(sum / count));
        element.setTime(date);
        element.setCameraID(areaID);
        return element;
    }
}
