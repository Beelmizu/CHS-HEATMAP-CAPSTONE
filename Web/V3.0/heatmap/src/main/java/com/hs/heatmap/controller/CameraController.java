package com.hs.heatmap.controller;

import com.hs.heatmap.model.Camera;
import com.hs.heatmap.service.CameraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class CameraController {

    @Autowired
    CameraService cameraService;

    @GetMapping("/camera/getAll")
    public List<Camera> getAllCameras() {
        return cameraService.getAllCameras();
    }

    @GetMapping("/camera/getAllCameraByPage/{page}")
    public Page<Camera> getAllCameraByPage(@PathVariable(value = "page") int page,
                                           @PathVariable(value = "size") int size) {
        return cameraService.getAllCameraByPage(page);
    }

    @GetMapping("/camera/getCameraOfAccount/{accountID}")
    public List<Camera> getAllCameraOfAccount(@PathVariable(value = "accountID") int id) {
        return cameraService.getAllCameraByAccountID(id);
    }

    @GetMapping("camera/getDetail/{id}")
    public Camera getDetailCamera(@PathVariable(value = "id") int id) {
        return cameraService.getDetailCamera(id);
    }

    @GetMapping("/camera/search/{searchValue}/{id}")
    public List<Camera> searchCamera(@PathVariable(value = "searchValue") String searchValue, @PathVariable(value = "id") int zoneID) {
        return cameraService.getCamerasByIp(searchValue, zoneID);
    }

    @GetMapping("/camera/getCameraInZone/{id}")
    public List<Camera> getStoreInCompany(@PathVariable(value = "id") int id) {
        return cameraService.getCameraByZone(id);
    }

    @PostMapping("/camera/inactive")
    public boolean inactiveCamera(@RequestBody Camera camera) {
        return cameraService.inactiveCamera(camera);
    }

    @PostMapping("/camera/active")
    public boolean activeCamera(@RequestBody Camera camera) {
        return cameraService.activeCamera(camera);
    }

    @PostMapping("/camera/update")
    public boolean updateCamera(@RequestBody Camera camera) {
        return cameraService.updateCamera(camera);
    }

    @PostMapping("/camera/create")
    public boolean createCamera(@RequestBody Camera camera) {
        return cameraService.createNewCamera(camera);
    }

    @GetMapping("/camera/getActiveCameraByZoneID/{id}")
    public List<Camera> getActiveCameraByZoneID(@PathVariable(value = "id") int id) {
        return cameraService.getActiveCameraByZone(id);
    }

    @GetMapping("/camera/getCameraByZoneID/{id}")
    public List<Camera> getCameraByZoneID(@PathVariable(value = "id") int id) {
        return cameraService.getCameraByZone(id);
    }

    @GetMapping("/camera/getCameraByIP/{ip}")
    public Camera getCameraByIP(@PathVariable(value = "ip") String ip) {
        return cameraService.getCameraByIP(ip);
    }

    @PostMapping("/camera/deleteCamera/")
    public boolean deleteCamera(@RequestParam(name = "cameraID") Integer camID) {
        return cameraService.deleteCamera(camID);
    }
}
