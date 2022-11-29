import { API, Auth } from 'aws-amplify';
import { toast } from "react-toastify"
import { v4 } from 'uuid';
// Helpers
import { consoleInfo, consoleSuccess, formatPayloadWithCheckpoint, formatWindowsToDynamoDb, generateLegacyLogList, isJSON, queryStringEncoder } from '../../globals/libs/helpers';
import { validateEmail, validatePhone } from '../../auth/libs/helpers';
import { formatLocationCoords } from '../../warehouses/libs/helpers';
// Fetch
import { fetchProfile, fetchProfileByEmail, fetchProfileBySearchable } from "../../user/api/fetch";
import { fetchCompanyByTagForContactsControls, fetchCompanyByVatNumberForContactsControls } from "../../company/api/fetch";
import { updateInviteDate } from '../api/update';
import { createContact } from '../api/create';
import { isValid } from 'date-fns';

// Constants, models and types -----------------------------------------------------------------------------------------------
export const CONTACT_TYPES = {
  users: {
    ADMIN: "Amministrazione",
    WAREHOUSE: "Magazzini",
    DRIVE: "Trasporto mezzi"
    // "ADMIN": "Amministrazione",
    // "WAREHOUSE": "Magazzini",
    // "DRIVE": "Trasporto mezzi",
    // "ACCOUNTING": "Contabilità",
    // "LOGISTICS": "Logistica",
  },
  companies: {
    "CLIENT": "Azienda cliente",
    "TRANSPORT": "Azienda di trasporti",
  }
}

export const CONTACT_TYPES_SCOPE = {
  "ADMIN": "USER",
  "WAREHOUSE": "USER",
  "DRIVE": "USER",
  "ACCOUNTING": "USER",
  "LOGISTICS": "USER",
  "CLIENT": "COMPANY",
  "TRANSPORT": "COMPANY",
}

export const CONTACT_TYPE_DESCRIPTION = {
  "ADMIN": "Amministrazione",
  "WAREHOUSE": "Magazzini",
  "DRIVE": "Trasporto mezzi",
  "ACCOUNTING": "Contabilità",
  "LOGISTICS": "Logistica",
  "CLIENT": "Azienda cliente",
  "TRANSPORT": "Azienda trasporto merci",
}

export const CONTACT_PROPS_GLOSSARY = {
  name: "nome",
  surname: "cognome",
  fiscalCode: "codice fiscale",
  phone: "telefono",
  email: "email",
  type: "tipo di contatto",
  avatar: "avatar",
  employee: "posizione lavorativa",
  job: "posizione lavorativa",
  windows: "turni di lavoro",
  note: "note"
}

export const starterWindow = {
  start: null,
  end: null,
  days: [],
}

export const remoteSignature = "fromRemote"; 
const importSignature = "fromImport"; 

// Process data functions -----------------------------------------------------------------------------------------------
// When I get data from Profile and I need to convert the array of elements in a Contact structure
export const remapProfilesToContacts = (inputProfiles, myCompanyVatNumber) => {
  console.log('Input profiles: remapProfilesToContacts: ', inputProfiles);
  return inputProfiles && inputProfiles?.length > 0
    ? inputProfiles.reduce((acc, val) => {
      return ({
        ...acc,
        [`${val.email}-c-${val.owner}`]: {
          id: `${val.email}-c-${val.owner}`,
          avatar: val.avatar,
          name: val.name,
          email: val.email,
          phone: val.phone,
          type: val.role.task.split('@')[1],
          note: '',
          tag: val.username,
          sync: true,
          searchable: val.name.toLowerCase(),
          job: val.role.company.name,
          employee: val.role.company.vatNumber === myCompanyVatNumber ? 1 : 0
        }
      })
    }, {})
    : [];
}

// When I get data from Company and I need to convert the array of elements in a Contact structure
export const remapCompaniesToContacts = (inputProfiles) => {
  return inputProfiles && inputProfiles?.length > 0
    ? inputProfiles.reduce((acc, val) => {
        return ({
          ...acc,
          [`${val.vatNumber}-c-${v4()}`]: {
            id: `${val.vatNumber}-c-${v4()}`,
            avatar: val.logo,
            name: val.name,
            email: val?.email || '',
            phone: val?.phone || '',
            tag: val?.tag || '',
            checkpoints: val?.warehouses?.items && val?.warehouses?.items?.length !== 0 
              ? val?.warehouses.items.map(wh => ({
                warehouseId: wh?.id,
                extId: wh?.extId || v4(),
                name: wh?.name,
                location: {...wh.location},
                contacts: wh.contacts?.length > 0 
                  ? wh.contacts.map(c => ({
                    ...c,
                    contactId: `${c.email}-c-${remoteSignature}-${val.tag}`,
                    job: val.name,
                  }))
                  : [],
                windows: wh?.windows,
                tools: wh?.tools,
                maxLength: wh?.maxLength,
                note: wh?.note
              }))
              : [],
            vatNumber: val.vatNumber,
            uniqueCode:  val.uniqueCode,
            pec: val.pec,
            type: val.type,
            note: '',
            sync: true,
            searchable: val.name.toLowerCase(),
            job: val?.trades && val.trades.length > 0 && val.trades.join(''),
            employee: 0
          }
        })
      }, {})
    : []
}

