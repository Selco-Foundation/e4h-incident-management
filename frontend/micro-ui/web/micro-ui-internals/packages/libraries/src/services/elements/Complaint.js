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
    let mobileNumber = JSON.parse(sessionStorage.getItem("Digit.User"))?.value?.info?.mobileNumber;
    console.log("citycode, ", cityCode)
    console.log("mbl",mobileNumber)
    const defaultData = {
      incident: {
        district: district,
       complaintType:complaintType,
       healthcentre:healthcentre?.code,
       healthCareType:healthCareType?.code,
       comments:comments,
        block:block?.code,
        additionalDetail: {
        },
        source: Digit.Utils.browser.isWebview() ? "mobile" : "web",
       
      },
      workflow: {
        action: "APPLY",
        verificationDocuments: [{
          documentType: "PHOTO",
          fileStoreId: uploadedFile,
          documentUid: "",
          additionalDetails: {},
        }],
      },
    };

    if (Digit.SessionStorage.get("user_type") === "employee") {
      defaultData.incident.reporter = {

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
