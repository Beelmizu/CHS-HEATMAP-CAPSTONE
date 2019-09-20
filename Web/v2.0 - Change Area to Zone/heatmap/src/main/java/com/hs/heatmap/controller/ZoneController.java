package com.hs.heatmap.controller;

import com.hs.heatmap.model.Zone;
import com.hs.heatmap.service.ZoneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ZoneController {

    @Autowired
    ZoneService zoneService;

    @GetMapping("/zone/getAll")
    public List<Zone> getAllAzones() {
        return zoneService.getAllZones();
    }

    @GetMapping("/zone/getDetail/{id}")
    public Zone getDetaiZone(@PathVariable(value = "id") int id) {
        return zoneService.getDetailZone(id);
    }

    @GetMapping("/zone/getZoneInStore/{id}")
    public List<Zone> getZoneInStore(@PathVariable(value = "id") int id) {
        return zoneService.getZoneInStore(id);
    }

    @GetMapping("/zone/search/{searchValue}/{id}")
    public List<Zone> searchZone(@PathVariable(value = "searchValue") int searchValue, @PathVariable(value = "id") int stoID) {
        return zoneService.getZonesByFloor(searchValue, stoID);
    }

    @PostMapping("/zone/inactive")
    public boolean inactivZone(@RequestBody Zone zone) {
        return zoneService.inactiveZone(zone);
    }

    @PostMapping("/zone/active")
    public boolean activeZone(@RequestBody Zone zone) {
        return zoneService.activeZone(zone);
    }

    @PostMapping("/zone/update")
    public boolean updateZone(@RequestBody Zone zone) {
        return zoneService.updateZone(zone);
    }

    @PostMapping("/zone/create")
    public boolean createZone(@RequestBody Zone zone) {
        return zoneService.createNewZone(zone);
    }

    @GetMapping("/zone/getActiveZoneByStoID/{id}")
    public List<Zone> getActiveZoneByStoID(@PathVariable(value = "id") int id) {
        return zoneService.getActiveZoneByStoreID(id);
    }

    @GetMapping("/zone/getAllZoneOfAccount/{accountID}")
    public List<Zone> getAllZoneOfAccount(@PathVariable(value = "accountID") int id) {
        return zoneService.getAllZoneByAccountID(id);
    }
}
