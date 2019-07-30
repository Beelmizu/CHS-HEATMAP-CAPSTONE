package com.hs.heatmap.implService;

import com.hs.heatmap.model.Analysis;
import com.hs.heatmap.repository.AnalysisRepository;
import com.hs.heatmap.service.AnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AnalysisServiceImpl implements AnalysisService {

    @Autowired
    private AnalysisRepository analysisRepository;

    @Override
    public List<Analysis> getAllAnalysis() { return analysisRepository.findAll(); }

    @Override
    public Analysis saveAnalysis(Analysis analysis) {
        analysis.setTime(LocalDateTime.now().toString());
        return analysisRepository.save(analysis);
    }

    @Override
    public List<Analysis> getAllAnalysisByDate(String date, int cameraID) {
        return analysisRepository.getAnalysisByDate(date, cameraID);
    }


}
