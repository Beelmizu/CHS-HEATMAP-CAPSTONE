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

    @GetMapping("/areas/getAll")
    public List<Area> getAllAreas() {return areaService.getAllAreas(); }

    @GetMapping("/areas/getDetail/{id}")
    public Area getDetailArea(@PathVariable(value = "id") int id){return areaService.getDetailArea(id); }

    @GetMapping("/areas/getAreaInStore/{id}")
    public List<Area> getAreaInStore(@PathVariable(value = "id") int id){ return areaService.getAreaInStore(id); }

    @GetMapping("/areas/search/{searchValue}")
    public List<Area> searchArea(@PathVariable(value="searchValue") int searchValue){return areaService.getAreasByFloor(searchValue); }

    @PostMapping("/areas/inactive")
    public Area inactiveArea(@RequestBody Area area) { return areaService.inactiveArea(area); }

    @PostMapping("/areas/active")
    public Area activeArea(@RequestBody Area area) { return areaService.activeArea(area); }

    @PostMapping("/areas/update")
    public Area updateArea(@RequestBody Area area) { return areaService.updateArea(area); }

    @PostMapping("/areas/create")
    public Area createArea(@RequestBody Area area) { return areaService.createNewArea(area); }

    @GetMapping("/areas/getActiveAreaByStoID/{id}")
    public List<Area> getActiveAreaByStoID(@PathVariable(value = "id") int id){ return areaService.getActiveAreaByStoreID(id); }

}
