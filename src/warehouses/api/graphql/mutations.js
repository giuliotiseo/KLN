export const CREATE_WAREHOUSE = /* GraphQL */ `
  mutation CreateWarehouse(
    $input: CreateWarehouseInput!
    $condition: ModelWarehouseConditionInput
  ) {
    createWarehouse(input: $input, condition: $condition) {
      id
      extId
      companyId
      tenant
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
    }
  }
`;


export const CREATE_WAREHOUSELINK = /* GraphQL */ `
  mutation CreateWarehouseLink(
    $input: CreateWarehouseLinkInput!
    $condition: ModelWarehouseLinkConditionInput
  ) {
    createWarehouseLink(input: $input, condition: $condition) {
      id
      companyOwnerId
      companyClientId
      tenantClient
      tenantOwner
      warehouse { id name location { address }}
    }
  }
`;

export const UPDATE_WAREHOUSE = /* GraphQL */ `
  mutation UpdateWarehouse(
    $input: UpdateWarehouseInput!
    $condition: ModelWarehouseConditionInput
  ) {
    updateWarehouse(input: $input, condition: $condition) {
      id
      extId
      companyId
      tenant
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
        companyOwnerId
        companyClientId
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
          note
          createdAt
          updatedAt
        }
      }
    }
  }
`;

export const DELETE_WAREHOUSE = /* GraphQL */ `
  mutation DeleteWarehouse(
    $input: DeleteWarehouseInput!
    $condition: ModelWarehouseConditionInput
  ) {
    deleteWarehouse(input: $input, condition: $condition) {
      id
      name
      companyId
      log { authorId author description timestamp }
    }
  }
`;


export const DELETE_WAREHOUSELINK = /* GraphQL */ `
  mutation DeleteWarehouseLink(
    $input: DeleteWarehouseLinkInput!
    $condition: ModelWarehouseLinkConditionInput
  ) {
    deleteWarehouseLink(input: $input, condition: $condition) {
      id
      companyOwnerId
      companyClientId
      tenantClient
      tenantOwner
    }
  }
`;

export const UPDATE_STOREKEEPERS = `
mutation UpdateWarehouse($id: ID!, $contactIds: [String], $contacts: [ContactSummaryInput] $log: [LogInput]) {
  updateWarehouse(input: { id: $id, contactIds: $contactIds, contacts: $contacts, log: $log }) {
    id
    contactIds
    contacts { contactId name email phone job }
    tenant
    log { authorId author description timestamp }
  }
}
`
export const UPDATE_LOCATION_COORDINATE = `
  mutation UpdateWarehouse($id: ID!, $tenant: ID!, $location: LocationInput!, $log: [LogInput]) {
    updateWarehouse(input: { id: $id, tenant: $tenant, location: $location, log: $log }) {
      id
      extId
      tenant
      name
      searchable
      type
      location { place_id region province city address coordinate }
      log { authorId author description timestamp }
      status
      contactIds
      contacts { contactId name email phone job }
      specialization
      scope
      maxLength
      tools
      automationLevel
      note
    }
  }
`

export const UPDATE_WAREHOUSE_STATUS = `
  mutation UpdateWarehouse($id: ID!, $tenant: ID!, $status: WarehouseStatus!, $searchable: String!, $type: WarehouseBuildingType!, $log: [LogInput]) {
    updateWarehouse(input: { id: $id, tenant: $tenant, searchable: $searchable, type: $type, status: $status, log: $log }) {
      id
      extId
      tenant
      name
      searchable
      type
      location { place_id region province city address coordinate }
      log { authorId author description timestamp }
      status
      contactIds
      contacts { contactId name email phone job }
      specialization
      scope
      maxLength
      tools
      automationLevel
      note
    }
  }
`

