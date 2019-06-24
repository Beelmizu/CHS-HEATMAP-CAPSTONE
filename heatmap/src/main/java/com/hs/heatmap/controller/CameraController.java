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

    @GetMapping("/cameras/getAll")
    public List<Camera> getAllCameras(){ return cameraService.getAllCameras(); }

    @GetMapping("cameras/getDetail/{id}")
    public Camera getDetailCamera(@PathVariable(value = "id") int id){ return cameraService.getDetailCamera(id); }

    @GetMapping("/cameras/search/{searchValue}")
    public List<Camera> searchCamera(@PathVariable(value = "searchValue") String searchValue) { return cameraService.getCamerasByIp(searchValue); }

    @GetMapping("/cameras/getCameraInArea/{id}")
    public List<Camera> getStoreInCompany(@PathVariable(value = "id") int id){ return cameraService.getCameraByArea(id); }

    @PostMapping("/cameras/inactive")
    public Camera inactiveCamera(@RequestBody Camera camera) { return cameraService.inactiveCamera(camera); }

    @PostMapping("/cameras/delete")
    public Camera activeCamera(@RequestBody Camera camera) { return cameraService.activeCamera(camera); }

    @PostMapping("/cameras/update")
    public Camera updateCamera(@RequestBody Camera camera) { return cameraService.updateCamera(camera); }

    @PostMapping("/cameras/create")
    public Camera createCamera(@RequestBody Camera camera) { return cameraService.createNewCamera(camera); }

    @GetMapping("/cameras/getActiveCameraByAreaID/{id}")
    public List<Camera> getActiveCameraByAreaID(@PathVariable(value = "id") int id){ return cameraService.getActiveCameraByArea(id); }

}
