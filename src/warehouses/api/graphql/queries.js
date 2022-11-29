export const WAREHOUSE_BY_COMPANY = /* GraphQL */ `
  query WarehouseByCompany(
    $companyId: ID!
    $statusSearchable: ModelWarehouseWarehouseByCompanyCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelWarehouseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    warehouseByCompany(
      companyId: $companyId
      statusSearchable: $statusSearchable
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        extId
        companyId
        name
        searchable
        status
        location { place_id address city province region coordinate }
        maxLength
        scope
        type
        isDeposit
        isInter
        isHub
        isLinked
        windows { start end days type }
        automationLevel
        tools
        note
        contactIds
        contacts { contactId name email phone job }
        warehouseLinkId
        warehouseLink {
          warehouse {
            id extId name status scope isDeposit isInter isHub
            location { place_id address city province region coordinate }
            windows { start end days type }
            maxLength
            contacts { contactId name email phone job }
            note
          }
        }
      }
      nextToken
    }
  }
`;

export const WAREHOUSE_BY_CLIENT = /* GraphQL */ `
  query WarehouseByClient(
    $companyId: ID!
    $statusSearchable: ModelWarehouseWarehouseByCompanyCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelWarehouseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    warehouseByCompany(
      company: $companyId
      statusSearchable: $statusSearchable
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        extId
        tenant
        companyId
        name
        searchable
        status
        location { place_id address city province region coordinate }
        maxLength
        scope
        type
        isDeposit
        isInter
        isHub
        isLinked
        windows { start end days type }
        automationLevel
        tools
        note
        contactIds
        contacts { contactId name email phone job }
      }
      nextToken
    }
  }
`;

export const DEPOSIT_BY_COMPANY = /* GraphQL */ `
  query DepositWarehouseByCompany(
    $companyId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelWarehouseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    depositWarehouseByCompany(
      companyId: $companyId
      isDepositStatus: {
        eq: {
          isDeposit: 1,
          status: ACTIVE
        }
      }
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        extId
        tenant
        companyId
        name
        searchable
        status
        location { place_id address city province region coordinate }
        maxLength
        scope
        type
        isDeposit
        isInter
        isHub
        isLinked
        windows { start end days type }
        automationLevel
        tools
        note
        contactIds
        contacts { contactId name email phone job }
        warehouseLinkId
        warehouseLink {
          warehouse {
            id extId name status scope isDeposit isInter isHub
            location { place_id address city province region coordinate }
          }
        }
      }
      nextToken
    }
  }
`;

export const INTER_BY_COMPANY = /* GraphQL */ `
  query InterWarehouseByCompany(
    $companyId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelWarehouseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    interWarehouseByCompany(
      companyId: $companyId
      isInterStatus: {
        eq: {
          isInter: 1,
          status: ACTIVE
        }
      }
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        extId
        tenant
        companyId
        name
        searchable
        status
        location { place_id address city province region coordinate }
        maxLength
        scope
        type
        isDeposit
        isInter
        isHub
        isLinked
        windows { start end days type }
        automationLevel
        tools
        note
        contactIds
        contacts { contactId name email phone job }
        warehouseLinkId
        warehouseLink {
          warehouse {
            id extId name status scope isDeposit isInter isHub
            location { place_id address city province region coordinate }
          }
        }
      }
      nextToken
    }
  }
`;

