package com.hs.heatmap.controller;

import com.hs.heatmap.model.Traffic;
import com.hs.heatmap.service.TrafficService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class TrafficController {

    @Autowired
    TrafficService trafficService;

    @GetMapping("/traffic/getTrafficInZone/{id}")
    public List<Traffic> getTrafficInZone(@PathVariable(value = "id") int id) {
        return trafficService.getTrafficByZone(id);
    }

    @GetMapping("/traffic/getReportTrafficByTime/{selectedDate}/{storeID}")
    public List getReportTrafficByTime(@PathVariable(value = "selectedDate") String selectedDate,
                                    @PathVariable(value = "storeID") int storeID) {
        return trafficService.getReportTrafficByTime(selectedDate, storeID);
    }

    @GetMapping("/traffic/getReportTrafficByMonth/{selectedMonth}/{storeID}")
    public List getReportTrafficByMonth(@PathVariable(value = "selectedMonth") String selectedMonth,
                                       @PathVariable(value = "storeID") int storeID) {
        return trafficService.getReportTrafficByMonth(selectedMonth, storeID);
    }

    @GetMapping("/traffic/getAverageShoppingTimeTrafficByTime/{selectedDate}/{storeID}")
    public List getAverageShoppingTimeTrafficByTime(@PathVariable(value = "selectedDate") String selectedDate,
                                       @PathVariable(value = "storeID") int storeID) {
        return trafficService.getAverageShoppingTimeTrafficByTime(selectedDate, storeID);
    }
}
