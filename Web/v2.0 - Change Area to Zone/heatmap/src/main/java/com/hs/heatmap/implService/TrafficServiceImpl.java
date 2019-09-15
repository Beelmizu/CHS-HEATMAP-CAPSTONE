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

import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

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
    public List getReportTrafficByMonth(String month, int storeID) {
        List<Zone> listZoneInStore = zoneRepository.findActiveZoneByStoID(storeID);
        List<Integer> listTrafficInZone = new ArrayList<>();
        List result =  new ArrayList<>();
        Calendar calendar = Calendar.getInstance();
        int year = Integer.parseInt(month.split("-")[0]);
        int mon = Integer.parseInt(month.split("-")[1]);
        int date = 1;
        String day = null;
        System.out.println(year);
        System.out.println(mon);
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
                System.out.println(month + day);
                listTrafficInZone.add(trafficRepository.countTrafficByZoneIdInTime(listZoneInStore.get(j).getId(), month + "-" + day));
            }

            result.add(listTrafficInZone);
            listTrafficInZone = new ArrayList<>();
        }

        return result;
    }


}
