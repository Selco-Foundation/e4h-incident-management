import { useQuery, useQueryClient } from "react-query";

// TODO: move to service
const getThumbnails = async (ids, tenantId) => {
  const res = await Digit.UploadServices.Filefetch(ids, tenantId);
  if (res.data.fileStoreIds && res.data.fileStoreIds.length !== 0) {
    return { thumbs: res.data.fileStoreIds.map((o) => o.url.split(",")[3]), images: res.data.fileStoreIds.map((o) => Digit.Utils.getFileUrl(o.url)) };
  } else {
    return null;
  }
};

const getDetailsRow = ({ id, service, complaintType }) =>({
  CS_COMPLAINT_DETAILS_TICKET_NO: id,
  CS_COMPLAINT_DETAILS_APPLICATION_STATUS: `CS_COMMON_${service.incident.applicationStatus}`,
  CS_ADDCOMPLAINT_TICKET_TYPE: complaintType === "" ? `SERVICEDEFS.OTHERS` : `SERVICEDEFS.${complaintType}`,
  CS_ADDCOMPLAINT_TICKET_SUB_TYPE: `SERVICEDEFS.${service.incident.incidentSubType.toUpperCase()}`,
  CS_ADDCOMPLAINT_DISTRICT : service?.incident.district,
  CS_ADDCOMPLAINT_BLOCK: service?.incident?.block,
  CS_ADDCOMPLAINT_HEALTH_CARE_CENTRE: service?.incident?.phcType,
  CS_COMPLAINT_COMMENTS: service.incident.comments,
  CS_ADDCOMPLAINT_HEALTH_CARE_SUB_TYPE:service.incident.phcSybType,
  CS_COMPLAINT_FILED_DATE: Digit.DateUtils.ConvertTimestampToDate(service.incident.auditDetails.createdTime),
})

const isEmptyOrNull = (obj) => obj === undefined || obj === null || Object.keys(obj).length === 0;

const transformDetails = ({ id, service, workflow, thumbnails, complaintType }) => {
  const { Customizations, SessionStorage } = window.Digit;
  const role = (SessionStorage.get("user_type") || "CITIZEN").toUpperCase();
  const customDetails = Customizations?.PGR?.getComplaintDetailsTableRows
    ? Customizations.PGR.getComplaintDetailsTableRows({ id, service, role })
    : {};
  return {
    details: !isEmptyOrNull(customDetails) ? customDetails : getDetailsRow({ id, service, complaintType }),
    thumbnails: thumbnails?.thumbs,
    images: thumbnails?.images,
    workflow: workflow.incident,
    incident:service.incident,
    audit: {
      citizen: service.incident.citizen,
      details: service.incident.auditDetails,
      source: service.incident.source,
      rating: service.rating,
      incidentType: service.incident.incidentSubType,
    },
    service: service,
  };
};

const fetchComplaintDetails = async (tenantId, id) => {
  
  var serviceDefs = await Digit.MDMSService.getServiceDefs(tenantId, "Incident");
  console.log("servkkkk", serviceDefs)
  const service = (await Digit.PGRService.search(tenantId, {incidentId: id })).IncidentWrappers[0];
  const workflow=service
 //const workflow=await Digit.PGRService.search(tenantId, {incidentId: id }).IncidentWrappers[0];
  console.log("ser, work", service)
  console.log("www", workflow)
  Digit.SessionStorage.set("complaintDetails", { service, workflow });
  if (service && workflow && serviceDefs) {
    //const complaintType =  service.incident.incidentType
    const complaintType = serviceDefs.filter((def) => def.serviceCode === service.incident.incidentSubType)[0].menuPath.toUpperCase();
    console.log("CT", complaintType)
    const ids = workflow.verificationDocuments
      ? workflow.verificationDocuments.filter((doc) => doc.documentType === "PHOTO").map((photo) => photo.fileStoreId || photo.id)
      : null;
    const thumbnails = ids ? await getThumbnails(ids, service.tenantId) : null;
    const details = transformDetails({ id, service, workflow, thumbnails, complaintType });
    return details;
  } else {
    return {};
  }
};

const useComplaintDetails = ({ tenantId, id }) => {
 
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery(["complaintDetails", tenantId, id], () => fetchComplaintDetails(tenantId, id));
  
  return { isLoading, error, complaintDetails: data, revalidate: () => queryClient.invalidateQueries(["complaintDetails", tenantId, id]) };
};

export default useComplaintDetails;
