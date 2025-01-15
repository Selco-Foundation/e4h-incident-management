import { useTranslation } from "react-i18next";

const { useState, useEffect } = require("react");

const useServiceDefs = (tenantIdNew, moduleCode) => {
  const tenantId ="pg"
  const [localMenu, setLocalMenu] = useState([]);
  const SessionStorage = Digit.SessionStorage;
  let { t } = useTranslation();

  useEffect(() => {
    (async () => {
      console.log("getServiceDefsgetServiceDefs",tenantId)
      const serviceDefs = await Digit.MDMSService.getServiceDefs(tenantId, moduleCode);
      SessionStorage.set("serviceDefs", serviceDefs);

      const serviceDefsWithKeys = serviceDefs.map((def) => ({ ...def, i18nKey: t("SERVICEDEFS." + def.serviceCode.toUpperCase()) }));
      setLocalMenu(serviceDefsWithKeys);
    })();
  }, [t, tenantIdNew, moduleCode]);

  return localMenu;
};

export default useServiceDefs;
