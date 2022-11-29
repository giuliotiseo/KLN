export const CREATE_CUSTOMER = /* GraphQL */ `
  mutation CreateCustomer(
    $input: CreateCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    createCustomer(input: $input, condition: $condition) {
      id
      name
      relationships
      isSender
      isCarrier
      isReceiver
      ownerCompanyId
      companyId
      tenant
      company { id address vatNumber pec uniqueCode }
      customCheckpoints {
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
      customPhones { name value }
      customEmails { name value }
      customPec
      customUniqueCode
      log { authorId author description timestamp }
      note
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_CUSTOMER_COMPANY = /* GraphQL */ `
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
      uniqueCode
      pec
      emails { name value }
      phones { name value }
      trades
      owner
      profiles {
        items {
          id
          username
          fiscalCode
          email
          searchable
          name
          surname
          phone
          deviceId
          owner
          tenant
          roleIds
          psw
          refreshTokens
          note
          createdAt
          updatedAt
        }
        nextToken
      }
      customers {
        items {
          id
          name
          vatNumber
          searchable
          companyCode
          tenant
          companyId
          ownerCompanyId
          owner
          isSender
          isCarrier
          isReceiver
          relationships
          customPec
          customUniqueCode
          customTrades
          note
          createdAt
          updatedAt
        }
        nextToken
      }
      log {
        authorId
        author
        description
        timestamp
      }
      type
      authorCustomersRaw
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_CUSTOMER = /* GraphQL */ `
  mutation UpdateCustomer(
    $input: UpdateCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    updateCustomer(input: $input, condition: $condition) {
      id
      name
      vatNumber
      searchable
      companyCode
      tenant
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
        emails {
          name
          value
        }
        phones {
          name
          value
        }
        logo {
          filename
          identityId
          bucket
          region
          key
          extension
          timestamp
        }
        trades
        owner
        profiles {
          nextToken
        }
        customers {
          nextToken
        }
        log {
          authorId
          author
          description
          timestamp
        }
        type
        authorCustomersRaw
        createdAt
        updatedAt
      }
      owner
      isSender
      isCarrier
      isReceiver
      relationships
      customCheckpoints {
        warehouseId
        extId
        name
        location {
          place_id
          region
          province
          city
          address
          coordinate
        }
        contacts {
          contactId
          name
          email
          phone
          job
        }
        windows {
          start
          end
          days
          type
        }
        maxLength
        tools
        note
      }
      customPec
      customUniqueCode
      customEmails {
        name
        value
      }
      customPhones {
        name
        value
      }
      customTrades
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

export const DELETE_CUSTOMER = /* GraphQL */ `
  mutation DeleteCustomer($input: DeleteCustomerInput!) {
    deleteCustomer(input: $input) {
      id
    }
  }
`;
