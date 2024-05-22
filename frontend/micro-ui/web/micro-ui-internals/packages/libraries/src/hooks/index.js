import { useInitStore } from "./store";
import useWorkflowDetails from "./workflow";
import useSessionStorage from "./useSessionStorage";
import useQueryParams from "./useQueryParams";
import useDocumentSearch from "./useDocumentSearch";
import useClickOutside from "./useClickOutside";
import useAudit from "./core/useAudit";
import {
  useFetchPayment,
  usePaymentUpdate,
  useFetchCitizenBillsForBuissnessService,
  useFetchBillsForBuissnessService,
  useGetPaymentRulesForBusinessServices,
  useDemandSearch,
  useRecieptSearch,
  usePaymentSearch,
  useBulkPdfDetails,
} from "./payment";
import { useUserSearch } from "./userSearch";
import { useApplicationsForBusinessServiceSearch } from "./useApplicationForBillSearch";
import useBoundaryLocalities from "./useLocalities";
import useCommonMDMS from "./useMDMS";
import useCustomMDMS from "./useCustomMDMS";
import useCustomAPIHook from "./useCustomAPIHook";
import useInboxGeneral from "./useInboxGeneral/useInboxGeneral";
import useApplicationStatusGeneral from "./useStatusGeneral";
import useModuleTenants from "./useModuleTenants";
import useStore from "./useStore";
import { useTenants } from "./useTenants";
import useInbox from "./useInbox";
import { useEvents, useClearNotifications, useNotificationCount } from "./events";
import useCreateEvent from "./events/useCreateEvent";
import useUpdateEvent from "./events/useUpdateEvent";
import useNewInboxGeneral from "./useInboxGeneral/useNewInbox";
import useDynamicData from "./useDynamicData";

import useComplaintDetails from "./pgr/useComplaintDetails";
import { useComplaintsList, useComplaintsListByMobile } from "./pgr/useComplaintList";
import useComplaintStatus from "./pgr/useComplaintStatus";
import useComplaintTable from "./pgr/useComplaintTable";
import useComplaintTypes from "./pgr/useComplaintTypes";
import useEmployeeFilter from "./pgr/useEmployeeFilter";
import useInboxData from "./pgr/useInboxData";
import useLocalities from "./pgr/useLocalities";
import useServiceDefs from "./pgr/useServiceDefs";
import usePGRTenants from "./pgr/useTenants";
import usePGRMDMS from "./pgr/useMDMS";
import useComplaintSubType from "./pgr/useComplaintSubType";
import useComplaintStatusCount from "./pgr/useComplaintStatusWithCount";







import useEmployeeSearch from "./useEmployeeSearch";















import useReceiptsSearch from "./receipts/useReceiptsSearch";
import useReceiptsMDMS from "./receipts/useReceiptsMDMS";
import useReceiptsUpdate from "./receipts/useReceiptsUpdate";






import useEventInbox from "./events/useEventInbox";
import useEventDetails from "./events/useEventDetails";


import useSurveyCreate from "./surveys/useCreate";
import useSurveyDelete from "./surveys/useDelete";
import useSurveyUpdate from "./surveys/useUpdate";
import useSurveySearch from "./surveys/useSearch";
import useSurveyShowResults from "./surveys/useShowResults";
import useSurveySubmitResponse from "./surveys/useSubmitResponse";
import useSurveyInbox from "./surveys/useSurveyInbox";





import useAccessControl from "./useAccessControl";

import useBillSearch from "./bills/useBillSearch";
import useCancelBill from "./bills/useCancelBill";

import useTenantsBills from "./bills/useTenants";


//import useRouteSubscription from "./fsm/useRouteSubscription";
import useHRMSSearch from "./hrms/useHRMSsearch";
import useHrmsMDMS from "./hrms/useHRMSMDMS";
import useHRMSCreate from "./hrms/useHRMScreate";
import useHRMSUpdate from "./hrms/useHRMSUpdate";
import useHRMSCount from "./hrms/useHRMSCount";
import useHRMSGenderMDMS from "./hrms/useHRMSGender";
import useGetHowItWorksJSON from "./useHowItWorksJSON";
import useGetFAQsJSON from "./useGetFAQsJSON";

import useStaticData from "./useStaticData";
import useBillAmendmentInbox from "./billAmendment/useInbox";
import { usePrivacyContext } from "./usePrivacyContext";

import useFeedBackSearch from "./useFeedBackSearch";

const pgr = {
  useComplaintDetails,
  useComplaintsList,
  useComplaintsListByMobile,
  useComplaintStatus,
  useComplaintTable,
  useComplaintTypes,
  useEmployeeFilter,
  useInboxData,
  useLocalities,
  useServiceDefs,
  useTenants: usePGRTenants,
  useComplaintSubType,
  
  useComplaintStatusCount,
  useMDMS: usePGRMDMS,
};
const hrms = {
  useHRMSSearch,
  useHrmsMDMS,
  useHRMSCreate,
  useHRMSUpdate,
  useHRMSCount,
  useHRMSGenderMDMS,
};
const receipts = {
  useReceiptsMDMS,
  useReceiptsSearch,
  useReceiptsUpdate,
};
const events = {
  useInbox: useEventInbox,
  useCreateEvent,
  useEventDetails,
  useUpdateEvent,
};


const survey = {
  useCreate: useSurveyCreate,
  useUpdate: useSurveyUpdate,
  useDelete: useSurveyDelete,
  useSearch: useSurveySearch,
  useSubmitResponse: useSurveySubmitResponse,
  useShowResults: useSurveyShowResults,
  useSurveyInbox,
};



const Hooks = {
  useSessionStorage,
  useQueryParams,
  useFetchPayment,
  usePaymentUpdate,
  useFetchCitizenBillsForBuissnessService,
  useFetchBillsForBuissnessService,
  useGetPaymentRulesForBusinessServices,
  useWorkflowDetails,
  useInitStore,
  useClickOutside,
  useUserSearch,
  useApplicationsForBusinessServiceSearch,
  useDemandSearch,
  useInboxGeneral,
  useEmployeeSearch,
  useBoundaryLocalities,
  useCommonMDMS,
  useApplicationStatusGeneral,
  useModuleTenants,
  useRecieptSearch,
  usePaymentSearch,
  useNewInboxGeneral,
  useEvents,
  useClearNotifications,
  useNotificationCount,
  useStore,
  useDocumentSearch,
  useTenants,
  hrms,
  useFeedBackSearch,
  useAccessControl,
  useBillSearch,
  useCancelBill,
  useTenantsBills,
  usePrivacyContext,
  pgr,
  receipts,
  events,
  survey,
  useCustomMDMS,
  useCustomAPIHook,
  useGetHowItWorksJSON,
  useGetFAQsJSON,
  useStaticData,
  useDynamicData,
  useBulkPdfDetails,
  useBillAmendmentInbox,
  useAudit,
};

export default Hooks;
