import React from "react";
import { useTranslation } from "react-i18next";
import { Loader } from "@egovernments/digit-ui-react-components"

const Header = () => {
  const { data: storeData, isLoading } = Digit.Hooks.useStore.getInitData();
  const { stateInfo } = storeData || {};
  const { t } = useTranslation()

  if (isLoading) return <Loader/>;

  return (
    <div className="bannerHeader">
     <img className="bannerLogo" src={"https://selco-assets.s3.ap-south-1.amazonaws.com/TwoClr_horizontal_4X.png"} alt="Selco Foundation" style={{height:"60px", width:"170px", marginRight:"-35px", paddingRight:"0px",border:"0px",marginLeft:"-25px"}} />

<p style={{marginLeft:"-10px", paddingLeft:"10px",borderLeft:"1px solid black"}}>{t(`HEADER_TENANT_TENANTS_${stateInfo?.code.toUpperCase()}`)}</p>

    </div>
  );
}

export default Header;