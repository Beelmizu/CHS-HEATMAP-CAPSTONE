package com.hs.heatmap.service;

import com.hs.heatmap.model.Area;
import com.hs.heatmap.model.Store;

import java.util.List;

public interface AreaService {

    List<Area> getAllAreas();

    Area getDetailArea(int id);

    List<Area> getActiveAreaByStoreID(int id);

    List<Area> getAreaInStore(int id);

    List<Area> getAreasByFloor(int searchValue);

    Area createNewArea(Area Area);

    Area updateArea(Area Area);

    Area inactiveArea(Area Area);

    Area activeArea(Area Area);

}
