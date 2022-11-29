import { API, graphqlOperation, Storage } from 'aws-amplify';
import { toast } from 'react-toastify';
// Mutations
import { DELETE_CONTACT } from './graphql/mutations';
// Helpers
import { consoleInfo, consoleSuccess } from '../../globals/libs/helpers';
import { isContactExist } from '../libs/helpers';

//  Create contact ------------------------------------------------------------------------------
export async function deleteContact(contact) {
  const checkExistence = await isContactExist(contact);
  
  if(!contact.avatar) {
    consoleInfo('Avatar doesn\'t exist: remove avatar/logo operation not necessary', contact.avatar);
  } else if(checkExistence === true) {
    consoleInfo('Existent profile: remove avatar/logo operation not allowed', checkExistence);
  } else {
    // Remove the image from S3 storage
    await Storage.remove(contact.avatar.key, { level: 'protected' })
    .then(() => { 
      consoleSuccess('Avatar removed from S3', contact.avatar.key)
    }).catch(err => {
      console.error('Impossible to remove the avatar, check the console', err);
    })
  }

  try {
    const res = await API.graphql(graphqlOperation(DELETE_CONTACT, { input: {id: contact.id }}));
    consoleSuccess('Contact removed successfully', res);
    toast.success(`${contact.name} rimosso con successo dalla lista contatti`);
    return res.data.deleteContact;
  } catch(err) {
    toast.error('Impossibile rimuovere il contatto');
    console.log('[E] Error deleting contact:', err);
    throw new Error("Mutation failed (delete.js): revoke contact deletion");
  }
}