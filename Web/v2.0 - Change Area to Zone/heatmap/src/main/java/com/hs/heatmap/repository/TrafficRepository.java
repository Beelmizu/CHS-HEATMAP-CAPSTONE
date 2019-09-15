package com.hs.heatmap.repository;

import com.hs.heatmap.model.Traffic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrafficRepository extends JpaRepository<Traffic, Integer>, PagingAndSortingRepository<Traffic, Integer> {

//    @Query("SELECT t FROM Traffic t WHERE t.zoneID = :id")
    List<Traffic> findTrafficByZoneId(int id);

    @Query("SELECT COUNT(t.getIn) FROM Traffic t WHERE t.zoneID = :zoneID and t.getIn like :timeGetIn%")
    Integer countTrafficByZoneIdInTime(@Param("zoneID") int zoneID, @Param("timeGetIn") String timeGetIn);

}
