export const getCustomers = /* GraphQL */ `
  query CustomerByCompany(
    $carrierId: ID
    $searchable: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCustomerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    customerByCompany(
      ownerCompanyId: $carrierId
      searchable: $searchable
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        vatNumber
        searchable
        companyCode
        ownerCompanyId
        companyId
        tenant
        isSender
        isCarrier
        isReceiver
        relationships
        customPec
        customUniqueCode
        customEmails { name value }
        customPhones { name value }
        customTrades
        note
        company {
          id
          city
          address
          uniqueCode
          pec
          trades
          type
          authorCustomersRaw
          createdAt
          updatedAt
          companyCode
          vatNumber
          name
          fiscalCode
        }
      }
      nextToken
    }
  }
`;