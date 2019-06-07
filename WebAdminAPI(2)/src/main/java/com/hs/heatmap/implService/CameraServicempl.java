package com.hs.heatmap.implService;

import com.hs.heatmap.model.Account;
import com.hs.heatmap.model.Camera;
import com.hs.heatmap.repository.CameraRepository;
import com.hs.heatmap.service.CameraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

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
    public List<Camera> getCamerasByIp(String searchValue) { return cameraRepository.findCamerasByIp(searchValue); }

    @Override
    public Camera createNewCamera(Camera camera) {
        camera.setCreateDate(LocalDate.now().toString());
        return cameraRepository.save(camera);
    }

    @Override
    public Camera updateCamera(Camera camera) {
        camera.setUpdateDate(LocalDate.now().toString());
        camera.setUpdatedBy("cuongdq");
        return cameraRepository.save(camera);
    }

    @Override
    public Camera deleteCamera(Camera camera) {
        camera.setDeletedDate(LocalDate.now().toString());
        return cameraRepository.save(camera);
    }
}
