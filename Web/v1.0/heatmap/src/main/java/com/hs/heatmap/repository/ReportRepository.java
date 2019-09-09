package com.hs.heatmap.repository;

import com.hs.heatmap.model.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Report, Integer> {

    @Query("SELECT r FROM Report r WHERE r.time like :date% and r.cameraID = :cameraID")
    List<Report> getReportByDate(@Param("date") String date, @Param("cameraID") int cameraID);

    @Query("SELECT r FROM Report r WHERE r.time like :date% and r.cameraID = :cameraID and r.people_gender is not null and r.people_age is not null")
    List<Report> getReportAgeGenderByDate(@Param("date") String date, @Param("cameraID") int cameraID);

    @Query("SELECT r FROM Report r WHERE r.time like :date% and r.cameraID = :cameraID and r.heatmap is not null ")
    List<Report> getHeatmapByDate(@Param("date") String date, @Param("cameraID") int cameraID);

    @Query("SELECT r FROM Report r WHERE (r.time between :timeFrom and :timeTo) and r.cameraID = :cameraID ")
    List<Report> getReportByDateInTime(@Param("cameraID") int cameraID, @Param("timeFrom") String timeFrom, @Param("timeTo") String timeTo);
}
