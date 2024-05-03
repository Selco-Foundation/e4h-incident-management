import React from "react";
import { CheckBox, Loader } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";

const Status = ({ complaints, onAssignmentChange, pgrfilters }) => {
  const { t } = useTranslation();
  const complaintsWithCount = [
    {
      code: "PENDINGFORASSIGNMENT",
      count: 933,
      name: "Acknowledged",
    },
    {
      code: "PENDINGFORREASSIGNMENT",
      count: 13,
      name: "Pending Grievance for reassignment at GRO",
    },
    {
      code: "PENDINGATLME",
      count: 28,
      name: "Pending Grievance at LME"
    },
    {
      code: "REJECTED",
      count: 13,
      name: "Rejected",
    },
    {
      code: "RESOLVED",
      count: 81,
      name: "Resolved",
    },
    {
      code: "CLOSEDAFTERREJECTION",
      count: 11,
      name: "Closed after rejection",
    },
    {
      code: "CLOSEDAFTERRESOLUTION",
      count: 73,
      name: "Closed",
    },
    {
      code: "PENDINGATSUPERVISOR",
      count: 66,
      name: "Pending Grievance At Supervisor",
    },
    {
      code: "RESOLVEDBYSUPERVISOR",
      count: 66,
      name: "Resolved By Supervisor",
    },
    {
      code: "CANCELLED",
      count: 4,
      name: "Cancelled",
    }
  ]
  console.log("complaintcount", complaintsWithCount)
  let hasFilters = pgrfilters?.applicationStatus?.length;
  return (
    <div className="status-container">
      <div className="filter-label">{t("ES_IM_FILTER_STATUS")}</div>
      {complaintsWithCount.length === 0 && <Loader />}
      {complaintsWithCount.map((option, index) => {
        return (
          <CheckBox
            key={index}
            onChange={(e) => onAssignmentChange(e, option)}
            checked={hasFilters ? (pgrfilters.applicationStatus.filter((e) => e.code === option.code).length !== 0 ? true : false) : false}
            label={`${option.name} `}
          />
        );
      })}
    </div>
  );
};

export default Status;