const processReferentsBeforePush = (referents, contacts, companyName) => {
  if(referents?.length <= 0) {
    return [];
  }
   
  let validReferents = [];


  referents.forEach(referent => {
    console.log("referents", referent);
    const referentType = typeof referent === 'string' ? "id" : "entity";

    console.log("referentType", referentType);
    if(referentType === "id") {
      validReferents.push({
        contactId: referent,
        name: contacts[referent]?.name,
        email: contacts[referent]?.email,
        phone: contacts[referent]?.phone,
        job: contacts[referent]?.job,
      });
    }

    if(referentType === "entity") {
      if(!referent?.name) {
        toast.error("Errore nel campo referenti: devi inserire obbligatoriamente il nome del referente");
        return;
      }

      if(!referent?.email) {
        toast.error("Errore nel campo referenti: devi inserire obbligatoriamente l'email del referente");
        return;
      }

      if(!referent?.phone) {
        toast.error("Errore nel campo referenti: devi inserire obbligatoriamente il numero di telefono del referente");
        return;
      }

      validReferents.push({
        ...referent,
        job: companyName
      })
    }
  })

  return validReferents;
}

export const processCheckpointsBeforePush = (contact, allContacts) => {
  return contact.checkpoints.length > 0
    ? contact.checkpoints.map(chk => ({
        extId: chk.extId,
        name: chk.name,
        windows: formatWindowsToDynamoDb(chk?.windows),
        contacts: processReferentsBeforePush(chk.contacts, allContacts, contact.name),
        location: {
          ...chk.location,
          coordinate: formatLocationCoords(chk.location.coordinate)
        },
        maxLength: chk?.maxLength,
        tools: chk?.tools,
        note: chk?.note
      }))
      : [];
}

export const processUserContact = ({ id, name, surname, email, prefix, phone, type, employee, job, contactAvatarFile, tenant, note, sync }) => {
  if(!name || !email || !phone || !type ) {
    toast.error('Impossibile eseguire l\'operazione, accertati di aver inserito tutti i dati');
    return null;
  }

  return ({
    id,
    name: surname ? `${name} ${surname}` : name,
    email,
    phone: prefix ? `${prefix}${phone}` : phone,
    type,
    avatar: contactAvatarFile,
    tenant,
    note,
    sync,
    searchable: surname ? `${name.toLowerCase()} ${surname.toLowerCase()}` : name.toLowerCase(),
    employee: parseInt(employee),
    job: job?.toUpperCase(),
  })
}

export const processCompanyContact = ({ id, name, email, prefix, phone, type, tag, contactAvatarFile, job, vatNumber, uniqueCode, pec, checkpoints, tenant, note, sync }) => {
  if(!name || !type || !vatNumber) {
    console.error('Minimal data requested: name, email, phone, type, vatNumber', name, email, phone, type, vatNumber);
    toast.error('Impossibile eseguire l\'operazione, accertati di aver inserito tutti i dati (nome, email, telefono e P.IVA)');
    return null;
  }

  console.log({ id, name, email, prefix, phone, type, tag, contactAvatarFile, job, vatNumber, uniqueCode, pec, checkpoints, tenant, note, sync });

  return {
    id,
    name: `${name.toUpperCase()}`,
    email: email || "",
    phone: prefix ? `${prefix}${phone}` : phone,
    type,
    avatar: contactAvatarFile,
    vatNumber: vatNumber,
    uniqueCode: uniqueCode?.toUpperCase(),
    pec: pec,
    tenant,
    note,
    tag: tag,
    sync,
    employee: 0,
    searchable: name.toLowerCase(),
    job: job?.toUpperCase(),
    checkpoints
  }
}

