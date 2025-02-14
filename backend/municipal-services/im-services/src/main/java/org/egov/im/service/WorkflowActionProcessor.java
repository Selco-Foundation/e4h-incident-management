package org.egov.im.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.egov.im.service.factory.WorkflowActionFactory;
import org.egov.im.service.handler.NotificationContext;
import org.egov.im.web.models.IncidentRequest;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class WorkflowActionProcessor {

    private final UserService userService;

    /**
     * recreates the inceident condition using action and status,
     * example: PENDINGFORASSIGNMENT and APPLY = PENDINGFORASSIGNMENT_APPLY
     */
    public NotificationContext processWorkflow(IncidentRequest request) {
        final String KEY = String.format("%s_%s", request.getIncident().getApplicationStatus(),
                request.getWorkflow().getAction());
        log.info("searching for handler key: {}", KEY);
        return WorkflowActionFactory.getHandler(KEY).handle(request, userService);
    }
}
