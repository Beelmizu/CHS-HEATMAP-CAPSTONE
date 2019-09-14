package com.hs.heatmap.service;

import com.hs.heatmap.model.Traffic;
import org.springframework.data.domain.Page;

import java.util.List;

public interface TrafficService {

    List<Traffic> getTrafficByZone(int id);
}