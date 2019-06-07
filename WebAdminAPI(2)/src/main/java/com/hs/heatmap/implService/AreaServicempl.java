package com.hs.heatmap.implService;

import com.hs.heatmap.model.Account;
import com.hs.heatmap.model.Area;
import com.hs.heatmap.repository.AreaRepository;
import com.hs.heatmap.service.AreaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class AreaServiceImpl implements AreaService {

    @Autowired
    private AreaRepository areaRepository;

    @Override
    public List<Area> getAllAreas() {
        return AreaRepository.findAll();
    }

    @Override
    public Area getDetailArea(int id) {
        return AreaRepository.findAreaById(id);
    }

    @Override
    public List<Area> getAreasByName(String searchValue) { return areaRepository.findAreasByName(searchValue); }

    @Override
    public List<Area> getAreasByFloor(String searchValue) { return areaRepository.findAreasByFloor(searchValue); }


    @Override
    public Area createNewArea(Area area) {
        area.setCreateDate(LocalDate.now().toString());
        return areaRepository.save(area);
    }

    @Override
    public Area updateArea(Area area) {
        area.setUpdateDate(LocalDate.now().toString());
        area.setUpdatedBy("cuongdq");
        return areaRepository.save(area);
    }

    @Override
    public Area deleteArea(Area area) {
        area.setDeletedDate(LocalDate.now().toString());
        return areaRepository.save(area);
    }
}
