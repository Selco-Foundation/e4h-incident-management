import React, { useEffect, useReducer, useState } from "react"
import UploadFile from "../atoms/UploadFile"

const displayError = ({ t, error, name }, customErrorMsg) => (
    <span style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="validation-error">{customErrorMsg ? t(customErrorMsg) : t(error)}</div>
        <div className="validation-error">{customErrorMsg ? '' : `${t('ES_COMMON_DOC_FILENAME')} : ${name} ...`}</div>
    </span>
)

const fileValidationStatus = (file, regex, maxSize, t, specificFileConstraint) => {

    if (file?.type.includes(specificFileConstraint?.type)) {
        maxSize = specificFileConstraint.maxSize;
    }    

    const fileExtention=file.name.split('.').pop().toLowerCase();
    const status = { valid: true, name: file?.name?.substring(0, 15), error: '' };
    if (!file) return;

    if (!regex.test(file.type) && (file.size / 1024 / 1024) > maxSize) {
        status.valid = false; status.error = t(`NOT_SUPPORTED_FILE_TYPE_AND_FILE_SIZE_EXCEEDED_5MB`);
    }

    if (!regex.test(fileExtention)) {
        status.valid = false; status.error = t(`NOT_SUPPORTED_FILE_TYPE`);
    }

    if ((file.size / 1024 / 1024) > maxSize) {
        status.valid = false; status.error = t(`FILE_SIZE_EXCEEDED`).replace("{}", `${maxSize}`);
    }

    return status;
}
const checkIfAllValidFiles = (files, otherFilesLength, videoFilesLength, regex, maxSize, t, maxFilesAllowed, state, specificFileConstraint) => {
    if (!files.length || !regex || !maxSize) return [{}, false];
    
    // added another condition files.length > 0 , for when  user uploads files more than maxFilesAllowed in one go the
    const uploadedVideos = state.filter(f => f[1].file.type.startsWith("video/")).length;
    const uploadedOthers = state.filter(f => !f[1].file.type.startsWith("video/")).length;

    // Validate count separately for videos & others
    if (otherFilesLength && maxFilesAllowed && (uploadedOthers + otherFilesLength > maxFilesAllowed)) {
        return [[{ valid: false, name: files[0]?.name?.substring(0, 15), error: t(`FILE_LIMIT_EXCEEDED`).replace("{}", `${maxFilesAllowed}`) }], true];
    }
    if (videoFilesLength && specificFileConstraint?.maxFiles && (uploadedVideos + videoFilesLength > specificFileConstraint.maxFiles)) {
        return [[{ valid: false, name: files[0]?.name?.substring(0, 15), error: t(`FILE_LIMIT_EXCEEDED`).replace("{}", `${specificFileConstraint.maxFiles}`) }], true];
    }   
    // Adding a check for fileSize > maxSize
    // const maxSizeInBytes = maxSize * 1000000
    // if(files?.some(file => file.size > maxSizeInBytes)){
    //     return [[{ valid: false, name: "", error: t(`FILE_SIZE_EXCEEDED_5MB`) }], true]
    // }

    const messages = [];
    let isInValidGroup = false;
    for (let file of files) {
        const fileStatus = fileValidationStatus(file, regex, maxSize, t, specificFileConstraint);
        if (!fileStatus.valid) {
            isInValidGroup = true;
        }
        messages.push(fileStatus);
    }
    
    return [messages, isInValidGroup];
}

