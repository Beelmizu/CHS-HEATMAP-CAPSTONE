package com.hs.heatmap.service;


import com.hs.heatmap.model.Analysis;

import java.util.List;

public interface AnalysisService {

    List<Analysis> getAllAnalysis();

    Analysis saveAnalysis(Analysis analysis);

    List<Analysis> getAllAnalysisByDate(String date, int cameraID);
}
