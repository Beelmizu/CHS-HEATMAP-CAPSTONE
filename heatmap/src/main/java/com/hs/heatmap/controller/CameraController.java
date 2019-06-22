package com.hs.heatmap.controller;

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

    @PostMapping("/cameras/delete")
    public Camera deleteCamera(@RequestBody Camera camera) { return cameraService.deleteCamera(camera); }

    @PostMapping("/cameras/update")
    public Camera updateCamera(@RequestBody Camera camera) { return cameraService.updateCamera(camera); }

    @PostMapping("/cameras/create")
    public Camera createCamera(@RequestBody Camera camera) { return cameraService.createNewCamera(camera); }

}