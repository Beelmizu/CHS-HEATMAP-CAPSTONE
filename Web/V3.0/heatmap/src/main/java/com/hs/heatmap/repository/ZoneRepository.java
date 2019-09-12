package com.hs.heatmap.repository;

import com.hs.heatmap.model.Zone;
import com.hs.heatmap.model.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ZoneRepository extends JpaRepository<Zone, Integer> {

    //Find Zone by ID
    Zone findZoneById(Integer id);

    //Find Zone by name
    @Query("SELECT ar FROM Zone ar WHERE ar.floor = :searchValue and ar.stoID = :stoID")
    List<Zone> searchZonesByFloor(@Param("searchValue") int searchValue, @Param("stoID") int stoID);

    Zone findZonesByName(String name);

    @Query("SELECT a FROM Zone a WHERE a.stoID = :id")
    List<Zone> getZoneInStore(@Param("id") int id);

    @Query("SELECT a FROM Zone a WHERE a.stoID = :id and a.status = 'active'")
    List<Zone> findActiveZoneByStoID(@Param("id") int id);
}
