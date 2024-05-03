import { useQuery, useQueryClient } from "react-query";

// TODO: move to service
const getThumbnails = async (ids, tenantId) => {
  const res = await Digit.UploadServices.Filefetch(ids, tenantId);
  if (res.data.fileStoreIds && res.data.fileStoreIds.length !== 0) {
    return { thumbs: res.data.fileStoreIds.map((o) => o.url.split(",")[3]), images: res.data.fileStoreIds.map((o) => Digit.Utils.getFileUrl(o.url)) };
  } else {
    return null;
  }
};

const getDetailsRow = ({ id, incident, complaintType }) => ({
  
 
  CS_INCIDENT_NO: id,
  CS_INCIDENT_STATUS: `CS_COMMON_${incident.applicationStatus}`,
  //CS_INCIDENT_TICKET_TYPE: complaintType === "" ? "": `${complaintType}`,
  CS_ADDCOMPLAINT_COMPLAINT_TYPE: complaintType === "" ? `SERVICEDEFS.OTHERS` : `SERVICEDEFS.${complaintType}`,
  CS_ADDCOMPLAINT_COMPLAINT_SUB_TYPE: `SERVICEDEFS.${incident.serviceCode.toUpperCase()}`,
  CS_INCIDENT_HEALTH_CARE_CENTRE: `${incident.healthcentre}`,
  CS_INCIDENT_HEALTH_CARE_CENTRE_TYPE: `${incident.healthCareType}`,
  CS_INCIDENT_BLOCK:`${incident.block}`,
  CS_INCIDENT_DISTRICT: `${incident.district}`,
  CS_INCIDENT_COMMENTS: `${incident.comments}`,
  
});



const isEmptyOrNull = (obj) => obj === undefined || obj === null || Object.keys(obj).length === 0;

const transformDetails = ({ id, incident, workflow, thumbnails, complaintType }) => {
  console.log("complty", complaintType)

  const { Customizations, SessionStorage } = window.Digit;
  const role = (SessionStorage.get("user_type") || "CITIZEN").toUpperCase();
  //const id=id1
  const customDetails = Customizations?.PGR?.getComplaintDetailsTableRows
    ? Customizations.PGR.getComplaintDetailsTableRows({ id, incident, role })
    : {};
  return {
    details: !isEmptyOrNull(customDetails) ? customDetails : getDetailsRow({ id, incident, complaintType }),
    thumbnails: thumbnails?.thumbs,
    images: thumbnails?.images,
    workflow: workflow,
    incident,
    audit: {
      citizen: incident.citizen,
      details: incident.auditDetails,
      source: incident.source,
      rating: incident.rating,
      serviceCode: incident.serviceCode,
    },
    incident: incident,
  };
};

const fetchComplaintDetails = async (tenantId, id) => {
  console.log("iff890", id)
  //var serviceDefs = await Digit.MDMSService.getServiceDefs(tenantId, "PGR");
  //console.log("sf",serviceDefs)
  const incident= {
              "active": true,
              "citizen": {
                  "id": 2148,
                  "userName": "8080808000",
                  "name": "shilpa",
                  "type": "CITIZEN",
                  "mobileNumber": "8080808000",
                  "emailId": "",
                  "roles": [
                      {
                          "id": null,
                          "name": "Citizen",
                          "code": "CITIZEN",
                          "tenantId": "pg"
                      }
                  ],
                  "tenantId": "pg",
                  "uuid": "dda30b0a-ae2d-4f87-8b52-d1fc73ed7643",
                  "active": true
              },
              "id": "b213dcb1-14ab-44bf-8b88-4b3791a75a01",
              "tenantId": "pg.citya",
              "healthcentre":"Aidbhavi Sub Centre",
              "healthCareType":"Sub Centre",
              "district":"kaa",
              "block":"Block1",
              "serviceCode":"CrackPanelStone",
              "comments": "hiiiiiiiiii",
              "accountId": "dda30b0a-ae2d-4f87-8b52-d1fc73ed7643",
              "rating": null,
              "additionalDetail": {},
              "applicationStatus": "PENDINGFORASSIGNMENT",
              "source": "web",
              "address": {
                  "tenantId": "pg.citya",
                  "doorNo": null,
                  "plotNo": null,
                  "id": "966cb395-c5ea-41a8-a295-ee15912d8cee",
                  "landmark": "",
                  "city": "City A",
                  "district": "City A",
                  "region": "City A",
                  "state": null,
                  "country": null,
                  "pincode": "",
                  "additionDetails": null,
                  "buildingName": null,
                  "street": null,
                  "locality": {
                      "code": "JLC477",
                      "name": null,
                      "label": null,
                      "latitude": null,
                      "longitude": null,
                      "children": null,
                      "materializedPath": null
                  },
                  "geoLocation": {
                      "latitude": 0.0,
                      "longitude": 0.0,
                      "additionalDetails": null
                  }
              },
              "auditDetails": {
                  "createdBy": "55fa55f0-5348-4eef-922c-2d36c50c56e1",
                  "lastModifiedBy": "55fa55f0-5348-4eef-922c-2d36c50c56e1",
                  "createdTime": 1711552512424,
                  "lastModifiedTime": 1711552512424
              },
              
          }
          
  
  //const service=service1?.ServiceWrappers?.service
  const serviceDefs= [
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
 // const {workflow } = (await Digit.PGRService.search(tenantId, { serviceRequestId: id })).ServiceWrappers[0] || {};
  const workflow=incident
  console.log("service77", incident)
  Digit.SessionStorage.set("complaintDetails", { incident, workflow });
  if (incident && workflow ) {
   // const complaintType = incident.complaintType.toUpperCase();
   const complaintType = serviceDefs.filter((def) => def.serviceCode === incident.serviceCode)[0].menuPath.toUpperCase();
    console.log("menuPath", complaintType)
    const ids = workflow.verificationDocuments
      ? workflow.verificationDocuments.filter((doc) => doc.documentType === "PHOTO").map((photo) => photo.fileStoreId || photo.id)
      : null;
    const thumbnails = ids ? await getThumbnails(ids, incident.tenantId) : null;
    console.log("ids", ids)
    const details = transformDetails({ id, incident, workflow, thumbnails, complaintType });
    return details;
  } else {
    return {};
  }
};

const useComplaintDetails = ({ tenantId, id }) => {
  console.log("id9", id)
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery(["complaintDetails", tenantId, id], () => fetchComplaintDetails(tenantId, id));
  return { isLoading, error, complaintDetails: data, revalidate: () => queryClient.invalidateQueries(["complaintDetails", tenantId, id]) };
};

export default useComplaintDetails;
