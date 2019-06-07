package com.hs.heatmap.repository;

import com.hs.heatmap.model.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Report, Integer> {

    //Find Report by ID
    Report findReportById(Integer id);

    //Find Report by time
    @Query("SELECT r FROM Report r WHERE r.time like %:searchValue%")
    List<Report> findReportByName(@Param("searchValue") String searchValue);

}
