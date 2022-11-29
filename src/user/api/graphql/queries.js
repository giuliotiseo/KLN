export const GET_PROFILE = `
  query GetProfile($username: ID!) {
    getProfile(username: $username) {
      username
      name
      email
      phone
      roleId
      owner
      note
      owner
      location { region province city address coordinate }
      role { id task company { companyId vatNumber name type tag } }
      avatar { identityId bucket region key extension timestamp }
    }
  }
`;

export const GET_PROFILE_BY_EMAIL = `
  query GetProfileByEmail($email: String!) {
    profileByEmail(email: $email) {
      items {        
        username
        name
        email
        phone
        roleId
        note
        owner
        location { region province city address coordinate }
        role { id task company { companyId vatNumber name type tag } }
        avatar { identityId bucket region key extension timestamp }
      }
    }
  }
`;


export const LIST_PROFILES_BY_NAME = `
  query ListProfilesByName($name: String!) {
    listProfiles(filter: { and: [{ name: {contains: $name} }]}) {
      items {
        username     
        name
        email
        phone
        roleId
        note
        owner
        location { region province city address coordinate }
        role { id task company { companyId vatNumber name type tag } }
        avatar { identityId bucket region key extension timestamp }
      }
    }
  }
`;

export const LIST_PROFILES_BY_SEARCHABLE = `
  query ListProfilesBySearchable($searchable: String!) {
    listProfiles(filter: { and: [{ searchable: {contains: $searchable} }]}) {
      items {
        username     
        name
        email
        phone
        roleId
        note
        searchable
        owner
        location { region province city address coordinate }
        role { id task company { companyId vatNumber name type tag } }
        avatar { identityId bucket region key extension timestamp }
      }
    }
  }
`;
