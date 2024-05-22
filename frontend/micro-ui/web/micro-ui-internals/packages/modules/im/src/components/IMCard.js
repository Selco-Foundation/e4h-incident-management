import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { EmployeeModuleCard } from "@egovernments/digit-ui-react-components";


const IMCard = () => {
  const { t } = useTranslation();

  const allLinks = [
    { text: t("ES_IM_INBOX"), link: "/digit-ui/employee/im/inbox" },
    { text: t("ES_IM_NEW_COMPLAINT"), link: "/digit-ui/employee/im/incident/create", accessTo: ["COMPLAINANT"] },
  ];

  if (!Digit.Utils.pgrAccess()) {
    return null;
  }


  const [total, setTotal] = useState("-");
  console.log("total", total)
  const tenantId = window.Digit.SessionStorage.get("Employee.tenantId");
  useEffect(() => {
    (async () => {
      let response = await Digit.PGRService.count(tenantId,  {} );
      console.log("res", response)
      if (response?.count) {
        setTotal(response.count);
      }
    })();
  }, []);
 
  const Icon = () => <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
    <path d="M0 0h24v24H0z" fill="#7a2829"></path>
    <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9h-2V5h2v6zm0 4h-2v-2h2v2z" fill="white"></path>
  </svg>

  let propsForCSR =[
    {
      label: t("ES_IM_NEW_INCIDENT"),
      link: `/digit-ui/employee/im/incident/create`,
      role: "COMPLAINANT" || "EMPLOYEE"
    }
  ]

  propsForCSR = propsForCSR.filter(link => link.role && Digit.Utils.didEmployeeHasRole(link.role) );
console.log("propsForCSR",propsForCSR,Digit.Utils.didEmployeeHasRole("COMPLAINT"))
  const propsForModuleCard = {
    Icon: <Icon />,
    moduleName: t("ES_IM_INCIDENTS"),
    kpis: [
        {
           count: total,
            label: t("TOTAL_IM"),
            link: `/digit-ui/employee/im/inbox`
        },
        {
            label: t("TOTAL_NEARING_SLA"),
            link: `/digit-ui/employee/im/inbox`
        }
    ],
    links: [
    {
        label: t("ES_IM_INBOX"),
        link: `/digit-ui/employee/im/inbox`
    },
    ...propsForCSR
    ]
}

  return <EmployeeModuleCard {...propsForModuleCard} />
};
export default IMCard;