package org.egov.im.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.egov.im.util.StorageUtil;
import org.egov.im.validator.StorageValidator;
import org.egov.im.web.models.storage.StorageResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@RequiredArgsConstructor
@Service
@Slf4j
public class StorageService {

	private final StorageValidator storageValidator;
	private final StorageUtil storageUtil;

	public StorageResponse save(List<MultipartFile> filesToStore,
								String module,
								String tag,
								String tenantId,
								String requestInfo) throws IOException {

		storageValidator.validate(filesToStore);
		return storageUtil.uploadToFileStorage(filesToStore, module, tag, tenantId, requestInfo);
	}
}
