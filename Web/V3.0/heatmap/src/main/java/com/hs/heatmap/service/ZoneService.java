package com.hs.heatmap.service;

import com.hs.heatmap.model.Zone;
import com.hs.heatmap.model.Store;

import java.util.List;

public interface ZoneService {

    List<Zone> getAllZones();

    Zone getDetailZone(int id);

    List<Zone> getActiveZoneByStoreID(int id);

    List<Zone> getZoneInStore(int id);

    List<Zone> getZonesByFloor(int searchValue, int stoID);

    boolean createNewZone(Zone Zone);

    boolean updateZone(Zone Zone);

    boolean inactiveZone(Zone Zone);

    boolean activeZone(Zone Zone);

    List<Zone> getAllZoneByAccountID(int accountID);


}
