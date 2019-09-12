package com.hs.heatmap.repository;

import com.hs.heatmap.model.Camera;
import com.hs.heatmap.model.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CameraRepository extends JpaRepository<Camera, Integer>, PagingAndSortingRepository<Camera, Integer> {

    //Find Camera by ID
    Camera findCameraById(Integer id);

    //Find Camera by ip
    @Query("SELECT ca FROM Camera ca WHERE ca.ip like %:searchValue% and ca.zoneID = :zoneID and ca.status = null")
    List<Camera> searchCamerasByIp(@Param("searchValue") String searchValue, @Param("zoneID") int zoneID);

    Camera findCamerasByIp(String Ip);

    @Query("SELECT c FROM Camera c WHERE c.zoneID = :id")
    List<Camera> getCameraByZone(@Param("id") int id);

    @Query("SELECT c FROM Camera c WHERE c.zoneID = :id and c.status is null")
    List<Camera> findActiveCameraByZoneID(@Param("id") int id);

    @Query("SELECT c FROM Camera c WHERE c.zoneID = :id and c.status is null")
    List<Camera> findCameraByZoneID(@Param("id") int id);

    @Query("SELECT c FROM Camera c WHERE c.status is null")
    List<Camera> findAllCamera();
}
