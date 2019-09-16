package com.hs.heatmap.implService;

import com.hs.heatmap.model.Traffic;
import com.hs.heatmap.model.Store;
import com.hs.heatmap.model.Zone;
import com.hs.heatmap.repository.TrafficRepository;
import com.hs.heatmap.repository.StoreRepository;
import com.hs.heatmap.repository.ZoneRepository;
import com.hs.heatmap.service.TrafficService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
public class TrafficServiceImpl implements TrafficService {

    @Autowired
    private TrafficRepository trafficRepository;
    @Autowired
    private ZoneRepository zoneRepository;


    @Override
    public List<Traffic> getTrafficByZone(int id) {
        return trafficRepository.findTrafficByZoneId(id);
        
    }

    @Override
    public List getReportTrafficByTime(String date, int storeID) {
        List<Zone> listZoneInStore = zoneRepository.findActiveZoneByStoID(storeID);
        List<Integer> listTrafficInZone = new ArrayList<>();
        List result =  new ArrayList<>();
        String hour = null;
        for (int j = 0; j < listZoneInStore.size(); j++) {
            for (int i = 0; i < 24; i++) {
                if (i < 10) {
                    hour = "0" + i;
                }else{
                    hour = "" + i;
                }
                listTrafficInZone.add(trafficRepository.countTrafficByZoneIdInTime(listZoneInStore.get(j).getId(), date + " " + hour));
            }
            result.add(listTrafficInZone);
            listTrafficInZone = new ArrayList<>();
        }

        return result;
    }

    @Override
    public List<String> getAverageShoppingTimeTrafficByTime(String date, int storeID) {
        List<Zone> listZoneInStore = zoneRepository.findActiveZoneByStoID(storeID);
        List<Traffic> listTrafficInZone = new ArrayList<>();
        List<String> result =  new ArrayList<>();
        SimpleDateFormat format = new SimpleDateFormat("HH:mm:ss");
        Date timeIn = null;
        Date timeOut = null;
        for (int j = 0; j < listZoneInStore.size(); j++) {
            listTrafficInZone = trafficRepository.getTrafficByZoneIdInTime(listZoneInStore.get(j).getId(), date);
            long seconds = 0;
            long minus = 0;
            long hour = 0;
            for (int i = 0; i < listTrafficInZone.size(); i++) {
                try {
                    timeIn = format.parse(listTrafficInZone.get(i).getGetIn().split(" ")[1]);
                    timeOut = format.parse(listTrafficInZone.get(i).getGetOut().split(" ")[1]);
                    Long time = timeOut.getTime() - timeIn.getTime();
                    seconds += TimeUnit.MILLISECONDS.toSeconds(time);
                } catch (ParseException e) {
                    e.printStackTrace();
                }
            }
            seconds = seconds / (listTrafficInZone.size() + 1);
            if (seconds >= 60){
                minus = seconds / 60;
                seconds = seconds % 60;
                if (minus >= 60){
                    hour = minus / 60;
                    minus = minus % 60;
                }
            }
            String report = "";
            if (seconds > 0){
                report = " "+ seconds + "s";
            }
            if (minus > 0){
                report = " "+ minus + "m" + report;
            }
            if (hour > 0){
                report = hour + "h" + report;
            }
            System.out.println(report.trim() + "");
            result.add(report.trim());
//            listTrafficInZone = new ArrayList<>();
        }

        return result;
    }

    @Override
    public List getReportTrafficByMonth(String month, int storeID) {
        List<Zone> listZoneInStore = zoneRepository.findActiveZoneByStoID(storeID);
        List<Integer> listTrafficInZone = new ArrayList<>();
        List result =  new ArrayList<>();
//        Calendar calendar = Calendar.getInstance();
        int year = Integer.parseInt(month.split("-")[0]);
        int mon = Integer.parseInt(month.split("-")[1]);
//        int date = 1;
        String day = null;
//        System.out.println(year);
//        System.out.println(mon);
        YearMonth yearMonthObject = YearMonth.of(year, mon);
        int daysInMonth = yearMonthObject.lengthOfMonth();
        System.out.println("" + daysInMonth);
        for (int j = 0; j < listZoneInStore.size(); j++) {
            for (int i = 1; i <= daysInMonth; i++) {
                if (i < 10) {
                    day = "0" + i;
                }else{
                    day = "" + i;
                }
//                System.out.println(month + day);
                listTrafficInZone.add(trafficRepository.countTrafficByZoneIdInTime(listZoneInStore.get(j).getId(), month + "-" + day));
            }

            result.add(listTrafficInZone);
            listTrafficInZone = new ArrayList<>();
        }

        return result;
    }


}
