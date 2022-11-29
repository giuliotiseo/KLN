import { API, graphqlOperation } from 'aws-amplify';
import { toast } from 'react-toastify';
import { DELETE_WAREHOUSE } from './graphql/mutations';

export async function deleteWarehouse(id) {
  // Delete warehouse API function
  try {
    const res = await API.graphql(graphqlOperation(DELETE_WAREHOUSE, { input: { id }}));
    return res.data.deleteWarehouse;
  } catch(err) {
    toast.error('Non è stato possibile rimuovere questo magazzino');
    console.log('[E] Error deleting warehouse:', err);
    throw new Error("Mutation failed (delete.js): revoke warehouse deletion");
  }
}