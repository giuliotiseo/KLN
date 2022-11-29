import { createAsyncThunk } from '@reduxjs/toolkit';
import { API, graphqlOperation } from 'aws-amplify';
import { addDays } from "date-fns";
import { toast } from 'react-toastify';
import { handleCreateCompanyContact, handleCreateUserContact } from '../../contacts/api/create';
// Api
import { deleteContact } from '../../contacts/api/delete';
import { searchContacts } from '../../contacts/api/fetch';
import { ALL_CONTACTS_BY_TENANT } from '../../contacts/api/graphql/queries';
import { handleEditCompanyContact, handleEditUserContact, runSync, updateContactLocation } from '../../contacts/api/update';
import { importContacts, sendInvite } from '../../contacts/libs/helpers';
// Helpers
import { checkValidityDayAfterToday, consoleFetch, consoleSuccess, formatDate, normalizeRemoteData } from '../../globals/libs/helpers';
import { removeContactFromWarehouse } from '../../warehouses/api/update';

// Create -----------------------------------------------------------------------------------------------------------------------------------------------------
export const createContactThunk = createAsyncThunk(
  'contacts/create',
  async ({ type, contact, enabledToast, fromRemote, indirect }, { getState, rejectWithValue }) => {
    const { 
      contacts: { allContacts: { ids, entities }},
      company: { companyInfo: { entity: { tag }}}} = getState();

    let result = null;

    if(type === 'COMPANY') {
      result = await handleCreateCompanyContact(contact, ids, enabledToast, fromRemote, indirect, entities);
    }
    
    if(type === 'USER') {
      result = await handleCreateUserContact(contact, ids, enabledToast, fromRemote, tag);
    }

    if(!result) {
      throw rejectWithValue({ 
        error: "Failure while adding contact to contacts", 
        result 
      })
    };

    console.log("Result", result);

    toast.success(`Le informazioni di ${contact.name} sono ora disponibili nella rubrica aziendale`);
    return result;
  }
)

// Read -----------------------------------------------------------------------------------------------------------------------------------------------------
export const readContactsThunk = createAsyncThunk(
  'contacts/read',
  async ({ tenant }, { rejectWithValue }) => {
    let result;
    const variables = { tenant, sortDirection: 'ASC' }
  
    try {
      result = await API.graphql(graphqlOperation(ALL_CONTACTS_BY_TENANT, variables));
      consoleFetch('Fetch contacts', result);
      return normalizeRemoteData(result.data.contactsByTenant.items);
    } catch(e) {
      console.error('Error', e);
      throw rejectWithValue({
        error: e,
        result
      })
    }
  }
)

// Update -----------------------------------------------------------------------------------------------------------------------------------------------------
export const updateContactThunk = createAsyncThunk(
  'contacts/update',
  async ({ type, contact, prevContact, merge }, { getState, rejectWithValue }) => {
    const { contacts: { allContacts: { entities }}} = getState();
    let result;

    if(type === 'COMPANY') {
      try {
        result = await handleEditCompanyContact(contact, prevContact, entities, merge);
        if(!result?.id) return rejectWithValue(result);
        toast.success('Contatto aggiornato con successo');
        consoleSuccess('Contatto aggiornato con successo', result);
        return result;
      } catch(err) {
        console.error(err);
        return rejectWithValue(err);
      }
    }
    
    if(type === 'USER') {
      try {
        console.log('Vedo contact', contact);
        result = await handleEditUserContact(contact, prevContact, merge);
        if(!result?.id) return rejectWithValue(result);
        toast.success('Contatto aggiornato con successo');
        consoleSuccess('Contatto aggiornato con successo', result);
        return result;
      } catch(err) {
        console.error(err);
        return rejectWithValue(err);
      }
    }
  }
)

// Delete -----------------------------------------------------------------------------------------------------------------------------------------------------
export const deleteContactThunk = createAsyncThunk(
  'contacts/delete',
  async ({ contact }, { rejectWithValue, getState }) => {
    const { warehouses: { allWarehouses }} = getState();
    // Check if contacts is on some warehouses
    const warehousesIdsToUpdate = contact.type === 'WAREHOUSE' 
      ? allWarehouses.ids.filter(w_id => allWarehouses.entities[w_id].contactIds.includes(contact.id))
      : [];

    try {
      const result = await deleteContact(contact);
      if(warehousesIdsToUpdate.length > 0) {
        warehousesIdsToUpdate.forEach(async (w_id) => {
          await removeContactFromWarehouse(contact.id, contact.name, allWarehouses.entities[w_id]);
        })
      }
      return {
        contact: result,
        changes: {
          warehouses: warehousesIdsToUpdate
        }
      };
    } catch (err) {
      console.error('Error', err);
      return rejectWithValue(err);
    }
  }
)

