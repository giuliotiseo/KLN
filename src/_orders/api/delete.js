import { API, graphqlOperation } from 'aws-amplify';
import { toast } from 'react-toastify';
import { DELETE_ORDER } from './graphql/mutations';

export async function deleteOrder(id, queryFrom) {
  // Delete warehouse API function
  try {
    const res = await API.graphql(graphqlOperation(DELETE_ORDER, { input: { id }}));
    return {
      result: res.data.deleteOrder,
      queryFrom
    };
  } catch(err) {
    toast.error('Non è stato possibile cancellare l\'ordine');
    console.log('[E] Error deleting olrder:', err);
    throw new Error("Mutation failed (delete.js): revoke order deletion");
  }
}