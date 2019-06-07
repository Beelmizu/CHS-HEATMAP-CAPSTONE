package com.hs.heatmap.repository;

import com.hs.heatmap.model.Camera;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CameraRepository extends JpaRepository<Camera, Integer> {

    //Find Camera by ID
    Camera findCameraById(Integer id);

    //Find Camera by ip
    @Query("SELECT ca FROM Camera ca WHERE ca.ip like %:searchValue%")
    List<Camera> findCamerasByIp(@Param("searchValue") String searchValue);

}
