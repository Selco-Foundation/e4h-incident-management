package org.egov.im.web.models.storage;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.io.File;
import java.util.List;

@Getter
@AllArgsConstructor
public class StorageResponse {
    private List<File> files;
}
