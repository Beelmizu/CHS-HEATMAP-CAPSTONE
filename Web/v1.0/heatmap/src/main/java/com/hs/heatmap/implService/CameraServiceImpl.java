package com.hs.heatmap.implService;

import com.hs.heatmap.model.Camera;
import com.hs.heatmap.model.Store;
import com.hs.heatmap.repository.CameraRepository;
import com.hs.heatmap.repository.StoreRepository;
import com.hs.heatmap.service.CameraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

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
        return cameraRepository.findAllCamera();
    }

    @Override
    public Camera getDetailCamera(int id) {
        return cameraRepository.findCameraById(id);
    }

    @Override
    public List<Camera> getCameraByArea(int id) {
        return cameraRepository.findCameraByAreaID(id);
    }

    @Override
    public List<Camera> getActiveCameraByArea(int id) {
        return cameraRepository.findActiveCameraByAreaID(id);
    }

    @Override
    public List<Camera> getCamerasByIp(String searchValue, int areaID) {
        return cameraRepository.searchCamerasByIp(searchValue, areaID);
    }

    @Override
    public boolean createNewCamera(Camera camera) {
        Camera existedCamera = cameraRepository.findCamerasByIp(camera.getIp());
        if (existedCamera != null) {
            return false;
        } else {
            camera.setCreatedDate(LocalDateTime.now().toString());
            cameraRepository.save(camera);
            return true;
        }
    }

    @Override
    public boolean updateCamera(Camera camera) {
        Camera existedCamera = cameraRepository.findCamerasByIp(camera.getIp());
        if (existedCamera != null) {
            camera.setUpdatedDate(LocalDateTime.now().toString());
            camera.setUpdatedBy(camera.getUpdatedBy());
            cameraRepository.save(camera);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean inactiveCamera(Camera camera) {
        Camera existedCamera = cameraRepository.findCamerasByIp(camera.getIp());
        if (existedCamera != null) {
            camera.setUpdatedDate(LocalDateTime.now().toString());
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
            camera.setUpdatedDate(LocalDateTime.now().toString());
            camera.setUpdatedBy(camera.getUpdatedBy());
            camera.setStatus("active");
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
    public List<Camera> getAllCameraByAccountID(int accountID) {
        List<Store> stores = storeRepository.findStoreByAccountID(accountID);
        List<Camera> cameras = cameraRepository.findAllCamera();
        List<Camera> results = new ArrayList<>();
        for (int i = 0; i < stores.size(); i++) {
            for (int j = 0; j < cameras.size(); j++) {
                if (stores.get(i).getId() == cameras.get(j).getArea().getStoID()) {
                    results.add(cameras.get(j));
                }
            }
        }
        return results;
    }

    @Override
    public boolean deleteCamera(Integer id) {
        Camera existedCamera = cameraRepository.findCameraById(id);
        if (existedCamera != null) {
            existedCamera.setStatus("deleted");
            cameraRepository.save(existedCamera);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public Page<Camera> getAllCameraByPage(int page) {
        PageRequest pr = new PageRequest(page, 5, Sort.Direction.ASC, "id");
        return cameraRepository.findAll(pr);
    }
}
