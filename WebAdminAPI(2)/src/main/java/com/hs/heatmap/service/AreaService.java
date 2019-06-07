package com.hs.heatmap.service;

import com.hs.heatmap.model.Area;

import java.util.List;

public interface AreaService {

    List<Area> getAllAreas();

    Area getDetailArea(int id);

    List<Area> getAreasByFloor(String searchValue);

    List<Area> getAreasByName(String searchValue);

    Area createNewArea(Area Area);

    Area updateArea(Area Area);

    Area deleteArea(Area Area);

}
