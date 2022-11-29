export const CUSTOMERS_BY_OWNERCOMPANY = /* GraphQL */ `
  query customerByCompany(
    $ownerCompanyId: ID!
    $searchable: String
    $sortDirection: ModelSortDirection
    $filter: ModelCustomerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    customerByCompany(
      ownerCompanyId: $ownerCompanyId
      searchable: { beginsWith: $searchable }
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items { 
        id name relationships companyId ownerCompanyId vatNumber customPec customUniqueCode
        company { id city vatNumber address companyCode pec uniqueCode owner location { place_id city province region coordinate }}
      }
      nextToken
    }
  }
`;

export const CUSTOMER_BY_ID = /* GraphQL */ `
  query GetCustomer($id: ID!) {
    getCustomer(id: $id) {
      id
      name
      vatNumber
      searchable
      companyCode
      companyId
      ownerCompanyId
      company {
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
        location { region city address province place_id }
        warehouses {
          items { 
            id extId name maxLength type specialization scope tools automationLevel note status
            windows { start end days type }
            location { address city region province place_id coordinate }
            warehouseLink { companyOwner { id name vatNumber owner }}
          } 
        }
        emails { name value }
        phones { name value }
        logo { filename identityId bucket region key extension timestamp }
        trades
        type
      }
      isSender
      isCarrier
      isReceiver
      relationships
      customCheckpoints {
        warehouseId
        extId
        name
        thirdCompanyId
        thirdCompanyOwner
        thirdCompanyName
        thirdCompanyVat
        location { place_id region province city address coordinate }
        contacts { contactId name email phone job }
        windows { start end days type }
        maxLength
        tools
        note
      }
      customPec
      customUniqueCode
      customEmails { name value }
      customPhones { name value }
      customTrades
      log { authorId author description timestamp }
      note
      createdAt
      updatedAt
    }
  }
`;

export const CUSTOMERS_BY_SENDER_RELATION = /* GraphQL */ `
  query senderCustomerByCompany(
    $ownerCompanyId: ID!
    $searchable: String
    $sortDirection: ModelSortDirection
    $filter: ModelCustomerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    senderCustomerByCompany(
      ownerCompanyId: $ownerCompanyId
      isSenderSearchable: {
        beginsWith: {
          isSender: 1,
          searchable: $searchable
        }
      }
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items { 
        id name relationships companyId ownerCompanyId vatNumber customPec customUniqueCode
        company { id city vatNumber address companyCode pec uniqueCode owner location { place_id city province region coordinate }}
      }
      nextToken
    }
  }
`;

export const CUSTOMERS_BY_RECEIVER_RELATION = /* GraphQL */ `
  query receiverCustomerByCompany(
    $ownerCompanyId: ID!
    $searchable: String
    $sortDirection: ModelSortDirection
    $filter: ModelCustomerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    receiverCustomerByCompany(
      ownerCompanyId: $ownerCompanyId
      isReceiverSearchable: {
        beginsWith: {
          isReceiver: 1,
          searchable: $searchable
        }
      }
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items { 
        id name relationships companyId ownerCompanyId vatNumber customPec customUniqueCode
        company { id city vatNumber address companyCode pec uniqueCode owner location { place_id city province region coordinate }}
      }
      nextToken
    }
  }
`;

export const CUSTOMERS_BY_CARRIER_RELATION = /* GraphQL */ `
  query carrierCustomerByCompany(
    $ownerCompanyId: ID!
    $searchable: String
    $sortDirection: ModelSortDirection
    $filter: ModelCustomerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    carrierCustomerByCompany(
      ownerCompanyId: $ownerCompanyId
      isCarrierSearchable: {
        beginsWith: {
          isCarrier: 1,
          searchable: $searchable
        }
      }
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items { 
        id name relationships companyId ownerCompanyId vatNumber customPec customUniqueCode
        company { id city vatNumber address companyCode pec uniqueCode owner location { place_id city province region coordinate }}
      }
      nextToken
    }
  }
`;

export const COMPANIES_BY_VATNUMBER = /* GraphQL */ `
  query CompanyByVatNumber($vatNumber: ID!) {
    companyByVatNumber(vatNumber: $vatNumber) {
      items {
        id
        companyCode
        vatNumber
        name
        vatNumber
        fiscalCode
        city
        address
        uniqueCode
        pec
        location { city address province region place_id }
        warehouses {
          items { 
            id name maxLength type specialization scope tools automationLevel note status
            windows { start end days type }
            location { address city region province place_id coordinate }
          } 
        }
        emails { name value }
        phones { name value }
        logo { filename identityId bucket region key extension timestamp }
        trades
        type
      }
    }
  }
`;

export const CUSTOMER_BY_COMPANYID = /* GraphQL */ `
  query CustomerByCompany(
    $ownerCompanyId: ID
    $sortDirection: ModelSortDirection
    $filter: ModelCustomerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    customerByCompany(
      ownerCompanyId: $ownerCompanyId
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
        companyId
        ownerCompanyId
        company {
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
          location { region city address province place_id }
          warehouses {
            items { 
              id extId name maxLength type specialization scope tools automationLevel note status
              windows { start end days type }
              location { address city region province place_id coordinate }
              warehouseLink { companyOwner { id name vatNumber owner }}
            } 
          }
          emails { name value }
          phones { name value }
          logo { filename identityId bucket region key extension timestamp }
          trades
          type
        }
        isSender
        isCarrier
        isReceiver
        relationships
        customCheckpoints {
          warehouseId
          extId
          name
          thirdCompanyId
          thirdCompanyOwner
          thirdCompanyName
          thirdCompanyVat
          location { place_id region province city address coordinate }
          contacts { contactId name email phone job }
          windows { start end days type }
          maxLength
          tools
          note
        }
        customPec
        customUniqueCode
        customEmails { name value }
        customPhones { name value }
        customTrades
        log { authorId author description timestamp }
        note
        createdAt
        updatedAt
      }
    }
  }
`;