export const HUB_BY_COMPANY = /* GraphQL */ `
  query HubWarehouseByCompany(
    $companyId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelWarehouseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    hubWarehouseByCompany(
      companyId: $companyId
      isHubStatus: {
        eq: {
          isHub: 1,
          status: ACTIVE
        }
      }
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        extId
        tenant
        companyId
        name
        searchable
        status
        location { place_id address city province region coordinate }
        maxLength
        scope
        type
        isDeposit
        isInter
        isHub
        isLinked
        windows { start end days type }
        automationLevel
        tools
        note
        contactIds
        contacts { contactId name email phone job }
        warehouseLinkId
        warehouseLink {
          warehouse {
            id extId name status scope isDeposit isInter isHub
            location { place_id address city province region coordinate }
          }
        }
      }
      nextToken
    }
  }
`;
export const LINKED_WAREHOUSES_BY_COMPANY = /* GraphQL */ `
  query LinkedWarehouseByCompany(
    $companyId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelWarehouseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    linkedWarehouseByCompany(
      companyId: $companyId
      isLinkedStatus: {
        eq: {
          isLinked: 1,
          status: ACTIVE
        }
      }
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        extId
        tenant
        companyId
        name
        searchable
        status
        location { place_id address city province region coordinate }
        maxLength
        scope
        type
        isDeposit
        isInter
        isHub
        isLinked
        windows { start end days type }
        automationLevel
        tools
        note
        contactIds
        contacts { contactId name email phone job }
        warehouseLinkId
        warehouseLink {
          warehouse {
            id extId name status scope isDeposit isInter isHub
            location { place_id address city province region coordinate }
          }
        }
      }
      nextToken
    }
  }
`;

export const WAREHOUSE_BY_ID = /* GraphQL */ `
  query GetWarehouse($id: ID!) {
    getWarehouse(id: $id) {
      id
      extId
      tenant
      companyId
      name
      searchable
      status
      location {
        place_id
        region
        province
        city
        address
        coordinate
      }
      windows {
        start
        end
        days
        type
      }
      contactIds
      contacts {
        contactId
        name
        email
        phone
        job
      }
      owner
      specialization
      scope
      maxLength
      tools
      automationLevel
      type
      isDeposit
      isInter
      isHub
      isLinked
      warehouseLinkId
      log {
        authorId
        author
        description
        timestamp
      }
      note
      createdAt
      updatedAt
      warehouseLink {
        id
        tenantClient
        companyClientSummary {
          id
          name
          vatNumber
          uniqueCode
          pec
        }
        tenantOwner
        companyOwnerSummary {
          id
          name
          vatNumber
          uniqueCode
          pec
        }
        warehouseId
        log {
          authorId
          author
          description
          timestamp
        }
        createdAt
        updatedAt
        companyClient {
          id
          companyCode
          vatNumber
          name
          fiscalCode
          city
          address
          uniqueCode
          pec
          trades
          type
          authorCustomersRaw
          createdAt
          updatedAt
          owner
        }
        companyOwner {
          id
          companyCode
          vatNumber
          name
          fiscalCode
          city
          address
          uniqueCode
          pec
          trades
          type
          authorCustomersRaw
          createdAt
          updatedAt
          owner
        }
        warehouse {
          id
          extId
          tenant
          name
          searchable
          status
          contactIds
          owner
          specialization
          scope
          maxLength
          tools
          automationLevel
          type
          isDeposit
          isInter
          isHub
          isLinked
          warehouseLinkId
          contacts { contactId name email phone job }
          location { place_id region province city address coordinate }
          windows { start end days type }
          note
          createdAt
          updatedAt
        }
      }
    }
  }
`;

export const WAREHOUSES_BY_COMPANY_STATUS = /* GraphQL */ `
query WarehouseByCompany(
  $companyId: ID!
  $statusSearchable: ModelWarehouseWarehouseByCompanyStatusCompositeKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelWarehouseFilterInput
) {
  warehouseByCompanyStatus(
    companyId: $companyId,
    statusSearchable: $statusSearchable,
    sortDirection: $sortDirection,
    filter: $filter
  ) {
    items {
      id
      extId
      tenant
      companyId
      name
      searchable
      type
      log { authorId author description timestamp }
      location { place_id region province city address coordinate }
      windows { start end days type }
      status
      contactIds
      contacts { contactId name email phone}
      specialization
      scope
      maxLength
      tools
      automationLevel
      note
    }
  }
}
`

