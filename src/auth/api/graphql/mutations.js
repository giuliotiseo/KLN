/* - Profile ----------------------------------------------------------------------------------- */
export const createProfile = `
  mutation CreateProfile($input: CreateProfileInput!) {
    createProfile(input: $input) {
      username
      name
      email
      phone
      searchable
      roleId
    }
  }
`;

export const deleteProfile = `
  mutation DeleteProfile($input: DeleteProfileInput!) {
    deleteProfile(input: $input) {
      username
    }
  }
`;


/* - Company ----------------------------------------------------------------------------------- */
export const createCompany = `
  mutation CreateCompany($input: CreateCompanyInput!) {
    createCompany(input: $input) {
      companyId
      tag
      vatNumber
      name
      type
      log { authorId author description timestamp }
    }
  }
`;

export const deleteCompany = `
  mutation DeleteCompany($input: DeleteCompanyInput!) {
    deleteCompany(input: $input) {
      companyId
    }
  }
`;

/* - CompanyRole ------------------------------------------------------------------------------- */

export const createCompanyRole = `
  mutation CreateCompanyRole($input: CreateCompanyRoleInput!) {
    createCompanyRole(input: $input) {
      id
      username
      companyId
      task
    }
  }
`;

export const deleteCompanyRole = `
  mutation DeleteCompanyRole($input: DeleteCompanyRoleInput!) {
    deleteCompanyRole(input: $input) {
      id
    }
  }
`;
