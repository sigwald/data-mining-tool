package com.me.common.initializer;

import com.me.common.MyExecutable;
import com.me.core.domain.dto.DownloaderParameters;
import com.me.core.service.download.DownloaderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
public class DownloadInitializer implements Initializer {

    private final DownloaderService downloaderService;
    private final ExtractorsInitializer next;

    @Autowired
    public DownloadInitializer(DownloaderService downloaderService, ExtractorsInitializer next) {
        this.downloaderService = downloaderService;
        this.next = next;
    }

    @Override
    @SuppressWarnings("unchecked")
    public void initialize(Map<String, Object> dto, List<MyExecutable> executables) {
        Map<String, Object> settings = (Map<String, Object>) dto.get("download");

        if ((boolean) settings.get("isOn")) {

            List<String> categories = (List<String>) settings.get("categories");
            int downloadsPerCategory = (int) settings.get("downloadsPerCategory");
            int threadsNumber = (int) settings.get("threadsNumber");
            int readTimeout = (int) settings.get("readTimeout");
            int connectTimeout = (int) settings.get("connectTimeout");

            DownloaderParameters downloaderParameters =
                    new DownloaderParameters(downloadsPerCategory, threadsNumber, readTimeout, connectTimeout);
            downloaderService.setCategories(new ArrayList<>(categories));
            downloaderService.setParameters(downloaderParameters);
            executables.add(downloaderService);
        }
        next.initialize(dto, executables);
    }
}
