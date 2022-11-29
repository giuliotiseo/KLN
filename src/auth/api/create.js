import { API, graphqlOperation } from 'aws-amplify';
import { generateLegacyLogList } from '../../globals/libs/helpers';
import { deleteCompanyRole, deleteProfile } from './delete';
// Mutations
import {
  createProfile as CREATE_PROFILE,
  createCompanyRole as CREATE_COMPANY_ROLE,
  createCompany as CREATE_COMPANY,
} from './graphql/mutations';

//  Create profile data ---------------------------------------------------------------------------
export async function createProfile(currentUserFromCognito, roleId) {
  const { attributes } = currentUserFromCognito;
  try {
    const profile = await API.graphql(
      graphqlOperation(CREATE_PROFILE, {
        input: {
          username: attributes.email,
          name: attributes.name,
          email: attributes.email,
          searchable: attributes.name.toLowerCase(),
          roleId,
          phone: attributes["custom:phone"],
        },
      }),
    );
    console.log('Create profile', profile);

  } catch (error) {
    console.log('Error while saving Profile', error);
    return 500
  }

  return 200
}


//  Create role data ------------------------------------------------------------------------------
export async function createCompanyRole(currentUserFromCognito, roleId, companyTag) {
  const { attributes } = currentUserFromCognito;
  // Load CompanyRole entry inside DataStore
  try {
    const companyRole = await API.graphql(
      graphqlOperation(CREATE_COMPANY_ROLE, {
        input: {
          id: roleId,
          username: attributes.email,
          companyId: attributes['custom:companyId'],
          task: attributes['custom:role'],
          tenant: companyTag,
        },
      }),
    );

    console.log('Create Company Role', companyRole);
  } catch (error) {
    await deleteProfile(attributes['custom:email'], 1);
    console.log('[E] Error creating user CompanyRole record:', error);
    return 500
  }

  return 200
}

//  Create company data ---------------------------------------------------------------------------
export async function createCompany(currentUserFromCognito, tag, roleId) {
  // Username, in case of userFromCognito, is the sub uuid of the account
  const { username, attributes } = currentUserFromCognito;
  const log = await generateLegacyLogList({
    list: [],
    action: 'Creazione',
    subject: `nuova azienda ${attributes['custom:companyName']} (P.IVA: ${attributes['custom:vatNumber']}), tipo: ${attributes['custom:companyType']}`
  });

  try {
    const company = await API.graphql(
      graphqlOperation(CREATE_COMPANY, {
        input: {
          companyId: attributes['custom:companyId'],
          tag,
          name: attributes['custom:companyName'],
          vatNumber: attributes['custom:vatNumber'],
          owner: username,
          type: attributes['custom:companyType'],
          log
        },
      }),
    );
    console.log('Create company', company);
  } catch (error) {
    console.log('Error while saving Company ', error);
    console.log('Data sent for Company ', {
      input: {
        companyId: attributes['custom:companyId'],
        tag,
        name: attributes['custom:companyName'],
        vatNumber: attributes['custom:vatNumber'],
        owner: username,
      },
    });

    await deleteProfile(attributes.email, 1);
    await deleteCompanyRole(roleId, 1);
    return 500;
  }

  return 200;
}