// Thunks for UI List - search -----------------------------------------------------------------------------------------------------------------------------------------------------
export const searchContactsThunk = createAsyncThunk(
  'contacts/list',
  async ({ tenant, queryOptions }, { rejectWithValue }) => {
    const result = await searchContacts({ tenant, ...queryOptions, nextToken: undefined });
    if(!result) throw rejectWithValue({ error: "No result in search contacts by tenant", queryOptions, result })
    return result;
  }
)

export const nextSearchContactsThunk = createAsyncThunk(
  'contacts/list/next',
  async ({ tenant, nextToken }, { getState, rejectWithValue }) => {
    const { contacts: { listContacts: { queryOptions }}} = getState();
    const result = await searchContacts({ tenant, ...queryOptions, nextToken });
    if(!result) throw rejectWithValue({ error: "No result next search contacts by tenant", result })
    return result;
  }
)

// Thunks for contacts features -----------------------------------------------------------------------------------------------------------------------------------------------------
export const sendInviteToContactThunk = createAsyncThunk(
  'contacts/send_invite',
  async ({ contact }, store) => {
    const { company } = store.getState();

    // If there are some trace of synchrnization, the profile is already signed up
    if(contact.sync === true) {
      toast.error(`L'utente ${contact.name} risulta già iscritto`);
      console.error('Contact already subscribed', contact);
      throw store.rejectWithValue({ error: `Impossible to run this operation: the user contact is synchronized, so it is already subscribed`, contact});
    }

    // Calculate days range before send the invite (15 days)
    if(contact.invited) {
      const calculateDaysAfterLastUpdate = addDays(new Date(contact.invited), 15);
      if(!checkValidityDayAfterToday(calculateDaysAfterLastUpdate)) {
        toast.error(`Non puoi inviare più di un invito ogni 15 giorni. Ultimo invio il ${formatDate(contact.invited)}`);
        console.error('You can send the invite every 15 days', contact);
        throw store.rejectWithValue(`Non puoi inviare più di un invito ogni 15 giorni. Ultimo invio il ${formatDate(contact.invited)}`);
      }
    }

    const result = await sendInvite(contact, company.companyInfo.entity);
    console.log('Result', result);
    if(result.code === 500) {
      console.error('500 Error: send invite failure', result);
      throw store.rejectWithValue({ error: `500 Error - sendInviteToContact`, result});
    }

    return result;
  }
)

export const synchronizeContactThunk = createAsyncThunk(
  'contacts/sync',
  async ({ contact }, store) => {
    console.log('Leggo il contatto', contact);
    const { company } = store.getState();
    const result = await runSync(contact, company.companyInfo.entity);
    
    console.log("Risultato sync", result);

    if(!result) {
      toast.error('Sincronizzazione fallita');
      console.error('Error while run synchronization request', contact);
      throw store.rejectWithValue({ error: `500 Error - synchronizeContact`, contact })
    };

    toast.info('Sincronizzazione contatto terminata');
    return result;
  }
)

export const importXlsInContactsThunk = createAsyncThunk(
  'contacts/create/xls',
  async ({ contacts, callback }, store) => {
    const { company: { companyInfo: { tenant }}} = store.getState();
    const { contacts: { allContacts: { ids, entities }}} = store.getState();
    try {
      const result = await importContacts(contacts, ids, entities, tenant)
      callback();
      return {
        ids: Object.keys(result),
        entities: result
      };
    } catch(err) {
      toast.error("Si è verificato un errore durante l'importazione")
      console.error(err);
      callback();
      return store.rejectWithValue({ error: err, contacts });
    }
  }
)

export const trackingContactLocationThunk = createAsyncThunk(
  'contacts/update/location',
  async ({ contact, location, index }, { rejectWithValue }) => {
    try {
      const result = await updateContactLocation(contact, location, index);
      return result;
    } catch(err) {
      console.error(err);
      throw rejectWithValue(`Error: Impossible to run location tracking coordiantes`);
    }
  }
)

