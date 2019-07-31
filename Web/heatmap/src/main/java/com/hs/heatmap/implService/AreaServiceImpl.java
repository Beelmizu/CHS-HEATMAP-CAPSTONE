package com.hs.heatmap.implService;

import com.hs.heatmap.model.Area;
import com.hs.heatmap.model.Camera;
import com.hs.heatmap.model.Store;
import com.hs.heatmap.repository.AreaRepository;
import com.hs.heatmap.repository.StoreRepository;
import com.hs.heatmap.service.AreaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class AreaServiceImpl implements AreaService {

    @Autowired
    private AreaRepository areaRepository;

    @Autowired
    private StoreRepository storeRepository;

    @Override
    public List<Area> getAllAreas() {
        return areaRepository.findAll();
    }

    @Override
    public Area getDetailArea(int id) {
        return areaRepository.findAreaById(id);
    }

    @Override
    public List<Area> getActiveAreaByStoreID(int id) { return areaRepository.findActiveAreaByStoID(id); }

    @Override
    public List<Area> getAreaInStore(int id) { return areaRepository.getAreaInStore(id); }


    @Override
    public List<Area> getAreasByFloor(int searchValue) { return areaRepository.searchAreasByFloor(searchValue); }


    @Override
    public Area createNewArea(Area area) {
        if(areaRepository.findAreasByName(area.getName()) != null){
            return null;
        } else {
            area.setCreateDate(LocalDateTime.now().toString());
            area.setStatus("active");
            return areaRepository.save(area);
        }
    }

    @Override
    public Area updateArea(Area area) {
        area.setUpdateDate(LocalDateTime.now().toString());
        area.setUpdatedBy("cuongdq");
        return areaRepository.save(area);
    }

    @Override
    public Area inactiveArea(Area area) {
        area.setUpdateDate(LocalDateTime.now().toString());
        area.setUpdatedBy("cuongdq");
        area.setStatus("inactive");
        return areaRepository.save(area);
    }

    @Override
    public Area activeArea(Area area) {
        area.setUpdateDate(LocalDateTime.now().toString());
        area.setUpdatedBy("cuongdq");
        area.setStatus("active");
        return areaRepository.save(area);
    }

    @Override
    public List<Area> getAllAreaByAccountID(int accountID) {
        List<Store> stores = storeRepository.findStoreByAccountID(accountID);
        List<Area> areas = areaRepository.findAll();
        List<Area> results = new ArrayList<>();
        for (int i = 0; i < stores.size(); i++) {
            System.out.println(stores.get(i).getId());
            for (int j = 0; j < areas.size(); j++) {
                if (stores.get(i).getId() == areas.get(j).getStoID()){
                    results.add(areas.get(j));
                }
            }
        }
        return results;
    }
}