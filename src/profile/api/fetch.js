import { API, Auth, graphqlOperation } from 'aws-amplify';
import { consoleFetch } from '../../globals/libs/helpers';
import { GET_PROFILE, GET_PROFILE_BY_EMAIL, LIST_PROFILES_BY_NAME, LIST_PROFILES_BY_SEARCHABLE } from './graphql/queries';

// by username using primary index
export async function fetchProfile (username, securityCheck = false) {
  let results = await API.graphql(graphqlOperation(GET_PROFILE,
    { username }
  ));

  if(!results?.data?.getProfile && securityCheck) {
    Auth.signOut();
  }

  consoleFetch('Fetch profile', results);
  return results?.data?.getProfile;
}

// Using by email using gsi
export async function fetchProfileByEmail (email) {
  let results = await API.graphql(graphqlOperation(GET_PROFILE_BY_EMAIL,
    { email }
  ));

  consoleFetch('Fetch profile by email', results);
  return results?.data?.profileByEmail?.items;
}

// by name using filter
export async function fetchProfileByName (name) {
  let results = await API.graphql(graphqlOperation(
    LIST_PROFILES_BY_NAME,
    { name }
  ));

  console.log('Fetch profile name', results?.data?.listProfiles?.items);
  return results?.data?.listProfiles?.items;
}

// by name using filter
export async function fetchProfileBySearchable (searchable) {
  let results = await API.graphql(graphqlOperation(
    LIST_PROFILES_BY_SEARCHABLE,
    { searchable }
  ));

  consoleFetch('Fetch profile searchable', results?.data?.listProfiles?.items);
  return results?.data?.listProfiles?.items;
}