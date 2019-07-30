package com.hs.heatmap.controller;

import com.hs.heatmap.model.Analysis;
import com.hs.heatmap.service.AnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins="*")
public class AnalysisController {

    @Autowired
    AnalysisService analysisService;

    @GetMapping("/analysis/getAll")
    public List<Analysis> getAllHeatmap(){ return analysisService.getAllAnalysis(); }

    @PostMapping("/analysis/saveAnalysis")
    public Analysis saveAnalysis(@RequestBody Analysis analysis) { return analysisService.saveAnalysis(analysis); }

    @GetMapping("/analysis/getAnalysisByDate/{date}/{cameraID}")
    public List<Analysis> getAllAnalysisByDate(@PathVariable(value = "date") String date,
                                             @PathVariable(value = "cameraID") int camID){
        return analysisService.getAllAnalysisByDate(date, camID);
    }
}
