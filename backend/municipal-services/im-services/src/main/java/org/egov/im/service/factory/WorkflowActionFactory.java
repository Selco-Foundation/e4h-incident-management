package org.egov.im.service.factory;

import org.egov.im.service.WorkflowService;
import org.egov.im.service.handler.WorkflowActionHandler;
import org.egov.im.service.handler.*;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class WorkflowActionFactory {

    private static final Map<String, WorkflowActionHandler> handlers = new HashMap<>();

    static {
        handlers.put("PENDINGFORASSIGNMENT_APPLY", new ClosedAfterResolutionCloseHandler());
        handlers.put("PENDINGATVENDOR_ASSIGN", new ClosedAfterResolutionCloseHandler());
        handlers.put("PENDINGFORASSIGNMENT_SENDBACK", new PendingForAssignmentSendBackHandler());
        handlers.put("REJECTED_REJECT", new RejectedRejectHandler());
        handlers.put("RESOLVED_IM_WF_RESOLVE", new ResolveImWfResolveHandler());
        handlers.put("PENDINGFORASSIGNMENT_IM_WF_REOPEN", new PendingForAssignmentImfWfReopenHandler());
        handlers.put("CLOSED_AFTER_RESOLUTION_CLOSE", new ClosedAfterResolutionCloseHandler());
        handlers.put("PENDINGATVENDOR_REASSIGN", new PendingAtVendorReAssignHandler());
    }

    public static WorkflowActionHandler getHandler(String actionStatus) {
        return handlers.getOrDefault(actionStatus, new DefaultHandler());
    }
}
