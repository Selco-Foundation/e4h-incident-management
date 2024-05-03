import React from "react";

import {
  initPGRComponents,
  PGRReducers,
} from "@egovernments/digit-ui-module-pgr";




import {
  PaymentModule,
  PaymentLinks,
  paymentConfigs,
} from "@egovernments/digit-ui-module-common";
import { DigitUI } from "@egovernments/digit-ui-module-core";
import { initLibraries } from "@egovernments/digit-ui-libraries";


import { initReceiptsComponents, ReceiptsModule } from "@egovernments/digit-ui-module-receipts";
import { initOBPSComponents } from "@egovernments/digit-ui-module-obps";

import { initEngagementComponents } from "@egovernments/digit-ui-module-engagement";

import { initCustomisationComponents } from "./Customisations";
import { initCommonPTComponents } from "@egovernments/digit-ui-module-commonpt";
import { initBillsComponents } from "@egovernments/digit-ui-module-bills";
// import { initReportsComponents } from "@egovernments/digit-ui-module-reports";

initLibraries();

const enabledModules = [
  "PGR",
  
  "Payment",
  "PT",
  "QuickPayLinks",
 
  "NDSS",
  
  "HRMS",
  "TL",
  "Receipts",
  "OBPS",
  
  "Engagement",
  "CommonPT",
  
  "Reports",
  "Bills",
  "SW",
  "BillAmendment"
];
window.Digit.ComponentRegistryService.setupRegistry({
  ...paymentConfigs,
  PTModule,
  PTLinks,
  PaymentModule,
  PaymentLinks,
  ...PTComponents,
 
  HRMSModule,
  TLModule,
  TLLinks,
  // ReceiptsModule
});

initPGRComponents();



// initReceiptsComponents();
initOBPSComponents();

initEngagementComponents();

initCommonPTComponents();
initBillsComponents();
// initReportsComponents();
initCustomisationComponents();

const moduleReducers = (initData) => ({
  pgr: PGRReducers(initData),
});

function App() {
  const stateCode =
    window.globalConfigs?.getConfig("STATE_LEVEL_TENANT_ID") ||
    process.env.REACT_APP_STATE_LEVEL_TENANT_ID;
  if (!stateCode) {
    return <h1>stateCode is not defined</h1>;
  }
  return (
    <DigitUI
      stateCode={stateCode}
      enabledModules={enabledModules}
      moduleReducers={moduleReducers}
    />
  );
}

export default App;
