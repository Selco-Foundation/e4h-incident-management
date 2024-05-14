import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const useEmployeeFilter = (tenantId, roles, complaintDetails,isActive) => {
  const [employeeDetails, setEmployeeDetails] = useState(null);
  console.log("empdetails", employeeDetails)
  const { t } = useTranslation();
  useEffect(() => {
    (async () => {
      // const _roles = roles.join(",");
      const searchResponse = await Digit.PGRService.employeeSearch(tenantId, roles,isActive );
      console.log("serchres", searchResponse)
      const serviceDefs = await Digit.MDMSService.getServiceDefs(tenantId, "Incident");
      console.log("menu", serviceDefs)
      const incidentSubType = complaintDetails.incident.incidentSubType;
      console.log("inc", incidentSubType)
      const service = serviceDefs?.find((def) => def.serviceCode === incidentSubType);
      console.log("serviceeeeee",service)
      const department = service?.department;
      let employees=[]
      if(searchResponse.Employees.length!==0){
      employees = searchResponse.Employees.filter((employee) =>
        employee.assignments.map((assignment) => assignment.department).includes(department)
      );
      }
      if(employees.length!==0){
      //emplpoyess data sholld only conatin name uuid dept
      setEmployeeDetails([
        {
          department: t(`COMMON_MASTERS_DEPARTMENT_${department}`),
          employees: employees.map((employee) => {
          return { uuid: employee.user.uuid, name: employee.user.name}})
        }
      ])
    }
    })();
  }, [tenantId, roles, t, complaintDetails]);


  return employeeDetails;
};

export default useEmployeeFilter;
