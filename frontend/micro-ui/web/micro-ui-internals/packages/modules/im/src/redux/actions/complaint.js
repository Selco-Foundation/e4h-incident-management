import { CREATE_COMPLAINT } from "./types";

const createComplaint = ({
  cityCode,
  complaintType,
 comments,
 healthcentre,
 healthCareType,
 reporterName,
 district,
 block,
 uploadImages,
 uploadedFile,
  tenantId
}) => async (dispatch, getState) => {
  const response = await Digit.Complaint.create({
    comments,
    complaintType,
    block,
    healthCareType,
    uploadedFile,
    healthcentre,
    uploadImages,
    district,
    reporterName,
    tenantId

    
  });
  console.log("res", response)
  dispatch({
    type: CREATE_COMPLAINT,
    payload: response,
  });
};

export default createComplaint;
