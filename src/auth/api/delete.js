import { API, graphqlOperation } from 'aws-amplify';
import {
  deleteProfile as DELETE_PROFILE,
  deleteCompanyRole as DELETE_COMPANY_ROLE,
} from './graphql/mutations';


/* - Profile ----------------------------------------------------------------------------------- */
//  Escape delete data on startup ---------------------------------------------------------------------------
export async function deleteProfile(username) {
  try {
    await API.graphql(
      graphqlOperation(DELETE_PROFILE, {
        input: { username: username },
      }),
    );

    console.log(`Profile ${username} is deleted`);
  }

  catch(e) {
    console.log('Error', e);
  }
}

/* - CompanyRole ------------------------------------------------------------------------------- */
export async function deleteCompanyRole(roleId) {
  try {
    await API.graphql(
      graphqlOperation(DELETE_COMPANY_ROLE, {
        input: { id: roleId },
      }),
    );

    console.log(`Role ${roleId} is deleted`);
  }

  catch(e) {
    console.log('Error', e);
  }
}