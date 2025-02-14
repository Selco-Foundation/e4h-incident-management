import React, { useState, useEffect, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import {
  DatePicker,
  Dropdown,
  ImageUploadHandler,
  Toast,
  TextInput,
  UploadFile,
  CardLabel,
  MultiUploadWrapper,
} from "@selco/digit-ui-react-components";
import { useRouteMatch, useHistory } from "react-router-dom";
import { useQueryClient } from "react-query";
import { FormComposer } from "../../../components/FormComposer";
import { createComplaint } from "../../../redux/actions/index";
import { Loader, Header } from "@selco/digit-ui-react-components";
import { Link } from "react-router-dom";
// import { MultiUploadWrapper } from "./MultiUploadWrapper";

export const CreateComplaint = ({ parentUrl }) => {
  const { t } = useTranslation();
  const [healthCareType, setHealthCareType] = useState();
  const [healthcentre, setHealthCentre] = useState();
  const [blockMenu, setBlockMenu] = useState([]);
  const [blockMenuNew, setBlockMenuNew] = useState([]);
  const [districtMenu, setDistrictMenu] = useState([]);
  const [file, setFile] = useState(null);
  const [showToast, setShowToast] = useState(null);
  const [uploadedFile, setUploadedFile] = useState([]);
  const [uploadedImages, setUploadedImagesIds] = useState(null);
  const specificFileConstraint = { type: "video", maxSize: 100, maxFiles: 5 };
  const [district, setDistrict] = useState(null);
  const [block, setBlock] = useState(null);
  const [error, setError] = useState(null);
  let reporterName = JSON.parse(sessionStorage.getItem("Digit.User"))?.value?.info?.name;
  const [canSubmit, setSubmitValve] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const tenantId = window.Digit.SessionStorage.get("Employee.tenantId");
  const [tenant, setTenant] = useState(window.Digit.SessionStorage.get("Employee.tenantId"));
  const [complaintType, setComplaintType] = useState(JSON?.parse(sessionStorage.getItem("complaintType")) || {});
  const [subTypeMenu, setSubTypeMenu] = useState([]);
  const [phcSubTypeMenu, setPhcSubTypeMenu] = useState([]);
  const [disbaled, setDisable] = useState(true);
  const [disbaledUpload, setDisableUpload] = useState(true);
  const [phcMenuNew, setPhcMenu] = useState([]);
  const dropdownRefs = useRef([]); // Create refs array for dropdowns
  const [errors, setErrors] = useState(Array(6).fill(""));
  const [subType, setSubType] = useState(JSON?.parse(sessionStorage.getItem("subType")) || {});
  const [dataState, setDataState] = useState({ newArr: [], mappedArray: [] });
  let sortedSubMenu = [];
  if (subTypeMenu !== null) {
    sortedSubMenu = subTypeMenu.sort((a, b) => a.name.localeCompare(b.name));
  }

  let sortedphcSubMenu = [];
  if (phcSubTypeMenu !== null) {
    sortedphcSubMenu = phcSubTypeMenu.sort((a, b) => a.name.localeCompare(b.name));
  }
  const menu = Digit.Hooks.pgr.useComplaintTypes({ stateCode: tenantId });
  let sortedMenu = [];
  if (menu !== null) {
    let othersItem = menu.find((item) => item.key === "Others");
    let otherItems = menu.filter((item) => item.key !== "Others");
    otherItems.sort((a, b) => a.name.localeCompare(b.name));
    if (othersItem) {
      otherItems.push(othersItem);
    }
    sortedMenu = otherItems;
  }

  if (subTypeMenu !== null) {
    let othersItem = subTypeMenu.find((item) => item.key === "Other");
    let otherItems = subTypeMenu.filter((item) => item.key !== "Other");
    otherItems.sort((a, b) => a.name.localeCompare(b.name));
    if (othersItem) {
      otherItems.push(othersItem);
    }
    sortedSubMenu = otherItems;
  }
  const state = Digit.ULBService.getStateId();
  const [selectTenant, setSelectTenant] = useState(Digit.SessionStorage.get("Employee.tenantId") || null);
  const { isMdmsLoading, data: mdmsData } = Digit.Hooks.pgr.useMDMS(state, "Incident", ["District", "Block"]);
  const { data: phcMenu } = Digit.Hooks.pgr.useMDMS(state, "tenant", ["tenants"]);
  let blockNew = mdmsData?.Incident?.Block;

  useEffect(() => {
    const fetchDistrictMenu = async () => {
      const response = phcMenu?.Incident?.District;
      if (response) {
        const uniqueDistricts = {};
        const districts = response.filter((def) => {
          if (!uniqueDistricts[def.code]) {
            uniqueDistricts[def.code] = true;
            return true;
          }
          return false;
        });
        districts.sort((a, b) => a.name.localeCompare(b.name));
        setDistrictMenu(
          districts.map((def) => ({
            key: def.code,
            name: t(def.name),
          }))
        );
      }
    };
    fetchDistrictMenu();
  }, [state, mdmsData, t]);

  useEffect(() => {
    let tenants = Digit.SessionStorage.get("Employee.tenantId");
    setSelectTenant(tenants);
    if (selectTenant !== "pg") {
      ticketTypeRef?.current?.validate();
      ticketSubTypeRef?.current?.validate();
    } else {
      handleButtonClick();
    }
  }, []);

  useEffect(async () => {
    if (selectTenant && selectTenant !== "pg") {
      let tenant = Digit.SessionStorage.get("IM_TENANTS");
      const selectedTenantData = tenant.find((item) => item.code === selectTenant);
      const selectedDistrict = {
        key: t(selectedTenantData.city.districtCode),
        codeNew: selectedTenantData.city.districtCode,
        name: t(selectedTenantData.city.districtName),
      };
      const selectedTenantBlock = blockNew !== undefined ? blockNew.find((item) => item.code === selectedTenantData.city.blockCode) : "";
      let selectedBlock = "";
      if (selectedTenantBlock !== undefined && selectedTenantBlock.length !== 0) {
        selectedBlock = {
          key: t(selectedTenantBlock.code.split(".")[1].toUpperCase()),
          name: t(selectedTenantBlock.name),
          codeNew: selectedTenantBlock.code,
          codeKey: selectedTenantBlock.code.split(".")[1].toUpperCase(),
        };
      }
      handleDistrictChange(selectedDistrict);
      handleBlockChange(selectedBlock);

      // setBlock(selectedBlock);
    }
  }, [selectTenant, mdmsData, state]);

  useEffect(() => {
    (async () => {
      setError(null);
      if (file) {
        const allowedFileTypesRegex = /(.*?)(jpg|jpeg|png|image|pdf)$/i;
        if (file.size >= 5242880) {
          setError(t("CS_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else if (file?.type && !allowedFileTypesRegex.test(file?.type)) {
          setError(t(`NOT_SUPPORTED_FILE_TYPE`));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage("Incident", file, tenantId);
            if (response?.data?.files?.length > 0) {
              //setUploadedFile(response?.data?.files[0]?.fileStoreId);
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

  useEffect(() => {
    if (complaintType?.key && subType?.key && healthCareType?.code && healthcentre?.code && district?.key && block.key) {
      setSubmitValve(true);
    } else {
      setSubmitValve(false);
    }
  }, [complaintType, subType, healthcentre, healthCareType, district, block]);
  async function selectedType(value) {
    setDisableUpload(false);
    if (value.key !== complaintType.key) {
      if (value.key === "Others") {
        setSubType({ name: "" });
        setComplaintType(value);
        sessionStorage.setItem("complaintType", JSON.stringify(value));
        setSubTypeMenu([{ key: "Others", name: t("SERVICEDEFS.OTHERS") }]);
        ticketSubTypeRef?.current?.validate();
      } else {
        setSubType({ name: "" });
        setComplaintType(value);
        sessionStorage.setItem("complaintType", JSON.stringify(value));
        setSubTypeMenu(await serviceDefinitions.getSubMenu(tenantId, value, t));
        ticketSubTypeRef?.current?.validate();
      }
    }
  }
  const handleDistrictChange = async (selectedDistrict) => {
    setDistrict(selectedDistrict);
    setBlock({});
    setHealthCentre({});
    setHealthCareType({});
    setPhcMenu([]);
    setPhcSubTypeMenu([]);
    const response = mdmsData?.Incident?.Block;
    if (response) {
      const blocks = response.filter((def) => def.districtCode === selectedDistrict.key);

      blocks.sort((a, b) => a.name.localeCompare(b.name));
      setBlockMenuNew(blocks);
      setBlockMenu(
        blocks.map((block) => ({
          key: block.name,
          name: t(block.name),
        }))
      );
    }
  };

  function selectedSubType(value) {
    sessionStorage.setItem("subType", JSON.stringify(value));
    setSubType(value);
  }
  async function selectedHealthCentre(value) {
    setHealthCentre(value);
    setPhcSubTypeMenu([value]);
    setHealthCareType(value);
    setDisableUpload(false);
    setDisable(false);
    setTenant(value?.city?.districtTenantCode);
    centerTypeRef?.current?.clearError();
    setShowToast(null);
  }
  const handleBlockChange = (selectedBlock) => {
    //sessionStorage.setItem("block",JSON.stringify(value))
    setHealthCentre({});
    setHealthCareType({});
    setPhcSubTypeMenu([]);
    if (selectTenant && selectTenant !== "pg") {
      const block = blockNew?.find((item) => item?.name.toUpperCase() === selectedBlock?.codeNew.split(".")[1].toUpperCase());

      const phcMenuType = phcMenu?.tenant?.tenants.filter((centre) => centre?.city?.blockCode === selectedBlock?.codeNew);
      const translatedPhcMenu = phcMenuType?.map((item) => ({
        ...item,
        key: item?.name,
        name: t(item?.name),
        centreTypeKey: item?.centreType,
        centreType: t(item?.centreType),
      }));
      setPhcMenu(translatedPhcMenu);
      setBlock(selectedBlock);

      let tenant = Digit.SessionStorage.get("Employee.tenantId");

      const filtereddata = phcMenuType?.filter((codeNew) => codeNew.code == tenant);

      if (filtereddata) {
        selectedHealthCentre(filtereddata?.[0]);
      }
    } else {
      const block = blockMenuNew.find((item) => item?.name.toUpperCase() === selectedBlock?.key.toUpperCase());
      const phcMenuType = phcMenu?.tenant?.tenants.filter((centre) => centre?.city?.blockCode === block?.code);
      const translatedPhcMenu = phcMenuType?.map((item) => ({
        ...item,
        key: item?.name,
        name: t(item?.name),
        centreTypeKey: item?.centreType,
        centreType: t(item?.centreType),
      }));
      setPhcMenu(translatedPhcMenu);

      setBlock(selectedBlock);
    }
  };

  const handlePhcSubType = async (value) => {
    setHealthCareType(value);
  };
  // const selectedDistrict = (value) => {
  //   setDistrict(value);
  //   setBlockMenu([value]);
  // };
  async function selectFile(e) {
    setFile(e.target.files[0]);
  }
  const handleUpload = (ids) => {
    if (disbaled) {
      setShowToast({ key: true, label: "PLEASE_SELECT_PHC_TYPE" });
    }
    setUploadedImagesIds(ids);
  };

  const wrapperSubmit = (data) => {
    const abc = handleButtonClick();

    if (!canSubmit) return;
    setSubmitted(true);
    !submitted && !abc && onSubmit(data);
  };
  const onSubmit = async (data) => {
    if (!canSubmit) return;
    const { key } = subType;
    //const complaintType = key;

    let uploadImages = [];
    if (uploadedFile !== null) {
      uploadImages = uploadedFile?.map((url) => ({
        documentType: "PHOTO",
        fileStoreId: url?.fileStoreId,
        documentUid: "",
        additionalDetails: {},
      }));
    }
    const formData = {
      ...data,
      complaintType,
      subType,
      district,
      block,
      healthCareType,
      healthcentre,
      reporterName,
      uploadedFile,
      uploadImages,
      tenantId: healthcentre?.code,
    };
    await dispatch(createComplaint(formData));
    await client.refetchQueries(["fetchInboxData"]);
    history.push(parentUrl + "/incident/response");
  };
  const districtRef = useRef(null);
  const blockRef = useRef(null);
  const healthCareRef = useRef(null);
  const centerTypeRef = useRef(null);
  const ticketTypeRef = useRef(null);
  const ticketSubTypeRef = useRef(null);
  const fieldsToValidate = [
    { field: district, ref: districtRef },
    { field: block, ref: blockRef },
    { field: healthcentre, ref: healthCareRef },
    { field: healthCareType, ref: centerTypeRef },
    { field: complaintType, ref: ticketTypeRef },
    { field: subType, ref: ticketSubTypeRef },
  ];
  const getData = (state) => {
    let data = Object.fromEntries(state);
    const mappedArray = state.map((item) => {
      return item[1];
    });
    let newArr = Object.values(data);

    setDataState({ newArr, mappedArray });
  };
  const handleButtonClick = () => {
    const hasEmptyFields = fieldsToValidate.some(({ field }) => field === null || Object.keys(field).length === 0);

    if (hasEmptyFields) {
      fieldsToValidate.forEach(({ field, ref }) => {
        if (field === null || field === undefined || Object.keys(field).length === 0) {
          ref?.current?.validate();
        }
      });

      return true; // At least one field is empty
    } else {
      return false; // None of the fields are empty
    }
  };
  function selectfile(arr, newArr) {
    let file = [];
    if (arr) {
      if (newArr.length > 0) {
        file = newArr.map((e) => {
          const newFile = {
            documentType: e?.file?.type.includes(".sheet") ? ".xlsx" : e?.file?.type.includes(".document") ? ".docs" : e?.file?.type,
            fileStoreId: e?.fileStoreId?.fileStoreId,
            documentUid: "",
            additionalDetails: {},
          };
          return newFile;
        });
      }
      // const newFile={
      // documentType: e?.file?.type.includes(".sheet") ? ".xlsx": e?.file?.type.includes(".document")? ".docs": e?.file?.type,
      // fileStoreId: e?.fileStoreId?.fileStoreId,
      // documentUid: "",
      // additionalDetails: {},
      // };

      const filterFileStoreIds = file.map((item) => item.fileStoreId);

      // Use a Set to remove duplicates and filter the documents array
      const seen = new Set();
      const filteredDocuments = file.filter((document) => {
        if (filterFileStoreIds.includes(document.fileStoreId) && !seen.has(document.fileStoreId)) {
          seen.add(document.fileStoreId);
          return true;
        }
        return false;
      });

      setUploadedFile(filteredDocuments);
      //arr && setFile(arr.file);
    }
  }
  useEffect(() => {
    if (dataState.newArr && dataState.mappedArray) {
      selectfile(dataState.newArr, dataState.mappedArray);
    }
  }, [dataState]);
  const config = [
    {
      head: t("TICKET_LOCATION"),
      body: [
        {
          label: t("INCIDENT_DISTRICT"),
          type: "dropdown",
          isMandatory: true,
          populators: (
            <Dropdown
              ref={districtRef}
              option={districtMenu}
              optionKey="name"
              id="name"
              selected={district}
              select={handleDistrictChange}
              disable={selectTenant && selectTenant !== "pg" ? true : false}
              required={true}
            />
          ),
        },

        {
          label: t("INCIDENT_BLOCK"),
          isMandatory: true,
          type: "dropdown",
          menu: { ...blockMenu },
          populators: (
            <Dropdown
              ref={blockRef}
              option={blockMenu}
              optionKey="name"
              id="name"
              selected={block}
              select={handleBlockChange}
              disable={selectTenant && selectTenant !== "pg" ? true : false}
              required={true}
            />
          ),
        },
        {
          label: t("HEALTH_CARE_CENTRE"),
          isMandatory: true,
          type: "dropdown",
          populators: (
            <Dropdown
              ref={healthCareRef}
              t={t}
              option={phcMenuNew}
              optionKey="name"
              id="healthCentre"
              selected={healthcentre}
              select={selectedHealthCentre}
              disable={selectTenant && selectTenant !== "pg" ? true : false}
              required={true}
            />
          ),
        },
        {
          label: t("HEALTH_CENTRE_TYPE"),
          isMandatory: true,
          type: "dropdown",
          populators: (
            <Dropdown
              ref={centerTypeRef}
              t={t}
              option={sortedphcSubMenu}
              optionKey="centreType"
              id="healthcaretype"
              selected={healthCareType}
              select={handlePhcSubType}
              disable={selectTenant && selectTenant !== "pg" ? true : false}
              required={true}
            />
          ),
        },
      ],
    },
    {
      head: t("TICKET_DETAILS"),
      body: [
        {
          label: t("TICKET_TYPE"),
          type: "dropdown",
          isMandatory: true,
          populators: (
            <Dropdown
              ref={ticketTypeRef}
              option={sortedMenu}
              optionKey="name"
              id="complaintType"
              selected={complaintType}
              select={selectedType}
              required={true}
            />
          ),
        },
        {
          label: t("TICKET_SUBTYPE"),
          type: "dropdown",
          isMandatory: true,
          menu: { ...subTypeMenu },
          populators: (
            <Dropdown
              ref={ticketSubTypeRef}
              option={sortedSubMenu}
              optionKey="name"
              id="complaintSubType"
              selected={subType}
              select={selectedSubType}
              required={true}
            />
          ),
        },
      ],
    },
    {
      head: t("ADDITIONAL_DETAILS"),
      body: [
        {
          label: t("INCIDENT_COMMENTS"),
          type: "text",
          isMandatory: false,
          populators: {
            name: "comments",
            // maxLength: 256,
            validation: {
              minLength: 0,
              maxLength: 256,
            },
            error: t("CS_LENGTH_EXCEED"),
          },
        },
        {
          label: t("INCIDENT_UPLOAD_FILE"),
          populators: (
            <div>
              <MultiUploadWrapper
                t={t}
                module="Incident"
                tenantId={tenantId}
                getFormState={(e) => getData(e)}
                allowedFileTypesRegex={/(jpg|jpeg|png|image|mp4|mov|avi|wmv|video)$/i}
                allowedMaxSizeInMB={50}
                maxFilesAllowed={5}
                disabled={disbaledUpload}
                ulb={Digit.SessionStorage.get("Employee.tenantId") !== "pg" ? Digit.SessionStorage.get("Employee.tenantId") : healthcentre?.code}
                acceptFiles={".png, .image, .jpg, .jpeg, .mp4, .avi, .mov, .wmv"}
                specificFileConstraint={specificFileConstraint}
              />
              {/* <ImageUploadHandler tenantId={tenant} uploadedImages={uploadedImages} onPhotoChange={handleUpload} disabled={disbaled}/> */}
              <div style={{ marginLeft: "20px", marginTop: "10px", fontSize: "12px" }}>{t("CS_IMAGE_VIDEO_BASED_FILES_ARE_ACCEPTED")}</div>
            </div>
          ),
        },
      ],
    },
  ];
  return (
    <div>
      <style>
        {`
          .employee-select-wrap .select:hover {
            --border-opacity: 1;
            border: 1px solid #7a2829;
            border-color: #7a2829;
          }
        `}
      </style>
      <div style={{ color: "#9e1b32", marginBottom: "10px", textAlign: "right", marginRight: "0px" }}>
        <div style={{ marginRight: "15px" }}>
          <Link to={`/digit-ui/employee`}>{t("CS_COMMON_BACK")}</Link>
        </div>
      </div>
      <FormComposer heading={t("")} config={config} onSubmit={wrapperSubmit} isDisabled={!canSubmit && !submitted} label={t("FILE_INCIDENT")} />

      {/* <button onClick={(!selectedOption || Object.keys(selectedOption).length == 0)}>Check Errors</button>  
      {errors.map((error, index) => (
        <div key={index}>{error}</div>
      ))} */}
    </div>
  );
};
