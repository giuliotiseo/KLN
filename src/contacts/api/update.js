import { API, graphqlOperation, Storage } from 'aws-amplify';
import { toast } from 'react-toastify';
// Helpers
import { consoleInfo, consoleSuccess, formatPayloadWithCheckpoint, formatWindowsToDynamoDb, generateFileObj, generateLegacyLogList } from '../../globals/libs/helpers';
import { CONTACT_TYPES_SCOPE, mergeContactValues, processCheckpointsBeforePush, processCompanyContact, processUserContact, remapCompaniesToContacts, remapProfilesToContacts } from '../libs/helpers';
// Mutations
import { UPDATE_CONTACT, UPDATE_CONTACT_LOCATIONS, UPDATE_CONTACT_TAG, UPDATE_INVITE_STATUS } from './graphql/mutations';
// API
import { fetchContactFromProfileOrCompany } from './fetch';
import { trackingContactLocationThunk } from '../../app/thunks/contactsThunks';
import { getTrackingLocation } from '../../warehouses/libs/helpers';

// For company contacts
export async function handleEditCompanyContact(contact, previousContact, allContacts) {
    // Process informations
  const formatCheckpoints = processCheckpointsBeforePush(contact, allContacts);
  const processedCompanyContact = processCompanyContact({ ...contact, checkpoints: formatCheckpoints });
  try {
    const updatedContactResult = await updateContact(processedCompanyContact, previousContact);
    return updatedContactResult;
  } catch(e) {
    toast.error('È stato riscontrato un problema durante l\'laggiornamento del contatto. Verifica di aver compilato tutti i campi');
    throw new Error('Missing data on create contact (company)', e);
  }
}

// For user contacts
export async function handleEditUserContact(data, previousContact) {
  const processedUserContact = processUserContact({ ...data });
  console.log(processedUserContact);
  try {
    const updatedContactResult = await updateContact(processedUserContact, previousContact);
    return updatedContactResult;
  } catch(e) {
    toast.error('È stato riscontrato un problema durante l\'laggiornamento del contatto. Verifica di aver compilato tutti i campi');
    throw new Error('Missing data on update contact (user)', e);
  }
}

