import { useQuery, useQueryClient } from "react-query";

const useInboxData = (searchParams) => {
  const client = useQueryClient();
  // const [complaintList, setcomplaintList] = useState([]);
  // const user = Digit.UserService.getUser();
  // const tenantId = user?.info?.tenantId;


  const fetchInboxData = async () => {
    const tenantId = Digit.ULBService.getCurrentTenantId();
    let serviceIds = [];
    let commonFilters = { start: 1, end: 10 };
    const { limit, offset } = searchParams;
    let appFilters = { ...commonFilters, ...searchParams.filters.pgrQuery, ...searchParams.search, limit, offset };
    let wfFilters = { ...commonFilters, ...searchParams.filters.wfQuery };
    let complaintDetailsResponse = null;
    let combinedRes = [];
    complaintDetailsResponse = await Digit.PGRService.search(tenantId, appFilters);
    //complaintDetailsResponse=
   let  complaintDetailsResponse1=[
      {
      
      
        "responseInfo": {
            "apiId": "Rainmaker",
            "ver": null,
            "ts": null,
            "resMsgId": "uief87324",
            "msgId": "1711553495063|en_IN",
            "status": "successful"
        },
        "ServiceWrappers": [
            {
                "service": {
                    "active": true,
                    "citizen": {
                        "id": 2148,
                        "userName": "8080808000",
                        "name": "shilpa",
                        "type": "CITIZEN",
                        "mobileNumber": "8080808000",
                        "emailId": "",
                        "roles": [
                            {
                                "id": null,
                                "name": "Citizen",
                                "code": "CITIZEN",
                                "tenantId": "pg"
                            }
                        ],
                        "tenantId": "pg",
                        "uuid": "dda30b0a-ae2d-4f87-8b52-d1fc73ed7643",
                        "active": true
                    },
                    "id": "b213dcb1-14ab-44bf-8b88-4b3791a75a01",
                    "tenantId": "pg.citya",
                    "incidentType": "Bug",
                    "environmentType":"test",
                    "serviceRequestId": "PG-IM-2024-03-27-002320",
                    //"serviceRequestId1": "PG-IM-2024-03-27-002320",
                    "description": "",
                    "accountId": "dda30b0a-ae2d-4f87-8b52-d1fc73ed7643",
                    "rating": null,
                    "additionalDetail": {},
                    "applicationStatus": "PENDINGFORASSIGNMENT",
                    "source": "web",
                    
                    "auditDetails": {
                        "createdBy": "55fa55f0-5348-4eef-922c-2d36c50c56e1",
                        "lastModifiedBy": "55fa55f0-5348-4eef-922c-2d36c50c56e1",
                        "createdTime": 1711552512424,
                        "lastModifiedTime": 1711552512424
                    },
                    "priority": "LOW"
                },
                "workflow": {
                    "action": "APPLY",
                    "assignes": null,
                    "comments": null,
                    "verificationDocuments": null
                }
            }
        ],
      
        "complaintsResolved": 2,
        "averageResolutionTime": 6,
        "complaintTypes": 13
      },
    ]
   complaintDetailsResponse=complaintDetailsResponse1[0]
    console.log("complaintDetailsResponse", complaintDetailsResponse)
    complaintDetailsResponse.ServiceWrappers.forEach((service) => serviceIds.push(service.service.serviceRequestId));
    const serviceIdParams = serviceIds.join();
    const workflowInstances = await Digit.WorkflowService.getByBusinessId(tenantId, serviceIdParams, wfFilters, false);
    if (workflowInstances.ProcessInstances.length) {
      combinedRes = combineResponses(complaintDetailsResponse, workflowInstances).map((data) => ({
        ...data,
        sla: Math.round(data.sla / (24 * 60 * 60 * 1000)),
      }));
      console.log("combres", combineResponses)
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
  complaintDetailsResponse.ServiceWrappers.map((complaint) => {
    if ([complaint.service.serviceRequestId]) {
      data.push({
        serviceRequestId: complaint.service.serviceRequestId,
        incidentType: complaint.service.incidentType,
        environmentType:complaint.service.environmentType,
        
        status: complaint.service.applicationStatus,
        taskOwner: wfMap[complaint.service.serviceRequestId]?.assignes?.[0]?.name || "-",
        sla: wfMap[complaint.service.serviceRequestId]?.businesssServiceSla,
        tenantId: complaint.service.tenantId,
      })
    }});
  return data;
};

export default useInboxData;
