/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCustomer = /* GraphQL */ `
  subscription OnCreateCustomer($owner: String!) {
    onCreateCustomer(owner: $owner) {
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
      customCheckpoints {
        warehouseId
        extId
        thirdCompanyId
        thirdCompanyOwner
        thirdCompanyName
        thirdCompanyVat
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
        cargoBay
        trades
        containerUnloading
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
      invited
      log {
        authorId
        author
        description
        timestamp
      }
      note
      createdAt
      updatedAt
      company {
        id
        city
        address
        location {
          place_id
          region
          province
          city
          address
          coordinate
        }
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
        profiles {
          nextToken
        }
        customers {
          nextToken
        }
        contacts {
          nextToken
        }
        warehouses {
          nextToken
        }
        vehicles {
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
        companyCode
        vatNumber
        name
        fiscalCode
        owner
      }
      owner
    }
  }
`;
export const onUpdateCustomer = /* GraphQL */ `
  subscription OnUpdateCustomer($owner: String!) {
    onUpdateCustomer(owner: $owner) {
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
      customCheckpoints {
        warehouseId
        extId
        thirdCompanyId
        thirdCompanyOwner
        thirdCompanyName
        thirdCompanyVat
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
        cargoBay
        trades
        containerUnloading
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
      invited
      log {
        authorId
        author
        description
        timestamp
      }
      note
      createdAt
      updatedAt
      company {
        id
        city
        address
        location {
          place_id
          region
          province
          city
          address
          coordinate
        }
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
        profiles {
          nextToken
        }
        customers {
          nextToken
        }
        contacts {
          nextToken
        }
        warehouses {
          nextToken
        }
        vehicles {
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
        companyCode
        vatNumber
        name
        fiscalCode
        owner
      }
      owner
    }
  }
`;
export const onDeleteCustomer = /* GraphQL */ `
  subscription OnDeleteCustomer($owner: String!) {
    onDeleteCustomer(owner: $owner) {
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
      customCheckpoints {
        warehouseId
        extId
        thirdCompanyId
        thirdCompanyOwner
        thirdCompanyName
        thirdCompanyVat
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
        cargoBay
        trades
        containerUnloading
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
      invited
      log {
        authorId
        author
        description
        timestamp
      }
      note
      createdAt
      updatedAt
      company {
        id
        city
        address
        location {
          place_id
          region
          province
          city
          address
          coordinate
        }
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
        profiles {
          nextToken
        }
        customers {
          nextToken
        }
        contacts {
          nextToken
        }
        warehouses {
          nextToken
        }
        vehicles {
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
        companyCode
        vatNumber
        name
        fiscalCode
        owner
      }
      owner
    }
  }
`;