// Used for contacts created outside of contact area (e.g. preOrders: CreatePreOrderContainer)
export const indirectProcessCompanyContact = (company) => {
  /* In alcuni casi è necessario creare il contatto nella rubrica durante fasi intermedie. Ad esempio
  se seleziono un'azienda cliente via TAG durante la fase di invio pre-ordine, se quell'azienda non esiste
  deve essere inserita nella rubrica. indirectProcessCompanyContact permette di effettuare questa operazione
  in modo da rendere indiretto il processo di registrazione delle aziende nella rubrica contatti
  */
  const contactObj = remapCompaniesToContacts([company]);
  const mainKey = Object.keys(contactObj)[0];
  const contact = contactObj[mainKey];
  
  return {
    id: contact.id,
    avatar: null,
    name: `${contact.name.toUpperCase()}`,
    email: contact?.email ? contact.email : null,
    phone: contact?.phone ? contact.phone : null,
    type: contact.type,
    vatNumber: contact.vatNumber,
    uniqueCode: contact?.uniqueCode ? contact.uniqueCode.toUpperCase() : null,
    pec: contact.pec ? contact.pec : null,
    tenant: company.tenant,
    note: contact.note,
    tag: company.tag,
    sync: true,
    employee: 0,
    searchable: contact.name.toLowerCase(),
    checkpoints: contact.checkpoints.map(chk => ({
      ...chk,
      contacts: chk.contacts.map(referent => ({
        contactId: referent.contactId,
        name: referent?.name,
        email: referent?.email,
        phone: referent?.phone,
        job: contact.name.toUpperCase()
      })),
    }))
  }
}

async function processXlsContactFields(contacts, tenant, inputContacts) {
  const completeContacts = contacts.reduce((acc, val) => {
    if(Object.keys(CONTACT_TYPES.companies).includes(val.tipo)) {
      let windows = [];
      if(val.finestra_carico_1_giorni_settimana && val.finestra_carico_1_orari) windows.push({
        days: String(val.finestra_carico_1_giorni_settimana).split(',').map(d => parseInt(d)),
        start: new Date(`01/01/1970 ${val.finestra_carico_1_orari.split("-")[0]}`),
        end: new Date(`01/01/1970 ${val.finestra_carico_1_orari.split("-")[1]}`),
        type: "CARICO"
      });
      
      if(val.finestra_carico_2_giorni_settimana && val.finestra_carico_2_orari) windows.push({
        days: String(val.finestra_carico_2_giorni_settimana).split(',').map(d => parseInt(d)),
        start: new Date(`01/01/1970 ${val.finestra_carico_2_orari.split("-")[0]}`),
        end: new Date(`01/01/1970 ${val.finestra_carico_2_orari.split("-")[1]}`),
        type: "CARICO"
      });

      if(val.finestra_scarico_1_giorni_settimana && val.finestra_scarico_1_orari) windows.push({
        days: String(val.finestra_scarico_1_giorni_settimana).split(',').map(d => parseInt(d)),
        start: new Date(`01/01/1970 ${val.finestra_scarico_1_orari.split("-")[0]}`),
        end: new Date(`01/01/1970 ${val.finestra_scarico_1_orari.split("-")[1]}`),
        type: "SCARICO"
      });

      if(val.finestra_scarico_2_giorni_settimana && val.finestra_scarico_2_orari) windows.push({
        days: String(val.finestra_scarico_2_giorni_settimana).split(',').map(d => parseInt(d)),
        start: new Date(`01/01/1970 ${val.finestra_scarico_2_orari.split("-")[0]}`),
        end: new Date(`01/01/1970 ${val.finestra_scarico_2_orari.split("-")[1]}`),
        type: "SCARICO"
      });

      // const contactIds = val.email_referenti  
      // ? val.email_referenti.includes(',')
      //   ? findContactTypeIdsByEmail(val.email_referenti.split(',').map(item => item.trim()), inputContacts)
      //   : findContactTypeIdsByEmail([val.email_referenti], inputContacts)
      // : [];

      // let contacts = [];
      // if(contactIds.length > 0) {
      //   contacts = contactIds.map(c_id => ({
      //     contactId: c_id,
      //     name: inputContacts[c_id]?.name,
      //     email: inputContacts[c_id]?.email,
      //     phone: inputContacts[c_id]?.phone,
      //     job: val.nome.toUpperCase()
      //   }))
      // } else {
      //   if(val?.email_referente_manuale) {
      //     contacts.push({
      //       contactId: `${val.email_referente_manuale}-c-${importSignature}`,
      //       name: val?.nome_referente_manuale,
      //       phone: val?.telefono_referente_manuale,
      //       email: val.email_referente_manuale,
      //       job: val.nome.toUpperCase()
      //     })
      //   }
      // }

      let referrers = [];
      if(val?.email_referente_manuale) {
        referrers.push({
          contactId: `${val.email_referente_manuale}-c-${importSignature}`,
          name: val?.nome_referente_manuale,
          phone: val?.telefono_referente_manuale,
          email: val.email_referente_manuale,
          job: val.nome.toUpperCase()
        })
      }

      return [
        ...acc,
        {
          id: `${val.partita_iva.toString()}-c-${v4()}`,
          name: val.nome,
          phone: `+${val.prefisso_int}${val.telefono}`,
          email: val.email,
          type: val.tipo,
          uniqueCode: val.codice_univoco,
          vatNumber: val.partita_iva.toString(),
          pec: val.pec,
          note: val?.note_contatto,
          tenant,
          employee: 0, // impedisco qualsiasi tentativo di registrare un'azienda come dipendente di un'altra
          job: val.occupazione_settore?.toUpperCase(),
          searchable: val.nome.toLowerCase(),
          checkpoints: [{
            extId: v4(),
            name: val.nome_punto_di_interesse,
            windows,
            note: val?.note_punto_di_interesse,
            contacts: referrers,
            maxLength: val?.massimale_metraggio_transito,
            tools: val?.mezzi_operativi.split(", "),
            location: {
              region: val.regione,
              province: val.sigla_provincia,
              city: val.citta,
              address: `${val.via}, ${val.civico}, ${val.citta}, ${val.sigla_provincia}, ${val.cap}, ${val.regione}, ${val.stato}`,
              coordinate: (val.latitudine && val.longitudine) ? [val.latitudine, val.longitudine] : []
            },
          }]
        }
      ]
    } else {
      return [
        ...acc,
        {
          id: `${val.email}-${v4()}`,
          name: val.name,
          phone: `+${val.prefix}${val.phone}`,
          email: val.email,
          type: val.type,
          pec: val.pec,
          note: val.note,
          employee: val.employee === 'TRUE' ? 1 : 0,
          job: val.job?.toUpperCase(),
          searchable: val.name.toLowerCase(),
          tenant
        }
      ]
    }
  }, []);

  for(let contact of completeContacts) {
    contact.log = await generateLegacyLogList({
      list: [],
      action: `Creazione`, 
      subject: `nuovo contatto in rubrica importato via .xls: ${contact.name} (${contact.email})`,
    });
  }
  
  return completeContacts;
}


