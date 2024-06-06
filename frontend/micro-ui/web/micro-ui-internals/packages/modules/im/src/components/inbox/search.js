import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { TextInput, Label, SubmitBar, LinkLabel, ActionBar, CloseSvg, Dropdown } from "@egovernments/digit-ui-react-components";

const SearchComplaint = ({ onSearch, type, onClose, searchParams }) => {
  console.log("searchparams", searchParams)
  const [complaintNo, setComplaintNo] = useState(searchParams?.search?.serviceRequestId || "");
  const [phcType, setPhcType]=useState()
  console.log("ccc", complaintNo)
  const state = Digit.ULBService.getStateId();
  const { isMdmsLoading, data: mdmsData } = Digit.Hooks.pgr.useMDMS(state, "Incident", ["District","Block"]);
  const {  data: phcMenu  } = Digit.Hooks.pgr.useMDMS(state, "tenant", ["tenants"]);
  const phcMenus=Digit.SessionStorage.get("Employee.tenantId") !== "pg" ? Digit.SessionStorage.get("Tenants"):Digit.SessionStorage.get("IM_TENANTS").filter((item) => item.code !=="pg")
  let sortedPhcMenu=[];
  if(phcMenus.length>0){
    sortedPhcMenu=phcMenus.sort((a, b) => a.name.localeCompare(b.name));
  }
  const [mobileNo, setMobileNo] = useState(searchParams?.search?.mobileNumber || "");
  const { register, errors, handleSubmit, reset } = useForm();
  const { t } = useTranslation();

  const onSubmitInput = (data) => {
    console.log("subdatra", data,phcType)
    if (!Object.keys(errors).filter((i) => errors[i]).length) {
      if (data.serviceRequestId !== "" && phcType?.code !=="") {
        onSearch({ incidentId: data.serviceRequestId,phcType: phcType?.code });
      } else if (data.code !== "") {
        onSearch({ phcType: phcType?.code });
      } 
      else if(data.serviceRequestId !== "" ){
        onSearch({ incidentId: data.serviceRequestId})
      }
        else {
        onSearch({});
      }

      if (type === "mobile") {
        onClose();
      }
    }
  };

  function clearSearch() {
    reset();
    onSearch({});
    setComplaintNo("");
    setPhcType("");
  }

  const clearAll = () => {
    return (
      <LinkLabel className="clear-search-label" style={{color:"#7a2829"}}onClick={clearSearch}>
        {t("ES_COMMON_CLEAR_SEARCH")}
      </LinkLabel>
    );
  };

  function setComplaint(e) {
    setComplaintNo(e.target.value);
  }
useEffect(()=>{
console.log()
if(Digit.SessionStorage.get("Employee.tenantId") !== "pg" ? Digit.SessionStorage.get("Tenants"):Digit.SessionStorage.get("IM_TENANTS"))
{
  let empTenant = Digit.SessionStorage.get("Employee.tenantId")
  let filtered = Digit.SessionStorage.get("IM_TENANTS").filter((abc)=> abc.code ==empTenant)
  console.log("filtered",filtered)
  if(!filtered?.[0].code === "pg")
  {
    setPhcTypeFunction(filtered?.[0])
  }
 
}
},[])
  function setPhcTypeFunction(value) {
    setPhcType(value);
  }
  function setMobile(e) {
    setMobileNo(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit(onSubmitInput)} style={{ marginLeft: "24px" }}>
      <React.Fragment>
        <div className="search-container" style={{ width: "auto" }}>
          <div className="search-complaint-container">
            {type === "mobile" && (
              <div className="complaint-header">
                <h2> {t("CS_COMMON_SEARCH_BY")}:</h2>
                <span onClick={onClose}>
                  <CloseSvg />
                </span>
              </div>
            )}
            <div className="complaint-input-container" style={{display:"grid", height:"83px"}}>
              <span className="complaint-input">
                <Label style={{marginTop:"5px"}}>{t("CS_COMMON_TICKET_NO")}</Label>
                <TextInput
                  name="serviceRequestId"
                  value={complaintNo}
                  onChange={setComplaint}
                  inputRef={register({
                    pattern: /(?!^$)([^\s])/,
                  })}
                  style={{ marginBottom: "8px" }}
                ></TextInput>
              </span>
              <span className="mobile-input">
                <Label>{t("CS_COMMON_PHC_TYPE")}</Label>
                <Dropdown
                option={sortedPhcMenu}
                  //name="mobileNumber"
                  optionKey="name"
                  id="healthCentre"
                  selected={phcType}
                  select={setPhcTypeFunction}
                  // disable={true}
                  inputRef={register({
                    pattern: /^[6-9]\d{9}$/,
                  })}
                ></Dropdown>
              </span>
              {type === "desktop" && (
                <div style={{display:'flex', alignItems:'center',marginTop: "5px"}}>
                <SubmitBar
                  style={{ marginLeft: "10px" }}
                  label={t("ES_COMMON_SEARCH")}
                  submit={true}
                  disabled={Object.keys(errors).filter((i) => errors[i]).length}
                />
                <span className="clear-search" style={{color:"#7a2829", marginLeft:"15px", marginTop:"10px"}}>{clearAll()}</span>
                </div>
              )}
             </div>
            
          </div>
        </div>
        {type === "mobile" && (
          <ActionBar>
            <SubmitBar label="Search" submit={true} />
          </ActionBar>
        )}
      </React.Fragment>
    </form>
  );
};

export default SearchComplaint;
