import { createAsyncThunk } from "@reduxjs/toolkit";
import { Storage } from "aws-amplify";
import { generateFileObj, handleChangeFile } from "../../globals/libs/helpers";

//  Creator ------------------------------------------------------------------------------------------------------------
export const addFileToPreOrderCreatorThunk = createAsyncThunk(
  'preOrderCreatorSlice/file_process',
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

  //  Editor ------------------------------------------------------------------------------------------------------------
  export const addFileToPreOrderEditorThunk = createAsyncThunk(
    'preOrderEditorSlice/file_process',
    async ({ file, files }, { rejectWithValue }) => {
      let previousFiles = files?.length > 0 ? files : [];
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
      
      return previousFiles.concat({
        raw_format,
        db_format: dynamoRecordFile,
        online: false // this is new
      });
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

async function removePreOrderFileFromS3ByKey(storedKeys) {
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

export const savePreOrderFileToS3 = createAsyncThunk(
  'preOrderCreatorSlice/save_file',
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

        console.log('File saved on S3', file);
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

export const saveAndDeletePreOrderFileToS3 = createAsyncThunk(
  'preOrderEditorSlice/save_file',
  async(dataFiles, { rejectWithValue }) => {
    let storedFiles = [];

    console.groupCollapsed("SaveAndDeletePreOrderFileToS3");
    console.log("Ecco i dataFiles", dataFiles);

    // Remove changed files
    let filesToRemove = dataFiles
      .filter(file => file.hasOwnProperty("keyToRemove"))
      .map(file => file.keyToRemove);

    if(filesToRemove.length > 0) {
      console.log("Saranno rimossi: ", filesToRemove);
      await removePreOrderFileFromS3ByKey(filesToRemove);
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

        console.log('File saved on S3', file);
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

export const deletePreOrderFileFromS3 = createAsyncThunk(
  'preOrderEditorSlice/delete_file',
  async(dataFiles) => {
    console.groupCollapsed("deletePreOrderFileFromS3");
    console.log("Ecco i dataFiles", dataFiles);

    // Remove changed files
    let filesToRemove = dataFiles.map(file => file.db_format).map(dbfile => dbfile.key);
    if(filesToRemove.length > 0) {
      console.log("Saranno rimossi: ", filesToRemove);
      await removePreOrderFileFromS3ByKey(filesToRemove);
    }

    console.groupEnd();
  }
)
