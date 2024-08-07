import { useEffect, useState } from "react";
import useComplaintStatus from "./useComplaintStatus";

const useComplaintStatusCount = (complaints,tenant) => {
  const [complaintStatusWithCount, setcomplaintStatusWithCount] = useState([]);
  let complaintStatus = useComplaintStatus();
  let tenantId = Digit.ULBService.getCurrentTenantId();
console.log("tenanttenanttenant",tenant)
  const getCount = async (value) => {
    console.log("tenanttenanttenanttenanttenant",tenant)
    let response = await Digit.PGRService.count(tenant, { applicationStatus: value });
    return response?.count || "";
  };

  useEffect(() => {
    let getStatusWithCount = async () => {
      let statusWithCount = complaintStatus.map(async (status) => ({
        ...status,
        count: await getCount(status.code),
      }));
      setcomplaintStatusWithCount(await Promise.all(statusWithCount));
    };
    getStatusWithCount();
  }, [complaints, complaintStatus]);
  return complaintStatusWithCount;
};

export default useComplaintStatusCount;