// Windows and checkpoints starter
export const reformattedWindows = (windows) => windows.length > 0
  ? windows.reduce((acc, val) => {
    return ({ 
      ...acc, 
      [val?.type || "CARICO"]: acc[val?.type || "CARICO"] 
        ? [...acc[val?.type || "CARICO"], val] 
        : [val]
    })
  }, {})
  : {};


export const starterCheckpoint = {
  name:  "",
  location: {},
  contacts: [],
  windows: reformattedWindows([{ ...starterWindow, type: "CARICO" }, { ...starterWindow, type: "SCARICO" }]),
  maxLength: 1,
  tools: [],
  note: ""
}

export const starterWarehouseCheckpoint = {
  name:  "",
  location: {},
  contacts: [],
  windows: reformattedWindows([{ ...starterWindow, type: "CARICO" }, { ...starterWindow, type: "SCARICO" }]),
  note: ""
}

// Functions for search module -----------------------------------------------------------------------------------------------
export const searchProfileByEmail = async (data, vatNumber, setLoading, callback) => {
  if(!data) return null;

  setLoading(true);
  const fetchResult = await fetchProfileByEmail(data);
  const contacts = remapProfilesToContacts(fetchResult, vatNumber);
  callback(contacts);
  setLoading(false);
}

export const searchProfileByName = async (data, vatNumber, setLoading, callback) => {
  if(!data) return null;

  setLoading(true);
  const fetchResult = await fetchProfileBySearchable(data.toLowerCase());
  const contacts = remapProfilesToContacts(fetchResult, vatNumber);
  callback(contacts);
  setLoading(false);
}

export const searchCompanyByTag = async (data, setLoading, callback) => {
  if(!data) return null;

  setLoading(true);
  const fetchResult = await fetchCompanyByTagForContactsControls(data.toUpperCase());
  const contacts = remapCompaniesToContacts(fetchResult);
  callback(contacts);
  setLoading(false);
}

export const searchCompanyByVatNumber = async (data, setLoading, callback) => {
  if(!data) return null;

  setLoading(true);
  const fetchResult = await fetchCompanyByVatNumberForContactsControls(data.toUpperCase());
  const contacts = remapCompaniesToContacts(fetchResult);
  callback(contacts);
  setLoading(false);
}

// Loops throw contacts and check profiles and companies -----------------------------------------------------------------------------------------------
export function findContactInContacts(allContactsIds, contact) {
  if(allContactsIds.length === 0 || !contact) return false;

  const allContactsEmail = allContactsIds.map(id => id.split("-c-")[0]);
  return allContactsEmail.includes(contact.id);
}

export function findTagInContacts(allContactsTags, contact) {
  if(!allContactsTags && (allContactsTags?.length === 0 || !contact)) return false;
  return allContactsTags.includes(contact?.tag);
}

export function findContactTypeIdsByEmail(emailList, contacts, type) {
  let selectedIds = Object.keys(contacts)
    .filter(c_id => type ? contacts[c_id].type === type : contacts[c_id])
    .filter(c_id => emailList.includes(contacts[c_id].email));
    
  return selectedIds;
}

