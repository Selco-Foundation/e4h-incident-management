import React, { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { DatePicker, Dropdown, ImageUploadHandler, TextArea, TextInput, UploadFile, CardLabel } from "@egovernments/digit-ui-react-components";
import { useRouteMatch, useHistory } from "react-router-dom";
import { useQueryClient } from "react-query";

import { FormComposer } from "../../../components/FormComposer";
import { createComplaint } from "../../../redux/actions/index";

export const CreateComplaint = ({ parentUrl }) => {

  const cities = Digit.Hooks.pgr.useTenants();
  const { t } = useTranslation();
  
  const [healthCareType, setHealthCareType]=useState();
  const [healthcentre, setHealthCentre]=useState();
  const [block, setBlock]=useState();
  const [file, setFile]=useState(null);
  const [uploadedFile, setUploadedFile]=useState(null);
  console.log("uploaded", uploadedFile)

  const [district, setDistrict]=useState();
  const [error, setError] = useState(null);
  let reporterName = JSON.parse(sessionStorage.getItem("Digit.User"))?.value?.info?.name;
  const [canSubmit, setSubmitValve] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [params, setParams] = useState({});
  const tenantId = window.Digit.SessionStorage.get("Employee.tenantId");
  const userName=window.Digit.SessionStorage.get("user_type");
  const [complaintType, setComplaintType]=useState(JSON?.parse(sessionStorage.getItem("complaintType")) || {});
  const [subTypeMenu, setSubTypeMenu] = useState([]);
  const [subType, setSubType]=useState(JSON?.parse(sessionStorage.getItem("subType")) || {});
  const menu = Digit.Hooks.pgr.useComplaintTypes({ stateCode: tenantId })
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
              const response = await Digit.UploadServices.Filestorage("OBPS", file, Digit.ULBService.getStateId() || tenantId?.split(".")[0]);
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
  const blockMenu = [
    {
      "name": "Block1",
      "code": "Block1",
    },
    {
      "name": "Block2",
      "code": "Block2",
    },
    {
      "name": "Block3",
      "code": "Block3",
    }
  ]
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
   const healthCareTypeMenu=[
    {
      "name":"Sub Centre",
      "code":"Sub Centre"
    },
   
   ] 
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
        sessionStorage.setItem("complaintType",JSON.stringify(value))
        setSubTypeMenu(await serviceDefinitions.getSubMenu(tenantId, value, t));
      }
    }
  }
  function selectedSubType(value) {
    sessionStorage.setItem("subType",JSON.stringify(value))
    setSubType(value);
  }
  async function selectedHealthCentre(value){
    setHealthCentre(value);
  }
  async function selectedHealthCentreType(value){
    setHealthCareType(value);
  }
  
  async function selectedBlock(value){
    setBlock(value);
  }
  const handleDistrict = (event) => {
    const { value } = event.target;
    setDistrict(value);
  };
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
    const formData = { ...data,complaintType, block, healthCareType, healthcentre, reporterName, uploadedFile};
    console.log("formdat", formData)
    await dispatch(createComplaint(formData));
    await client.refetchQueries(["fetchInboxData"]);
    history.push(parentUrl + "/response");
  };

  
  const config = [
    
    {
      head: t("TICKET_LOCATION"),
      body: [
        
        
        {
          label :t("INCIDENT_DISTRICT"),
          type: "text",
          isMandatory:true,
          value:district,
         
          populators:  (
            {
            name: "district",
            onChange:handleDistrict,
          }),
           
         },
        
        {
          label:t("INCIDENT_BLOCK"),
          isMandatory:true,
          type: "dropdown",
             populators: (
              <Dropdown option={blockMenu} optionKey="name" id="block" selected={block} select={selectedBlock} 
             />
             
             )
         },
         {
          label:t("HEALTH_CARE_CENTRE"),
          isMandatory:true,
          type: "dropdown",
          populators: (
            <Dropdown option={healthCentreMenu} optionKey="name" id="healthCentre" selected={healthcentre} select={selectedHealthCentre} />
            
          ),
           
         },
         {
          label:t("HEALTH_CENTRE_TYPE"),
          isMandatory:true,
          type: "dropdown",
          populators: (
            <Dropdown option={healthCareTypeMenu} optionKey="name" id="healthcaretype" selected={healthCareType} select={selectedHealthCentreType} />
             
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

