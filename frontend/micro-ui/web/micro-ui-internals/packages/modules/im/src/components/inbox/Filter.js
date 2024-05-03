import React, { useEffect, useMemo, useState } from "react";
import { Dropdown, RadioButtons, ActionBar, RemoveableTag, RoundedLabel } from "@egovernments/digit-ui-react-components";
import { ApplyFilterBar, CloseSvg } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import Status from "./Status";

let pgrQuery = {};
let wfQuery = {};

const Filter = (props) => {
  let { uuid } = Digit.UserService.getUser().info;
  const { searchParams } = props;
  const { t } = useTranslation();
  const isAssignedToMe = searchParams?.filters?.wfFilters?.assignee && searchParams?.filters?.wfFilters?.assignee[0]?.code ? true : false;

  const assignedToOptions = useMemo(
    () => [
      { code: "ASSIGNED_TO_ME", name: t("ASSIGNED_TO_ME") },
      { code: "ASSIGNED_TO_ALL", name: t("ASSIGNED_TO_ALL") },
    ],
    [t]
  );

  const [selectAssigned, setSelectedAssigned] = useState(isAssignedToMe ? assignedToOptions[0] : assignedToOptions[1]);

  useEffect(() => setSelectedAssigned(isAssignedToMe ? assignedToOptions[0] : assignedToOptions[1]), [t]);

  const [selectedComplaintType, setSelectedComplaintType] = useState(null);
  console.log("selct", selectedComplaintType)
  //const [selectedLocality, setSelectedLocality] = useState(null);
  const [selectedHealthCare, setSelectedHealthCare]=useState(null);
  const [pgrfilters, setPgrFilters] = useState(
    searchParams?.filters?.pgrfilters || {
      serviceCode: [],
      healthcare: [],
      applicationStatus: [],
    }
  );

  const [wfFilters, setWfFilters] = useState(
    searchParams?.filters?.wfFilters || {
      assignee: [{ code: uuid }],
    }
  );

  const tenantId = Digit.ULBService.getCurrentTenantId();
  // let localities = Digit.Hooks.pgr.useLocalities({ city: tenantId });
  const { data: localities } = Digit.Hooks.useBoundaryLocalities(tenantId, "admin", {}, t);
  const healthCentreMenu=[
    {
      "name":"Aidbhavi Sub Centre",
      "code":"Aidbhavi Sub Centre"
    },
    {
      "name":"Alkod Sub Centre",
      "code":"Alkod Sub Centre"
    },
    {
      "name":"Alopatic Hospital LBS Nagar Sub Centre",
      "code":"Alopatic Hospital LBS Nagar Sub Centre"
    },
    {
      "name":"Ambamath Sub Centre",
      "code":"Ambamath Sub Centre"
    },
    {
      "name":"Amdihal Sub Centre",
      "code":"Amdihal Sub Centre"
    },

   ]
   let serviceDefs= [
    {
      "serviceCode": "CrackPanelStone",
      "name": "Crack on Panel (Due to stone pelting)",
      "keywords": "panel, crack, stone, pelting, repair, damage, fix",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "Panel",
      "active": true
    },
    {
      "serviceCode": "CrackPanelTree",
      "name": "Crack on Panel (Due to tree branches)",
      "keywords": "panel, crack, tree, branches, repair, damage, fix",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "Panel",
      "active": true
    },
    {
      "serviceCode": "CrackPanelMonkey",
      "name": "Crack on Panel (Due to Monkeys)",
      "keywords": "panel, crack, monkey, branches, repair, damage, fix",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "Panel",
      "active": true
    },
    {
      "serviceCode": "HotspotOnPanels",
      "name": "Hotspot on Panels",
      "keywords": "hot spot,panels",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "Panel",
      "active": true
    },
    {
      "serviceCode": "CrackPanelOther",
      "name": "Crack on Panel (other)",
      "keywords": "panel, crack, other, branches, repair, damage, fix",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "Panel",
      "active": true
    },
    {
      "serviceCode": "DustOnPanels",
      "name": "Dust on Panels",
      "keywords": "dust, panel",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "Panel",
      "active": true
    },
    {
      "serviceCode": "PaneldisplacedWind",
      "name": "Panel displaced from MMS (Due to heavy wind)",
      "keywords": "displaced, mms, wind, heavy",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "Panel",
      "active": true
    },
    {
      "serviceCode": "PaneldisplacedCentre",
      "name": "Panel displaced from MMS (by the health center)",
      "keywords": "displaced, mms, wind, health center",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "Panel",
      "active": true
    },
    {
      "serviceCode": "ShadeOnPanels",
      "name": "Shade on Panels",
      "keywords": "shade, panel, on",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "Panel",
      "active": true
    },
    {
      "serviceCode": "Theft",
      "name": "Theft",
      "keywords": "theft",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "Panel",
      "active": true
    },
    {
      "serviceCode": "Other",
      "name": "Other",
      "keywords": "other",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "Panel",
      "active": true
    },
    {
      "serviceCode": "ShutdownLightning",
      "name": "Shut down (Due to Lightning)",
      "keywords": "inverter, shutdown, lightning, repair, damage, fix",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "Inverter",
      "active": true
    },
    {
      "serviceCode": "ShutDownGrid",
      "name": "Shut down (Due to Grid issues)",
      "keywords": "inverter, shutdown, grid, repair, damage, fix",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "Inverter",
      "active": true
    },
    {
      "serviceCode": "TrippingGridIssues",
      "name": "Tripping (Due to grid issues)",
      "keywords": "tripping, grid, issues",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "Inverter",
      "active": true
    },
    {
      "serviceCode": "TrippingMCBIssue",
      "name": "Tripping (Due to MCB rating issues)",
      "keywords": "tripping, MCB, issues",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "Inverter",
      "active": true
    },
    {
      "serviceCode": "TrippingExtraLoads",
      "name": "Tripping (Due to extra loads)",
      "keywords": "tripping, extra, loads",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "Inverter",
      "active": true
    },
    {
      "serviceCode": "DisplayNotWorking",
      "name": "Display not Working",
      "keywords": "display, not, working",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "Inverter",
      "active": true
    },
    {
      "serviceCode": "FanNotWorking",
      "name": "Fan not Working",
      "keywords": "fans, not, working",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "Inverter",
      "active": true
    },
    {
      "serviceCode": "ContinuousBuzzer",
      "name": "Continuous Buzzer",
      "keywords": "continuous, buzzer",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "Inverter",
      "active": true
    },
    {
      "serviceCode": "AbnormalSound",
      "name": "Abnormal Sound",
      "keywords": "abnormal, sound",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "Inverter",
      "active": true
    },
    {
      "serviceCode": "Errorondisplay",
      "name": "Error on Display",
      "keywords": "error, on, display",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "Inverter",
      "active": true
    },
    {
      "serviceCode": "Theft",
      "name": "Theft",
      "keywords": "theft",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "Inverter",
      "active": true
    },
    {
      "serviceCode": "Other",
      "name": "Other",
      "keywords": "other",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "Inverter",
      "active": true
    },
    {
      "serviceCode": "BatteryShortCircuit",
      "name": "Burned (Due to short circuit)",
      "keywords": "batter, burned, short circuit, repair, damage, fix",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "Battery",
      "active": true
    },
    {
      "serviceCode": "Burnedduetolightning",
      "name": "Burned (Due to Lightning)",
      "keywords": "battery, burned, lightning",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "Battery",
      "active": true
    },
    {
      "serviceCode": "BlastedShortCircuit",
      "name": "Blasted (Due to short circuit)",
      "keywords": "short, circuit, blasted",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "Battery",
      "active": true
    },
    {
      "serviceCode": "NoPetroleumGel",
      "name": "No Petroleum Gel at termination points",
      "keywords": "pertrol, get, termincation",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "Battery",
      "active": true
    },
    {
      "serviceCode": "LowBatteryWaterLevel",
      "name": "Low Battery Water Level",
      "keywords": "low, battery,water,level",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "Battery",
      "active": true
    },
    {
      "serviceCode": "BreakageofCaps",
      "name": "Breakage of Caps",
      "keywords": "breakage, caps",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "Battery",
      "active": true
    },
    {
      "serviceCode": "Physicaldamagebatteries",
      "name": "Physical damage to batteries",
      "keywords": "physical, damage, batteries",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "Battery",
      "active": true
    },
    {
      "serviceCode": "Lowbatterybackup",
      "name": "Low battery backup",
      "keywords": "low, battery, backup",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "Battery",
      "active": true
    },
    {
      "serviceCode": "Theft",
      "name": "Theft",
      "keywords": "theft",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "Battery",
      "active": true
    },
    {
      "serviceCode": "Acidleakage",
      "name": "Acid Leakage",
      "keywords": "acid, leakage",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "Battery",
      "active": true
    },
    {
      "serviceCode": "Other",
      "name": "Other",
      "keywords": "Other",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "Battery",
      "active": true
    },
    {
      "serviceCode": "BurnedIndoorlights",
      "name": "Burned_Indoor lights",
      "keywords": "Burned, indoor, lights",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "Lights Fans",
      "active": true
    },
    {
      "serviceCode": "Notworkingindoorlights",
      "name": "Not working_Indoor lights",
      "keywords": "Not, working, indoor, lights",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "Lights Fans",
      "active": true
    },
    {
      "serviceCode": "SwitchissueIndoorlights",
      "name": "Switch issue_Indoor lights",
      "keywords": "switch, issue, indoor lights",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "Lights Fans",
      "active": true
    },
    {
      "serviceCode": "Burnedoutdoorlights",
      "name": "Burned_Outdoor lights",
      "keywords": "burned, outdoor, lights",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "Lights Fans",
      "active": true
    },
    {
      "serviceCode": "NotworkingOutdoorlights",
      "name": "Not working_Outdoor lights",
      "keywords": "not, working, outdoor, lights",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "Lights Fans",
      "active": true
    },
    {
      "serviceCode":"Switchissue_Outdoorlights",
      "name": "Switch issue_Outdoor lights",
      "keywords": "switch, issue, outdoor, lights",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "Lights Fans",
      "active": true
    },
    {
      "serviceCode":"Not working_Street lights",
      "name": "Not working_Street lights",
      "keywords": "Not, working, street, lights",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "Lights Fans",
      "active": true
    },
    {
      "serviceCode":"Switchissuestreetlights",
      "name": "Switch issue_Street lights",
      "keywords": "switch, issue, street, lights",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "Lights Fans",
      "active": true
    },
    {
      "serviceCode":"TheftLights",
      "name": "Theft_Lights",
      "keywords": "theft, lights",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "Lights Fans",
      "active": true
    },
    {
      "serviceCode":"otherlights",
      "name": "Other_Lights",
      "keywords": "other, lights",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "Lights Fans",
      "active": true
    },
    {
      "serviceCode":"burnedfans",
      "name": "Burned_Fans",
      "keywords": "burned, fans",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "Lights Fans",
      "active": true
    },
    {
      "serviceCode":"Notworkingfans",
      "name": "Not working_Fans",
      "keywords": "not, working, fans",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "Lights Fans",
      "active": true
    },
    {
      "serviceCode":"RegulatorIssueFans",
      "name": "Regulator Issue_Fans",
      "keywords": "regulator, issue, fans",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "Lights Fans",
      "active": true
    },
    {
      "serviceCode":"lowspeedfans",
      "name": "Low speed_Fans",
      "keywords": "regulator, issue, fans",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "Lights Fans",
      "active": true
    },
    {
      "serviceCode":"theftfans",
      "name": "Theft_Fans",
      "keywords": "theft, fans",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "Lights Fans",
      "active": true
    },
    {
      "serviceCode":"OtherFans",
      "name": "Other_Fans",
      "keywords": "other, fans",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "Lights Fans",
      "active": true
    },
    {
      "serviceCode":"Burnedduetolightning",
      "name": "Burned_Due to Lightning",
      "keywords": "burned, due, lightning",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "SWH",
      "active": true
    },
    {
      "serviceCode":"burnedshortcircuit",
      "name": "Burned_Short circuit",
      "keywords": "burned, short, circuit",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "SWH",
      "active": true
    },
    {
      "serviceCode":"burnedother",
      "name": "Burned_Other",
      "keywords": "burned, other",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "SWH",
      "active": true
    },
    {
      "serviceCode":"NotWorking",
      "name": "Not Working",
      "keywords": "not, working",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "SWH",
      "active": true
    },
    {
      "serviceCode":"loosecables",
      "name": "Loose Cables",
      "keywords": "not, working",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "SWH",
      "active": true
    },
    {
      "serviceCode":"abnormalsound",
      "name": "Abnormal sound",
      "keywords": "abnormal, sound",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "SWH",
      "active": true
    },
    {
      "serviceCode":"Theft",
      "name": "Theft",
      "keywords": "theft",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "SWH",
      "active": true
    },
    {
      "serviceCode":"Others",
      "name": "others",
      "keywords": "others",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "SWH",
      "active": true
    },
    {
      "serviceCode":"Burnedduetolightning",
      "name": "Burned_Due to Lightning",
      "keywords": "burned, due, lightning",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "SWP",
      "active": true
    },
    {
      "serviceCode":"burnedshortcircuit",
      "name": "Burned_Short circuit",
      "keywords": "burned, short, circuit",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "SWP",
      "active": true
    },
    {
      "serviceCode":"burnedother",
      "name": "Burned_Other",
      "keywords": "burned, other",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "SWP",
      "active": true
    },
    {
      "serviceCode":"NotWorking",
      "name": "Not Working",
      "keywords": "not, working",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "SWP",
      "active": true
    },
    {
      "serviceCode":"loosecables",
      "name": "Loose Cables",
      "keywords": "not, working",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "SWP",
      "active": true
    },
    {
      "serviceCode":"abnormalsound",
      "name": "Abnormal sound",
      "keywords": "abnormal, sound",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "SWP",
      "active": true
    },
    {
      "serviceCode":"Theft",
      "name": "Theft",
      "keywords": "theft",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "SWP",
      "active": true
    },
    {
      "serviceCode":"Others",
      "name": "others",
      "keywords": "others",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "SWP",
      "active": true
    },
    {
      "serviceCode":"Burnedduetolightning",
      "name": "Burned_Due to Lightning",
      "keywords": "others",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "LIGHTNING ARRESTOR",
      "active": true
    },
    {
      "serviceCode":"Burnedshortcircuit",
      "name": "Burned_Short circuit",
      "keywords": "burned, short, circuit",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "LIGHTNING ARRESTOR",
      "active": true
    },
    {
      "serviceCode":"Burnedother",
      "name": "Burned_Other",
      "keywords": "burned, other",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "LIGHTNING ARRESTOR",
      "active": true
    },
    {
      "serviceCode":"Broken",
      "name": "Broken",
      "keywords": "broken",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "LIGHTNING ARRESTOR",
      "active": true
    },
    {
      "serviceCode":"Theft",
      "name": "Theft",
      "keywords": "theft, lighting, arrestor",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "LIGHTNING ARRESTOR",
      "active": true
    },
    {
      "serviceCode":"Other",
      "name": "Other",
      "keywords": "other, lighting, arrestor",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "LIGHTNING ARRESTOR",
      "active": true
    },
    {
      "serviceCode":"Burnedduetolightning",
      "name": "Burned_Due to Lightning",
      "keywords": "others",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "EARTHING CONNECTION",
      "active": true
    },
    {
      "serviceCode":"Burnedshortcircuit",
      "name": "Burned_Short circuit",
      "keywords": "burned, short, circuit",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "EARTHING CONNECTION",
      "active": true
    },
    {
      "serviceCode":"Burnedother",
      "name": "Burned_Other",
      "keywords": "burned, other",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "EARTHING CONNECTION",
      "active": true
    },
    {
      "serviceCode":"Broken",
      "name": "Broken",
      "keywords": "broken",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "EARTHING CONNECTION",
      "active": true
    },
    {
      "serviceCode":"Theft",
      "name": "Theft",
      "keywords": "theft, lighting, arrestor",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "EARTHING CONNECTION",
      "active": true
    },
    {
      "serviceCode":"Other",
      "name": "Other",
      "keywords": "other, lighting, arrestor",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "EARTHING CONNECTION",
      "active": true
    },
    {
      "serviceCode":"Burnedduetolightning",
      "name": "Burned_Due to Lightning",
      "keywords": "others",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "GIPB",
      "active": true
    },
    {
      "serviceCode":"Burnedshortcircuit",
      "name": "Burned_Short circuit",
      "keywords": "burned, short, circuit",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "GIPB",
      "active": true
    },
    {
      "serviceCode":"Burnedother",
      "name": "Burned_Other",
      "keywords": "burned, other",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "GIPB",
      "active": true
    },
    {
      "serviceCode":"Theft",
      "name": "Theft",
      "keywords": "theft, lighting, arrestor",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "GIPB",
      "active": true
    },
    {
      "serviceCode":"Other",
      "name": "Other",
      "keywords": "other, lighting, arrestor",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "GIPB",
      "active": true
    },
    {
      "serviceCode":"Tripping",
      "name": "Tripping",
      "keywords": "tripping",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "GIPB",
      "active": true
    },
    {
      "serviceCode":"MCBOff",
      "name": "MCB Off",
      "keywords": "MCB Off",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "GIPB",
      "active": true
    },
    {
      "serviceCode":"Burnedduetolightning",
      "name": "Burned_Due to Lightning",
      "keywords": "others",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "AJB",
      "active": true
    },
    {
      "serviceCode":"Burnedshortcircuit",
      "name": "Burned_Short circuit",
      "keywords": "burned, short, circuit",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "AJB",
      "active": true
    },
    {
      "serviceCode":"Burnedother",
      "name": "Burned_Other",
      "keywords": "burned, other",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "AJB",
      "active": true
    },
    {
      "serviceCode":"Theft",
      "name": "Theft",
      "keywords": "theft, lighting, arrestor",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "AJB",
      "active": true
    },
    {
      "serviceCode":"Other",
      "name": "Other",
      "keywords": "other, lighting, arrestor",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "AJB",
      "active": true
    },
    {
      "serviceCode":"Tripping",
      "name": "Tripping",
      "keywords": "tripping",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "AJB",
      "active": true
    },
    {
      "serviceCode":"MCBOff",
      "name": "MCB Off",
      "keywords": "MCB Off",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "AJB",
      "active": true
    },
    {
      "serviceCode":"NoSPDinAJB",
      "name": "No SPD in AJB",
      "keywords": "no, spd, AJB",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "AJB",
      "active": true
    },
    {
      "serviceCode":"Spotlight",
      "name": "Spot Light",
      "keywords": "spot, light",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "EEME",
      "active": true
    },
    {
      "serviceCode":"RadiantWarmer",
      "name": "Radiant Warmer",
      "keywords": "radiant, warmer",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "EEME",
      "active": true
    },
    {
      "serviceCode":"Suctionapparatus",
      "name": "Suction apparatus",
      "keywords": "suction, apparatus",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "EEME",
      "active": true
    },
    {
      "serviceCode":"Labourtable",
      "name": "Labour table",
      "keywords": "labour, table",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "EEME",
      "active": true
    },
    {
      "serviceCode":"Deliverykit",
      "name": "Delivery kit",
      "keywords": "delivery, kit",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "EEME",
      "active": true
    },
    {
      "serviceCode":"Footstep",
      "name": "Foot Step",
      "keywords": "foot, step",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "EEME",
      "active": true
    },
    {
      "serviceCode":"Trolley",
      "name": "Trolley",
      "keywords": "foot, step",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "EEME",
      "active": true
    },
    {
      "serviceCode":"Portablevaccinecarrier",
      "name": "Portable vaccine carrier",
      "keywords": "portable, vaccine, carrier",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "EEME",
      "active": true
    },
    {
      "serviceCode":"ILR",
      "name": "ILR",
      "keywords": "ILR",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "EEME",
      "active": true
    },
    {
      "serviceCode":"Refrigerator",
      "name": "Refrigerator",
      "keywords": "refrigerator",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "EEME",
      "active": true
    },
    {
      "serviceCode":"AutomatedExternal Defibrillator",
      "name": "Automated External Defibrillator",
      "keywords": "automated, external, defibrillator",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "EEME",
      "active": true
    },
    {
      "serviceCode":"CBCMachine",
      "name":"CBC Machine",
      "keywords": "cbc, Machine",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "EEME",
      "active": true
    },
    {
      "serviceCode":"Autoclave",
      "name":"Autoclave",
      "keywords": "Autoclave",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "EEME",
      "active": true
    },
    {
      "serviceCode":"Centrifuge",
      "name":"Centrifuge",
      "keywords": "centrifuge",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "EEME",
      "active": true
    },
    {
      "serviceCode":"ECG",
      "name":"ECG (12 Leads)",
      "keywords": "ecg, 12, leads",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "EEME",
      "active": true
    },
    {
      "serviceCode":"Hematologyanalyser",
      "name":"Hematology analyser",
      "keywords": "hematology,analyser",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "EEME",
      "active": true
    },
    {
      "serviceCode":"Biochemistryanalyser",
      "name":"Biochemistry analyser",
      "keywords": "biochemistry,analyser",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "EEME",
      "active": true
    },
    {
      "serviceCode":"Hematologyanalyser",
      "name":"Hematology analyser",
      "keywords": "hematology,analyser",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "EEME",
      "active": true
    },
    {
      "serviceCode":"Microscope",
      "name":"Microscope",
      "keywords": "microscope",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "EEME",
      "active": true
    },
    {
      "serviceCode":"Multiparamonitor",
      "name":"Multipara monitor with provision of invasive parameter measurements",
      "keywords": "multipara, monitor, invasive, parameter, measurements",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "EEME",
      "active": true
    },
    {
      "serviceCode":"Nebulisermachine",
      "name":"Nebuliser machine",
      "keywords": "nebuliser, machine",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "EEME",
      "active": true
    },
    {
      "serviceCode":"USGPortable",
      "name":"USG (Portable)",
      "keywords": "USG, portable",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "EEME",
      "active": true
    },
    {
      "serviceCode":"Needlecutter",
      "name":"Needle Cutter",
      "keywords": "Needle, Cutter",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "EEME",
      "active": true
    },
    {
      "serviceCode":"OxygenConcentrator",
      "name":"Oxygen Concentrator",
      "keywords": "oxygen, concentrator",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "EEME",
      "active": true
    },
    {
      "serviceCode":"Waterpurifier",
      "name":"Water Purifier",
      "keywords": "water, purifier",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "EEME",
      "active": true
    },
    {
      "serviceCode":"phototherapyunit",
      "name":"Phototherapy unit",
      "keywords": "phototherapy, unit",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "EEME",
      "active": true
    },
    {
      "serviceCode":"OTlight",
      "name":"OT Light",
      "keywords": "ot, light",
      "department": "O&M",
      "slaHours": 336,
      "menuPath": "EEME",
      "active": true
    }   
  ]
  const onRadioChange = (value) => {
    setSelectedAssigned(value);
    uuid = value.code === "ASSIGNED_TO_ME" ? uuid : "";
    setWfFilters({ ...wfFilters, assignee: [{ code: uuid }] });
  };

  useEffect(() => {
    let count = 0;
    for (const property in pgrfilters) {
      if (Array.isArray(pgrfilters[property])) {
        count += pgrfilters[property].length;
        let params = pgrfilters[property].map((prop) => prop.code).join();
        if (params) {
          pgrQuery[property] = params;
        }
        else{
          delete pgrQuery?.[property]
        }
      }
    }
    for (const property in wfFilters) {
      if (Array.isArray(wfFilters[property])) {
        let params = wfFilters[property].map((prop) => prop.code).join();
        if (params) {
          wfQuery[property] = params;
        } else {
          wfQuery = {};
        }
      }
    }
    count += wfFilters?.assignee?.length || 0;

    if (props.type !== "mobile") {
      handleFilterSubmit();
    }

    Digit.inboxFilterCount = count;
  }, [pgrfilters, wfFilters]);

  const ifExists = (list, key) => {
    return list.filter((object) => object.code === key.code).length;
  };
  function applyFiltersAndClose() {
    handleFilterSubmit();
    props.onClose();
  }
  function complaintType(_type) {
    const type = { serviceCode: t("SERVICEDEFS." + _type.serviceCode.toUpperCase()), code: _type.serviceCode };

    if (!ifExists(pgrfilters.serviceCode, type)) {
      setPgrFilters({ ...pgrfilters, serviceCode: [...pgrfilters.serviceCode, type] });
    }
  }

  // function onSelectLocality(value, type) {
  //   if (!ifExists(pgrfilters.locality, value)) {
  //     setPgrFilters({ ...pgrfilters, locality: [...pgrfilters.locality, value] });
  //   }
  // }
  function onSelectHealthCare(value, type){
    if(!ifExists(pgrfilters.healthcare, value)){
      setPgrFilters({...pgrfilters, healthcare:[...pgrfilters.healthcare, value]});
    }
  }

  useEffect(() => {
    if (pgrfilters.serviceCode.length > 1) {
      setSelectedComplaintType({ serviceCode: `${pgrfilters.serviceCode.length} selected` });
    } else {
      setSelectedComplaintType(pgrfilters.serviceCode[0]);
    }
  }, [pgrfilters.serviceCode]);

  // useEffect(() => {
  //   if (pgrfilters.locality.length > 1) {
  //     setSelectedLocality({ name: `${pgrfilters.locality.length} selected` });
  //   } else {
  //     setSelectedLocality(pgrfilters.locality[0]);
  //   }
  // }, [pgrfilters.locality]);
  useEffect(() => {
    if (pgrfilters.healthcare.length > 1) {
      setSelectedHealthCare({ name: `${pgrfilters.healthcare.length} selected` });
    } else {
      setSelectedHealthCare(pgrfilters.healthcare[0]);
    }
  }, [pgrfilters.healthcare]);

  const onRemove = (index, key) => {
    let afterRemove = pgrfilters[key].filter((value, i) => {
      return i !== index;
    });
    setPgrFilters({ ...pgrfilters, [key]: afterRemove });
  };

  const handleAssignmentChange = (e, type) => {
    if (e.target.checked) {
      setPgrFilters({ ...pgrfilters, applicationStatus: [...pgrfilters.applicationStatus, { code: type.code }] });
    } else {
      const filteredStatus = pgrfilters.applicationStatus.filter((value) => {
        return value.code !== type.code;
      });
      setPgrFilters({ ...pgrfilters, applicationStatus: filteredStatus });
    }
  };

  function clearAll() {
    let pgrReset = { serviceCode: [], locality: [], applicationStatus: [] };
    let wfRest = { assigned: [{ code: [] }] };
    setPgrFilters(pgrReset);
    setWfFilters(wfRest);
    pgrQuery = {};
    wfQuery = {};
    setSelectedAssigned("");
    setSelectedComplaintType(null);
    setSelectedLocality(null);
  }

  const handleFilterSubmit = () => {
    props.onFilterChange({ pgrQuery: pgrQuery, wfQuery: wfQuery, wfFilters, pgrfilters });
  };

  const GetSelectOptions = (lable, options, selected = null, select, optionKey, onRemove, key) => {
    selected = selected || { [optionKey]: " ", code: "" };
    return (
      <div>
        <div className="filter-label">{lable}</div>
        {<Dropdown option={options} selected={selected} select={(value) => select(value, key)} optionKey={optionKey} />}

        <div className="tag-container">
          {pgrfilters[key].length > 0 &&
            pgrfilters[key].map((value, index) => {
              return <RemoveableTag key={index} text={`${value[optionKey].slice(0, 22)} ...`} onClick={() => onRemove(index, key)} />;
            })}
        </div>
      </div>
    );
  };

  return (
    <React.Fragment>
      <div className="filter">
        <div className="filter-card">
          <div className="heading">
            <div className="filter-label">{t("ES_COMMON_FILTER_BY")}:</div>
            <div className="clearAll" onClick={clearAll}>
              {t("ES_COMMON_CLEAR_ALL")}
            </div>
            {props.type === "desktop" && (
              <span className="clear-search" onClick={clearAll}>
                {t("ES_COMMON_CLEAR_ALL")}
              </span>
            )}
            {props.type === "mobile" && (
              <span onClick={props.onClose}>
                <CloseSvg />
              </span>
            )}
          </div>
          <div>
            <RadioButtons onSelect={onRadioChange} selectedOption={selectAssigned} optionsKey="name" options={assignedToOptions} />
            <div>
              {GetSelectOptions(
                t("TICKET_SUBTYPE"),
                serviceDefs,
                selectedComplaintType,
                complaintType,
                "serviceCode",
                onRemove,
                "serviceCode"
              )}
            </div>
            <div>{GetSelectOptions(t("HEALTH_CARE"), healthCentreMenu, selectedHealthCare, onSelectHealthCare, "code", onRemove, "healthcare")}</div>
            {<Status complaints={props.complaints} onAssignmentChange={handleAssignmentChange} pgrfilters={pgrfilters} />}
          </div>
        </div>
      </div>
      <ActionBar>
        {props.type === "mobile" && (
          <ApplyFilterBar
            labelLink={t("ES_COMMON_CLEAR_ALL")}
            buttonLink={t("ES_COMMON_FILTER")}
            onClear={clearAll}
            onSubmit={applyFiltersAndClose}
          />
        )}
      </ActionBar>
    </React.Fragment>
  );
};

export default Filter;
