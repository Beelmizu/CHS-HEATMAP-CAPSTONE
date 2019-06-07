package com.hs.heatmap.controller;

import com.hs.heatmap.model.Area;
import com.hs.heatmap.service.AreaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.awt.geom.Area;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins="http://localhost:4200")
public class AreaController {

    @Autowired
    AreaService areaService;

    @GetMapping("/areas/getAll")
    public List<Area> getAllAreas() {return areaService.getAllAreas(); }

    @GetMapping("/areas/getDetail/{id}")
    public Area getDetailArea(@PathVariable(value = "id") int id){return areaService.getDetailArea(id); }

    @GetMapping("/areas/search/{searchValue}")
    public List<Area> searchArea(@PathVariable(value="searchValue") String searchValue){return areaService.getAreasByFloor(searchValue); }

    @DeleteMapping("/areas/delete")
    public Area deleteAreaByID(@RequestBody Area area) { return areaService.deleteArea(area); }

    @PostMapping("/areas/update")
    public Area updateArea(@RequestBody Area area) { return areaService.updateArea(area); }

    @PostMapping("/areas/create")
    public Area createArea(@RequestBody Area area) { return areaService.createNewArea(area); }

}
