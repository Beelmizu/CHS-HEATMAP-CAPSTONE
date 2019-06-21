package com.hs.heatmap.service;

import com.hs.heatmap.model.Camera;

import java.util.List;

public interface CameraService {

    List<Camera> getAllCameras();

    Camera getDetailCamera(int id);

    List<Camera> getCameraByArea(int id);

    List<Camera> getCamerasByIp(String searchValue);

    Camera createNewCamera(Camera camera);

    Camera updateCamera(Camera camera);

    Camera deleteCamera(Camera camera);

}
