package com.hs.heatmap.repository;

import com.hs.heatmap.model.Analysis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnalysisRepository extends JpaRepository<Analysis, Integer> {

    @Query("SELECT a FROM Analysis a WHERE a.time like :date% and a.cameraID = :cameraID")
    List<Analysis> getAnalysisByDate(@Param("date") String date, @Param("cameraID") int cameraID);
}