export async function isContactExist(contact) {
  const dataType = CONTACT_TYPES_SCOPE[contact.type];
  if(dataType === 'USER' && contact.email) {
    const queryRes = await fetchProfile(contact.email);
    return queryRes ? true : false;
  }
  
  if(dataType === 'COMPANY' && contact.vatNumber) {
    const queryRes = await fetchCompanyByVatNumberForContactsControls(contact.vatNumber);
    return queryRes[0] ? true : false;
  }

  return false;
}

// General features -----------------------------------------------------------------------------------------------
export async function sendInvite(contact, myCompany) {
  const contactDataType = CONTACT_TYPES_SCOPE[contact.type];
  // Controllo esistenza dell'utente nel sistema
  const checkExistence = await isContactExist(contact);

  if(checkExistence === true) {
    toast.error(`L'utente ${contact.name} risulta già iscritto. Effettua una sincronizzazione per ricevere i dati aggiornati`);
    console.error('Impossible to send the invite: user subscribed');
    return null;
  }

  if(contactDataType === 'USER' && contact.employee === 0) {
    toast.error(`${contact.name} non può essere invitato perché non lavora presso la tua azienda`);
    console.error('The job of contact must be same as yours');
    return null
  }

  const origin = window.location.origin;
  const user = await Auth.currentAuthenticatedUser();
  const token = user.signInUserSession.idToken.jwtToken;

  let encodedQueryString = '';
  if(contact.type === 'CLIENT' || contact.type === 'TRANSPORT') {
    encodedQueryString = queryStringEncoder(`formType=inviteSignUp&role=${contact.vatNumber}@ADMIN&username=${contact.email}&companyName=${contact.name}&vatNumber=${contact?.vatNumber}&phone=${contact?.phone.substring(3) || ''}&prefix=${contact?.phone.substring(0, 3) || ''}&companyType=${contact.type}`)
  } else {
    encodedQueryString = queryStringEncoder(`formType=inviteSignUp&role=${myCompany.vatNumber}@${contact.type}&username=${contact.email}&name=${contact.name}&phone=${contact?.phone.substring(3) || ''}&prefix=${contact?.phone.substring(0, 3) || ''}&companyType=${myCompany.type}&companyName=${myCompany.name}&vatNumber=${myCompany?.vatNumber}&companyId=${myCompany.companyId}`);
  }

  const requestInfo = {
    headers: { Authorization: token },
    body: {
      email: contact.email,
      url: encodeURI(`${origin}/search?${encodedQueryString}`),
      senderName: user.attributes.name
    }
  }

  try {
    const data = await API.post('ltsRest', '/invitecontact', requestInfo);
    const result = await updateInviteDate(contact);
    consoleSuccess('Invio invito eseguito', data);
    toast.success(`Invito spedito con successo all'indirizzo ${contact.email}`);
    return ({
      code: 200,
      status: 'SUCCESS',
      data: result,
      url: encodeURI(`${origin}/search?${encodedQueryString}`)
    })
  } catch(e) {
    console.error('Errore invio invito', e);
    toast.error('Non è stato possibile inviare l\'invito. Verifica la validità dell\'indirizzo email o contatta lo sviluppatore');
    throw new Error({
      code: 500,
      status: 'REJECTED',
      data: contact,
      url: encodeURI(`${origin}/search?${encodedQueryString}`)
    });
  }
}

export function mergeContactValues(contact, prevContact) {
  consoleInfo('- Avvio funzione per il merge dei contatti -', [{ contact: contact, prevContact: prevContact }]);
  let processedContact;
  
  if(CONTACT_TYPES_SCOPE[contact.type] === 'COMPANY') {
    /*
    1. Il nome si sovrascrive
    2. La partita iva è uguale
    3. L'indirizzo email si sovrascrive se è presente un valore
    4. Telefono si sovrascrive se è presente un valore
    5. PEC si sovrascrive se è presente un valore
    6. Codice univoco si sovrascrive se è presente un valore
    7. Checkpoints si concatenano se le coordinate non sono presenti
    8. Job: Si concatenano, si cancellano i doppioni e si joinano se sono presenti dei valori
    9. Note non si toccano
    10. RemoteId si sovrascrive
    */

    processedContact = {
      avatar: contact.avatar || prevContact.avatar,
      name: contact.name || prevContact.name,
      vatNumber: prevContact.vatNumber,
      email: contact.email || prevContact.email,
      phone: contact.phone || prevContact.phone,
      pec: contact.pec || prevContact.pec,
      uniqueCode: contact.uniqueCode || prevContact.uniqueCode,
      checkpoints: mergeCheckpoints(contact.checkpoints, prevContact?.checkpoints || []),
      job: mergeTrades(contact.job, prevContact.job),
      tag: contact.tag || prevContact.tag
    }
  }
  
  if(CONTACT_TYPES_SCOPE[contact.type] === 'USER') {
    /*
    1. Il nome si sovrascrive
    2. L'indirizzo email non si tocca
    3. Telefono si sovrascrive se è presente un valore
    4. Job: Si sovrascrive con contact.role.company.name
    5. Employee: è true se prevContact.tenant è uguale al contact.role.company.tag
    6. Note non si toccano
    */

    processedContact = {
      avatar: contact.avatar || prevContact.avatar,
      name: contact.name,
      email: prevContact.email,
      phone: contact.phone || prevContact.phone,
      // job: contact.role.company.name,
      // employee: prevContact.tenant === contact.role.company.tag,
    }
    
    consoleInfo('Merge contatto utente completato', processedContact);
  }
  
  return processedContact;
}

