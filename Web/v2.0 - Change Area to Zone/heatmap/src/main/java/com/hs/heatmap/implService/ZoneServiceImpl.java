package com.hs.heatmap.implService;

import com.hs.heatmap.model.Zone;
import com.hs.heatmap.model.Camera;
import com.hs.heatmap.model.Store;
import com.hs.heatmap.repository.ZoneRepository;
import com.hs.heatmap.repository.StoreRepository;
import com.hs.heatmap.service.ZoneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ZoneServiceImpl implements ZoneService {

    @Autowired
    private ZoneRepository zoneRepository;

    @Autowired
    private StoreRepository storeRepository;

    @Override
    public List<Zone> getAllZones() {
        return zoneRepository.findAll();
    }

    @Override
    public Zone getDetailZone(int id) {
        return zoneRepository.findZoneById(id);
    }

    @Override
    public List<Zone> getActiveZoneByStoreID(int id) {
        return zoneRepository.findActiveZoneByStoID(id);
    }

    @Override
    public List<Zone> getZoneInStore(int id) {
        return zoneRepository.getZoneInStore(id);
    }


    @Override
    public List<Zone> getZonesByFloor(int searchValue, int stoID) {
        return zoneRepository.searchZonesByFloor(searchValue, stoID);
    }


    @Override
    public boolean createNewZone(Zone zone) {
//        Zone existedZone = zoneRepository.findZonesByName(zone.getName());
//        if (existedZone != null) {
//            return false;
//        } else {
        zone.setCreatedDate(LocalDateTime.now().toString());
        zone.setStatus("active");
        zoneRepository.save(zone);
        return true;
//        }
    }

    @Override
    public boolean updateZone(Zone zone) {
        Zone existedZone = zoneRepository.findZoneById(zone.getId());
        if (existedZone != null) {
            zone.setUpdatedDate(LocalDateTime.now().toString());
            zone.setUpdatedBy(zone.getUpdatedBy());
            zoneRepository.save(zone);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean inactiveZone(Zone zone) {
        Zone existedZone = zoneRepository.findZoneById(zone.getId());
        if (existedZone != null) {
            zone.setUpdatedDate(LocalDateTime.now().toString());
            zone.setUpdatedBy(zone.getUpdatedBy());
            zone.setStatus("inactive");
            zoneRepository.save(zone);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean activeZone(Zone zone) {
        Zone existedZone = zoneRepository.findZoneById(zone.getId());
        if (existedZone != null) {
            zone.setUpdatedDate(LocalDateTime.now().toString());
            zone.setUpdatedBy(zone.getUpdatedBy());
            zone.setStatus("active");
            zoneRepository.save(zone);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public List<Zone> getAllZoneByAccountID(int accountID) {
        List<Store> stores = storeRepository.findStoreByAccountID(accountID);
        List<Zone> zones = zoneRepository.findAll();
        List<Zone> results = new ArrayList<>();
        for (int i = 0; i < stores.size(); i++) {
            System.out.println(stores.get(i).getId());
            for (int j = 0; j < zones.size(); j++) {
                if (stores.get(i).getId() == zones.get(j).getStoID()) {
                    results.add(zones.get(j));
                }
            }
        }
        return results;
    }
}
