// New queries
export const CONTACTS_BY_COMPANY = /* GraphQL */ `
  query ContactByCompanySearchableType(
    $companyId: ID!,
    $searchable: String
    $sortDirection: ModelSortDirection,
    $limit: Int,
    $filter: ModelContactFilterInput
    $nextToken: String
  ) {
    contactByCompany(
      companyId: $companyId,
      searchable: { beginsWith: $searchable }
      sortDirection: $sortDirection,
      limit: $limit,
      filter: $filter
      nextToken: $nextToken
    ) {
      items {
        id
        companyId
        name
        surname
        phone
        email
        type
        invited
        note
        employee
        searchable
        jobName
        jobId
        log { authorId author description timestamp }
        avatar { identityId bucket region key extension timestamp }
      }
      nextToken
    }
  }
`

export const CONTACTS_BY_TYPE = /* GraphQL */ `
  query ContactByCompanyType(
    $companyId: ID!
    $type: ContactType
    $searchable: String
    $sortDirection: ModelSortDirection
    $filter: ModelContactFilterInput
    $limit: Int
    $nextToken: String
  ) {
    contactByCompanyType(
      companyId: $companyId
      typeSearchable: {
        beginsWith: {
          type: $type,
          searchable: $searchable
        }
      }
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
  ) {
      items {
        id
        tenant
        name
        surname
        phone
        email
        type
        invited
        note
        employee
        jobName
        jobId
        searchable
        log { authorId author description timestamp }
        avatar { identityId bucket region key extension timestamp }
      }
      nextToken
    }
  }
`

export const EMPLOYEES_BY_TENANT = /* GraphQL */ `
  query EmployeeByTenant(
    $tenant: ID
    $searchable: String
    $sortDirection: ModelSortDirection
    $filter: ModelContactFilterInput
    $limit: Int
    $nextToken: String
  ) {
    employeeByTenant(
      tenant: $tenant
      employeeSearchable: {
        beginsWith: {
          employee: 1,
          searchable: $searchable
        }
      }
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        tenant
        name
        surname
        phone
        email
        type
        invited
        note
        employee
        searchable
        jobName
        jobId
        log { authorId author description timestamp }
        avatar { identityId bucket region key extension timestamp }
      }
      nextToken
    }
  }
`

export const EMPLOYEES_BY_COMPANY_TYPE = /* GraphQL */ `
  query EmployeesByCompanyType(
    $companyId: ID!
    $type: ContactType
    $searchable: String
    $sortDirection: ModelSortDirection
    $filter: ModelContactFilterInput
    $limit: Int
    $nextToken: String
  ) {
    employeeByCompanyType(
      companyId: $companyId
      employeeTypeSearchable: {
        beginsWith: {
          employee: 1,
          type: $type,
          searchable: $searchable
        }
      }
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        tenant
        name
        surname
        phone
        email
        type
        invited
        note
        employee
        searchable
        jobName
        jobId
        log { authorId author description timestamp }
        avatar { identityId bucket region key extension timestamp }
      }
      nextToken
    }
  }
`

export const CONTACT_BY_ID = /* GraphQL */ `
  query GetContact($id: ID!) {
    getContact(id: $id) {
      id
      tenant
      name
      surname
      searchable
      fiscalCode
      phone
      email
      type
      avatar { filename identityId bucket region key extension timestamp }
      employee
      jobId
      jobName
      invited
      log { authorId author description timestamp }
      windows { start end days type }
      note
      job {
        id
        name
        companyCode
        vatNumber
        location { place_id region province city }
        type
      }
    }
  }
`;


export const ALL_CONTACTS_BY_TENANT = `
query AllContactsByTenant(
  $tenant: ID!, 
  $sortDirection: ModelSortDirection,  
) {
  contactByTenant(
    tenant: $tenant, 
    sortDirection: $sortDirection
  ) {
    items {
      id
      name
      type
      email
      phone
      vatNumber
      tag
      job
      checkpoints {
        warehouseId
        extId
        name
        location { place_id region province city address coordinate }
        contacts { contactId name email phone job }
        windows { start end days type }
        maxLength
        tools
      }
    }
  }
}`



export const GET_CONTACT_BY_ID = `
  query GetContactById($id: ID!) {
    getContact(id: $id) {
      id
      tenant
      name
      phone
      email
      type
      uniqueCode
      vatNumber
      tag
      tag
      pec
      invited
      note
      sync
      employee
      job
      searchable
      log { authorId author description timestamp }
      checkpoints {
        warehouseId
        extId
        name
        location { place_id region province city address coordinate }
        contacts { contactId name email phone job }
        windows { start end days type }
        maxLength
        tools
      }
      avatar { identityId bucket region key extension timestamp }
    }
  }
`

