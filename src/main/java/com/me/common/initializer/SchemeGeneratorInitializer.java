package com.me.common.initializer;

import com.me.common.MyExecutable;
import com.me.core.service.rapidminer.RapidMinerExecService;
import com.me.core.service.rapidminer.SchemeGeneratorService;
import com.me.core.service.reporting.ExcelReporterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public class SchemeGeneratorInitializer implements Initializer {
    @Lazy
    private final SchemeGeneratorService schemeGenerator;
    @Lazy
    private final RapidMinerExecService execService;
    @Lazy
    private final ExcelReporterService reporterService;

    @Autowired
    public SchemeGeneratorInitializer(SchemeGeneratorService schemeGenerator,
                                      RapidMinerExecService execService,
                                      ExcelReporterService reporterService) {
        this.schemeGenerator = schemeGenerator;
        this.execService = execService;
        this.reporterService = reporterService;
    }

    @Override
    @SuppressWarnings("unchecked")
    public void initialize(Map<String, Object> dto, List<MyExecutable> executables) {
        Map<String, Object> settings = (Map<String, Object>) dto.get("schemes");

        if ((boolean) settings.get("isOn")) {
            List<String> experiments = (List<String>) settings.get("experiments");
            Map<String, Object> formImport = (Map<String, Object>) dto.get("import");
            String cwd = (String) formImport.get("cwd");
            String pathToRM = (String) settings.get("rapidMinerPath");

            String templatesFolder = (String) settings.get("templatesFolder");
            templatesFolder = cwd + "\\" + templatesFolder;

            schemeGenerator.setExpNames(experiments);
            schemeGenerator.setTemplatesPath(templatesFolder);
            schemeGenerator.setWorkingDir(cwd);

            execService.setWorkingDir(cwd);
            execService.setExpNames(experiments);
            execService.setPathToRM(pathToRM);

            reporterService.setExpNames(experiments);
            reporterService.setCwd(cwd);

            executables.add(schemeGenerator);
            executables.add(execService);
            executables.add(reporterService);
        }
    }
}
