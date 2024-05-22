import { useQuery, useQueryClient } from "react-query";

const useWorkflowDetails = ({ tenantId, id, moduleCode, role = "CITIZEN", serviceData = {}, getStaleData,  getTripData = false,config }) => {
  const queryClient = useQueryClient();

  const staleDataConfig = { staleTime: Infinity };
console.log("useWorkflowDetailsuseWorkflowDetails",tenantId,moduleCode, role = "CITIZEN", serviceData = {}, getStaleData,  getTripData = false,config)
  const { isLoading, error, isError, data } = useQuery(
    ["workFlowDetails", tenantId, id, moduleCode, role, config],
    () => Digit.WorkflowService.getDetailsById({ tenantId, id, moduleCode, role, getTripData }),
    getStaleData ? { ...staleDataConfig, ...config } : config
  );

  if (getStaleData) return { isLoading, error, isError, data };

  return { isLoading, error, isError, data, revalidate: () => queryClient.invalidateQueries(["workFlowDetails", tenantId, id, moduleCode, role]) };
};

export default useWorkflowDetails;