// Old
export const INIT_CONTACTS_BY_TENANT = `
  query ContactsByTenantSearchableType($tenant: ID!, $sortDirection: ModelSortDirection, $limit: Int, $filter: ModelContactFilterInput) {
    contactByTenant(tenant: $tenant, sortDirection: $sortDirection, limit: $limit, filter: $filter) {
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
        tag
        pec
        invited
        note
        sync
        employee
        job
        searchable
        log { authorId author description timestamp }
        checkpoints {
          warehouseId
          extId
          name
          location { place_id region province city address coordinate }
          contacts { contactId name email phone job }
          windows { start end days type }
          maxLength
          tools
          note
        }
        avatar { identityId bucket region key extension timestamp }
      }
    }
  }
`

export const LIST_FILTERED_CONTACTS = `
query ContactByTenant($tenant: ID!, $searchableType: ModelContactContactsByTenantCompositeKeyConditionInput, $sortDirection: ModelSortDirection, $limit: Int, $filter: ModelContactFilterInput) {
  contactByTenant(tenant: $tenant, searchableType: $searchableType, sortDirection: $sortDirection, filter: $filter, limit: $limit) {
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
      tag
      pec
      invited
      note
      sync
      employee
      job
      searchable
      log { authorId author description timestamp }
      checkpoints {
        warehouseId
        extId
        name
        location { place_id region province city address coordinate }
        contacts { contactId name email phone job }
        windows { start end days type }
        maxLength
        tools
      }
      avatar { identityId bucket region key extension timestamp }
    }
  }
}
`

export const LIST_FILTERED_CONTACTS_FROM_TYPE = `
query ContactByTenant($tenant: ID!, $typeSearchable: ModelContactContactsByTenantTypeCompositeKeyConditionInput, $sortDirection: ModelSortDirection, $filter: ModelContactFilterInput, $limit: Int) {
  contactsByTenantType(tenant: $tenant, typeSearchable: $typeSearchable, sortDirection: $sortDirection, limit: $limit, filter: $filter) {
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
      tag
      pec
      invited
      note
      sync
      employee
      job
      searchable
      log { authorId author description timestamp }
      checkpoints {
        warehouseId
        extId
        name
        location { place_id region province city address coordinate }
        contacts { contactId name email phone job }
        windows { start end days type }
        maxLength
        tools
      }
      avatar { identityId bucket region key extension timestamp }
    }
  }
}
`

export const GET_CONTACT_BY_VATNUMBER = `
  query ListContactsByVatNumber($vatNumber: String!) {
    listContacts(filter: { and: [{ vatNumber: {eq: $vatNumber} }]}) {
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
        tag
        pec
        invited
        note
        sync
        employee
        job
        searchable
        log { authorId author description timestamp }
        checkpoints {
          warehouseId
          extId
          name
          location { place_id region province city address coordinate }
          contacts { contactId name email phone job }
          windows { start end days type }
          maxLength
          tools
          note
        }
        avatar { identityId bucket region key extension timestamp }
      }
    }
  }
`;


export const GET_CONTACT_BY_EMAIL = `
  query ListContactsByEmail($email: String!) {
    listContacts(filter: { and: [{ email: {eq: $email} }]}) {
      items {
        id
        name
        phone
        email
        type
        uniqueCode
        vatNumber
        tag
        tag
        pec
        invited
        note
        tenant
        sync
        employee
        job
        searchable
        log { authorId author description timestamp }
        checkpoints {
          warehouseId
          extId
          name
          location { place_id region province city address coordinate }
          contacts { contactId name email phone job }
          windows { start end days type }
          maxLength
          tools
          note
        }
        avatar { identityId bucket region key extension timestamp }
      }
    }
  }
`

export const EMPLOYEES_BY_TYPE = `
query EmployeesByTenantType(
  $tenant: ID!,
  $employeeTypeSearchable: ModelContactEmployeesByTenantTypeCompositeKeyConditionInput,
  $sortDirection: ModelSortDirection,
  $filter: ModelContactFilterInput,
  $limit: Int
) {
  employeesByTenantType(
    tenant: $tenant,
    employeeTypeSearchable: $employeeTypeSearchable,
    sortDirection: $sortDirection,
    filter: $filter,
    limit: $limit
  ) {
    items {
      id
      name
      phone
      email
      type
      note
      employee
      job
      searchable
      avatar { identityId bucket region key extension timestamp }
    }
  }
}
`

export const CONTACTS_BY_TYPE_NAME_FOR_SEARCH = /* GraphQL */ `
  query ContactsByTenantType(
    $tenant: ID
    $typeSearchable: ModelContactContactsByTenantTypeCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelContactFilterInput
    $limit: Int
    $nextToken: String
  ) {
    contactsByTenantType(
      tenant: $tenant
      typeSearchable: $typeSearchable
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        tenant
        name
        searchable
        type
        vatNumber
        checkpoints {
          warehouseId
          extId
          name
          location { place_id region province city address coordinate }
        }
      }
      nextToken
    }
  }
`;