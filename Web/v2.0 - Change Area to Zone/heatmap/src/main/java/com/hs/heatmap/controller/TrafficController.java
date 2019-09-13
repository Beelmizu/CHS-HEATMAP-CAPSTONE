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

}
