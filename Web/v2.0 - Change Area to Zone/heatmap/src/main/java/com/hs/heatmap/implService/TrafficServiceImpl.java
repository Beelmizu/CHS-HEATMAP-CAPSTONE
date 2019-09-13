package com.hs.heatmap.implService;

import com.hs.heatmap.model.Traffic;
import com.hs.heatmap.model.Store;
import com.hs.heatmap.repository.TrafficRepository;
import com.hs.heatmap.repository.StoreRepository;
import com.hs.heatmap.service.TrafficService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class TrafficServiceImpl implements TrafficService {

    @Autowired
    private TrafficRepository trafficRepository;


    @Override
    public List<Traffic> getTrafficByZone(int id) {
        return trafficRepository.findTrafficByZoneId(id);
        // rồi đó m check thử xem
    }

}
