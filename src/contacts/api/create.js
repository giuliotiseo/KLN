import { API, graphqlOperation, Storage } from 'aws-amplify';
import { toast } from 'react-toastify';
import { v4 } from 'uuid';
import { generateLegacyLogList, generateFileObj, consoleSuccess } from '../../globals/libs/helpers';
import { CONTACT_TYPES_SCOPE, findContactInContacts, indirectProcessCompanyContact, processCompanyContact, processUserContact, processCheckpointsBeforePush, remoteSignature } from '../libs/helpers';
// Mutations
import {
  CREATE_CONTACT,
} from './graphql/mutations';

// For company contacts
export async function handleCreateCompanyContact(contact, allContactsIds, enabledToast, fromRemote, indirect = false, allContacts) {
  // Process informations
  const formatCheckpoints = !indirect && processCheckpointsBeforePush(contact, allContacts);
  const processedCompanyContact = indirect 
    ? indirectProcessCompanyContact({ ...contact })
    : processCompanyContact({ ...contact, checkpoints: formatCheckpoints });

  // Generate contact id format
  processedCompanyContact.id = fromRemote
    ? `${contact.id}`
    : `${processedCompanyContact.vatNumber}-c-${v4()}`;

  if(fromRemote) processedCompanyContact.avatar = contact.avatar;

  console.log('Processed company contact', processedCompanyContact);
  // Existence control on primary key
  if(findContactInContacts(allContactsIds, processedCompanyContact)){
    toast.error(`Partita IVA del contatto già usata in rubrica`);
    throw new Error({
      error: "VAT Number already present",
      result: processedCompanyContact
    })
  };

  // Run mutation
  try {
    const createdContactResult = await createContact(processedCompanyContact, enabledToast, fromRemote);
    consoleSuccess("Contact created succesfully", createdContactResult);
    return createdContactResult;
  } catch(err) {
    throw new Error({
      error: "Contact creation failure",
      result: err
    })
  }
}

// For user contacts
export async function handleCreateUserContact(contact, allContactsIds, enabledToast, fromRemote, tenant) {
  // Process informations
  const processedUserContact = processUserContact({...contact});

  // Generate contact id format
  processedUserContact.id = fromRemote 
    ? contact.id.includes("-c-") ? `${contact.id}-${tenant}` : `${contact.id}-c-${remoteSignature}-${tenant}` // remote contact is already formatted from fetch process with id format [userEmail-c-profileOwner] or [vatNumber-c-companyId]
    : `${processedUserContact.email}-c-${v4()}-${tenant}`;

  // Reuse avatar data from remote if possible
  if(fromRemote) processedUserContact.avatar = contact.avatar;

  if(findContactInContacts(allContactsIds, processedUserContact)) {
    toast.error(`Email del contatto già usata in rubrica`);
    throw new Error({
      error: "Email already present",
      result: processedUserContact
    })
  }

  try {
    const createdContactResult = await createContact(processedUserContact, enabledToast, fromRemote)
    return createdContactResult;
  } catch (e) {
    toast.error('È stato riscontrato un problema nella registrazione. Verifica di aver compilato tutti i campi');
    console.error(e);
    throw new Error('Missing data on create contact (user)');
  }
}


//  Create contact ------------------------------------------------------------------------------
export async function createContact(contact, enabledToast = true, fromRemote = false) {
  let avatarRecord = null;
  const dataType = CONTACT_TYPES_SCOPE[contact.type];

  if(contact.avatar) {
    // If avatar record is not present on s3 and its origin isn't yet stored in dynamodb
    if(!fromRemote) {
      const keyNameFile = dataType === 'USER' ? contact.email : contact.vatNumber;
      avatarRecord = await generateFileObj(keyNameFile, contact.avatar.fileType);
  
      // Put the image in S3 storage
      await Storage.put(keyNameFile, contact.avatar.file, {
        level: 'public',
        contentType: contact.fileType
      }).then(() => {
        console.log('Immagine caricata correttamente');
      }).catch(err => console.log('Errore nel caricamento dell\'immagine', err));

      contact.avatar = avatarRecord;
    }
  }

  // Describe where the contact came from
  contact.sync = fromRemote; // boolean

  // Generate logs stack
  contact.log = await generateLegacyLogList({
    list: [],
    action: `Creazione`, 
    subject: `nuovo contatto in rubrica: ${contact.name} (${contact.email})`,
  });

  // For safe, in case employee were NaN
  contact.employee = Number(Boolean(contact.employee));

  // Load contact entry inside ddb
  try {
    const res = await API.graphql(graphqlOperation(CREATE_CONTACT, { input: contact }));
    return res.data.createContact;
  } catch(err) {
    enabledToast && toast.error('Non è stato possibile aggiungere questo contatto alla rubrica');
    console.error(err);
    throw new Error('[E] Error creating contact', err);
  }
}