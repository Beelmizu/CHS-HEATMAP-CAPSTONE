package com.hs.heatmap.implService;

import com.hs.heatmap.model.Camera;
import com.hs.heatmap.repository.CameraRepository;
import com.hs.heatmap.service.CameraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class CameraServiceImpl implements CameraService {

    @Autowired
    private CameraRepository cameraRepository;

    @Override
    public List<Camera> getAllCameras() {
        return cameraRepository.findAll();
    }

    @Override
    public Camera getDetailCamera(int id) {
        return cameraRepository.findCameraById(id);
    }

    @Override
    public List<Camera> getCameraByArea(int id) { return cameraRepository.getCameraByArea(id); }

    @Override
    public List<Camera> getCamerasByIp(String searchValue) { return cameraRepository.searchCamerasByIp(searchValue); }

    @Override
    public Camera createNewCamera(Camera camera) {
        if(cameraRepository.findCamerasByIp(camera.getIp()) != null){
            return null;
        } else {
            camera.setCreateDate(LocalDateTime.now().toString());
            camera.setStatus("active");
            return cameraRepository.save(camera);
        }
    }

    @Override
    public Camera updateCamera(Camera camera) {
        camera.setUpdateDate(LocalDateTime.now().toString());
        camera.setUpdatedBy("cuongdq");
        return cameraRepository.save(camera);
    }

    @Override
    public Camera deleteCamera(Camera camera) {
        camera.setStatus("inactive");
        return cameraRepository.save(camera);
    }
}
