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
    healthcentre,
    healthCareType,
    tenantId
  }) => {
    console.log("tenantId",tenantId)
    const tenantIdNew = tenantId;
    let mobileNumber = JSON.parse(sessionStorage.getItem("Digit.User"))?.value?.info?.mobileNumber;
    var serviceDefs = await Digit.MDMSService.getServiceDefs(tenantIdNew, "Incident");
    const incidentType = serviceDefs.filter((def) => def.serviceCode === complaintType)[0].menuPath.toUpperCase();
    const defaultData = {
      incident: {
        district: district?.key,
        tenantId:tenantIdNew,
        incidentType:incidentType,
       incidentSubtype:complaintType,
       phcType:healthcentre?.name,
       phcSubType:healthCareType?.centreType,
       comments:comments,
       block:block?.key,
        additionalDetail: {
          fileStoreId: uploadedFile,
        },
        source: Digit.Utils.browser.isWebview() ? "mobile" : "web",
       
      },
      workflow: {
        action: "APPLY",
        //: uploadedImages
      },
    };
    if(uploadImages!==null){
      defaultData.workflow={
        ...defaultData.workflow,
        verificationDocuments:uploadImages
      };
    }

    if (Digit.SessionStorage.get("user_type") === "employee") {
      defaultData.incident.reporter= {

        name:reporterName,
        type: "EMPLOYEE",
        mobileNumber: mobileNumber,
        roles: [
          {
            id: null,
            name: "Citizen",
            code: "CITIZEN",
            tenantId: tenantId,
          },
        ],
        tenantId: tenantIdNew,
      };
    }
    const response = await Digit.PGRService.create(defaultData, cityCode);
    return response;
  },

  assign: async (complaintDetails, action, employeeData, comments, uploadedDocument, tenantId) => {
    complaintDetails.workflow.action = action;
    complaintDetails.workflow.assignes = employeeData ? [employeeData.uuid] : null;
    complaintDetails.workflow.comments = comments;
    uploadedDocument
      ? (complaintDetails.workflow.verificationDocuments = uploadedDocument)
      : null;

    if (!uploadedDocument) complaintDetails.workflow.verificationDocuments = [];
    
    //TODO: get tenant id
    const response = await Digit.PGRService.update(complaintDetails, tenantId);
    return response;
  },
};