// export const WAREHOUSE_BY_TENANT = /* GraphQL */ `
// query WarehouseByTenant($tenant: ID!, $searchableType: ModelWarehouseWarehouseByTenantCompositeKeyConditionInput, $sortDirection: ModelSortDirection, $filter: ModelWarehouseFilterInput) {
//   warehouseByTenant(
//     tenant: $tenant,
//     searchableType: $searchableType,
//     sortDirection: $sortDirection,
//     filter: $filter
//   ) {
//     items {
//       id
//       extId
//       tenant
//       name
//       searchable
//       status
//       location {
//         place_id
//         region
//         province
//         city
//         address
//         coordinate
//       }
//       windows {
//         start
//         end
//         days
//         type
//       }
//       contactIds
//       contacts {
//         contactId
//         name
//         email
//         phone
//         job
//       }
//       owner
//       specialization
//       scope
//       maxLength
//       tools
//       automationLevel
//       type
//       isDeposit
//       isInter
//       isHub
//       isLinked
//       warehouseLinkId
//       log { authorId author description timestamp }
//       note
//       createdAt
//       updatedAt
//       warehouseLink { id tenant tenantClient tenantOwner warehouseId createdAt updatedAt }
//     }
//     nextToken
//   }
// }
// `



export const GET_WAREHOUSE_BY_ID = `
query GetWarehouseById($id: ID!) {
  getWarehouse(id: $id) {
    id
    extId
    tenant
    name
    searchable
    type
    log { authorId author description timestamp }
    location { place_id region province city address coordinate }
    windows { start end days type }
    status
    contactIds
    contacts { contactId name email phone}
    specialization
    scope
    maxLength
    tools
    automationLevel
    note
  }
}
`

export const SEARCH_WAREHOUSES = `
  query WarehouseByTenant(
    $tenant: ID!, 
    $searchableType: ModelWarehouseWarehouseByTenantCompositeKeyConditionInput, 
    $sortDirection: ModelSortDirection, 
    $filter: ModelWarehouseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    warehouseByTenant(
      tenant: $tenant, 
      searchableType: $searchableType, 
      sortDirection: $sortDirection, 
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        extId
        tenant
        name
        searchable
        type
        log { authorId author description timestamp }
        location { place_id region province city address coordinate }
        windows { start end days type }
        status
        contactIds
        contacts { contactId name email phone}
        specialization
        scope
        maxLength
        tools
        automationLevel
        note
      }
      nextToken
    }
  }
`

export const SEARCH_WAREHOUSES_FROM_SEARCHABLE = `
query WarehouseBySerchableStatus(
  $tenant: ID!,
  $searchableStatus: ModelWarehouseWarehouseBySerchableStatusCompositeKeyConditionInput,
  $sortDirection: ModelSortDirection,
  $filter: ModelWarehouseFilterInput
  $limit: Int
  $nextToken: String
) {
  warehouseBySerchableStatus(
    tenant: $tenant,
    searchableStatus: $searchableStatus,
    sortDirection: $sortDirection,
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      extId
      tenant
      name
      searchable
      type
      log { authorId author description timestamp }
      location { place_id region province city address coordinate }
      windows { start end days type }
      status
      contactIds
      contacts { contactId name email phone}
      specialization
      scope
      maxLength
      tools
      automationLevel
      note
    }
    nextToken
  }
}
`

export const SEARCH_WAREHOUSES_FROM_STATUS = `
query WarehouseByTenantStatus(
  $tenant: ID!,
  $statusSearchable: ModelWarehouseWarehouseByTenantStatusCompositeKeyConditionInput,
  $sortDirection: ModelSortDirection,
  $filter: ModelWarehouseFilterInput
  $limit: Int
  $nextToken: String
  ) {
  warehouseByTenantStatus(
    tenant: $tenant, 
    statusSearchable: $statusSearchable, 
    sortDirection: $sortDirection, 
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      extId
      tenant
      name
      searchable
      type
      log { authorId author description timestamp }
      location { place_id region province city address coordinate }
      windows { start end days type }
      status
      contactIds
      contacts { contactId name email phone}
      specialization
      scope
      maxLength
      tools
      automationLevel
      note
    }
    nextToken
  }
}
`