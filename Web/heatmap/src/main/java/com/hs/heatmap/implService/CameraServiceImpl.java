package com.hs.heatmap.implService;

import com.hs.heatmap.model.Camera;
import com.hs.heatmap.model.Store;
import com.hs.heatmap.repository.CameraRepository;
import com.hs.heatmap.repository.StoreRepository;
import com.hs.heatmap.service.CameraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class CameraServiceImpl implements CameraService {

    @Autowired
    private CameraRepository cameraRepository;

    @Autowired
    private StoreRepository storeRepository;

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
    public List<Camera> getActiveCameraByArea(int id) { return cameraRepository.findActiveCameraByAreaID(id); }

    @Override
    public List<Camera> getCamerasByIp(String searchValue) { return cameraRepository.searchCamerasByIp(searchValue); }

    @Override
    public boolean createNewCamera(Camera camera) {
        Camera existedCamera = cameraRepository.findCamerasByIp(camera.getIp());
        if (existedCamera != null) {
            return false;
        } else {
            camera.setCreateDate(LocalDateTime.now().toString());
            camera.setStatus("active");
            cameraRepository.save(camera);
            return true;
        }
    }

    @Override
    public boolean updateCamera(Camera camera) {
        Camera existedCamera = cameraRepository.findCamerasByIp(camera.getIp());
        if (existedCamera != null) {
            return false;
        } else {
            camera.setUpdateDate(LocalDateTime.now().toString());
            camera.setUpdatedBy(camera.getUpdatedBy());
            cameraRepository.save(camera);
            return true;
        }
    }

    @Override
    public boolean inactiveCamera(Camera camera) {
        Camera existedCamera = cameraRepository.findCamerasByIp(camera.getIp());
        if (existedCamera != null) {
            camera.setUpdateDate(LocalDateTime.now().toString());
            camera.setUpdatedBy(camera.getUpdatedBy());
            camera.setStatus("inactive");
            cameraRepository.save(camera);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean activeCamera(Camera camera) {
        Camera existedCamera = cameraRepository.findCamerasByIp(camera.getIp());
        if (existedCamera != null) {
            camera.setUpdateDate(LocalDateTime.now().toString());
            camera.setUpdatedBy(camera.getUpdatedBy());
            camera.setStatus("inactive");
            cameraRepository.save(camera);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public Camera getCameraByIP(String ip) {
        return cameraRepository.findCamerasByIp(ip);
    }

    @Override
    public  List<Camera> getAllCameraByAccountID(int accountID) {
        List<Store> stores = storeRepository.findStoreByAccountID(accountID);
        List<Camera> cameras = cameraRepository.findAll();
        List<Camera> results = new ArrayList<>();
        for (int i = 0; i < stores.size(); i++) {
            for (int j = 0; j < cameras.size(); j++) {
                if (stores.get(i).getId() == cameras.get(j).getArea().getStoID()){
                    results.add(cameras.get(j));
                }
            }
        }
        return results;
    }
}
