import { generateLegacyLogList, generateLogList, generateUid } from "../../globals/libs/helpers";
import { digestMessage } from "../../globals/libs/sha256";
import { aggregatePalletFiles, PALLET_PROPS_GLOSSARY, PALLET_PROPS_TO_SKIP_FROM_LOG, REQUIRED_PALLET_FIELDS } from "../libs/helpers";
import { resetPalletCreatorContent } from "../slices/palletCreatorSlice";
import { resetPalletEditor } from "../slices/palletEditorSlice";
import { changePalletCreatorTravelThunk, saveAndDeletePalletFileToS3, savePalletHandlingFilesToS3 } from "./pallets-thunks";

// Create handling ------------------------------------------------------------------------------------------------------------------------------------------------------------------
export const handleCreatePalletHandling = async ({ 
  palletHandling,
  createPalletHandling,
  travel_id,
  dispatch,
  validation,
}) => {
  const validation_ids = validation ? Object.keys(validation) : [];
  let error = "";
  if(validation_ids.length > 0) {
    for(let id of validation_ids) {
      if(error === true) return;
      if(validation[id].status === "ERROR") {
        error = true;
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
    dispatch(savePalletHandlingFilesToS3([ ...palletHandling.files, palletHandling.image ]));
    
    // Data log generation
    const uuid = generateUid(16);
    const timestamp = Date.now();
    const id =   palletHandling.waypoint.handlingId;
    const stamp = `PLT-${uuid}`;

    const log = await generateLegacyLogList({
      list: [],
      action: 'Creazione',
      subject: `movimentazione pallet gestita da ${palletHandling.carrier.name} sul conto di ${palletHandling.customer.name}.`
    });

    // Registra i dati nel database
    await createPalletHandling({
      ...palletHandling,
      id,
      stamp,
      createdAt: new Date(timestamp).toISOString(),
      log
    });
    
    // Resetta i valori salvati
    dispatch(resetPalletCreatorContent());
    dispatch(changePalletCreatorTravelThunk(travel_id));
  }
}

// Create reversal ------------------------------------------------------------------------------------------------------------------------------------------------------------------
export const handleCreatePalletReversal = async ({ 
  palletHandling,
  createReversal,
  dispatch,
  validation,
}) => {
  const validation_ids = validation ? Object.keys(validation) : [];
  let error = "";
  if(validation_ids.length > 0) {
    for(let id of validation_ids) {
      if(error === true) return;
      if(validation[id].status === "ERROR") {
        error = true;
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
    dispatch(savePalletHandlingFilesToS3([ ...palletHandling.files, palletHandling.image ]));
    
    // Data log generation
    const uuid = generateUid(16);
    const timestamp = Date.now();
    const id = palletHandling?.palletHandlingRef?.id
      ? `REV${uuid}_${palletHandling?.palletHandlingRef?.id}`
      : await digestMessage(`REV_${uuid}_${palletHandling.carrier.id}_${palletHandling.reversal[0].vatNumber}+${palletHandling.reversal[0].name.replaceAll(' ','')}_${timestamp}`);

    const stamp =  palletHandling?.palletHandlingRef?.stamp 
      ?  palletHandling.palletHandlingRef.stamp 
      : `REV-${uuid}`;

    const log = await generateLegacyLogList({
      list: [],
      action: 'Creazione',
      subject: `storno pallet da ${palletHandling.carrier.name} sul conto di ${palletHandling.reversal[0].name}.`
    });

    // Registra i dati nel database
    await createReversal({
      ...palletHandling,
      id,
      stamp,
      createdAt: new Date(timestamp).toISOString(),
      log
    });
    
    // Resetta i valori salvati
    dispatch(resetPalletCreatorContent());
  }
}


// Update ------------------------------------------------------------------------------------------------------------------------------------------------------------------
export const handleUpdatePallet = async ({
  palletEditor,
  domain,
  fetchedPalletHandling,
  skipValidation,
  cognitoUser,
  profile,
  updatePalletHandling,
  dispatch,
  setModal
}) => {
  let error = "";
  const validation = skipValidation ? null : palletEditor?.validation;
  const validation_ids = validation ? Object.keys(validation) : [];
  const previousLogs = fetchedPalletHandling.log;

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
    const required = REQUIRED_PALLET_FIELDS.reduce((acc, val) => {
      return ({
        ...acc,
        [val]: fetchedPalletHandling[val]
      })
    }, {});

    // // Handle changes on S3
    const files = aggregatePalletFiles(palletEditor?.files, palletEditor?.voucherImage)
    if(files?.length > 0) {
      dispatch(saveAndDeletePalletFileToS3(files));
    }

    // Get all changed PALLET keys and exclude validation key
    const log = generateLogList({
      action: "Aggiornamento",
      domain,
      cognitoUser,
      profile,
      data: palletEditor,
      previousLogs,
      propsGlossary: PALLET_PROPS_GLOSSARY,
      excludedKeys: PALLET_PROPS_TO_SKIP_FROM_LOG,
      limit: 20,
    });

    // Save changes on DB
    await updatePalletHandling({ ...required, ...palletEditor, log });
    dispatch(resetPalletEditor());
    // setModal(false);
  }
}
