package org.egov.im.service.handler;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class NotificationContext {
    private final String employeeMobileNumber;
    private final String citizenMobileNumber;
    private final String crmMobileNumber;
}
