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
      <img className="bannerLogo" src={"https://selco-assets.s3.ap-south-1.amazonaws.com/logo.png"} />
      <p>{t(`HEADER_TENANT_TENANTS_${stateInfo?.code.toUpperCase()}`)}</p>
    </div>
  );
}

export default Header;