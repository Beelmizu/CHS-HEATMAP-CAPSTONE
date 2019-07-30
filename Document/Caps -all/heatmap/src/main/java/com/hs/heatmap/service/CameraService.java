package com.hs.heatmap.service;

import com.hs.heatmap.model.Camera;

import java.util.List;

public interface CameraService {

    List<Camera> getAllCameras();

    Camera getDetailCamera(int id);

    List<Camera> getCameraByArea(int id);

    List<Camera> getActiveCameraByArea(int id);

    List<Camera> getCamerasByIp(String searchValue);

    Camera createNewCamera(Camera camera);

    Camera updateCamera(Camera camera);

    Camera inactiveCamera(Camera camera);

    Camera activeCamera(Camera camera);

    Camera getCameraByIP(String ip);

    List<Camera> getAllCameraByAccountID(int accountID);

}
