package com.hs.heatmap.repository;

import com.hs.heatmap.model.Area;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AreaRepository extends JpaRepository<Area, Integer> {

    //Find Area by ID
    Area findAreaById(Integer id);

    //Find Area by name
    @Query("SELECT ar FROM Area ar WHERE ar.floor = :searchValue")
    List<Area> searchAreasByFloor(@Param("searchValue") int searchValue);

    Area findAreasByName(String name);

    @Query("SELECT a FROM Area a WHERE a.stoID = :id")
    List<Area> getAreaInStore(@Param("id") int id);

}
