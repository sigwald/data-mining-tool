package com.me.core.service.importbl;

import com.me.common.MyExecutable;
import com.me.common.ProgressWatcher;
import com.me.common.StoppableObservable;
import com.me.core.domain.dto.BlacklistProperty;
import com.me.core.domain.entities.Blacklist;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class BlacklistImporterService extends StoppableObservable implements MyExecutable {

    @Getter @Setter
    private List<BlacklistProperty> blacklistProperties;

    @Getter
    private final AddBehaviour addBehaviour;

    @Autowired
    public BlacklistImporterService(@Qualifier("progressWatcher") ProgressWatcher watcher,
                                    @Qualifier("fileSystemBehaviour") AddBehaviour addBehaviour) {
        super.addSubscriber(watcher);
        this.addBehaviour = addBehaviour;
    }

    @Override
    public void execute() throws Exception {
        for (BlacklistProperty blacklistProperty : blacklistProperties) {
            Blacklist blacklist = blacklistProperty.getBlacklist();

            super.checkCancel();
            addBehaviour.importBlacklist(blacklist, blacklistProperty.getPathName());
        }
    }

    @Override
    public String getName() {
        return "import blacklist";
    }
}
