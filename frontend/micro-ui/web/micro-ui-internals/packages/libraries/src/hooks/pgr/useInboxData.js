import { useQuery, useQueryClient } from "react-query";

const useInboxData = (searchParams,tenantIdNew) => {
  const client = useQueryClient();
 console.log("searchParams",searchParams)
  const fetchInboxData = async () => {
    let tenantId = Digit.ULBService.getCurrentTenantId();
    const tenants = Digit.SessionStorage.get("Tenants").map(item => item.code).join(',');
    const codes = Digit.SessionStorage.get("Tenants").filter(item => item.code !== "pg")
    .map(item => item.code)
    .join(',');
    const sessionTenantId = Digit.SessionStorage.get("Employee.tenantId");
    const isCodePresent = (array, codeToCheck) =>{
      return array.some(item => item.code === codeToCheck);
    }
    const userRoles = Digit.SessionStorage.get("User")?.info?.roles || [];
    if (searchParams?.filters?.pgrQuery?.phcType) {
      tenantId = searchParams.filters.pgrQuery.phcType;
    } else if (searchParams?.search?.phcType) {
      tenantId = searchParams.search.phcType === "pg" ? tenants : searchParams.search.phcType;
    } else {
      tenantId = sessionTenantId === "pg" ? isCodePresent(userRoles, "COMPLAINT_RESOLVER") ? codes:tenants : sessionTenantId;
    }

    //const tenant =  Digit.SessionStorage.get("Employee.tenantId") == "pg"?  Digit.SessionStorage.get("Tenants").map(item => item.code).join(',') :Digit.SessionStorage.get("Employee.tenantId") 
    let serviceIds = [];
    let commonFilters = { start: 1, end: 10 };
    const { limit, offset } = searchParams;
    //console.log("serviceIdParamsserviceIdParams",searchParams.filters.wfFilters.assignee[0]?.code)
    let appFilters = { ...commonFilters, ...searchParams?.filters?.pgrQuery, ...searchParams?.search, limit, offset };
   let wfFilters
    if(searchParams?.filters?.wfFilters?.assignee?.[0]?.code !=="")
    {
     wfFilters = { ...commonFilters, ...searchParams?.filters?.wfQuery,assignee:searchParams?.filters?.wfFilters?.assignee?.[0]?.code}
    }
    else {
      wfFilters = { ...commonFilters, ...searchParams?.filters?.wfQuery}
    }
    
    
    let complaintDetailsResponse = null;
    let combinedRes = [];
    complaintDetailsResponse = await Digit.PGRService.search(tenantId, appFilters);
    console.log("STEP 5",tenantId, appFilters,complaintDetailsResponse,wfFilters,searchParams)
    complaintDetailsResponse.IncidentWrappers.forEach((incident) => serviceIds.push(incident.incident.incidentId));
    const serviceIdParams = serviceIds.join();
   
    const workflowInstances = await Digit.WorkflowService.getByBusinessId(tenantId, serviceIdParams, wfFilters, false);
    if (workflowInstances.ProcessInstances.length>0) {
      combinedRes = combineResponses(complaintDetailsResponse, workflowInstances).map((data) => ({
        ...data,
        sla: Math.round(data.sla / (24 * 60 * 60 * 1000)),
      }));
      
    }
    
   
    return combinedRes;
   
  };

  const result = useQuery(["fetchInboxData", 
  ...Object.keys(searchParams).map(i =>
      typeof searchParams[i] === "object" ? Object.keys(searchParams[i]).map(e => searchParams[i][e]) : searchParams[i]
     )],
  fetchInboxData,
  { staleTime: Infinity }
  );
  return { ...result, revalidate: () => client.refetchQueries(["fetchInboxData"]) };
};

const mapWfBybusinessId = (wfs) => {
  return wfs.reduce((object, item) => {
    return { ...object, [item["businessId"]]: item };
  }, {});
};

const combineResponses = (complaintDetailsResponse, workflowInstances) => {
  let wfMap = mapWfBybusinessId(workflowInstances.ProcessInstances);
  let data = [];
  complaintDetailsResponse.IncidentWrappers.map((complaint) => {
    if (wfMap?.[complaint.incident.incidentId]) {
      data.push({
        incidentId: complaint.incident.incidentId,
        incidentType:complaint.incident.incidentType,
        incidentSubType: complaint.incident.incidentSubType,
        phcType:complaint.incident.phcType,
        //priorityLevel : complaint.service.priority,
        //locality: complaint.service.address.locality.code,
        status: complaint.incident.applicationStatus,
        taskOwner: wfMap[complaint.incident.incidentId]?.assignes?.[0]?.name || "-",
        sla: wfMap[complaint.incident.incidentId]?.businesssServiceSla,
        tenantId: complaint.incident.tenantId,
      })
    }});
    
  return data;
};

export default useInboxData;
