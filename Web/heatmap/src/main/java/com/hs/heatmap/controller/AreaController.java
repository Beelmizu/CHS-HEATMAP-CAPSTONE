package com.hs.heatmap.controller;

import com.hs.heatmap.model.Area;
import com.hs.heatmap.service.AreaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins="*")
public class AreaController {

    @Autowired
    AreaService areaService;

    @GetMapping("/area/getAll")
    public List<Area> getAllAreas() {
        return areaService.getAllAreas();
    }

    @GetMapping("/area/getDetail/{id}")
    public Area getDetailArea(@PathVariable(value = "id") int id) {
        return areaService.getDetailArea(id);
    }

    @GetMapping("/area/getAreaInStore/{id}")
    public List<Area> getAreaInStore(@PathVariable(value = "id") int id) {
        return areaService.getAreaInStore(id);
    }

    @GetMapping("/area/search/{searchValue}")
    public List<Area> searchArea(@PathVariable(value = "searchValue") int searchValue) {
        return areaService.getAreasByFloor(searchValue);
    }

    @PostMapping("/area/inactive")
    public boolean inactiveArea(@RequestBody Area area) {
        return areaService.inactiveArea(area);
    }

    @PostMapping("/area/active")
    public boolean activeArea(@RequestBody Area area) {
        return areaService.activeArea(area);
    }

    @PostMapping("/area/update")
    public boolean updateArea(@RequestBody Area area) {
        return areaService.updateArea(area);
    }

    @PostMapping("/area/create")
    public boolean createArea(@RequestBody Area area) {
        return areaService.createNewArea(area);
    }

    @GetMapping("/area/getActiveAreaByStoID/{id}")
    public List<Area> getActiveAreaByStoID(@PathVariable(value = "id") int id) {
        return areaService.getActiveAreaByStoreID(id);
    }

    @GetMapping("/area/getAllAreaOfAccount/{accountID}")
    public List<Area> getAllAreaOfAccount(@PathVariable(value = "accountID") int id) {
        return areaService.getAllAreaByAccountID(id);
    }
}
