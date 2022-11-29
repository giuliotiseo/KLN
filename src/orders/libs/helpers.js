import { generateFileObj, handleChangeFile } from "../../globals/libs/helpers";
import { STANDARD_DIMENSIONS } from "./constants";

export const STANDARD_DIMENSIONS_INDEXES = Object.keys(STANDARD_DIMENSIONS)
  .reduce((acc, val) => {
    return ({
      ...acc,
      [val]: STANDARD_DIMENSIONS[val].map(el => el.text)
    })
  }, []);

export async function generateFileForOrderDoc(file) {
  let dynamoRecordFile = null;
  let raw_format = null;
  try {
    raw_format = handleChangeFile(file);
    if(raw_format) {
      dynamoRecordFile = await generateFileObj(raw_format.filename, raw_format.key, raw_format.fileType);
    } else {
      throw new Error({
        error: `No result while getting raw_file`,
        file
      });
    }

  } catch(e) {
    console.error("Error:", e);
    throw new Error({
      error: `Failure getting file value`,
      file
    });
  }
  
  return {
    raw_format,
    db_format: dynamoRecordFile,
    online: false // this is new
  };
}

export const companyRolePermissions = (order, currentCompanyId) => {
  let currentCompanyRole = null;
  let isAllowed = false;
  if(!order) return { currentCompanyRole, isAllowed };

  const permissions = {
    CARRIER: true,
    SENDER: true,
    RECEIVER: false,
    PICKUPSTORAGE: false,
    DELIVERYSTORAGE: false,
  }
  
  if(currentCompanyId === order.carrierId) currentCompanyRole = "CARRIER";
  else if(currentCompanyId === order.senderId) currentCompanyRole = "SENDER";
  else if(currentCompanyId === order.receiverId) currentCompanyRole = "RECEIVER";
  else if(currentCompanyId === order.pickupStorageId) currentCompanyRole = "PICKUPSTORAGE";
  else if(currentCompanyId === order.deliveryStorage) currentCompanyRole = "DELIVERYSTORAGE";

  isAllowed = order.status === "PENDING" ? permissions[currentCompanyRole] : false;

  return {
    currentCompanyRole,
    isAllowed
  }
}