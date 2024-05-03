import { useEffect, useState } from "react";
import useComplaintStatus from "./useComplaintStatus";

const useComplaintStatusCount = (complaints) => {
  const [complaintStatusWithCount, setcomplaintStatusWithCount] = useState([]);
  console.log("complaints", complaints, complaintStatusWithCount)
  let complaintStatus = useComplaintStatus();
  let tenantId = Digit.ULBService.getCurrentTenantId();

  const getCount = async (value) => {
    let response = "";
    return response || "";
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
