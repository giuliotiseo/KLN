import { API, graphqlOperation, Storage } from 'aws-amplify';
import { consoleSuccess, generateFileObj } from "../../globals/libs/helpers";
import { toast } from 'react-toastify';
// Validations
import { validatePhone } from '../../auth/libs/helpers';
// Mutations
import { UPDATE_AVATAR, UPDATE_PROFILE_INFO, UPDATE_PROFILE_LOCATION, UPDATE_PROFILE_NOTE } from './graphql/mutations';

export const updateAvatar = async (file, username) => {
  const keyNameFile = username;
  const avatarRecord = await generateFileObj(keyNameFile, keyNameFile, file.fileType);

  // Push to database
  try {
    await API.graphql(graphqlOperation(UPDATE_AVATAR, {
      input: {
        username: username,
        avatar: avatarRecord,
      }
    }));

    consoleSuccess('File saved on DynamoDB', file.file);
  } catch(err) {
    console.error(err);
    toast.error('Impossibile caricare le informazioni dell\'avatar sul server');
    throw new Error("Error while pushing data in ddb (user/update.js)");
  }

  // Load in storage
  try {
    await Storage.put(keyNameFile, file.file, {
      level: 'public',
      contentType: file.fileType
    });

    consoleSuccess('File saved on S3', file.file);
  } catch(err) {
    await API.graphql(graphqlOperation(UPDATE_AVATAR, { input: { username: username, avatar: null }}));
    toast.error('Impossibile caricare l\'immagine sul server');
    console.error(err);
    throw new Error("Error while saving data on storage (user/update.js)");
  }

  return avatarRecord;
}

export const updateProfileLocation = async (username, location) => {
  try {
    const res = await API.graphql(graphqlOperation(UPDATE_PROFILE_LOCATION, {
      input: {
        username: username,
        location: location,
      }
    }));

    toast.success('Posizione aggiornata con successo');
    consoleSuccess('Info posizione aggiornate su ddb', res);
    return res?.data?.updateProfile?.location;
  } catch(err) {
    console.error('Errore aggiornamento posizione', err);
    toast.error('Impossibile aggiornare la posizione');
    throw new Error("Error while updating user location");
  }
}

export const updateProfileNote = async (username, note) => {
  try {
    const res = await API.graphql(graphqlOperation(UPDATE_PROFILE_NOTE, {
      input: {
        username: username,
        note: note,
      }
    }));
    toast.success('Note profilo aggiornate con successo');
    consoleSuccess('Note profile aggiornate su ddb', res);
    return res?.data?.updateProfile?.note;
  } catch(err) {
    console.error('Errore aggiornamento posizione', err);
    toast.error('Impossibile aggiornare la posizione');
    throw new Error("Error while updating user note");
  }
}

export const updateProfileInfo = async(username, name, phone) => {
  const searchable = name.toLowerCase();

  try {
    if(validatePhone(phone)) {
      const res = await API.graphql(graphqlOperation(UPDATE_PROFILE_INFO, {
        input: {
          username: username,
          name: name,
          phone: phone,
          searchable: searchable
        }
      }));
      toast.success('Info profilo aggiornate con successo');  
      consoleSuccess('Info profilo aggiornate con successo', res);
      return res?.data?.updateProfile;
    } else {
      toast.error('Il formato del numero di telefono non è corretto');  
      console.error('Il formato del numero di telefono non è corretto');
      throw new Error("Phone format incorrect");
    }
  } catch(err) {
    toast.error('Errore durante l\'aggiornamento delle info profilo');  
    console.error('Errore durante l\'aggiornamento delle info profilo', err);
    throw new Error("Error while updating info profile");
  }
}
