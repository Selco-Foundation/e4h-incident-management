export const Complaint = {
  create: async ({
    cityCode,
    comments,
    district,
    uploadedFile,
    block,
    reporterName,
    complaintType,
    uploadImages,
    subType,
    healthcentre,
    healthCareType,
    tenantId,
  }) => {
    const tenantIdNew = tenantId;
    let mobileNumber = JSON.parse(sessionStorage.getItem("Digit.User"))?.value?.info?.mobileNumber;
    var serviceDefs = await Digit.MDMSService.getServiceDefs(tenantIdNew, "Incident");
    let phcSubType = [];
    if (healthCareType?.centreType !== null) {
      phcSubType = healthCareType?.centreType.replace(/\s+/g, "").toUpperCase();
    }
    const defaultData = {
      incident: {
        district: district?.codeNew || district?.key,
        tenantId: tenantIdNew,
        incidentType: complaintType?.key,
        incidentSubtype: subType?.key,
        phcType: healthcentre?.key || healthcentre?.name,
        phcSubType: healthCareType?.centreTypeKey || healthCareType?.centreType,
        comments: comments,
        block: block?.codeKey || block?.key,
        additionalDetail: {
          fileStoreId: uploadedFile,
          reopenreason: [],
          rejectReason: [],
          sendBackReason: [],
          sendBackSubReason: [],
        },
        source: Digit.Utils.browser.isWebview() ? "mobile" : "web",
      },
      workflow: {
        action: "APPLY",
        //: uploadedImages
      },
    };
    if (uploadImages !== null) {
      defaultData.workflow = {
        ...defaultData.workflow,
        verificationDocuments: uploadImages,
      };
    }

    if (Digit.SessionStorage.get("user_type") === "employee") {
      let userInfo = Digit.SessionStorage.get("User");
      defaultData.incident.reporter = {
        uuid: userInfo.info.uuid,
        tenantId: userInfo.info.tenantId,
        // name:reporterName,
        // type: "EMPLOYEE",
        // mobileNumber: mobileNumber,
        // roles: [
        //   {
        //     id: null,
        //     name: "Citizen",
        //     code: "CITIZEN",
        //     tenantId: tenantId,
        //   },
        // ],
      };
    }
    const response = await Digit.PGRService.create(defaultData, cityCode);
    return response;
  },

  assign: async (complaintDetails, action, employeeData, comments, uploadedDocument, tenantId, reasons = {}) => {
    complaintDetails.workflow.action = action;
    complaintDetails.workflow.assignes = employeeData ? [employeeData.uuid] : null;
    complaintDetails.workflow.comments = comments;

    const reasonMappings = {
      selectedReopenReason: "reopenreason",
      selectedRejectReason: "rejectReason",
      selectedSendBackReason: "sendBackReason",
      selectedSendBackSubReason: "sendBackSubReason",
    };

    Object.entries(reasonMappings).forEach(([key, workflowKey]) => {
      if (reasons[key]) {
        complaintDetails.workflow[workflowKey] = reasons[key]?.code || reasons[key];

        if (!complaintDetails.incident.additionalDetail[workflowKey]) {
          complaintDetails.incident.additionalDetail[workflowKey] = [];
        }
        complaintDetails.incident.additionalDetail[workflowKey].push(reasons[key]?.localizedCode || reasons[key]);
      }
    });

    uploadedDocument ? (complaintDetails.workflow.verificationDocuments = uploadedDocument) : null;

    if (!uploadedDocument) complaintDetails.workflow.verificationDocuments = [];
    // let userInfo=Digit.SessionStorage.get("User")
    // complaintDetails.incident.reporter = {

    //   uuid:userInfo.info.uuid,
    //   tenantId: userInfo.info.tenantId,
    // };
    //console.log("assignassign",complaintDetails)
    //TODO: get tenant id
    let response;
    try {
      response = await Digit.PGRService.update(complaintDetails, tenantId);
      //return response;
    } catch (error) {
      response = error?.response?.data?.Errors;
    }
    return response;
  },
};
