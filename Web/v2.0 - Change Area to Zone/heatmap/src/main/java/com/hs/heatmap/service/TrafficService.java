package com.hs.heatmap.service;

import com.hs.heatmap.model.Traffic;
import org.springframework.data.domain.Page;

import java.util.List;

public interface TrafficService {

    List<Traffic> getTrafficByZone(int id);

    List getReportTrafficByTime(String date, int storeID);

    List getReportTrafficByMonth(String month, int storeID);

    List<String> getAverageShoppingTimeTrafficByTime(String date, int storeID);

}
