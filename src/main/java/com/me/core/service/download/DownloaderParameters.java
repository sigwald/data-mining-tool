package com.me.core.service.download;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
class DownloaderParameters {

    private int downloadsPerCategory;

    private int threadsNumber;

    private int readTimeOut;

    private int connectTimeOut;
}