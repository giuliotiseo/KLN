export const GET_COMPANY = /* GraphQL */ `
  query GetCompany($id: ID!) {
    getCompany(id: $id) {
      id
      companyCode
      vatNumber
      name
      fiscalCode
      city
      address
      uniqueCode
      pec
      owner
      emails { name value }
      phones { name value }
      logo { filename identityId bucket region key extension timestamp }
      trades
      log { authorId author description timestamp }
      type
      createdAt
      updatedAt
    }
  }
`;

export const SEARCH_EMPLOYERS = `
query SearchEmployers(
  $companyId: ID!, 
  $employeeSearchable: ModelContactEmployersByTenantCompositeKeyConditionInput
  $sortDirection: ModelSortDirection,
  $limit: Int,
  $filter: ModelContactFilterInput
  $nextToken: String
) {
  getCompany(companyId: $companyId) {
    contacts (
      employeeSearchable: $employeeSearchable
      limit: $limit
      sortDirection: $sortDirection
      filter: $filter
      nextToken: $nextToken
    ) {
      items {
        id
        tenant
        name
        phone
        email
        type
        uniqueCode
        vatNumber
        tag
        pec
        invited
        note
        sync
        employee
        job
        searchable
        log { authorId author description timestamp }
        avatar { identityId bucket region key extension timestamp }
      }
      nextToken
    }
  }
}
`

export const getCompanyByVatNumberForContacts = `
  query GetCompanyByVatNumber($vatNumber: ID!) {
    companyByVatNumber(vatNumber: $vatNumber) {
      items {
        logo { identityId bucket region key extension timestamp }
        companyId
        tag
        name
        email
        phone
        trades
        type
        vatNumber
        pec
        uniqueCode
        headquarters  { region province city address coordinate }
        warehouses {
          items {
            name
            note
            contacts { contactId name email phone }
            windows { start end days type }
            location { address city coordinate province place_id }
            maxLength
            tools
          }
        }
      }
    }
  }
`;

export const GET_TENANT_BY_VATNUMBER = `
query GET_TENANT_BY_VATNUMBER($vatNumber: ID!) {
  companyByVatNumber(vatNumber: $vatNumber) {
    items {
      tag
      name
    }
  }
}`

/* Quando saranno inseriti i contatti dentro warehouse inserisci:
  contacts { name email phone avatar { identityId bucket region key extension timestamp }}
  ...questo serve a permettere il passaggio delle info di contatto nella sezione create pre-order
*/
export const getCompanyByTagForContacts = `
  query GetCompany($tag: ID!) {
    companyByTag(tag: $tag) {
      items {        
        logo { identityId bucket region key extension timestamp }
        companyId
        tag
        name
        email
        phone
        trades
        type
        pec
        uniqueCode
        vatNumber
        headquarters { region province city address coordinate }
        warehouses { items { 
          name 
          location { address city coordinate province place_id }
          windows { start end days type }
          contacts { contactId name email phone }
          maxLength
          tools
        }}
      }
    }
  }
`;
