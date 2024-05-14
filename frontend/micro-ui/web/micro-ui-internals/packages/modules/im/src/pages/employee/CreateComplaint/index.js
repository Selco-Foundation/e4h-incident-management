import React, { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { DatePicker, Dropdown, ImageUploadHandler, TextArea, TextInput, UploadFile, CardLabel } from "@egovernments/digit-ui-react-components";
import { useRouteMatch, useHistory } from "react-router-dom";
import { useQueryClient } from "react-query";
import { FormComposer } from "../../../components/FormComposer";
import { createComplaint } from "../../../redux/actions/index";
export const CreateComplaint = ({ parentUrl }) => {
  const { t } = useTranslation();
  const [healthCareType, setHealthCareType]=useState();
  const [healthcentre, setHealthCentre]=useState();
  const [blockMenu, setBlockMenu]=useState([]);
  const [districtMenu, setDistrictMenu]=useState([]);
  const [file, setFile]=useState(null);
  const [uploadedFile, setUploadedFile]=useState(null);
  const [district, setDistrict]=useState(null);
  const [block, setBlock]=useState(null);
  const [error, setError] = useState(null);
  let reporterName = JSON.parse(sessionStorage.getItem("Digit.User"))?.value?.info?.name;
  const [canSubmit, setSubmitValve] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const tenantId = window.Digit.SessionStorage.get("Employee.tenantId");
  const [complaintType, setComplaintType]=useState(JSON?.parse(sessionStorage.getItem("complaintType")) || {});
  const [subTypeMenu, setSubTypeMenu] = useState([]);
  const [phcSubTypeMenu, setPhcSubTypeMenu]=useState([]);
  const [subType, setSubType]=useState(JSON?.parse(sessionStorage.getItem("subType")) || {});
  const menu = Digit.Hooks.pgr.useComplaintTypes({ stateCode: tenantId })
  const state = Digit.ULBService.getStateId();
const { isMdmsLoading, data: mdmsData } = Digit.Hooks.pgr.useMDMS(state, "Incident", ["District","Block"]);
const {  data: phcMenu  } = Digit.Hooks.pgr.useMDMS(state, "tenant", ["tenants"]);
useEffect(()=>{
  const fetchDistrictMenu=async()=>{
    const response=phcMenu?.Incident?.Block;
    if(response){
      const uniqueDistricts={};
      const districts=response.filter(def=>{
        if(!uniqueDistricts[def.districtCode]){
          uniqueDistricts[def.districtCode]=true;
          return true;
        }
        return false;
      });
          setDistrictMenu(
            districts.map(def=>({
           
           key:def.districtCode, 
            name:t(def.districtCode.toUpperCase()) 
         }))
          );
      }
    

  };
  fetchDistrictMenu();
}, [state, mdmsData,t]);

 
//  var Menu = [];
//  const getDistrictMenu=async (tenantId, t) => {
//   const response1 = mdmsData
//   console.log("subres11", response1)
//   if(response1!==undefined){
//     const response=response1?.Incident?.Block
//     console.log("respons", response)
//   await Promise.all(
//      response.map((def) => {
  
//       if (!Menu.find((e) => e.key === def.districtCode)) {
//         def.menuPath === ""
//           ? Menu.push({
//               name: t("SERVICEDEFS.OTHERS"),
//               key: def.districtCode,
//             })
//           : Menu.push({
//               name: t(def.districtCode.toUpperCase()),
//               key: def.districtCode,
//             });
//       }
    
//     })
//   );
//   }
//   console.log("menuuuu", Menu)
//   return Menu;
  
// }

// getDistrictMenu(state, t)
// console.log("distmenu", districtMenu)

// // // 
// const getBlockMenu= async (state, selectedType, t) => {
//   console.log("slectedType", selectedType)
//    const fetchServiceDefs = mdmsData?.Incident?.Block
//    if(fetchServiceDefs!==undefined && selectedType.length!==0){
//    return fetchServiceDefs
//     .filter((def) => def.districtCode === selectedType.key)
//    .map((id) => ({
//       key: id.name,
//       name: t("SERVICEDEFS." + id.name.toUpperCase()),
//      }));
//     }
//  }
//  console.log("dd", district)
//  getBlockMenu(tenantId, district, t);

  useEffect(() => {
      (async () => {
        setError(null);
        if (file) {
          const allowedFileTypesRegex = /(.*?)(jpg|jpeg|png|image|pdf)$/i
          if (file.size >= 5242880) {
            setError(t("CS_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
          } else if (file?.type && !allowedFileTypesRegex.test(file?.type)) {
            setError(t(`NOT_SUPPORTED_FILE_TYPE`))
          } else {
            try {
              console.log("ttt", tenantId?.split(".")[0])
              const response = await Digit.UploadServices.Filestorage("Incident", file, Digit.ULBService.getStateId() || tenantId?.split(".")[0]);
              console.log("filesres", response)
              if (response?.data?.files?.length > 0) {
                setUploadedFile(response?.data?.files[0]?.fileStoreId);
              } else {
                setError(t("CS_FILE_UPLOAD_ERROR"));
              }
            } catch (err) {
              setError(t("CS_FILE_UPLOAD_ERROR"));
            }
          }
        }
      })();
    }, [file]);
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const history = useHistory();
  const serviceDefinitions = Digit.GetServiceDefinitions;
  const client = useQueryClient();
 
  useEffect(()=>{
    if(complaintType?.key&& subType?.key){
      setSubmitValve(true);
    }else{
      setSubmitValve(false)
    }
  },[complaintType, subType])
  async function selectedType(value) {
    console.log("value", value)
    console.log("comp", complaintType)
    if (value.key !== complaintType.key) {
      if (value.key === "Others") {
        setSubType({ name: "" });
        setComplaintType(value);
        sessionStorage.setItem("complaintType",JSON.stringify(value))
        setSubTypeMenu([{ key: "Others", name: t("SERVICEDEFS.OTHERS") }]);
      } else {
        setSubType({ name: "" });
        setComplaintType(value);
        console.log("ccccttt", complaintType)
        sessionStorage.setItem("complaintType",JSON.stringify(value))
        setSubTypeMenu(await serviceDefinitions.getSubMenu(tenantId, value, t));
      }
    }
  }
  const handleDistrictChange =async(selectedDistrict) =>{
    setDistrict(selectedDistrict);
    const response=mdmsData?.Incident?.Block;
    if(response){
      const blocks=response.filter((def)=>def.districtCode===selectedDistrict.key);
      setBlockMenu(
        blocks.map(block=>({
          key:block.name,
          name:t(block.name.toUpperCase())
      }))
      );
    }
  }
  function selectedSubType(value) {
    sessionStorage.setItem("subType",JSON.stringify(value))
    setSubType(value);
  }
  async function selectedHealthCentre(value){
    setHealthCentre(value);
    setPhcSubTypeMenu([value])
    setHealthCareType(value);
  }
  const handleBlockChange= (selectedBlock)=>{
    //sessionStorage.setItem("block",JSON.stringify(value))
    setBlock(selectedBlock);
  }
  const handlePhcSubType=(value)=>{
    console.log("value", value) 
    setHealthCareType(value);
  }
  // const selectedDistrict = (value) => {
  //   setDistrict(value);
  //   setBlockMenu([value]);
  // };
  async function selectFile(e){
    setFile(e.target.files[0]);
  }

  console.log("file", file)
   const wrapperSubmit = (data) => {
    if (!canSubmit) return;
    setSubmitted(true);
    !submitted && onSubmit(data);
  };
  const onSubmit = async (data) => {
    console.log("data2", data)
    if (!canSubmit) return;
    const { key } = subType;
    const complaintType = key;
    const formData = { ...data,complaintType, district, block, healthCareType, healthcentre, reporterName, uploadedFile};
    console.log("formdat", formData)
    await dispatch(createComplaint(formData));
    await client.refetchQueries(["fetchInboxData"]);
    history.push(parentUrl + "/incident/response");
  };

  console.log("districttt", district)
  console.log("complaintType", complaintType)
  const config = [
    
    {
      head: t("TICKET_LOCATION"),
      body: [
        
        
        {
          label :t("INCIDENT_DISTRICT"),
          type: "dropdown",
          isMandatory:true,
          populators:  (
            <Dropdown option={districtMenu} optionKey="key" id="name" selected={district} select={handleDistrictChange}/>),
           
         },
        
        {
          label:t("INCIDENT_BLOCK"),
          isMandatory:true,
          type: "dropdown",
          menu: { ...blockMenu },
             populators: (
             
              <Dropdown option={blockMenu} optionKey="key" id="name" selected={block} select={handleBlockChange} 
             />
             
             )
         },
         {
          label:t("HEALTH_CARE_CENTRE"),
          isMandatory:true,
          type: "dropdown",
          populators: (
            <Dropdown option={phcMenu?.tenant?.tenants} optionKey="name" id="healthCentre" selected={healthcentre} select={selectedHealthCentre} />
            
          ),
           
         },
         {
          label:t("HEALTH_CENTRE_TYPE"),
          isMandatory:true,
          type: "dropdown",
          populators: (
            <Dropdown option={phcSubTypeMenu} optionKey="centreType" id="healthcaretype" selected={healthCareType} select={handlePhcSubType} />
             
          ),
           
         },
        
      ],
    },
    {
      head: t("TICKET_DETAILS"),
      body: [
        {
          label :t("TICKET_TYPE"),
          type: "dropdown",
          isMandatory:true,
         
          populators: <Dropdown option={menu} optionKey="name" id="complaintType" selected={complaintType} select={selectedType} />,
           
         
           
         },
         {
          label :t("TICKET_SUBTYPE"),
          type: "dropdown",
          isMandatory:true,
          menu: { ...subTypeMenu },
          populators: <Dropdown option={subTypeMenu} optionKey="name" id="complaintSubType" selected={subType} select={selectedSubType} />,
           
         }
        ]
    },
    {
      head: t("ADDITIONAL_DETAILS"),
      body: [
        {
          label: t("INCIDENT_COMMENTS"),
          type: "text",
          isMandatory:true,
          populators: {
            name: "comments",
            
          },
        },
        {
          label:t("INCIDENT_UPLOAD_FILE"),
          populators:
          <UploadFile 
              id={"doc"} 
              accept=".jpeg" 
              onUpload={selectFile} 
              onDelete={()=>{setUploadedFile(null)}} 
              message={uploadedFile? `1 ${t(`ACTION_FILEUPLOADED`)}` : t(`ACTION_NO_FILEUPLOADED`)}
          />,   
         },
        ]
      }
    
  ];
  return (
    <FormComposer
      heading={t("")}
      config={config}
      onSubmit={wrapperSubmit}
      isDisabled={!canSubmit && !submitted}
      label={t("FILE_INCIDENT")}
    />
  );
};

