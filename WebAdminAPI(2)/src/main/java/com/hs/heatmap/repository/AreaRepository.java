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
    @Query("SELECT ar FROM Area ar WHERE ar.floor like %:searchValue%")
    List<Area> findAreasByFloor(@Param("searchValue") String searchValue);

    //Find Area by name
    @Query("SELECT ar FROM Area ar WHERE LOWER(ar.name) like %:searchValue%")
    List<Area> findAreasByName(@Param("searchValue") String searchValue);

}
