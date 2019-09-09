package com.hs.heatmap.service;

import com.hs.heatmap.model.Camera;
import org.springframework.data.domain.Page;

import java.util.List;

public interface CameraService {

    List<Camera> getAllCameras();

    Camera getDetailCamera(int id);

    List<Camera> getCameraByArea(int id);

    List<Camera> getActiveCameraByArea(int id);

    List<Camera> getCamerasByIp(String searchValue, int areaID);

    boolean createNewCamera(Camera camera);

    boolean updateCamera(Camera camera);

    boolean inactiveCamera(Camera camera);

    boolean activeCamera(Camera camera);

    Camera getCameraByIP(String ip);

    List<Camera> getAllCameraByAccountID(int accountID);

    boolean deleteCamera(Integer ip);

    Page<Camera> getAllCameraByPage(int page);
}
