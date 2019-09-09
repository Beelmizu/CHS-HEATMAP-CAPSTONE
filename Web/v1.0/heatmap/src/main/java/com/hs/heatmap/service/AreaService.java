package com.hs.heatmap.service;

import com.hs.heatmap.model.Area;
import com.hs.heatmap.model.Store;

import java.util.List;

public interface AreaService {

    List<Area> getAllAreas();

    Area getDetailArea(int id);

    List<Area> getActiveAreaByStoreID(int id);

    List<Area> getAreaInStore(int id);

    List<Area> getAreasByFloor(int searchValue, int stoID);

    boolean createNewArea(Area Area);

    boolean updateArea(Area Area);

    boolean inactiveArea(Area Area);

    boolean activeArea(Area Area);

    List<Area> getAllAreaByAccountID(int accountID);


}
