package com.hs.heatmap.repository;

import com.hs.heatmap.model.Traffic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrafficRepository extends JpaRepository<Traffic, Integer> {

    @Query("SELECT t FROM Traffic t WHERE ((t.getInTime like :date%) or (t.getOutTime like :date%)) and t.zoneID = :zoneID")
    List<Traffic> getTrafficByDate(@Param("date") String date, @Param("zoneID") int zoneID);

    @Query("SELECT t FROM Traffic t WHERE ((t.getInTime between :timeFrom and :timeTo) or (t.getOutTime between :timeFrom and :timeTo)) and t.zoneID = :zoneID ")
    List<Traffic> getTrafficByDateInTime(@Param("zoneID") int zoneID, @Param("timeFrom") String timeFrom, @Param("timeTo") String timeTo);
}