// Main update contact ------------------------------------------------------------------------------
export async function updateContact(contact, prevContact, merge) {
  const dataType = CONTACT_TYPES_SCOPE[contact.type];
  let avatarRecord = null;

  console.groupCollapsed('Avatar UPDATE OPS');
  console.log('Avatar caricato', contact.avatar);
  // Controllo l'esistenza di un avatar precedente
  if(prevContact.avatar?.timestamp) {
    console.log('Rilevato avatar esistente', prevContact.avatar);

    // Se l'avatar precedente è diverso da quello attuale
    if(prevContact.avatar.timestamp !== contact.avatar?.timestamp) {
      console.group('Step 1: avatar precedente ed attuale sono diversi');
      console.log('Precedente: ', prevContact.avatar);
      console.log('Attuale: ', contact.avatar);
      console.groupEnd();

      // Se il file è presente nella nuova istanza di contact
      if(contact.avatar?.timestamp) {
        console.log('Avatar file presente nella nuova istanza di contact', contact.avatar);

        if(contact.avatar?.key) {
          console.log('Nuovo avatar recuperato dal DDB - imposto record ai valori ottenuti', contact.avatar);
          avatarRecord = contact.avatar;
        } else {
          // Genera un nuovo id
          const keyNameFile = dataType === 'USER' ? contact.email : contact.vatNumber;
          // Inserisci l'immagine nell'S3
          await Storage.put(keyNameFile, contact.avatar.file, {
            level: 'public',
            contentType: contact.fileType
          }).then(async () => {
            consoleSuccess('Immagine caricata correttamente su S3', keyNameFile);
            avatarRecord = await generateFileObj(keyNameFile, contact.avatar.fileType);
            console.log('Record generato', avatarRecord);
          }).catch(err => {
            console.error('Errore nel caricamento dell\'immagine - Reset avatar precedente', err);
            avatarRecord = prevContact.avatar;
          });
        }
      } else {
        // Se il file NON è presente nella nuova istanza di contact
        console.log('Avatar file NON presente nella nuova istanza di contact', contact.avatar);
        consoleInfo('Reimposto avatar ai valori precedenti (prevAvatar)', prevContact.avatar);
        avatarRecord = prevContact.avatar;
      }

    } else { // Altrimenti, se l'avatar precedente è uguale a quello attuale
      console.group('Step 2: avatar precedente ed attuale sono uguali');
      console.log('Precedente: ', prevContact.avatar);
      console.log('Attuale: ', contact.avatar);
      console.groupEnd();
      avatarRecord = contact.avatar;
    }

  } else { // Non è presente un avatar esistente
    console.group('Step 3: nessun avatar precedente individuato');
    console.log('Precedente: ', prevContact.avatar);
    console.log('Attuale: ', contact.avatar);
    console.groupEnd();

    // Verifico la presenza di file nel nuovo avatar
    if(contact.avatar?.timestamp && contact.avatar?.file) {
      console.log('Avatar presente nella nuova istanza, pronto al caricamento', contact.avatar);
      // Genera un nuovo id
      const keyNameFile = dataType === 'USER' ? contact.email : contact.vatNumber;
      // Inserisci l'immagine nell'S3
      await Storage.put(keyNameFile, contact.avatar.file, {
        level: 'public',
        contentType: contact.fileType
      }).then(async () => {
        consoleSuccess('Avatar caricato con successo', keyNameFile);
        avatarRecord = await generateFileObj(keyNameFile, contact.avatar.fileType);
      }).catch(e => {
        console.error('È stato rilevato un errore nel caricamento - reset avatar a null', e)
        avatarRecord = null;
      });
    } else { // Non sono presenti avatar nemmeno nel nuovo contact
      if(contact.avatar?.key) {
        console.log('Avatar già presente nel DDB', contact.avatar);
        avatarRecord = contact.avatar;
      } else {
        console.log('Avatar NON presente nella nuova istanza, conferma a null', contact.avatar);
        avatarRecord = null;
      }
    }
  }

  consoleInfo('Il nuovo contact.avatar sarà', avatarRecord);
  contact.avatar = avatarRecord;
  console.groupEnd();

  // If it is specified the merge operation from the parameters of the update function
  if(merge) {
    const mergedValues = mergeContactValues(contact, prevContact);
    contact = { ...contact, ...mergedValues };
  }

  // Generate logs stack
  contact.log = await generateLegacyLogList({
    list: prevContact?.log || [],
    action: `Aggiornamento`, 
    subject: `contatto in rubrica: ${contact.name} (${contact.email})`,
  });

  // Run mutation in DynamoDB
  try {
    const res = await API.graphql(graphqlOperation(UPDATE_CONTACT, { input: contact }))
    console.log("risultato update", res);
    return res.data.updateContact;
  } catch (error) {
    console.error(error);
    toast.error('Non è stato possibile aggiornare questo contatto',);
    throw new Error('[E] Error while updating contact:', error);
  }
}

//  Update contact tag (used for indirect ops) ------------------------------------------------------------------------------
export async function updateContactTag(contact, tag) {  
  console.log('Il tag che gli mando', tag)
  console.log('tutto il contatto', contact)
  console.log('il datatosend', { id: contact.id, tenant: contact.tenant, tag, log: updatedLogList })

  // Generate logs stack
  const updatedLogList = await generateLegacyLogList({
    list: contact.log || [],
    action: `Aggiornamento`, 
    subject: `tag contatto ${contact.name}`,
  });

  // Run mutation in DynamoDB
  try {
    const res = await API.graphql(
      graphqlOperation(UPDATE_CONTACT_TAG, {
        input: { id: contact.id, tenant: contact.tenant, tag, log: updatedLogList },
      })
    );

    return res.data.updateContact;
  } catch (error) {
    console.error('[E] Error updating contact:', error);
    throw new Error(error);
  }
}

//  Update contact after send invite ------------------------------------------------------------------------------
export async function updateInviteDate(contact) {
  const { id, name, email, tenant, log } = contact;

  // Generate logs stack
  const updatedLogList = await generateLegacyLogList({
    list: log || [],
    action: `Invio invito`, 
    subject: `su email del contatto ${name} (${email})`,
  });
  
  // Run mutation in DynamoDB
  try {
    const timestampInvite = Date.now();
    const res = await API.graphql(
      graphqlOperation(UPDATE_INVITE_STATUS, {
        input: { id, tenant, invited: timestampInvite, log: updatedLogList },
      })
    );

    return res.data.updateContact;
  } catch (error) {
    console.error('[E] Error updating contact:', error);
    throw new Error(error);
  }
}


