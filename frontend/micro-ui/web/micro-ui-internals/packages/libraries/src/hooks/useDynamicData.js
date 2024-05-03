import { useQuery } from "react-query";


import { PGRService } from "../services/elements/PGR";
import { endOfToday, start } from "date-fns";
import { WSService } from "../services/elements/WS";


import { format, subMonths } from "date-fns";

const useDynamicData = ({moduleCode ,tenantId, filters, t }) => {
    

   
    const usePGRDynamicData = () => {
        const { isLoading, error, data, isSuccess } =  useQuery(['PGR_OPEN_SEARCH', tenantId, filters], async () => await PGRService.PGROpensearch({ tenantId, filters }), 
        {select: (data) => {
            const pgrData = {
                dynamicDataOne : data?.complaintsResolved === 0 || data?.complaintsResolved === null ? null : data?.complaintsResolved + " " + t("COMPLAINTS_RESOLVED_IN_LAST_30_DAYS"),
                dynamicDataTwo : data?.averageResolutionTime === 0 || data?.averageResolutionTime === null ? null : data?.averageResolutionTime + " " + (data?.averageResolutionTime === 1 ? t("COMMON_DAY") : t("COMMON_DAYS")) + " " + t("IS_AVG_COMPLAINT_RESOLUTION_TIME"),
                staticData : data?.complaintTypes === 0 || data?.complaintTypes === null ? null : data?.complaintTypes
            }
            return pgrData;
        }});
        return { isLoading, error, data, isSuccess };
    }
    

        

    const useWSDynamicData = () => {
        const { isLoading, error, data, isSuccess } =  useQuery(['WS_OPEN_SEARCH_DSS', tenantId], async () => await WSService.WSOpensearch({
            module: "WS",
            tenantId: tenantId
        }), 
        {select: (data) => {
            const wsData = {
                dynamicDataOne : data?.wstotalCollection === 0 || data?.wstotalCollection === null ? null : `₹ ${data?.wstotalCollection}` + " " +  t("PAID_IN_LAST_12_MONTHS_TOWARDS_WS_CHARGES"),
                dynamicDataTwo : data?.wstotalConnection === 0 || data?.wstotalConnection === null ? null : data?.wstotalConnection + " " + t("ACTIVE_CONNECTIONS_PRESENT_IN") + " " + t(tenantId),
            }
            return wsData;
        }});
        return { isLoading, error, data, isSuccess };
    }

   

    switch(moduleCode){
       
        
        case 'PGR':
            return usePGRDynamicData();
        case 'WS':                                         
            return useWSDynamicData();
       
      
        default:
            return {isLoading: false, error: false, data: null, isSuccess: false};
    }
    
  };

export default useDynamicData;