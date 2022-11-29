import { API, graphqlOperation, Storage } from "aws-amplify";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { consoleSuccess, generateFileObj, handleChangeFile } from "../../globals/libs/helpers";
import { TRAVEL_BY_ID } from "../../travels/api/graphql/queries";
import { digestMessage } from "../../globals/libs/sha256";
import { GET_PALLET_HANDLING_BY_ID, GET_PALLET_HANDLING_BY_STAMP } from "./graphql/queries";

// File pre-processors
//  CREATOR ------------------------------------------------------------------------------------------------------------
export const changePalletCreatorTravelThunk = createAsyncThunk(
  'palletCreatorSlice/changePalletCreatorTravelThunk',
  async (travel_id, { rejectWithValue }) => {
    let result = {};
    try {
      result = await API.graphql(graphqlOperation(TRAVEL_BY_ID, { id: travel_id }));
      console.log("Ecco il viaggio trovato", result);
      if(!result?.data?.getTravel) return null;
    } catch(e) {
      console.error("Error:", e);
      throw rejectWithValue({
        error: `Failure getting travel value`,
      });
    }

    
    return result?.data?.getTravel;
  }
)


export const changePalletCreatorWaypointThunk = createAsyncThunk(
  'palletCreatorSlice/changePalletCreatorWaypointThunk',
  async ({ travel_id, waypoint }, { getState }) => {
    const { pallets: { creator }} = getState();
    const waypointId = creator.waypoint.PICKUP?.id || creator.waypoint.DELIVERY?.id || null;

    /* 
      Resetto il waypoint perché sto passando un valore non valido o sto uncheckando il waypoint corrente
    */
    if((!travel_id || !waypoint?.id) || (waypointId === waypoint.id)) {
      return {
        PICKUP: null,
        DELIVERY: null,
      };
    }
  
    /* 
      Suddivido i waypoint in PICKUP e DELIVERY distribuendo gli ordini in base all'attributo operation
    */
    const pickupWaypoint = waypoint.orders.filter(order => order.operation === "PICKUP")?.length > 0
      ? { ...waypoint, orders: waypoint.orders.filter(order => order.operation === "PICKUP")}
      : null;
      
    const deliveryWaypoint = waypoint.orders.filter(order => order.operation === "DELIVERY")?.length > 0 
      ? { ...waypoint, orders: waypoint.orders.filter(order => order.operation === "DELIVERY")}
      : null;


    /*
      Legenda id:
      waypoint id: `${order.checkpoint.location.place_id}_${timestamp}`
      - il timestamp è relativo al momento di inserimento dell'ordine nella tabella di marcia in travel creator
      travel id: `$TRV_${uuid}_${vatNumber}+${id}_${licensePlate}_${timestamp}`
      - il timestamp è relativo al momento in cui viene registrato il viaggio
    */

    /* 
      Ricavo preventivamente gli ID delle movimentazioni per aver un riferimento su cui poter controllare
      eventuali registrazioni avvenute in precedenza
    */
    const handlingPickupId = pickupWaypoint 
      ? await digestMessage(`PLT_${travel_id}_${pickupWaypoint.id}_PICKUP`)
      : null;

    const handlingDeliveryId = deliveryWaypoint 
      ? await digestMessage(`PLT_${travel_id}_${deliveryWaypoint.id}_DELIVERY`)
      : null;

    const handlingResult = {
      PICKUP: handlingPickupId ? { ...pickupWaypoint, handlingId: handlingPickupId } : null,
      DELIVERY: handlingDeliveryId ? { ...deliveryWaypoint, handlingId: handlingDeliveryId } : null,
    }

    let waypointTab = "PICKUP";
    if(!handlingResult.PICKUP && !handlingResult.DELIVERY) { waypointTab = null }
    if(!handlingResult.PICKUP && handlingResult.DELIVERY) {
      waypointTab = "DELIVERY";
    } else {
      waypointTab = "PICKUP";
    }

    /* 
      Cambio tipo di visualizzazione e passo ad un'interfaccia readonly dato che l'operazione è già stata creata
    */
    const waypointHandlingId = handlingResult[waypointTab]?.handlingId || null;
    const storedHandlingsIds = creator.travel?.palletHandlings?.items?.map(item => item.id);
    
    if(storedHandlingsIds.includes(waypointHandlingId)) {
      return {
        ...handlingResult,
        type: "STORED",
        id: waypointHandlingId,
        waypointTab,
      }
    }


    return {
      ...handlingResult,
      waypointTab: waypointTab
    };
  }
)

