package com.hs.heatmap.controller;

import com.hs.heatmap.model.Area;
import com.hs.heatmap.model.Camera;
import com.hs.heatmap.service.CameraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins="*")
public class CameraController {

    @Autowired
    CameraService cameraService;

    @GetMapping("/camera/getAll")
    public List<Camera> getAllCameras(){ return cameraService.getAllCameras(); }

    @GetMapping("/camera/getCameraOfAccount/{accountID}")
    public List<Camera> getAllCameraOfAccount(@PathVariable(value = "accountID") int id){ return cameraService.getAllCameraByAccountID(id); }

    @GetMapping("camera/getDetail/{id}")
    public Camera getDetailCamera(@PathVariable(value = "id") int id){ return cameraService.getDetailCamera(id); }

    @GetMapping("/camera/search/{searchValue}")
    public List<Camera> searchCamera(@PathVariable(value = "searchValue") String searchValue) { return cameraService.getCamerasByIp(searchValue); }

    @GetMapping("/camera/getCameraInArea/{id}")
    public List<Camera> getStoreInCompany(@PathVariable(value = "id") int id){ return cameraService.getCameraByArea(id); }

    @PostMapping("/camera/inactive")
    public Camera inactiveCamera(@RequestBody Camera camera) { return cameraService.inactiveCamera(camera); }

    @PostMapping("/camera/delete")
    public Camera activeCamera(@RequestBody Camera camera) { return cameraService.activeCamera(camera); }

    @PostMapping("/camera/update")
    public Camera updateCamera(@RequestBody Camera camera) { return cameraService.updateCamera(camera); }

    @PostMapping("/camera/create")
    public Camera createCamera(@RequestBody Camera camera) { return cameraService.createNewCamera(camera); }

    @GetMapping("/camera/getActiveCameraByAreaID/{id}")
    public List<Camera> getActiveCameraByAreaID(@PathVariable(value = "id") int id){ return cameraService.getActiveCameraByArea(id); }

    @GetMapping("/camera/getCameraByIP/{ip}")
    public Camera getCameraByIP(@PathVariable(value = "ip") String ip){ return cameraService.getCameraByIP(ip); }

}
