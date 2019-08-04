package com.hs.heatmap.repository;

import com.hs.heatmap.model.Camera;
import com.hs.heatmap.model.Store;
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
    @Query("SELECT ca FROM Camera ca WHERE ca.ip like %:searchValue% and ca.areaID = :areaID")
    List<Camera> searchCamerasByIp(@Param("searchValue") String searchValue, @Param("areaID") int areaID);

    Camera findCamerasByIp(String Ip);

    @Query("SELECT c FROM Camera c WHERE c.areaID = :id")
    List<Camera> getCameraByArea(@Param("id") int id);

    @Query("SELECT c FROM Camera c WHERE c.areaID = :id and c.status = 'active'")
    List<Camera> findActiveCameraByAreaID(@Param("id")int id);
}
