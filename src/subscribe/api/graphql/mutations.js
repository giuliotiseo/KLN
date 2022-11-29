export const SUBSCRIBE_COMPANY_BY_EXT_FORM = /* GraphQL */ `
  mutation CreateCompany(
    $input: CreateCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    createCompany(input: $input, condition: $condition) {
      id
      companyCode
      vatNumber
      name
      fiscalCode
      city
      address
      location { place_id region province city address coordinate }
      uniqueCode
      pec
      emails { name value }
      phones { name value }
      trades
      type
      authorCustomersRaw
      createdAt
      updatedAt
    }
  }
`;

export const SUBSCRIBE_WAREHOUSE_BY_EXT_FORM = /* GraphQL */ `
  mutation CreateWarehouse(
    $input: CreateWarehouseInput!
    $condition: ModelWarehouseConditionInput
  ) {
    createWarehouse(input: $input, condition: $condition) {
      id
      extId
      name
      searchable
      type
      location { place_id region province city address coordinate }
      windows { start end days type }
      status
      contactIds
      specialization
      scope
      tools
      automationLevel
      note
    }
  }
`;


