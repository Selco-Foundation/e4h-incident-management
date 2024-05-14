import { useQuery } from "react-query";
import { MdmsService } from "../../services/elements/MDMS";

const useMDMS = (tenantId, moduleCode, type, config = {}, payload = []) => {
  const queryConfig = { staleTime: Infinity, ...config };

  const _default = () => {
    return useQuery([tenantId, moduleCode, type], () => MdmsService.getMultipleTypes(tenantId, moduleCode, type), config);
  };

  switch (type) {
    default:
      return _default();
  }
}

export default useMDMS;