export const mergeCheckpoints = (remoteCheckpoints, localCheckpoints) => {
  console.log("Entro in remoteCheckpoints", { remoteCheckpoints });
  console.log("Entro in localCheckpoints", localCheckpoints );

  // Verifico se vi sono remote e local
  if(remoteCheckpoints.length > 0 && localCheckpoints.length > 0) {
    /* Utilizzo le coordinate come coordinate: 
      1. Se ci sono coordinate uguali devo prendere in considerazione
        il valore scritto in remote
      2. Se ci sono coordinate diverse devo concatenare i nuovi checkpoints ai local 
    */

    // The ternary operator in the .map is for compatibility with di old version of Checkpoint (when it was only Location on Contact)
    const localJoins = localCheckpoints.map(locChk => !locChk?.location 
      ? locChk.coordinate.join()
      : locChk.location.coordinate.join()
    );

    let listToSend = localCheckpoints.reduce((acc, val) => {
      return ({
        ...acc,
        [!val.location?.place_id 
          ? val.location.coordinate.join()
          : val.location.place_id
        ]: { 
          ...val,
          windows: Object.keys(val.windows).reduce((win_acc, wind_type) => ([...win_acc, {...val.windows[wind_type]}]), []) 
        }
      })
    }, {});


    remoteCheckpoints.forEach(remChk => {
      if(localJoins.includes(remChk.location.coordinate.join())) {
        listToSend[remChk.location.coordinate.join()] = {
          ...remChk,
          contacts: remChk?.contacts?.length > 0  
            ? remChk.contacts?.map(c => ({
              contactId: `${c.email}-c-${remoteSignature}`,
              email: c.email,
              name: c.name,
              job: c?.job?.toUpperCase(),
              phone: c?.phone
            }))
            : []
        };
      } else {
        listToSend[remChk.location.coordinate.join()] = {
          ...remChk,
          contacts: remChk?.contacts?.length > 0  
          ? remChk.contacts?.map(c => ({
            contactId: `${c.email}-c-${remoteSignature}`,
            email: c.email,
            name: c.name,
            job: c?.job?.toUpperCase(),
            phone: c?.phone
          }))
          : []
        };
      }
    })

    return Object.keys(listToSend).map(chk_id => listToSend[chk_id]);
  } else {
    // Se uno fra remote e local non dovesse essere presente provo a tornare i loro valori dando la precendeza a remote
    // Resetto il contactId di remote, dato che non voglio portarmi l'id del contatto relativo alla rubrica del cliente
    if(remoteCheckpoints?.length > 0) return remoteCheckpoints.map(chk => ({
      ...chk,
      contacts: chk.contacts?.length > 0 
        ? chk.contacts.map(c => ({
          contactId: `${c.email}-c-${remoteSignature}`,
          email: c.email,
          name: c.name,
          job: c?.job?.toUpperCase(),
          phone: c?.phone
        }))
        : []
    }));

    if(localCheckpoints?.length > 0) return localCheckpoints.reduce((acc, val) => {
      return ({
        ...acc,
        [!val.location?.place_id 
          ? val.location.coordinate.join()
          : val.location.place_id
        ]: { 
          ...val,
          windows: Object.keys(val.windows).reduce((win_acc, win_val) => ([...win_acc, { ...win_val.windows[val] }]), []),
        }
      })
    }, {});
    
    return null;
  }
}

const mergeTrades = (prevJob, job) => {
  const prevJobList = prevJob !== null ? prevJob.length > 0 ? prevJob?.split(',') : [prevJob] : null;
  const tradesToSendInJobs = prevJobList !== null
    ? prevJobList.includes(job) 
      ? [...prevJobList] 
      : [...prevJobList, job]
    : [job];

  return tradesToSendInJobs.length > 0 
    ? tradesToSendInJobs.filter(el => el !== "").join()
    : tradesToSendInJobs[0]
  }