//  Update contact after syncronization request ------------------------------------------------------------------------------\
export async function runSync(prevContact, company) {
  console.log("prevContact, company", { prevContact, company });

  const selectedType = CONTACT_TYPES_SCOPE[prevContact.type];
  const fetchContactResult = await fetchContactFromProfileOrCompany({ type: selectedType, variable: prevContact })

  console.log("fetchContactResult", fetchContactResult);

  // Todo: Occorre pensare a un sistema che permetta di sincronizzare i contatti anche nel caso di doppia partita iva
  if(fetchContactResult.length > 0) {
    console.error("Fallimento forzato / programmato sync - occorre preparare sincronizzazione abilitata a partita iva multipla", { fetchContactResult })
    toast.error("Impossibile procedere: rilevate due aziende con Partita IVA uguale");
    return null;
  }

  let result;
  if((selectedType === 'USER' && fetchContactResult) || (selectedType === 'COMPANY' && fetchContactResult.length > 0)) {
    let updatedContact = selectedType === 'USER' 
      ? remapProfilesToContacts([fetchContactResult], company.vatNumber)
      : remapCompaniesToContacts(fetchContactResult, company.vatNumber)

    console.log("Contatto aggiornato:", updatedContact);

    let dataToSend = updatedContact[Object.keys(updatedContact)[0]];

    if(dataToSend) {
      // Using the same id for doing an overwrite
      dataToSend.id = prevContact.id;

      // Confirm the fact that the data came from remote in case of sync
      dataToSend.sync = true;
      
      // Generate logs stack
      dataToSend.log = await generateLegacyLogList({
        list: [prevContact.log],
        action: `Sincronizzazione`, 
        subject: `contatto: ${dataToSend.name} (${dataToSend?.email || dataToSend?.vatNumber})`,
      });

      try {
        result = await updateContact(dataToSend, prevContact, true);
      } catch(e) {
        console.error('Errore:', e);
      }
    }
  } else {
    consoleInfo('Nessun contatto individuato per la sincronizzazione dalla rete');

    if(prevContact.sync) {
      let dataToSend = {...prevContact, sync: false };

      // Generate logs stack
      dataToSend.log = await generateLegacyLogList({
        list: [prevContact.log],
        action: `Aggiornamento`, 
        subject: `contatto: ${dataToSend.name} - impostati valori custom in rubrica`,
      });
      
      try {
        result = await updateContact(dataToSend, prevContact);
        consoleInfo('Contatto presente nel sistema in precedenza - ora convertito da remoto a locale');
      } catch(e) {
        result = prevContact;
        console.error('Contatto presente nel sistema in precedenza - impossibile impostare a false la proprietà sync');
        toast.error('Fallito rollback del contatto da remoto a locale');
      }
    } else {
      result = prevContact;
      toast.warn('Contatto non presente nel sistema');
    }
  }

  return result;
}

//  Update contact's locations ------------------------------------------------------------------------------\
export async function handleTrackingLocation(address, index, contact, dispatch) {
  const location = await getTrackingLocation(address);
  dispatch(trackingContactLocationThunk({
    contact, 
    location,
    index
  }));
}

export const updateContactLocation = async (contact, location, index) => {
  let newCheckpoints = [...contact.checkpoints];

  newCheckpoints[index] = { 
    ...contact.checkpoints[index],
    windows: formatWindowsToDynamoDb(contact.checkpoints[index]?.windows), 
    location: {
      address: location.address, 
      city: location.city, 
      province: location.province, 
      region: location.region, 
      place_id: location.place_id,
      coordinate: [location.coordinate.lat, location.coordinate.lng]
    }
  };

  // Run database update
  try {
    console.log("Cio che mando", newCheckpoints);

    const res = await API.graphql(graphqlOperation(UPDATE_CONTACT_LOCATIONS, {
      id: contact.id,
      tenant: contact.tenant,
      checkpoints: newCheckpoints,
    }));

    return res?.data?.updateContact 
      ? formatPayloadWithCheckpoint({ ...res.data.updateContact })
      : null;

  } catch(err) {
    throw new Error('[E]: Impossible to update coordinates', err);
  }
}