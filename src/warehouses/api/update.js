import { API, graphqlOperation } from 'aws-amplify';
// Helpers
import { toast } from "react-toastify";
import { processWarehouseBeforeMutation, WAREHOUSE_STATUS } from "../libs/helpers";
// Graphql
import { UPDATE_LOCATION_COORDINATE, UPDATE_STOREKEEPERS, UPDATE_WAREHOUSE, UPDATE_WAREHOUSE_STATUS } from './graphql/mutations';
// Store manager
import { consoleSuccess, generateLegacyLogList } from '../../globals/libs/helpers';

export async function updateWarehouse(inputWarehouse) {
  let dataToSend = await processWarehouseBeforeMutation(inputWarehouse);
  dataToSend = {...dataToSend, id: inputWarehouse.id };

  console.log('Il data to send', dataToSend);
  // Update warehouse entry inside ddb
  try {
    const res = await API.graphql(graphqlOperation(UPDATE_WAREHOUSE, { input: dataToSend }));
    toast.success('Magazzino aggiornato con successo');

    console.log("res", res);
    return res?.data?.updateWarehouse;
  } catch (err) {
    toast.error('Non è stato possibile aggiornare il magazzino');
    console.error('[E] Error updating warehouse:', err);
    throw new Error("[E] Error while updating warehouse");
  }
}

export async function removeContactFromWarehouse(id, name, warehouse) {
  const log = await generateLegacyLogList({
    list: warehouse.log,
    action: `Aggiornamento`, 
    subject: `lista magazzinieri in ${warehouse.name}: rimosso ${name}`,
  });

  try {
    const res = await API.graphql(graphqlOperation(UPDATE_STOREKEEPERS, {
      id: warehouse.id,
      log,
      contactIds: warehouse.contactIds.filter(c_id => c_id !== id),
      contacts: warehouse.contacts.filter(c => c.contactId !== id),
    }));

    consoleSuccess('Aggiornamento magazzinieri effettuato con successo', res);
    return res.data.updateWarehouse;
  } catch(err) {
    toast.error(`Non è stato possibile aggiornare la lista dei magazzinieri per ${warehouse.name}`);
    console.error('[E] Error while updating storekeepers', err);
    throw new Error("[E] Error while updating storekeepers");
  }
}

export async function updateWarehouseLocation(warehouse, tracking) {
  if(!tracking.coordinate?.lat || !tracking?.coordinate?.lng) {
    toast.error(`Coordinate non trovate`);
    console.error('Impossibile rintracciare le coordinate dal seguente tracking: ', tracking);
    return null;
  } else {
    let newLocation = {...warehouse.locations };
    newLocation = { 
      ...tracking,
      coordinate: [tracking.coordinate.lat, tracking.coordinate.lng]
    };

    const log = await generateLegacyLogList({
      list: warehouse.log,
      action: 'Aggiornamento',
      subject: `tracking di ${warehouse.name}: coordinate lat:${tracking.coordinate.lat}, lng:${tracking.coordinate.lng}`
    });

    // Update warehouse location inside ddb
    try {
      const res = await API.graphql(graphqlOperation(UPDATE_LOCATION_COORDINATE, {
        id: warehouse.id,
        tenant: warehouse.tenant,
        location: newLocation,
        log
      }));
      
      return res?.data?.updateWarehouse;
    } catch (err) {
      console.log('Errore aggiornamento coordinate', err);
      return 500
    }
  }
}

export async function updateWarehouseStatus(warehouse, rollback) {
  const newStatus = warehouse.status === 'ACTIVE' ? 'DISABLED' : 'ACTIVE';
  const log = await generateLegacyLogList({
    list: warehouse.log,
    action: 'Aggiornamento',
    subject: `status di ${warehouse.name} a ${WAREHOUSE_STATUS[newStatus].label.toLowerCase()}`
  });

  // Update warehouse status inside ddb
  try {
    const res = await API.graphql(graphqlOperation(UPDATE_WAREHOUSE_STATUS, {
      id: warehouse.id,
      tenant: warehouse.tenant,
      searchable: warehouse.searchable,
      type: warehouse.type,
      status: newStatus,
      log
    }));

    toast.success(`Status di ${warehouse.name} aggiornato a ${WAREHOUSE_STATUS[newStatus].label.toLowerCase()}`);
    return res?.data?.updateWarehouse;
  } catch (err) {
    console.log('Errore aggiornamento status magazzino', err);
    toast.error('Impossibile aggiornare lo status del magazzino');
    rollback();
    return 500;
  }
}