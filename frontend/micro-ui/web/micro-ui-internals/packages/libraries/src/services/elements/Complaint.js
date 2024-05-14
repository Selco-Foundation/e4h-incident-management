export const Complaint = {
  create: async ({
    cityCode,
    comments,
    district,
    uploadedFile,
   block,
   reporterName,
   complaintType,
   healthcentre,
   healthCareType,
  }) => {
    const tenantId = Digit.ULBService.getCurrentTenantId();
    console.log("uploadedFile", uploadedFile)
    let uploadedImages=null
    if(uploadedFile!==null){
      uploadedImages=[{
        documentType: "PHOTO",
        fileStoreId: uploadedFile||"",
        documentUid: "",
        additionalDetails: {},
      }]
    }
    let mobileNumber = JSON.parse(sessionStorage.getItem("Digit.User"))?.value?.info?.mobileNumber;
    var serviceDefs = await Digit.MDMSService.getServiceDefs(tenantId, "Incident");
    const incidentType = serviceDefs.filter((def) => def.serviceCode === complaintType)[0].menuPath.toUpperCase();
    const defaultData = {
      incident: {
        district: district?.name,
        tenantId:tenantId,
        incidentType:incidentType,
       incidentSubtype:complaintType,
       phcType:healthcentre?.name,
       phcSubType:healthCareType?.centreType,
       comments:comments,
        block:block?.name,
        additionalDetail: {
        },
        source: Digit.Utils.browser.isWebview() ? "mobile" : "web",
       
      },
      workflow: {
        action: "APPLY",
        //: uploadedImages
      },
    };
    if(uploadedImages!==null){
      defaultData.workflow={
        ...defaultData.workflow,
        verificationDocuments: [
        {
          documentType: "PHOTO",
          fileStoreId: uploadedFile,
          documentUid: "",
          additionalDetails: {},
        },
      ]};
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
        tenantId: tenantId,
      };
    }
    console.log("def", defaultData)
    const response = await Digit.PGRService.create(defaultData, cityCode);
    console.log("res", response)
    return response;
  },

  assign: async (complaintDetails, action, employeeData, comments, uploadedDocument, tenantId) => {
    complaintDetails.workflow.action = action;
    complaintDetails.workflow.assignes = employeeData ? [employeeData.uuid] : null;
    complaintDetails.workflow.comments = comments;
    uploadedDocument
      ? (complaintDetails.workflow.verificationDocuments = [
            {
              documentType: "PHOTO",
              fileStoreId: uploadedDocument,
              documentUid: "",
              additionalDetails: {},
            },
          ])
      : null;

    if (!uploadedDocument) complaintDetails.workflow.verificationDocuments = [];
    
    //TODO: get tenant id
    const response = await Digit.PGRService.update(complaintDetails, tenantId);
    return response;
  },
};
