import { saveAndDeleteCheckFileToS3, saveCheckFileToS3 } from "../api/check-thunks";
import { aggregateCheckFiles, CHECK_PROPS_GLOSSARY, encodeCheckId, REQUIRED_CHECK_FIELDS } from "../libs/helpers";
import { generateLogList, generateLegacyLogList, generateUid } from "../../globals/libs/helpers";
import { resetCheckCreatorContent } from "../slices/checkCreatorSlice";

// Create ------------------------------------------------------------------------------------------------------------------------------------------------------------------
export const handleCreateCheck = async ({ check, createCheck, queryFrom, dispatch, validation, setModal }) => {
  const validation_ids = validation ? Object.keys(validation) : [];
  let error = "";
  if(validation_ids.length > 0) {
    for(let id of validation_ids) {
      if(error === true) return;
      if(validation[id].status === "ERROR") {
        error = true;
        setModal(true);
      } else {
        error = false;
      }
    }
  } else {
    error = false;
  }

  // Se supera la validazione
  if(error === false) {
    // Carica i files all'interno dello Store S3
    dispatch(saveCheckFileToS3([ ...check.files, check.image ]));
    
    // Data log generation
    const uuid = generateUid();
    const timestamp = Date.now();
    const id =  await encodeCheckId({
      orderId: check.order.id,
      uuid, 
      timestamp
    });

    const stamp = `CHK-${uuid}`;

    const domain = check.order[`${queryFrom}Name`];
    const log = await generateLegacyLogList({
      list: [],
      action: 'Creazione',
      subject: `assegno da ${check.order.receiverName} a ${check.order.senderName}, gestito da ${check.order.carrierName}. Operazione eseguita dal dominio di ${domain}`
    });

    // Registra i dati nel database
    createCheck({
      ...check,
      id,
      stamp,
      createdAt: new Date(timestamp).toISOString(),
      log
    });
    
    // Resetta i valori salvati
    dispatch(resetCheckCreatorContent());
    setModal(false);
  }
}

// Update ------------------------------------------------------------------------------------------------------------------------------------------------------------------
export const handleUpdateCheck = async ({
  checkEditor,
  fetchedCheck,
  skipValidation,
  cognitoUser,
  queryFrom,
  updateCheck,
  dispatch,
  setModal
}) => {
  let error = "";
  const validation = skipValidation ? null : checkEditor?.validation;
  const validation_ids = validation ? Object.keys(validation) : [];
  const domain = fetchedCheck[`${queryFrom}Name`];  
  const previousLogs = fetchedCheck.log;

  if(validation_ids.length > 0) {
    for(let validation_id of validation_ids) {
      if(error === true) return;
      if(validation[validation_id].response === "ERROR") {
        error = true;
        setModal(true);
      } else {
        error = false;
      }
    }
  } else {
    error = false;
  }

  // Se supera la validazione
  if(error === false) {
    // Extract required values
    const required = REQUIRED_CHECK_FIELDS.reduce((acc, val) => {
      return ({
        ...acc,
        [val]: fetchedCheck[val]
      })
    }, {});

    // // Handle changes on S3
    const files = aggregateCheckFiles(checkEditor?.files, checkEditor?.image)
    if(files?.length > 0) {
      dispatch(saveAndDeleteCheckFileToS3(files));
    }

    // Get all changed check keys and exclude validation key
    const log = generateLogList({
      action: "Aggiornamento",
      domain,
      cognitoUser,
      data: checkEditor,
      previousLogs,
      propsGlossary: CHECK_PROPS_GLOSSARY,
      limit: 20,
    });

    // Save changes on DB
    updateCheck({ ...required, ...checkEditor, log });
    setModal(false);
  }
}