// can use react hook form to set validations @neeraj-egov
const MultiUploadWrapper = ({ t, module = "PGR", tenantId = Digit.ULBService.getStateId(), getFormState, requestSpecifcFileRemoval, extraStyleName = "", setuploadedstate = [], showHintBelow, hintText, allowedFileTypesRegex = /(.*?)(jpg|jpeg|webp|aif|png|image|pdf|msword|xlsx|openxmlformats-officedocument)$/i, allowedMaxSizeInMB = 10, acceptFiles = "image/*, .jpg, .jpeg, .webp, .aif, .png, .image, .pdf, .msword, .openxmlformats-officedocument, .dxf", maxFilesAllowed, customClass="", customErrorMsg,containerStyles ,disabled,ulb, specificFileConstraint}) => {
    const FILES_UPLOADED = "FILES_UPLOADED"
    const TARGET_FILE_REMOVAL = "TARGET_FILE_REMOVAL"

    const [fileErrors, setFileErrors] = useState([]);
    const [enableButton, setEnableButton] = useState(true)

    const uploadMultipleFiles = (state, payload) => {
        console.debug(payload)
        const { files, fileStoreIds } = payload;
        const filesData = Array.from(files)
        const newUploads = filesData?.map((file, index) => [file.name, { file, fileStoreId: fileStoreIds[index] }])
        return [...state, ...newUploads]
    }

    const removeFile = (state, payload) => {
        const __indexOfItemToDelete = state.findIndex(e => e[1].fileStoreId.fileStoreId === payload.fileStoreId.fileStoreId)
        const mutatedState = state.filter((e, index) => index !== __indexOfItemToDelete)
        setFileErrors([])
        return [...mutatedState]
    }

    const uploadReducer = (state, action) => {
        console.log("statestate123",state)
        switch (action.type) {
            case FILES_UPLOADED:
                return uploadMultipleFiles(state, action.payload)
            case TARGET_FILE_REMOVAL:
                return removeFile(state, action.payload)
            default:
                break;
        }
    }

    const [state, dispatch] = useReducer(uploadReducer, [...setuploadedstate])
    
    const onUploadMultipleFiles = async (e) => {
        console.log("onUploadMultipleFiles")
        e.preventDefault()
        setEnableButton(false)
        setFileErrors([])
        const files = Array.from(e.target.files);

        if (!files.length) return;

        // Separate files before uploading
        const videoFiles = [];
        const otherFiles = [];
        const fileIndexMap = {}; // Stores index mapping

        files.forEach((file, index) => {
            if (file.type.startsWith("video/")) {
                videoFiles.push(file);
                fileIndexMap[file.name] = index;
            } else {
                otherFiles.push(file);
                fileIndexMap[file.name] = index;
            }
        });
        
        const [validationMsg, error] = checkIfAllValidFiles(files, otherFiles.length, videoFiles.length, allowedFileTypesRegex, allowedMaxSizeInMB, t, maxFilesAllowed, state, specificFileConstraint);
        
        if (error) {
            setFileErrors(validationMsg);
            setEnableButton(true);
            return;
        }
    
        try {
            let tenant = ulb || Digit.SessionStorage.get("Employee.tenantId");
    
            const uploadPromises = [];
    
            if (otherFiles.length > 0) {
                uploadPromises.push(Digit.UploadServices.MultipleFilesStorage(module, otherFiles, tenant));
            }
            if (videoFiles.length > 0) {
                uploadPromises.push(Digit.UploadServices.MultipleFilesStorage(module, videoFiles, tenant, true));
            }
    
            // Wait for all uploads to complete
            const responses = await Promise.all(uploadPromises);
    
            // Collect fileStore IDs and maintain order
            const fileStoreIds = new Array(files.length).fill(null);
            let responseIndex = 0;
    
            responses.forEach(response => {
                response?.data?.files.forEach((fileId, i) => {
                    const fileName = responseIndex === 0 ? otherFiles[i]?.name : videoFiles[i]?.name;
                    if (fileName in fileIndexMap) {
                        fileStoreIds[fileIndexMap[fileName]] = fileId;
                    }
                });
                responseIndex++;
            });
    
            setEnableButton(true);
            dispatch({ type: FILES_UPLOADED, payload: { files: e.target.files, fileStoreIds } });
    
        } catch (err) {
            console.error("File upload error:", err);
            setEnableButton(true);
        }
    }

    useEffect(() => getFormState(state), [state])

    useEffect(() => {
        requestSpecifcFileRemoval ? dispatch({ type: TARGET_FILE_REMOVAL, payload: requestSpecifcFileRemoval }) : null
    }, [requestSpecifcFileRemoval])

    return (
        <div style={containerStyles}>
            <UploadFile
                onUpload={(e) => onUploadMultipleFiles(e)}
                removeTargetedFile={(fileDetailsData) => dispatch({ type: TARGET_FILE_REMOVAL, payload: fileDetailsData })}
                uploadedFiles={state}
                multiple={true}
                showHintBelow={showHintBelow}
                hintText={hintText}
                extraStyleName={extraStyleName}
                onDelete={() => {
                    setFileErrors([])
                }}
                accept={acceptFiles}
                message={t(`ACTION_NO_FILE_SELECTED`)}
                customClass={customClass}
                disabled={disabled}
                enableButton={enableButton}
                ulb={ulb}
            />
            <span style={{ display: 'flex' }}>
                {fileErrors.length ? fileErrors.map(({ valid, name, type, size, error }) => (
                    valid ? null : displayError({ t, error, name }, customErrorMsg)
                )) : null}
            </span>
        </div>)
}

export default MultiUploadWrapper