export const addImageToPalletCreatorThunk = createAsyncThunk(
  'palletCreatorSlice/image_process',
  async (file, { rejectWithValue }) => {
    let dynamoRecordFile = null;
    let raw_format = null;
    
    try {
      raw_format = handleChangeFile(file);
      if(raw_format) {
        dynamoRecordFile = await generateFileObj(raw_format.filename, raw_format.key, raw_format.fileType);
      } else {
        throw rejectWithValue({
          error: `No result while getting raw_file`,
          file
        });
      }

    } catch(e) {
      console.error("Error:", e);
      throw rejectWithValue({
        error: `Failure getting file value`,
        file
      });
    }
    
    console.log("Add", {
      raw_format,
      db_format: dynamoRecordFile,
      online: false // this is new
    })
    
    return {
      raw_format,
      db_format: dynamoRecordFile,
      online: false // this is new
    };
  }
)

export const addFileToPalletCreatorThunk = createAsyncThunk(
  'palletCreatorSlice/file_process',
  async (file, { rejectWithValue }) => {
    let dynamoRecordFile = null;
    let raw_format = null;
    try {
      raw_format = handleChangeFile(file);
      if(raw_format) {
        dynamoRecordFile = await generateFileObj(raw_format.filename, raw_format.key, raw_format.fileType);
      } else {
        throw rejectWithValue({
          error: `No result while getting raw_file`,
          file
        });
      }

    } catch(e) {
      console.error("Error:", e);
      throw rejectWithValue({
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
)

export const changePalletCreatorHandlingRefThunk = createAsyncThunk(
  'palletCreatorSlice/changePalletHandlingRefThunk',
  async (stamp, { rejectWithValue }) => {
    let result = null;
    try {
      result = await API.graphql(graphqlOperation(GET_PALLET_HANDLING_BY_STAMP, { stamp: `PLT-${stamp.toUpperCase()}` }));
      console.log("Ecco la movimentazione trovata", result);
      if(result?.data?.palletHandlingByStamp?.items?.length <= 0) return null;
    } catch(e) {
      console.error("Error:", e);
      throw rejectWithValue({
        error: `Failure getting travel value`,
      });
    }   
    
    return result?.data?.palletHandlingByStamp?.items[0];
  }
)

//  EDITOR ------------------------------------------------------------------------------------------------------------
export const addImageToPalletEditorThunk = createAsyncThunk(
  'palletEditorSlice/image_process',
  async (file, { rejectWithValue }) => {
    let dynamoRecordFile = null;
    let raw_format = null;
    
    try {
      raw_format = handleChangeFile(file);
      if(raw_format) {
        dynamoRecordFile = await generateFileObj(raw_format.filename, raw_format.key, raw_format.fileType);
      } else {
        throw rejectWithValue({
          error: `No result while getting raw_file`,
          file
        });
      }

    } catch(e) {
      console.error("Error:", e);
      throw rejectWithValue({
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
)

export const addFileToPalletEditorThunk = createAsyncThunk(
  'palletEditorSlice/file_process',
  async (file, { rejectWithValue }) => {
    let dynamoRecordFile = null;
    let raw_format = null;
    try {
      raw_format = handleChangeFile(file);
      if(raw_format) {
        dynamoRecordFile = await generateFileObj(raw_format.filename, raw_format.key, raw_format.fileType);
      } else {
        throw rejectWithValue({
          error: `No result while getting raw_file`,
          file
        });
      }

    } catch(e) {
      console.error("Error:", e);
      throw rejectWithValue({
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
)


//  SAVE THUNKS ------------------------------------------------------------------------------------------------------------
// Store files into S3
async function rollbackS3AfterFailure(storedFiles) {
  for(let file of storedFiles) {
    await Storage.remove(file.key, { level: 'protected' })
    .then(() => {
      console.log('File rimosso da S3', file.key)
    }).catch(err => {
    console.error(err);
    throw new Error("Error while removing file", file.key);
  })
}
} 

async function removePalletFileFromS3ByKey(storedKeys) {
  for(let key of storedKeys) {
    if(typeof key !== "string") return;
    await Storage.remove(key, { level: 'protected' })
      .then(() => {
        console.log('File rimosso da S3', key)
      }).catch(err => {
      console.error(err);
      throw new Error("Error while removing file", key);
    })
  }
}

export const savePalletHandlingFilesToS3 = createAsyncThunk(
  'palletCreatorSlice/save_file',
  async (dataFiles, { rejectWithValue }) => {
    let storedFiles = [];
    // Getting raw values where are stored all files data usefull to save them on S3
    const files = dataFiles.map(d_file => d_file.raw_format);

    for(let file_data of files) {
      const key = file_data.key;
      const blob = await fetch(file_data.fileUrl).then(r => r.blob());
      const file = new File(
        [blob],
        key,
        { type: file_data.long_fileType, lastModified:new Date().getTime() }
      );

      if(!file) {
        throw rejectWithValue({
          error: `File not found from blob`,
          file
        });
      }

      try {
        await Storage.put(key, file, {
          level: 'protected',
          contentType: file_data.fileType
        });

        consoleSuccess('File saved on S3', file);
      } catch(e) {
        // Rollback
        console.error("Error:", e);
        await rollbackS3AfterFailure(storedFiles)
        throw rejectWithValue({
          error: `Failure getting file value`,
          file
        });
      }

      storedFiles.push(file_data);
    }
  }
)

export const saveAndDeletePalletFileToS3 = createAsyncThunk(
  'palletEditorSlice/save_file',
  async(dataFiles, { rejectWithValue }) => {
    let storedFiles = [];

    console.groupCollapsed("SaveAndDeletePalletFileToS3");
    console.log("Ecco i dataFiles", dataFiles);

    // Remove changed files
    let filesToRemove = dataFiles
      .filter(file => file.hasOwnProperty("keyToRemove"))
      .map(file => file.keyToRemove);

    if(filesToRemove.length > 0) {
      console.log("Saranno rimossi: ", filesToRemove);
      await removePalletFileFromS3ByKey(filesToRemove);
    }
  
    // Process all new files data
    let newFilesStack = dataFiles.filter(file => file.online === false).map(file => file.raw_format);
    console.log("Saranno aggiunti: ", newFilesStack);
    for(let file_data of newFilesStack) {
      if(!file_data?.key) return;
      
      const keyNameFile = file_data.key;
      const blob = await fetch(file_data.fileUrl).then(r => r.blob());
      const file = new File(
        [blob],
        keyNameFile,
        { type: file_data.long_fileType, lastModified:new Date().getTime() }
      );

      if(!file) {
        throw rejectWithValue({
          error: `File not found from blob`,
          file
        });
      }

      try {
        await Storage.put(keyNameFile, file, {
          level: 'protected',
          contentType: file_data.fileType
        });

        consoleSuccess('File saved on S3', file);
      } catch(e) {
        // Rollback
        console.error("Error:", e);
        await rollbackS3AfterFailure(storedFiles)
        throw rejectWithValue({
          error: `Failure getting file value`,
          file
        });
      }

      storedFiles.push(file_data);
    }
  
    console.groupEnd();
  }
)