// XLS Features -----------------------------------------------------------------------------------------------
export async function importContacts(contacts, allContactsIds, allContacts, tenant) {
  const check = await validateContactsImport(contacts, allContactsIds);
  if(!check) {
    throw new Error("Validation failed (helpers.js): revoke contacts import");
  }

  let xlsContacts = [];
  const dataToSendFromXls = await processXlsContactFields(contacts, tenant, allContacts);

  for(let contact of dataToSendFromXls) {
    if(!xlsContacts.includes(null) && xlsContacts !== null) {
      try {
        const xlsContact = await createContact(contact, false, false);
        xlsContacts.push(xlsContact);
      } catch(err) {
        console.error(err);
        throw new Error("Error during import creation");
      }
    }
  }

  return xlsContacts.reduce((acc, val) => ({
    ...acc,
    [val.id]: formatPayloadWithCheckpoint({ ...val })
  })
  , {});  
}

async function validateContactsImport(contacts, allContactsIds) {
  // 0. Check presence of same email (for users) or vat number (for companies)
  // 1. Check email validity for each contact
  // 2. Check phone validity for each contact
  // 3. Check contacts type
  // 4. Check name length (50)
  // 5. Check PEC format
  // 6. Check checkpoint (only for companies)
  // 7. Check date format (only for companies)

  let globalCheck = true;
  console.groupCollapsed('Validity check');
  // 0. Check presence of same email (for users) or vat number (for companies)
  if(globalCheck) {
    for (let i = 0; i < contacts.length; i++) {
      const isContactAlreadyExist = findXlsContactInContacts(allContactsIds, contacts[i]);
      if (isContactAlreadyExist) {
        console.error(`Riga ${i + 2} non passa il test: email o partita iva del contatto già presenti nella rubrica`);
        globalCheck = false;
        toast.error(`Riga ${i + 2}: ${CONTACT_TYPES_SCOPE[contacts[i].type] === 'USER' ? 'Email' : 'Partita iva'} del contatto già usata in rubrica`);
        break;
      } else {
        globalCheck = true;
        continue;
      }
    }
  
    consoleInfo('Risultato validazione contatti simili email + vat', globalCheck);
  }

  // 1. Check email validity for each contact
  if(globalCheck) {
    for (let i = 0; i < contacts.length; i++) {
      if (!validateEmail(contacts[i].email)) {
        console.error(`Riga ${i + 2} non passa il test: formato email non corretto`);
        globalCheck = false;
        toast.error(`Riga ${i + 2}: formato email non corretto`);
        break;
      } else {
        globalCheck = true;
        continue;
      }
    }
  
    consoleInfo('Risultato validazione email', globalCheck);
  }

  // 2. Check phone validity for each contact
  if(globalCheck) {
    for (let i = 0; i < contacts.length; i++) {
      if (!validatePhone(contacts[i].telefono)) {
        console.error(`Riga ${i + 2} non passa il test: formato telefono non corretto`);
        globalCheck = false;
        toast.error(`Riga ${i + 2}: formato telefono non corretto`);
        break;
      } else {
        globalCheck = true;
        continue;
      }
    }
    consoleInfo('Risultato validazione numero di telefono', globalCheck);
  }


  // 3. Check contacts type
  if(globalCheck) {
    const types = Object.keys(CONTACT_TYPES_SCOPE);
    for (let i = 0; i < contacts.length; i++) {
      if(!types.includes(contacts[i].tipo)) {
        console.error(`Riga ${i + 2} non passa il test: tipologia contatto non conforme`);
        globalCheck = false;
        toast.error(`Riga ${i + 2}: tipologia contatto non conforme (${contacts[i].tipo || 'campo vuoto'})`);
        break;
      } else {
        globalCheck = true;
        continue;
      }
    } 
  
    consoleInfo('Risultato validazione tipologia contatto', globalCheck);
  }

  // 4. Check name length (50)
  if(globalCheck) {
    for (let i = 0; i < contacts.length; i++) {
      if(!contacts[i].nome || contacts[i].nome.length <= 0 || contacts[i].nome.length >= 50) {
        console.error(`Riga ${i+2} non passa il test: lunghezza nome non tollerata`);
        globalCheck = false;
        toast.error(`Riga ${i+2}: formato nome non conforme ${contacts[i]?.nome?.length ? ` - ${contacts[i].nome.length} caratteri` : ''}`);
        break;
      } else {
        globalCheck = true;
        continue;
      }
    }
    consoleInfo('Risultato validazione formato nome', globalCheck);
  }

  // 5. Check PEC
  if(globalCheck) {
    for (let i = 0; i < contacts.length; i++) {
      if(contacts[i].pec) {
        if (!validateEmail(contacts[i].pec)) {
          console.error(`Riga ${i+2} non passa il test`);
          globalCheck = false;
          toast.error(`Riga ${i+2}: formato pec non conforme`);
          break;
        } else {
          globalCheck = true;
          continue;
        }
      }
    }

    consoleInfo('Risultato validazione PEC', globalCheck);
  }

  // 6. Check checkpoint
  if(globalCheck) {
    for (let i = 0; i < contacts.length; i++) {
      // Eseguo il controllo solo se il tipo del contatto corrisponde a un'azienda
      if((Object.keys(CONTACT_TYPES.companies).includes(contacts[i].tipo))) {
        if(!contacts[i].nome_punto_di_interesse || !contacts[i].via || !contacts[i].civico || !contacts[i].citta || !contacts[i].sigla_provincia || !contacts[i].cap || !contacts[i].regione || !contacts[i].stato) {
          console.error(`Riga ${i+2} non passa il test: informazioni mancanti sul checkpoint dell'azienda`);
          globalCheck = false;
          toast.error(`Riga ${i+2}: informazioni checkpoint mancanti su contatto aziendale. Controlla le colonne road, street_number, city, province, cap, region, country`);
          break;
        } else {
          continue;
        }
      } else {
        continue;
      }
    }

    consoleInfo('Risultato validazione location', globalCheck);
  }

  // 7. Check date format
  if(globalCheck) {
    for (let i = 0; i < contacts.length; i++) {
      // Eseguo il controllo solo se il tipo del contatto corrisponde a un'azienda
      if((Object.keys(CONTACT_TYPES.companies).includes(contacts[i].tipo))) {
        let days = [];
        contacts[i].giorni_settimana_1 && days.push(String(contacts[i].giorni_settimana_1));
        contacts[i].giorni_settimana_2 && days.push(String(contacts[i].giorni_settimana_2));


        for(let j = 0; j < days.length; j++) {          
          let day_splitted = days[j].includes(",") && days[j].split(",");

          for(let z = 0; z < day_splitted.length; z++) {
            if(!globalCheck 
              || (!Number(day_splitted[z]) 
              || typeof Number(day_splitted[z]) !== "number"
              || (Number(day_splitted[z]) < 1 || Number(day_splitted[z]) > 7)
            )) {
              console.error(`Riga ${i+2}: giorni della settimana ${j + 1} inseriti in un formato non valido. Ricorda di inserire valori numerici (es: Lunedì: 1, ..., Domenica: 7)`);
              globalCheck = false;
              toast.error(`Riga ${i+2}:  giorni della settimana ${j + 1} inseriti in un formato non valido. Ricorda di inserire valori numerici (es: Lunedì: 1, ..., Domenica: 7)`);
              break;
            }
          }
        }

        let times = [];
        contacts[i]?.orari_1 && times.push(contacts[i]?.orari_1);
        contacts[i]?.orari_2 && times.push(contacts[i]?.orari_2);

        for(let j = 0; j < times.length; j++) {
          let time_splitted = times[j].includes("-") && times[j]?.split("-");

          if(!globalCheck || time_splitted.length !== 2) {
            console.error(`Riga ${i+2}: orario ${j + 1} errato. Devono essere inseriti due orari in formato da-a`);
            globalCheck = false;
            toast.error(`Riga ${i+2}: orario ${j + 1} errato. Devono essere inseriti due orari in formato da-a`);
            break;
          }

          for(let z = 0; z < time_splitted.length; z++) {
            let testDate = new Date(`01/01/1970 ${time_splitted[z]}`);
            if(!globalCheck || !isValid(testDate)) {
              console.error(`Riga ${i+2}: orario ${j + 1} inserito non valido. Scrivi l'orario secondo il formato HH:mm-HH:mm`, time_splitted[z], new Date(`01/01/1970 ${time_splitted[z]}`), isValid(`${new Date(`01/01/1970 ${time_splitted[z]}`)}`));
              globalCheck = false;
              toast.error(`Riga ${i+2}: orario ${j + 1} inserito non valido. Scrivi l'orario secondo il formato HH:mm-HH:mm`);
              break;
            }
          }
        }
      } else {
        continue;
      }
    }

    consoleInfo('Risultato validazione finestre carico/scarico', globalCheck);
  }

  console.groupEnd();

  return globalCheck;
}



export function findXlsContactInContacts(allContactsIds, contact) {
  if(allContactsIds.length === 0 || !contact) return false;
  const result = CONTACT_TYPES_SCOPE[contact.type] === 'COMPANY'
    ? allContactsIds.filter(all_cId => all_cId.includes(contact.vatNumber))
    : allContactsIds.filter(all_cId => all_cId.includes(contact.email))

  return result.length > 0;
}

export function generateContactsDataCell(data) {
  const formattedData = Object.keys(data).map(data_key => data[data_key]).reduce((acc, val) => {
    const locations = val?.locations ? val.locations.map(loc => loc.address).join(' | ') : "";
  
    return [
      ...acc,
      [
        val.email || '',
        val.name || '',
        val.phone || '',
        val.type || '',
        locations,
        val.pec || '',
        val.uniqueCode || '',
        val.vatNumber || '',
        val.note ?  isJSON(val.note) ? JSON.parse(val.note).blocks[0].text : val.note : ''
      ]
    ]
  }, []);

  return formattedData;
}
