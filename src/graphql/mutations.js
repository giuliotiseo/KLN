/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const updateCompany = /* GraphQL */ `
  mutation UpdateCompany(
    $input: UpdateCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    updateCompany(input: $input, condition: $condition) {
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
        items {
          id
          username
          companyId
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
          ownerCompanyId
          companyId
          tenant
          isSender
          isCarrier
          isReceiver
          relationships
          customPec
          customUniqueCode
          customTrades
          invited
          note
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      contacts {
        items {
          id
          companyId
          tenant
          name
          surname
          searchable
          fiscalCode
          phone
          email
          type
          createdAt
          updatedAt
          employee
          jobId
          jobName
          invited
          note
        }
        nextToken
      }
      warehouses {
        items {
          id
          extId
          companyId
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
          cargoBay
          trades
          containerUnloading
          tenant
          isLinked
          warehouseLinkId
          note
          createdAt
          updatedAt
        }
        nextToken
      }
      vehicles {
        items {
          id
          licensePlate
          companyId
          type
          brand
          model
          createdAt
          updatedAt
          bulkhead
          tailLift
          fuel
          spot
          axle
          maxWeight
          kilometers
          booking
          status
          indipendent
          note
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
      companyCode
      vatNumber
      name
      fiscalCode
      owner
    }
  }
`;
export const deleteCompany = /* GraphQL */ `
  mutation DeleteCompany(
    $input: DeleteCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    deleteCompany(input: $input, condition: $condition) {
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
        items {
          id
          username
          companyId
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
          ownerCompanyId
          companyId
          tenant
          isSender
          isCarrier
          isReceiver
          relationships
          customPec
          customUniqueCode
          customTrades
          invited
          note
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      contacts {
        items {
          id
          companyId
          tenant
          name
          surname
          searchable
          fiscalCode
          phone
          email
          type
          createdAt
          updatedAt
          employee
          jobId
          jobName
          invited
          note
        }
        nextToken
      }
      warehouses {
        items {
          id
          extId
          companyId
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
          cargoBay
          trades
          containerUnloading
          tenant
          isLinked
          warehouseLinkId
          note
          createdAt
          updatedAt
        }
        nextToken
      }
      vehicles {
        items {
          id
          licensePlate
          companyId
          type
          brand
          model
          createdAt
          updatedAt
          bulkhead
          tailLift
          fuel
          spot
          axle
          maxWeight
          kilometers
          booking
          status
          indipendent
          note
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
      companyCode
      vatNumber
      name
      fiscalCode
      owner
    }
  }
`;
export const createProfile = /* GraphQL */ `
  mutation CreateProfile(
    $input: CreateProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    createProfile(input: $input, condition: $condition) {
      id
      username
      companyId
      fiscalCode
      email
      searchable
      name
      surname
      phone
      avatar {
        filename
        identityId
        bucket
        region
        key
        extension
        timestamp
      }
      deviceId
      owner
      tenant
      roleIds
      psw
      refreshTokens
      note
      log {
        authorId
        author
        description
        timestamp
      }
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
    }
  }
`;
export const updateProfile = /* GraphQL */ `
  mutation UpdateProfile(
    $input: UpdateProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    updateProfile(input: $input, condition: $condition) {
      id
      username
      companyId
      fiscalCode
      email
      searchable
      name
      surname
      phone
      avatar {
        filename
        identityId
        bucket
        region
        key
        extension
        timestamp
      }
      deviceId
      owner
      tenant
      roleIds
      psw
      refreshTokens
      note
      log {
        authorId
        author
        description
        timestamp
      }
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
    }
  }
`;
export const deleteProfile = /* GraphQL */ `
  mutation DeleteProfile(
    $input: DeleteProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    deleteProfile(input: $input, condition: $condition) {
      id
      username
      companyId
      fiscalCode
      email
      searchable
      name
      surname
      phone
      avatar {
        filename
        identityId
        bucket
        region
        key
        extension
        timestamp
      }
      deviceId
      owner
      tenant
      roleIds
      psw
      refreshTokens
      note
      log {
        authorId
        author
        description
        timestamp
      }
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
    }
  }
`;
export const createCustomer = /* GraphQL */ `
  mutation CreateCustomer(
    $input: CreateCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    createCustomer(input: $input, condition: $condition) {
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
export const updateCustomer = /* GraphQL */ `
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
export const deleteCustomer = /* GraphQL */ `
  mutation DeleteCustomer(
    $input: DeleteCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    deleteCustomer(input: $input, condition: $condition) {
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
export const createContact = /* GraphQL */ `
  mutation CreateContact(
    $input: CreateContactInput!
    $condition: ModelContactConditionInput
  ) {
    createContact(input: $input, condition: $condition) {
      id
      companyId
      tenant
      name
      surname
      searchable
      fiscalCode
      phone
      email
      type
      avatar {
        filename
        identityId
        bucket
        region
        key
        extension
        timestamp
      }
      createdAt
      updatedAt
      employee
      jobId
      jobName
      invited
      log {
        authorId
        author
        description
        timestamp
      }
      windows {
        start
        end
        days
        type
      }
      note
      job {
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
    }
  }
`;
export const updateContact = /* GraphQL */ `
  mutation UpdateContact(
    $input: UpdateContactInput!
    $condition: ModelContactConditionInput
  ) {
    updateContact(input: $input, condition: $condition) {
      id
      companyId
      tenant
      name
      surname
      searchable
      fiscalCode
      phone
      email
      type
      avatar {
        filename
        identityId
        bucket
        region
        key
        extension
        timestamp
      }
      createdAt
      updatedAt
      employee
      jobId
      jobName
      invited
      log {
        authorId
        author
        description
        timestamp
      }
      windows {
        start
        end
        days
        type
      }
      note
      job {
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
    }
  }
`;
export const deleteContact = /* GraphQL */ `
  mutation DeleteContact(
    $input: DeleteContactInput!
    $condition: ModelContactConditionInput
  ) {
    deleteContact(input: $input, condition: $condition) {
      id
      companyId
      tenant
      name
      surname
      searchable
      fiscalCode
      phone
      email
      type
      avatar {
        filename
        identityId
        bucket
        region
        key
        extension
        timestamp
      }
      createdAt
      updatedAt
      employee
      jobId
      jobName
      invited
      log {
        authorId
        author
        description
        timestamp
      }
      windows {
        start
        end
        days
        type
      }
      note
      job {
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
    }
  }
`;
export const updateWarehouse = /* GraphQL */ `
  mutation UpdateWarehouse(
    $input: UpdateWarehouseInput!
    $condition: ModelWarehouseConditionInput
  ) {
    updateWarehouse(input: $input, condition: $condition) {
      id
      extId
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
      cargoBay
      trades
      containerUnloading
      tenant
      isLinked
      warehouseLinkId
      warehouseLink {
        id
        companyClientSummary {
          id
          name
          vatNumber
          uniqueCode
          pec
        }
        companyClientId
        companyOwnerId
        companyOwnerSummary {
          id
          name
          vatNumber
          uniqueCode
          pec
        }
        warehouseId
        warehouse {
          id
          extId
          companyId
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
          cargoBay
          trades
          containerUnloading
          tenant
          isLinked
          warehouseLinkId
          note
          createdAt
          updatedAt
        }
        tenantClient
        tenantOwner
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
          owner
        }
        companyOwner {
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
          owner
        }
      }
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
export const deleteWarehouse = /* GraphQL */ `
  mutation DeleteWarehouse(
    $input: DeleteWarehouseInput!
    $condition: ModelWarehouseConditionInput
  ) {
    deleteWarehouse(input: $input, condition: $condition) {
      id
      extId
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
      cargoBay
      trades
      containerUnloading
      tenant
      isLinked
      warehouseLinkId
      warehouseLink {
        id
        companyClientSummary {
          id
          name
          vatNumber
          uniqueCode
          pec
        }
        companyClientId
        companyOwnerId
        companyOwnerSummary {
          id
          name
          vatNumber
          uniqueCode
          pec
        }
        warehouseId
        warehouse {
          id
          extId
          companyId
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
          cargoBay
          trades
          containerUnloading
          tenant
          isLinked
          warehouseLinkId
          note
          createdAt
          updatedAt
        }
        tenantClient
        tenantOwner
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
          owner
        }
        companyOwner {
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
          owner
        }
      }
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
export const createWarehouseLink = /* GraphQL */ `
  mutation CreateWarehouseLink(
    $input: CreateWarehouseLinkInput!
    $condition: ModelWarehouseLinkConditionInput
  ) {
    createWarehouseLink(input: $input, condition: $condition) {
      id
      companyClientSummary {
        id
        name
        vatNumber
        uniqueCode
        pec
      }
      companyClientId
      companyOwnerId
      companyOwnerSummary {
        id
        name
        vatNumber
        uniqueCode
        pec
      }
      warehouseId
      warehouse {
        id
        extId
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
        cargoBay
        trades
        containerUnloading
        tenant
        isLinked
        warehouseLinkId
        warehouseLink {
          id
          companyClientId
          companyOwnerId
          warehouseId
          tenantClient
          tenantOwner
          createdAt
          updatedAt
        }
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
      tenantClient
      tenantOwner
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
      companyOwner {
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
    }
  }
`;
export const updateWarehouseLink = /* GraphQL */ `
  mutation UpdateWarehouseLink(
    $input: UpdateWarehouseLinkInput!
    $condition: ModelWarehouseLinkConditionInput
  ) {
    updateWarehouseLink(input: $input, condition: $condition) {
      id
      companyClientSummary {
        id
        name
        vatNumber
        uniqueCode
        pec
      }
      companyClientId
      companyOwnerId
      companyOwnerSummary {
        id
        name
        vatNumber
        uniqueCode
        pec
      }
      warehouseId
      warehouse {
        id
        extId
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
        cargoBay
        trades
        containerUnloading
        tenant
        isLinked
        warehouseLinkId
        warehouseLink {
          id
          companyClientId
          companyOwnerId
          warehouseId
          tenantClient
          tenantOwner
          createdAt
          updatedAt
        }
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
      tenantClient
      tenantOwner
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
      companyOwner {
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
    }
  }
`;
export const deleteWarehouseLink = /* GraphQL */ `
  mutation DeleteWarehouseLink(
    $input: DeleteWarehouseLinkInput!
    $condition: ModelWarehouseLinkConditionInput
  ) {
    deleteWarehouseLink(input: $input, condition: $condition) {
      id
      companyClientSummary {
        id
        name
        vatNumber
        uniqueCode
        pec
      }
      companyClientId
      companyOwnerId
      companyOwnerSummary {
        id
        name
        vatNumber
        uniqueCode
        pec
      }
      warehouseId
      warehouse {
        id
        extId
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
        cargoBay
        trades
        containerUnloading
        tenant
        isLinked
        warehouseLinkId
        warehouseLink {
          id
          companyClientId
          companyOwnerId
          warehouseId
          tenantClient
          tenantOwner
          createdAt
          updatedAt
        }
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
      tenantClient
      tenantOwner
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
      companyOwner {
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
    }
  }
`;
export const createVehicle = /* GraphQL */ `
  mutation CreateVehicle(
    $input: CreateVehicleInput!
    $condition: ModelVehicleConditionInput
  ) {
    createVehicle(input: $input, condition: $condition) {
      id
      licensePlate
      companyId
      type
      brand
      model
      dimensions {
        x
        y
        z
      }
      createdAt
      updatedAt
      bulkhead
      tailLift
      fuel
      spot
      axle
      maxWeight
      kilometers
      booking
      status
      lastPosition {
        place_id
        region
        province
        city
        address
        coordinate
      }
      indipendent
      log {
        authorId
        author
        description
        timestamp
      }
      note
    }
  }
`;
export const updateVehicle = /* GraphQL */ `
  mutation UpdateVehicle(
    $input: UpdateVehicleInput!
    $condition: ModelVehicleConditionInput
  ) {
    updateVehicle(input: $input, condition: $condition) {
      id
      licensePlate
      companyId
      type
      brand
      model
      dimensions {
        x
        y
        z
      }
      createdAt
      updatedAt
      bulkhead
      tailLift
      fuel
      spot
      axle
      maxWeight
      kilometers
      booking
      status
      lastPosition {
        place_id
        region
        province
        city
        address
        coordinate
      }
      indipendent
      log {
        authorId
        author
        description
        timestamp
      }
      note
    }
  }
`;
export const deleteVehicle = /* GraphQL */ `
  mutation DeleteVehicle(
    $input: DeleteVehicleInput!
    $condition: ModelVehicleConditionInput
  ) {
    deleteVehicle(input: $input, condition: $condition) {
      id
      licensePlate
      companyId
      type
      brand
      model
      dimensions {
        x
        y
        z
      }
      createdAt
      updatedAt
      bulkhead
      tailLift
      fuel
      spot
      axle
      maxWeight
      kilometers
      booking
      status
      lastPosition {
        place_id
        region
        province
        city
        address
        coordinate
      }
      indipendent
      log {
        authorId
        author
        description
        timestamp
      }
      note
    }
  }
`;
export const createPreOrder = /* GraphQL */ `
  mutation CreatePreOrder(
    $input: CreatePreOrderInput!
    $condition: ModelPreOrderConditionInput
  ) {
    createPreOrder(input: $input, condition: $condition) {
      id
      name
      stamp
      carrierId
      senderId
      storageId
      tenantCarrier
      tenantSender
      tenantStorage
      senderName
      carrierName
      storageName
      senderVat
      carrierVat
      storageVat
      shipmentType
      pickupDateStart
      pickupDateEnd
      status
      createdAt
      updatedAt
      completedAt
      vehicleType
      deliveryAreas
      deliveryRegions
      slot
      perishable
      checkpoint {
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
      address
      trades
      files {
        filename
        identityId
        bucket
        region
        key
        extension
        timestamp
      }
      log {
        authorId
        author
        description
        timestamp
      }
      note
      billingType
      orders {
        items {
          id
          extId
          stamp
          name
          preOrderId
          carrierId
          senderId
          receiverId
          pickupStorageId
          deliveryStorageId
          tenantCarrier
          tenantSender
          tenantReceiver
          tenantPickupStorage
          tenantDeliveryStorage
          carrierName
          senderName
          receiverName
          pickupStorageName
          deliveryStorageName
          carrierVat
          senderVat
          receiverVat
          pickupStorageVat
          deliveryStorageVat
          createdAt
          updatedAt
          completedAt
          paymentCondition
          shipmentType
          pickupDateStart
          pickupDateEnd
          depotDateStart
          depotDateEnd
          deliveryDateStart
          deliveryDateEnd
          pickupAddress
          deliveryAddress
          depotAddress
          status
          orderNumber
          trades
          support
          warnings
          quantity
          size
          temperature
          loadingMeter
          grossWeight
          netWeight
          packages
          perishable
          stackable
          collectChecks
          checksAmount
          billingType
          note
        }
        nextToken
      }
    }
  }
`;
export const updatePreOrder = /* GraphQL */ `
  mutation UpdatePreOrder(
    $input: UpdatePreOrderInput!
    $condition: ModelPreOrderConditionInput
  ) {
    updatePreOrder(input: $input, condition: $condition) {
      id
      name
      stamp
      carrierId
      senderId
      storageId
      tenantCarrier
      tenantSender
      tenantStorage
      senderName
      carrierName
      storageName
      senderVat
      carrierVat
      storageVat
      shipmentType
      pickupDateStart
      pickupDateEnd
      status
      createdAt
      updatedAt
      completedAt
      vehicleType
      deliveryAreas
      deliveryRegions
      slot
      perishable
      checkpoint {
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
      address
      trades
      files {
        filename
        identityId
        bucket
        region
        key
        extension
        timestamp
      }
      log {
        authorId
        author
        description
        timestamp
      }
      note
      billingType
      orders {
        items {
          id
          extId
          stamp
          name
          preOrderId
          carrierId
          senderId
          receiverId
          pickupStorageId
          deliveryStorageId
          tenantCarrier
          tenantSender
          tenantReceiver
          tenantPickupStorage
          tenantDeliveryStorage
          carrierName
          senderName
          receiverName
          pickupStorageName
          deliveryStorageName
          carrierVat
          senderVat
          receiverVat
          pickupStorageVat
          deliveryStorageVat
          createdAt
          updatedAt
          completedAt
          paymentCondition
          shipmentType
          pickupDateStart
          pickupDateEnd
          depotDateStart
          depotDateEnd
          deliveryDateStart
          deliveryDateEnd
          pickupAddress
          deliveryAddress
          depotAddress
          status
          orderNumber
          trades
          support
          warnings
          quantity
          size
          temperature
          loadingMeter
          grossWeight
          netWeight
          packages
          perishable
          stackable
          collectChecks
          checksAmount
          billingType
          note
        }
        nextToken
      }
    }
  }
`;
export const deletePreOrder = /* GraphQL */ `
  mutation DeletePreOrder(
    $input: DeletePreOrderInput!
    $condition: ModelPreOrderConditionInput
  ) {
    deletePreOrder(input: $input, condition: $condition) {
      id
      name
      stamp
      carrierId
      senderId
      storageId
      tenantCarrier
      tenantSender
      tenantStorage
      senderName
      carrierName
      storageName
      senderVat
      carrierVat
      storageVat
      shipmentType
      pickupDateStart
      pickupDateEnd
      status
      createdAt
      updatedAt
      completedAt
      vehicleType
      deliveryAreas
      deliveryRegions
      slot
      perishable
      checkpoint {
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
      address
      trades
      files {
        filename
        identityId
        bucket
        region
        key
        extension
        timestamp
      }
      log {
        authorId
        author
        description
        timestamp
      }
      note
      billingType
      orders {
        items {
          id
          extId
          stamp
          name
          preOrderId
          carrierId
          senderId
          receiverId
          pickupStorageId
          deliveryStorageId
          tenantCarrier
          tenantSender
          tenantReceiver
          tenantPickupStorage
          tenantDeliveryStorage
          carrierName
          senderName
          receiverName
          pickupStorageName
          deliveryStorageName
          carrierVat
          senderVat
          receiverVat
          pickupStorageVat
          deliveryStorageVat
          createdAt
          updatedAt
          completedAt
          paymentCondition
          shipmentType
          pickupDateStart
          pickupDateEnd
          depotDateStart
          depotDateEnd
          deliveryDateStart
          deliveryDateEnd
          pickupAddress
          deliveryAddress
          depotAddress
          status
          orderNumber
          trades
          support
          warnings
          quantity
          size
          temperature
          loadingMeter
          grossWeight
          netWeight
          packages
          perishable
          stackable
          collectChecks
          checksAmount
          billingType
          note
        }
        nextToken
      }
    }
  }
`;
export const createPalletHandling = /* GraphQL */ `
  mutation CreatePalletHandling(
    $input: CreatePalletHandlingInput!
    $condition: ModelPalletHandlingConditionInput
  ) {
    createPalletHandling(input: $input, condition: $condition) {
      id
      stamp
      carrierId
      tenantCarrier
      carrierName
      customerId
      tenantCustomer
      customerName
      reversalId
      tenantReversal
      reversalName
      createdAt
      operationDate
      updatedAt
      loadQuantity
      loadNote
      disposableLoad
      disposableLoadNote
      unloadQuantity
      unloadNote
      disposableUnload
      disposableUnloadNote
      reversalQuantity
      reversalNote
      palletHandlingRefId
      travelId
      travelStamp
      waypoint {
        id
        orders {
          orderId
          plannedId
          orderStamp
          orderStatus
          operation
          operationValue
        }
        companyName
        companyId
        tenantCompany
        checkpoint {
          warehouseId
          extId
          thirdCompanyId
          thirdCompanyOwner
          thirdCompanyName
          thirdCompanyVat
          name
          maxLength
          tools
          cargoBay
          trades
          containerUnloading
          note
        }
        estimatedLength
        estimatedTime
        completed
      }
      carrierOperatorName
      carrierOperator {
        username
        companyId
        name
        fiscalCode
        email
        phone
        job
        task
        tenant
      }
      vehicleLicensePlate
      vehicleOperator {
        licensePlate
        name
      }
      type
      status
      carrierValidation
      carrierValidatorName
      carrierValidator {
        username
        companyId
        name
        fiscalCode
        email
        phone
        job
        task
        tenant
      }
      carrierValidationMessage
      customerValidation
      customerValidatorName
      customerValidator {
        username
        companyId
        name
        fiscalCode
        email
        phone
        job
        task
        tenant
      }
      customerValidationMessage
      isVoucher
      voucherImage {
        filename
        identityId
        bucket
        region
        key
        extension
        timestamp
      }
      files {
        filename
        identityId
        bucket
        region
        key
        extension
        timestamp
      }
      log {
        authorId
        author
        description
        timestamp
      }
      travel {
        id
        stamp
        carrierId
        tenant
        status
        createdAt
        departureDate
        updatedAt
        licensePlate
        vehicleName
        driverFiscalCode
        driverName
        driver {
          username
          companyId
          name
          fiscalCode
          email
          phone
          job
          task
          tenant
        }
        estimatedTravelTime
        estimatedTravelLength
        estimatedTransportCosts
        palletHandlings {
          nextToken
        }
        start {
          id
          companyName
          companyId
          tenantCompany
          estimatedLength
          estimatedTime
          completed
        }
        waypoints {
          id
          companyName
          companyId
          tenantCompany
          estimatedLength
          estimatedTime
          completed
        }
        end {
          id
          companyName
          companyId
          tenantCompany
          estimatedLength
          estimatedTime
          completed
        }
        plannedOrderIds
        travelType
        lastPosition {
          place_id
          region
          province
          city
          address
          coordinate
        }
        note
        log {
          authorId
          author
          description
          timestamp
        }
        orders {
          nextToken
        }
      }
    }
  }
`;
export const updatePalletHandling = /* GraphQL */ `
  mutation UpdatePalletHandling(
    $input: UpdatePalletHandlingInput!
    $condition: ModelPalletHandlingConditionInput
  ) {
    updatePalletHandling(input: $input, condition: $condition) {
      id
      stamp
      carrierId
      tenantCarrier
      carrierName
      customerId
      tenantCustomer
      customerName
      reversalId
      tenantReversal
      reversalName
      createdAt
      operationDate
      updatedAt
      loadQuantity
      loadNote
      disposableLoad
      disposableLoadNote
      unloadQuantity
      unloadNote
      disposableUnload
      disposableUnloadNote
      reversalQuantity
      reversalNote
      palletHandlingRefId
      travelId
      travelStamp
      waypoint {
        id
        orders {
          orderId
          plannedId
          orderStamp
          orderStatus
          operation
          operationValue
        }
        companyName
        companyId
        tenantCompany
        checkpoint {
          warehouseId
          extId
          thirdCompanyId
          thirdCompanyOwner
          thirdCompanyName
          thirdCompanyVat
          name
          maxLength
          tools
          cargoBay
          trades
          containerUnloading
          note
        }
        estimatedLength
        estimatedTime
        completed
      }
      carrierOperatorName
      carrierOperator {
        username
        companyId
        name
        fiscalCode
        email
        phone
        job
        task
        tenant
      }
      vehicleLicensePlate
      vehicleOperator {
        licensePlate
        name
      }
      type
      status
      carrierValidation
      carrierValidatorName
      carrierValidator {
        username
        companyId
        name
        fiscalCode
        email
        phone
        job
        task
        tenant
      }
      carrierValidationMessage
      customerValidation
      customerValidatorName
      customerValidator {
        username
        companyId
        name
        fiscalCode
        email
        phone
        job
        task
        tenant
      }
      customerValidationMessage
      isVoucher
      voucherImage {
        filename
        identityId
        bucket
        region
        key
        extension
        timestamp
      }
      files {
        filename
        identityId
        bucket
        region
        key
        extension
        timestamp
      }
      log {
        authorId
        author
        description
        timestamp
      }
      travel {
        id
        stamp
        carrierId
        tenant
        status
        createdAt
        departureDate
        updatedAt
        licensePlate
        vehicleName
        driverFiscalCode
        driverName
        driver {
          username
          companyId
          name
          fiscalCode
          email
          phone
          job
          task
          tenant
        }
        estimatedTravelTime
        estimatedTravelLength
        estimatedTransportCosts
        palletHandlings {
          nextToken
        }
        start {
          id
          companyName
          companyId
          tenantCompany
          estimatedLength
          estimatedTime
          completed
        }
        waypoints {
          id
          companyName
          companyId
          tenantCompany
          estimatedLength
          estimatedTime
          completed
        }
        end {
          id
          companyName
          companyId
          tenantCompany
          estimatedLength
          estimatedTime
          completed
        }
        plannedOrderIds
        travelType
        lastPosition {
          place_id
          region
          province
          city
          address
          coordinate
        }
        note
        log {
          authorId
          author
          description
          timestamp
        }
        orders {
          nextToken
        }
      }
    }
  }
`;
export const deletePalletHandling = /* GraphQL */ `
  mutation DeletePalletHandling(
    $input: DeletePalletHandlingInput!
    $condition: ModelPalletHandlingConditionInput
  ) {
    deletePalletHandling(input: $input, condition: $condition) {
      id
      stamp
      carrierId
      tenantCarrier
      carrierName
      customerId
      tenantCustomer
      customerName
      reversalId
      tenantReversal
      reversalName
      createdAt
      operationDate
      updatedAt
      loadQuantity
      loadNote
      disposableLoad
      disposableLoadNote
      unloadQuantity
      unloadNote
      disposableUnload
      disposableUnloadNote
      reversalQuantity
      reversalNote
      palletHandlingRefId
      travelId
      travelStamp
      waypoint {
        id
        orders {
          orderId
          plannedId
          orderStamp
          orderStatus
          operation
          operationValue
        }
        companyName
        companyId
        tenantCompany
        checkpoint {
          warehouseId
          extId
          thirdCompanyId
          thirdCompanyOwner
          thirdCompanyName
          thirdCompanyVat
          name
          maxLength
          tools
          cargoBay
          trades
          containerUnloading
          note
        }
        estimatedLength
        estimatedTime
        completed
      }
      carrierOperatorName
      carrierOperator {
        username
        companyId
        name
        fiscalCode
        email
        phone
        job
        task
        tenant
      }
      vehicleLicensePlate
      vehicleOperator {
        licensePlate
        name
      }
      type
      status
      carrierValidation
      carrierValidatorName
      carrierValidator {
        username
        companyId
        name
        fiscalCode
        email
        phone
        job
        task
        tenant
      }
      carrierValidationMessage
      customerValidation
      customerValidatorName
      customerValidator {
        username
        companyId
        name
        fiscalCode
        email
        phone
        job
        task
        tenant
      }
      customerValidationMessage
      isVoucher
      voucherImage {
        filename
        identityId
        bucket
        region
        key
        extension
        timestamp
      }
      files {
        filename
        identityId
        bucket
        region
        key
        extension
        timestamp
      }
      log {
        authorId
        author
        description
        timestamp
      }
      travel {
        id
        stamp
        carrierId
        tenant
        status
        createdAt
        departureDate
        updatedAt
        licensePlate
        vehicleName
        driverFiscalCode
        driverName
        driver {
          username
          companyId
          name
          fiscalCode
          email
          phone
          job
          task
          tenant
        }
        estimatedTravelTime
        estimatedTravelLength
        estimatedTransportCosts
        palletHandlings {
          nextToken
        }
        start {
          id
          companyName
          companyId
          tenantCompany
          estimatedLength
          estimatedTime
          completed
        }
        waypoints {
          id
          companyName
          companyId
          tenantCompany
          estimatedLength
          estimatedTime
          completed
        }
        end {
          id
          companyName
          companyId
          tenantCompany
          estimatedLength
          estimatedTime
          completed
        }
        plannedOrderIds
        travelType
        lastPosition {
          place_id
          region
          province
          city
          address
          coordinate
        }
        note
        log {
          authorId
          author
          description
          timestamp
        }
        orders {
          nextToken
        }
      }
    }
  }
`;
export const createCompany = /* GraphQL */ `
  mutation CreateCompany(
    $input: CreateCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    createCompany(input: $input, condition: $condition) {
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
        items {
          id
          username
          companyId
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
          ownerCompanyId
          companyId
          tenant
          isSender
          isCarrier
          isReceiver
          relationships
          customPec
          customUniqueCode
          customTrades
          invited
          note
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      contacts {
        items {
          id
          companyId
          tenant
          name
          surname
          searchable
          fiscalCode
          phone
          email
          type
          createdAt
          updatedAt
          employee
          jobId
          jobName
          invited
          note
        }
        nextToken
      }
      warehouses {
        items {
          id
          extId
          companyId
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
          cargoBay
          trades
          containerUnloading
          tenant
          isLinked
          warehouseLinkId
          note
          createdAt
          updatedAt
        }
        nextToken
      }
      vehicles {
        items {
          id
          licensePlate
          companyId
          type
          brand
          model
          createdAt
          updatedAt
          bulkhead
          tailLift
          fuel
          spot
          axle
          maxWeight
          kilometers
          booking
          status
          indipendent
          note
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
      companyCode
      vatNumber
      name
      fiscalCode
      owner
    }
  }
`;
export const createWarehouse = /* GraphQL */ `
  mutation CreateWarehouse(
    $input: CreateWarehouseInput!
    $condition: ModelWarehouseConditionInput
  ) {
    createWarehouse(input: $input, condition: $condition) {
      id
      extId
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
      cargoBay
      trades
      containerUnloading
      tenant
      isLinked
      warehouseLinkId
      warehouseLink {
        id
        companyClientSummary {
          id
          name
          vatNumber
          uniqueCode
          pec
        }
        companyClientId
        companyOwnerId
        companyOwnerSummary {
          id
          name
          vatNumber
          uniqueCode
          pec
        }
        warehouseId
        warehouse {
          id
          extId
          companyId
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
          cargoBay
          trades
          containerUnloading
          tenant
          isLinked
          warehouseLinkId
          note
          createdAt
          updatedAt
        }
        tenantClient
        tenantOwner
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
          owner
        }
        companyOwner {
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
          owner
        }
      }
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
export const createOrder = /* GraphQL */ `
  mutation CreateOrder(
    $input: CreateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    createOrder(input: $input, condition: $condition) {
      id
      extId
      stamp
      name
      preOrderId
      carrierId
      senderId
      receiverId
      pickupStorageId
      deliveryStorageId
      tenantCarrier
      tenantSender
      tenantReceiver
      tenantPickupStorage
      tenantDeliveryStorage
      carrierName
      senderName
      receiverName
      pickupStorageName
      deliveryStorageName
      carrierVat
      senderVat
      receiverVat
      pickupStorageVat
      deliveryStorageVat
      createdAt
      updatedAt
      completedAt
      paymentCondition
      shipmentType
      pickupCheckpoint {
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
      pickupDateStart
      pickupDateEnd
      pickupSlots {
        from
        to
      }
      depotCheckpoint {
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
      depotDateStart
      depotDateEnd
      depotSlots {
        from
        to
      }
      deliveryCheckpoint {
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
      deliveryDateStart
      deliveryDateEnd
      deliverySlots {
        from
        to
      }
      pickupAddress
      deliveryAddress
      depotAddress
      availability {
        from
        to
      }
      status
      orderNumber
      trades
      docs {
        date
        number
        files {
          filename
          identityId
          bucket
          region
          key
          extension
          timestamp
        }
        type
      }
      support
      warnings
      quantity
      size
      temperature
      loadingMeter
      grossWeight
      netWeight
      packages
      perishable
      stackable
      palletInfo {
        value
        size
        type
        system
      }
      customer {
        id
        name
        vatNumber
        uniqueCode
        pec
      }
      lastPosition {
        place_id
        region
        province
        city
        address
        coordinate
      }
      collectChecks
      checksAmount
      log {
        authorId
        author
        description
        timestamp
      }
      billingType
      note
      sender {
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
      carrier {
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
      receiver {
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
      pickupStorage {
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
      deliveryStorage {
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
      checks {
        items {
          id
          orderCreationDate
          stamp
          orderId
          orderStamp
          entryTravelId
          exitTravelId
          keyDocNum
          receiverId
          tenantReceiver
          receiverName
          senderId
          senderName
          tenantSender
          carrierId
          tenantCarrier
          carrierName
          beneficiary
          createdAt
          updatedAt
          issuingDate
          pickupDate
          checkInDate
          checkOutDate
          deliveryDate
          expiration
          checkNum
          amount
          iban
          status
          note
        }
        nextToken
      }
      travels {
        items {
          id
          departureDate
          arrivalDate
          carrierId
          tenantCarrier
          customerId
          tenantCustomer
          orderId
          travelId
          operation
          operationValue
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const updateOrder = /* GraphQL */ `
  mutation UpdateOrder(
    $input: UpdateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    updateOrder(input: $input, condition: $condition) {
      id
      extId
      stamp
      name
      preOrderId
      carrierId
      senderId
      receiverId
      pickupStorageId
      deliveryStorageId
      tenantCarrier
      tenantSender
      tenantReceiver
      tenantPickupStorage
      tenantDeliveryStorage
      carrierName
      senderName
      receiverName
      pickupStorageName
      deliveryStorageName
      carrierVat
      senderVat
      receiverVat
      pickupStorageVat
      deliveryStorageVat
      createdAt
      updatedAt
      completedAt
      paymentCondition
      shipmentType
      pickupCheckpoint {
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
      pickupDateStart
      pickupDateEnd
      pickupSlots {
        from
        to
      }
      depotCheckpoint {
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
      depotDateStart
      depotDateEnd
      depotSlots {
        from
        to
      }
      deliveryCheckpoint {
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
      deliveryDateStart
      deliveryDateEnd
      deliverySlots {
        from
        to
      }
      pickupAddress
      deliveryAddress
      depotAddress
      availability {
        from
        to
      }
      status
      orderNumber
      trades
      docs {
        date
        number
        files {
          filename
          identityId
          bucket
          region
          key
          extension
          timestamp
        }
        type
      }
      support
      warnings
      quantity
      size
      temperature
      loadingMeter
      grossWeight
      netWeight
      packages
      perishable
      stackable
      palletInfo {
        value
        size
        type
        system
      }
      customer {
        id
        name
        vatNumber
        uniqueCode
        pec
      }
      lastPosition {
        place_id
        region
        province
        city
        address
        coordinate
      }
      collectChecks
      checksAmount
      log {
        authorId
        author
        description
        timestamp
      }
      billingType
      note
      sender {
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
      carrier {
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
      receiver {
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
      pickupStorage {
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
      deliveryStorage {
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
      checks {
        items {
          id
          orderCreationDate
          stamp
          orderId
          orderStamp
          entryTravelId
          exitTravelId
          keyDocNum
          receiverId
          tenantReceiver
          receiverName
          senderId
          senderName
          tenantSender
          carrierId
          tenantCarrier
          carrierName
          beneficiary
          createdAt
          updatedAt
          issuingDate
          pickupDate
          checkInDate
          checkOutDate
          deliveryDate
          expiration
          checkNum
          amount
          iban
          status
          note
        }
        nextToken
      }
      travels {
        items {
          id
          departureDate
          arrivalDate
          carrierId
          tenantCarrier
          customerId
          tenantCustomer
          orderId
          travelId
          operation
          operationValue
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const deleteOrder = /* GraphQL */ `
  mutation DeleteOrder(
    $input: DeleteOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    deleteOrder(input: $input, condition: $condition) {
      id
      extId
      stamp
      name
      preOrderId
      carrierId
      senderId
      receiverId
      pickupStorageId
      deliveryStorageId
      tenantCarrier
      tenantSender
      tenantReceiver
      tenantPickupStorage
      tenantDeliveryStorage
      carrierName
      senderName
      receiverName
      pickupStorageName
      deliveryStorageName
      carrierVat
      senderVat
      receiverVat
      pickupStorageVat
      deliveryStorageVat
      createdAt
      updatedAt
      completedAt
      paymentCondition
      shipmentType
      pickupCheckpoint {
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
      pickupDateStart
      pickupDateEnd
      pickupSlots {
        from
        to
      }
      depotCheckpoint {
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
      depotDateStart
      depotDateEnd
      depotSlots {
        from
        to
      }
      deliveryCheckpoint {
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
      deliveryDateStart
      deliveryDateEnd
      deliverySlots {
        from
        to
      }
      pickupAddress
      deliveryAddress
      depotAddress
      availability {
        from
        to
      }
      status
      orderNumber
      trades
      docs {
        date
        number
        files {
          filename
          identityId
          bucket
          region
          key
          extension
          timestamp
        }
        type
      }
      support
      warnings
      quantity
      size
      temperature
      loadingMeter
      grossWeight
      netWeight
      packages
      perishable
      stackable
      palletInfo {
        value
        size
        type
        system
      }
      customer {
        id
        name
        vatNumber
        uniqueCode
        pec
      }
      lastPosition {
        place_id
        region
        province
        city
        address
        coordinate
      }
      collectChecks
      checksAmount
      log {
        authorId
        author
        description
        timestamp
      }
      billingType
      note
      sender {
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
      carrier {
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
      receiver {
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
      pickupStorage {
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
      deliveryStorage {
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
      checks {
        items {
          id
          orderCreationDate
          stamp
          orderId
          orderStamp
          entryTravelId
          exitTravelId
          keyDocNum
          receiverId
          tenantReceiver
          receiverName
          senderId
          senderName
          tenantSender
          carrierId
          tenantCarrier
          carrierName
          beneficiary
          createdAt
          updatedAt
          issuingDate
          pickupDate
          checkInDate
          checkOutDate
          deliveryDate
          expiration
          checkNum
          amount
          iban
          status
          note
        }
        nextToken
      }
      travels {
        items {
          id
          departureDate
          arrivalDate
          carrierId
          tenantCarrier
          customerId
          tenantCustomer
          orderId
          travelId
          operation
          operationValue
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const createCheck = /* GraphQL */ `
  mutation CreateCheck(
    $input: CreateCheckInput!
    $condition: ModelCheckConditionInput
  ) {
    createCheck(input: $input, condition: $condition) {
      id
      orderCreationDate
      stamp
      orderId
      orderStamp
      entryTravelId
      exitTravelId
      keyDocNum
      docsRef {
        date
        number
        files {
          filename
          identityId
          bucket
          region
          key
          extension
          timestamp
        }
        type
      }
      receiverId
      tenantReceiver
      receiverName
      senderId
      senderName
      tenantSender
      carrierId
      tenantCarrier
      carrierName
      beneficiary
      createdAt
      updatedAt
      issuingDate
      pickupDate
      checkInDate
      checkOutDate
      deliveryDate
      expiration
      checkNum
      amount
      iban
      status
      image {
        filename
        identityId
        bucket
        region
        key
        extension
        timestamp
      }
      files {
        filename
        identityId
        bucket
        region
        key
        extension
        timestamp
      }
      note
      log {
        authorId
        author
        description
        timestamp
      }
      order {
        id
        extId
        stamp
        name
        preOrderId
        carrierId
        senderId
        receiverId
        pickupStorageId
        deliveryStorageId
        tenantCarrier
        tenantSender
        tenantReceiver
        tenantPickupStorage
        tenantDeliveryStorage
        carrierName
        senderName
        receiverName
        pickupStorageName
        deliveryStorageName
        carrierVat
        senderVat
        receiverVat
        pickupStorageVat
        deliveryStorageVat
        createdAt
        updatedAt
        completedAt
        paymentCondition
        shipmentType
        pickupCheckpoint {
          warehouseId
          extId
          thirdCompanyId
          thirdCompanyOwner
          thirdCompanyName
          thirdCompanyVat
          name
          maxLength
          tools
          cargoBay
          trades
          containerUnloading
          note
        }
        pickupDateStart
        pickupDateEnd
        pickupSlots {
          from
          to
        }
        depotCheckpoint {
          warehouseId
          extId
          thirdCompanyId
          thirdCompanyOwner
          thirdCompanyName
          thirdCompanyVat
          name
          maxLength
          tools
          cargoBay
          trades
          containerUnloading
          note
        }
        depotDateStart
        depotDateEnd
        depotSlots {
          from
          to
        }
        deliveryCheckpoint {
          warehouseId
          extId
          thirdCompanyId
          thirdCompanyOwner
          thirdCompanyName
          thirdCompanyVat
          name
          maxLength
          tools
          cargoBay
          trades
          containerUnloading
          note
        }
        deliveryDateStart
        deliveryDateEnd
        deliverySlots {
          from
          to
        }
        pickupAddress
        deliveryAddress
        depotAddress
        availability {
          from
          to
        }
        status
        orderNumber
        trades
        docs {
          date
          number
          type
        }
        support
        warnings
        quantity
        size
        temperature
        loadingMeter
        grossWeight
        netWeight
        packages
        perishable
        stackable
        palletInfo {
          value
          size
          type
          system
        }
        customer {
          id
          name
          vatNumber
          uniqueCode
          pec
        }
        lastPosition {
          place_id
          region
          province
          city
          address
          coordinate
        }
        collectChecks
        checksAmount
        log {
          authorId
          author
          description
          timestamp
        }
        billingType
        note
        sender {
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
          owner
        }
        carrier {
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
          owner
        }
        receiver {
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
          owner
        }
        pickupStorage {
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
          owner
        }
        deliveryStorage {
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
          owner
        }
        checks {
          nextToken
        }
        travels {
          nextToken
        }
      }
    }
  }
`;
export const updateCheck = /* GraphQL */ `
  mutation UpdateCheck(
    $input: UpdateCheckInput!
    $condition: ModelCheckConditionInput
  ) {
    updateCheck(input: $input, condition: $condition) {
      id
      orderCreationDate
      stamp
      orderId
      orderStamp
      entryTravelId
      exitTravelId
      keyDocNum
      docsRef {
        date
        number
        files {
          filename
          identityId
          bucket
          region
          key
          extension
          timestamp
        }
        type
      }
      receiverId
      tenantReceiver
      receiverName
      senderId
      senderName
      tenantSender
      carrierId
      tenantCarrier
      carrierName
      beneficiary
      createdAt
      updatedAt
      issuingDate
      pickupDate
      checkInDate
      checkOutDate
      deliveryDate
      expiration
      checkNum
      amount
      iban
      status
      image {
        filename
        identityId
        bucket
        region
        key
        extension
        timestamp
      }
      files {
        filename
        identityId
        bucket
        region
        key
        extension
        timestamp
      }
      note
      log {
        authorId
        author
        description
        timestamp
      }
      order {
        id
        extId
        stamp
        name
        preOrderId
        carrierId
        senderId
        receiverId
        pickupStorageId
        deliveryStorageId
        tenantCarrier
        tenantSender
        tenantReceiver
        tenantPickupStorage
        tenantDeliveryStorage
        carrierName
        senderName
        receiverName
        pickupStorageName
        deliveryStorageName
        carrierVat
        senderVat
        receiverVat
        pickupStorageVat
        deliveryStorageVat
        createdAt
        updatedAt
        completedAt
        paymentCondition
        shipmentType
        pickupCheckpoint {
          warehouseId
          extId
          thirdCompanyId
          thirdCompanyOwner
          thirdCompanyName
          thirdCompanyVat
          name
          maxLength
          tools
          cargoBay
          trades
          containerUnloading
          note
        }
        pickupDateStart
        pickupDateEnd
        pickupSlots {
          from
          to
        }
        depotCheckpoint {
          warehouseId
          extId
          thirdCompanyId
          thirdCompanyOwner
          thirdCompanyName
          thirdCompanyVat
          name
          maxLength
          tools
          cargoBay
          trades
          containerUnloading
          note
        }
        depotDateStart
        depotDateEnd
        depotSlots {
          from
          to
        }
        deliveryCheckpoint {
          warehouseId
          extId
          thirdCompanyId
          thirdCompanyOwner
          thirdCompanyName
          thirdCompanyVat
          name
          maxLength
          tools
          cargoBay
          trades
          containerUnloading
          note
        }
        deliveryDateStart
        deliveryDateEnd
        deliverySlots {
          from
          to
        }
        pickupAddress
        deliveryAddress
        depotAddress
        availability {
          from
          to
        }
        status
        orderNumber
        trades
        docs {
          date
          number
          type
        }
        support
        warnings
        quantity
        size
        temperature
        loadingMeter
        grossWeight
        netWeight
        packages
        perishable
        stackable
        palletInfo {
          value
          size
          type
          system
        }
        customer {
          id
          name
          vatNumber
          uniqueCode
          pec
        }
        lastPosition {
          place_id
          region
          province
          city
          address
          coordinate
        }
        collectChecks
        checksAmount
        log {
          authorId
          author
          description
          timestamp
        }
        billingType
        note
        sender {
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
          owner
        }
        carrier {
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
          owner
        }
        receiver {
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
          owner
        }
        pickupStorage {
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
          owner
        }
        deliveryStorage {
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
          owner
        }
        checks {
          nextToken
        }
        travels {
          nextToken
        }
      }
    }
  }
`;
export const deleteCheck = /* GraphQL */ `
  mutation DeleteCheck(
    $input: DeleteCheckInput!
    $condition: ModelCheckConditionInput
  ) {
    deleteCheck(input: $input, condition: $condition) {
      id
      orderCreationDate
      stamp
      orderId
      orderStamp
      entryTravelId
      exitTravelId
      keyDocNum
      docsRef {
        date
        number
        files {
          filename
          identityId
          bucket
          region
          key
          extension
          timestamp
        }
        type
      }
      receiverId
      tenantReceiver
      receiverName
      senderId
      senderName
      tenantSender
      carrierId
      tenantCarrier
      carrierName
      beneficiary
      createdAt
      updatedAt
      issuingDate
      pickupDate
      checkInDate
      checkOutDate
      deliveryDate
      expiration
      checkNum
      amount
      iban
      status
      image {
        filename
        identityId
        bucket
        region
        key
        extension
        timestamp
      }
      files {
        filename
        identityId
        bucket
        region
        key
        extension
        timestamp
      }
      note
      log {
        authorId
        author
        description
        timestamp
      }
      order {
        id
        extId
        stamp
        name
        preOrderId
        carrierId
        senderId
        receiverId
        pickupStorageId
        deliveryStorageId
        tenantCarrier
        tenantSender
        tenantReceiver
        tenantPickupStorage
        tenantDeliveryStorage
        carrierName
        senderName
        receiverName
        pickupStorageName
        deliveryStorageName
        carrierVat
        senderVat
        receiverVat
        pickupStorageVat
        deliveryStorageVat
        createdAt
        updatedAt
        completedAt
        paymentCondition
        shipmentType
        pickupCheckpoint {
          warehouseId
          extId
          thirdCompanyId
          thirdCompanyOwner
          thirdCompanyName
          thirdCompanyVat
          name
          maxLength
          tools
          cargoBay
          trades
          containerUnloading
          note
        }
        pickupDateStart
        pickupDateEnd
        pickupSlots {
          from
          to
        }
        depotCheckpoint {
          warehouseId
          extId
          thirdCompanyId
          thirdCompanyOwner
          thirdCompanyName
          thirdCompanyVat
          name
          maxLength
          tools
          cargoBay
          trades
          containerUnloading
          note
        }
        depotDateStart
        depotDateEnd
        depotSlots {
          from
          to
        }
        deliveryCheckpoint {
          warehouseId
          extId
          thirdCompanyId
          thirdCompanyOwner
          thirdCompanyName
          thirdCompanyVat
          name
          maxLength
          tools
          cargoBay
          trades
          containerUnloading
          note
        }
        deliveryDateStart
        deliveryDateEnd
        deliverySlots {
          from
          to
        }
        pickupAddress
        deliveryAddress
        depotAddress
        availability {
          from
          to
        }
        status
        orderNumber
        trades
        docs {
          date
          number
          type
        }
        support
        warnings
        quantity
        size
        temperature
        loadingMeter
        grossWeight
        netWeight
        packages
        perishable
        stackable
        palletInfo {
          value
          size
          type
          system
        }
        customer {
          id
          name
          vatNumber
          uniqueCode
          pec
        }
        lastPosition {
          place_id
          region
          province
          city
          address
          coordinate
        }
        collectChecks
        checksAmount
        log {
          authorId
          author
          description
          timestamp
        }
        billingType
        note
        sender {
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
          owner
        }
        carrier {
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
          owner
        }
        receiver {
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
          owner
        }
        pickupStorage {
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
          owner
        }
        deliveryStorage {
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
          owner
        }
        checks {
          nextToken
        }
        travels {
          nextToken
        }
      }
    }
  }
`;
export const createTravel = /* GraphQL */ `
  mutation CreateTravel(
    $input: CreateTravelInput!
    $condition: ModelTravelConditionInput
  ) {
    createTravel(input: $input, condition: $condition) {
      id
      stamp
      carrierId
      tenant
      status
      createdAt
      departureDate
      updatedAt
      licensePlate
      vehicleName
      driverFiscalCode
      driverName
      driver {
        username
        companyId
        name
        fiscalCode
        email
        phone
        job
        task
        tenant
      }
      estimatedTravelTime
      estimatedTravelLength
      estimatedTransportCosts
      palletHandlings {
        items {
          id
          stamp
          carrierId
          tenantCarrier
          carrierName
          customerId
          tenantCustomer
          customerName
          reversalId
          tenantReversal
          reversalName
          createdAt
          operationDate
          updatedAt
          loadQuantity
          loadNote
          disposableLoad
          disposableLoadNote
          unloadQuantity
          unloadNote
          disposableUnload
          disposableUnloadNote
          reversalQuantity
          reversalNote
          palletHandlingRefId
          travelId
          travelStamp
          carrierOperatorName
          vehicleLicensePlate
          type
          status
          carrierValidation
          carrierValidatorName
          carrierValidationMessage
          customerValidation
          customerValidatorName
          customerValidationMessage
          isVoucher
        }
        nextToken
      }
      start {
        id
        orders {
          orderId
          plannedId
          orderStamp
          orderStatus
          operation
          operationValue
        }
        companyName
        companyId
        tenantCompany
        checkpoint {
          warehouseId
          extId
          thirdCompanyId
          thirdCompanyOwner
          thirdCompanyName
          thirdCompanyVat
          name
          maxLength
          tools
          cargoBay
          trades
          containerUnloading
          note
        }
        estimatedLength
        estimatedTime
        completed
      }
      waypoints {
        id
        orders {
          orderId
          plannedId
          orderStamp
          orderStatus
          operation
          operationValue
        }
        companyName
        companyId
        tenantCompany
        checkpoint {
          warehouseId
          extId
          thirdCompanyId
          thirdCompanyOwner
          thirdCompanyName
          thirdCompanyVat
          name
          maxLength
          tools
          cargoBay
          trades
          containerUnloading
          note
        }
        estimatedLength
        estimatedTime
        completed
      }
      end {
        id
        orders {
          orderId
          plannedId
          orderStamp
          orderStatus
          operation
          operationValue
        }
        companyName
        companyId
        tenantCompany
        checkpoint {
          warehouseId
          extId
          thirdCompanyId
          thirdCompanyOwner
          thirdCompanyName
          thirdCompanyVat
          name
          maxLength
          tools
          cargoBay
          trades
          containerUnloading
          note
        }
        estimatedLength
        estimatedTime
        completed
      }
      plannedOrderIds
      travelType
      lastPosition {
        place_id
        region
        province
        city
        address
        coordinate
      }
      note
      log {
        authorId
        author
        description
        timestamp
      }
      orders {
        items {
          id
          departureDate
          arrivalDate
          carrierId
          tenantCarrier
          customerId
          tenantCustomer
          orderId
          travelId
          operation
          operationValue
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const updateTravel = /* GraphQL */ `
  mutation UpdateTravel(
    $input: UpdateTravelInput!
    $condition: ModelTravelConditionInput
  ) {
    updateTravel(input: $input, condition: $condition) {
      id
      stamp
      carrierId
      tenant
      status
      createdAt
      departureDate
      updatedAt
      licensePlate
      vehicleName
      driverFiscalCode
      driverName
      driver {
        username
        companyId
        name
        fiscalCode
        email
        phone
        job
        task
        tenant
      }
      estimatedTravelTime
      estimatedTravelLength
      estimatedTransportCosts
      palletHandlings {
        items {
          id
          stamp
          carrierId
          tenantCarrier
          carrierName
          customerId
          tenantCustomer
          customerName
          reversalId
          tenantReversal
          reversalName
          createdAt
          operationDate
          updatedAt
          loadQuantity
          loadNote
          disposableLoad
          disposableLoadNote
          unloadQuantity
          unloadNote
          disposableUnload
          disposableUnloadNote
          reversalQuantity
          reversalNote
          palletHandlingRefId
          travelId
          travelStamp
          carrierOperatorName
          vehicleLicensePlate
          type
          status
          carrierValidation
          carrierValidatorName
          carrierValidationMessage
          customerValidation
          customerValidatorName
          customerValidationMessage
          isVoucher
        }
        nextToken
      }
      start {
        id
        orders {
          orderId
          plannedId
          orderStamp
          orderStatus
          operation
          operationValue
        }
        companyName
        companyId
        tenantCompany
        checkpoint {
          warehouseId
          extId
          thirdCompanyId
          thirdCompanyOwner
          thirdCompanyName
          thirdCompanyVat
          name
          maxLength
          tools
          cargoBay
          trades
          containerUnloading
          note
        }
        estimatedLength
        estimatedTime
        completed
      }
      waypoints {
        id
        orders {
          orderId
          plannedId
          orderStamp
          orderStatus
          operation
          operationValue
        }
        companyName
        companyId
        tenantCompany
        checkpoint {
          warehouseId
          extId
          thirdCompanyId
          thirdCompanyOwner
          thirdCompanyName
          thirdCompanyVat
          name
          maxLength
          tools
          cargoBay
          trades
          containerUnloading
          note
        }
        estimatedLength
        estimatedTime
        completed
      }
      end {
        id
        orders {
          orderId
          plannedId
          orderStamp
          orderStatus
          operation
          operationValue
        }
        companyName
        companyId
        tenantCompany
        checkpoint {
          warehouseId
          extId
          thirdCompanyId
          thirdCompanyOwner
          thirdCompanyName
          thirdCompanyVat
          name
          maxLength
          tools
          cargoBay
          trades
          containerUnloading
          note
        }
        estimatedLength
        estimatedTime
        completed
      }
      plannedOrderIds
      travelType
      lastPosition {
        place_id
        region
        province
        city
        address
        coordinate
      }
      note
      log {
        authorId
        author
        description
        timestamp
      }
      orders {
        items {
          id
          departureDate
          arrivalDate
          carrierId
          tenantCarrier
          customerId
          tenantCustomer
          orderId
          travelId
          operation
          operationValue
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const deleteTravel = /* GraphQL */ `
  mutation DeleteTravel(
    $input: DeleteTravelInput!
    $condition: ModelTravelConditionInput
  ) {
    deleteTravel(input: $input, condition: $condition) {
      id
      stamp
      carrierId
      tenant
      status
      createdAt
      departureDate
      updatedAt
      licensePlate
      vehicleName
      driverFiscalCode
      driverName
      driver {
        username
        companyId
        name
        fiscalCode
        email
        phone
        job
        task
        tenant
      }
      estimatedTravelTime
      estimatedTravelLength
      estimatedTransportCosts
      palletHandlings {
        items {
          id
          stamp
          carrierId
          tenantCarrier
          carrierName
          customerId
          tenantCustomer
          customerName
          reversalId
          tenantReversal
          reversalName
          createdAt
          operationDate
          updatedAt
          loadQuantity
          loadNote
          disposableLoad
          disposableLoadNote
          unloadQuantity
          unloadNote
          disposableUnload
          disposableUnloadNote
          reversalQuantity
          reversalNote
          palletHandlingRefId
          travelId
          travelStamp
          carrierOperatorName
          vehicleLicensePlate
          type
          status
          carrierValidation
          carrierValidatorName
          carrierValidationMessage
          customerValidation
          customerValidatorName
          customerValidationMessage
          isVoucher
        }
        nextToken
      }
      start {
        id
        orders {
          orderId
          plannedId
          orderStamp
          orderStatus
          operation
          operationValue
        }
        companyName
        companyId
        tenantCompany
        checkpoint {
          warehouseId
          extId
          thirdCompanyId
          thirdCompanyOwner
          thirdCompanyName
          thirdCompanyVat
          name
          maxLength
          tools
          cargoBay
          trades
          containerUnloading
          note
        }
        estimatedLength
        estimatedTime
        completed
      }
      waypoints {
        id
        orders {
          orderId
          plannedId
          orderStamp
          orderStatus
          operation
          operationValue
        }
        companyName
        companyId
        tenantCompany
        checkpoint {
          warehouseId
          extId
          thirdCompanyId
          thirdCompanyOwner
          thirdCompanyName
          thirdCompanyVat
          name
          maxLength
          tools
          cargoBay
          trades
          containerUnloading
          note
        }
        estimatedLength
        estimatedTime
        completed
      }
      end {
        id
        orders {
          orderId
          plannedId
          orderStamp
          orderStatus
          operation
          operationValue
        }
        companyName
        companyId
        tenantCompany
        checkpoint {
          warehouseId
          extId
          thirdCompanyId
          thirdCompanyOwner
          thirdCompanyName
          thirdCompanyVat
          name
          maxLength
          tools
          cargoBay
          trades
          containerUnloading
          note
        }
        estimatedLength
        estimatedTime
        completed
      }
      plannedOrderIds
      travelType
      lastPosition {
        place_id
        region
        province
        city
        address
        coordinate
      }
      note
      log {
        authorId
        author
        description
        timestamp
      }
      orders {
        items {
          id
          departureDate
          arrivalDate
          carrierId
          tenantCarrier
          customerId
          tenantCustomer
          orderId
          travelId
          operation
          operationValue
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const createTravelsOrders = /* GraphQL */ `
  mutation CreateTravelsOrders(
    $input: CreateTravelsOrdersInput!
    $condition: ModelTravelsOrdersConditionInput
  ) {
    createTravelsOrders(input: $input, condition: $condition) {
      id
      departureDate
      arrivalDate
      carrierId
      tenantCarrier
      customerId
      tenantCustomer
      orderId
      travelId
      waypoint {
        id
        orders {
          orderId
          plannedId
          orderStamp
          orderStatus
          operation
          operationValue
        }
        companyName
        companyId
        tenantCompany
        checkpoint {
          warehouseId
          extId
          thirdCompanyId
          thirdCompanyOwner
          thirdCompanyName
          thirdCompanyVat
          name
          maxLength
          tools
          cargoBay
          trades
          containerUnloading
          note
        }
        estimatedLength
        estimatedTime
        completed
      }
      operation
      operationValue
      createdAt
      updatedAt
      order {
        id
        extId
        stamp
        name
        preOrderId
        carrierId
        senderId
        receiverId
        pickupStorageId
        deliveryStorageId
        tenantCarrier
        tenantSender
        tenantReceiver
        tenantPickupStorage
        tenantDeliveryStorage
        carrierName
        senderName
        receiverName
        pickupStorageName
        deliveryStorageName
        carrierVat
        senderVat
        receiverVat
        pickupStorageVat
        deliveryStorageVat
        createdAt
        updatedAt
        completedAt
        paymentCondition
        shipmentType
        pickupCheckpoint {
          warehouseId
          extId
          thirdCompanyId
          thirdCompanyOwner
          thirdCompanyName
          thirdCompanyVat
          name
          maxLength
          tools
          cargoBay
          trades
          containerUnloading
          note
        }
        pickupDateStart
        pickupDateEnd
        pickupSlots {
          from
          to
        }
        depotCheckpoint {
          warehouseId
          extId
          thirdCompanyId
          thirdCompanyOwner
          thirdCompanyName
          thirdCompanyVat
          name
          maxLength
          tools
          cargoBay
          trades
          containerUnloading
          note
        }
        depotDateStart
        depotDateEnd
        depotSlots {
          from
          to
        }
        deliveryCheckpoint {
          warehouseId
          extId
          thirdCompanyId
          thirdCompanyOwner
          thirdCompanyName
          thirdCompanyVat
          name
          maxLength
          tools
          cargoBay
          trades
          containerUnloading
          note
        }
        deliveryDateStart
        deliveryDateEnd
        deliverySlots {
          from
          to
        }
        pickupAddress
        deliveryAddress
        depotAddress
        availability {
          from
          to
        }
        status
        orderNumber
        trades
        docs {
          date
          number
          type
        }
        support
        warnings
        quantity
        size
        temperature
        loadingMeter
        grossWeight
        netWeight
        packages
        perishable
        stackable
        palletInfo {
          value
          size
          type
          system
        }
        customer {
          id
          name
          vatNumber
          uniqueCode
          pec
        }
        lastPosition {
          place_id
          region
          province
          city
          address
          coordinate
        }
        collectChecks
        checksAmount
        log {
          authorId
          author
          description
          timestamp
        }
        billingType
        note
        sender {
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
          owner
        }
        carrier {
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
          owner
        }
        receiver {
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
          owner
        }
        pickupStorage {
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
          owner
        }
        deliveryStorage {
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
          owner
        }
        checks {
          nextToken
        }
        travels {
          nextToken
        }
      }
      travel {
        id
        stamp
        carrierId
        tenant
        status
        createdAt
        departureDate
        updatedAt
        licensePlate
        vehicleName
        driverFiscalCode
        driverName
        driver {
          username
          companyId
          name
          fiscalCode
          email
          phone
          job
          task
          tenant
        }
        estimatedTravelTime
        estimatedTravelLength
        estimatedTransportCosts
        palletHandlings {
          nextToken
        }
        start {
          id
          companyName
          companyId
          tenantCompany
          estimatedLength
          estimatedTime
          completed
        }
        waypoints {
          id
          companyName
          companyId
          tenantCompany
          estimatedLength
          estimatedTime
          completed
        }
        end {
          id
          companyName
          companyId
          tenantCompany
          estimatedLength
          estimatedTime
          completed
        }
        plannedOrderIds
        travelType
        lastPosition {
          place_id
          region
          province
          city
          address
          coordinate
        }
        note
        log {
          authorId
          author
          description
          timestamp
        }
        orders {
          nextToken
        }
      }
    }
  }
`;
export const updateTravelsOrders = /* GraphQL */ `
  mutation UpdateTravelsOrders(
    $input: UpdateTravelsOrdersInput!
    $condition: ModelTravelsOrdersConditionInput
  ) {
    updateTravelsOrders(input: $input, condition: $condition) {
      id
      departureDate
      arrivalDate
      carrierId
      tenantCarrier
      customerId
      tenantCustomer
      orderId
      travelId
      waypoint {
        id
        orders {
          orderId
          plannedId
          orderStamp
          orderStatus
          operation
          operationValue
        }
        companyName
        companyId
        tenantCompany
        checkpoint {
          warehouseId
          extId
          thirdCompanyId
          thirdCompanyOwner
          thirdCompanyName
          thirdCompanyVat
          name
          maxLength
          tools
          cargoBay
          trades
          containerUnloading
          note
        }
        estimatedLength
        estimatedTime
        completed
      }
      operation
      operationValue
      createdAt
      updatedAt
      order {
        id
        extId
        stamp
        name
        preOrderId
        carrierId
        senderId
        receiverId
        pickupStorageId
        deliveryStorageId
        tenantCarrier
        tenantSender
        tenantReceiver
        tenantPickupStorage
        tenantDeliveryStorage
        carrierName
        senderName
        receiverName
        pickupStorageName
        deliveryStorageName
        carrierVat
        senderVat
        receiverVat
        pickupStorageVat
        deliveryStorageVat
        createdAt
        updatedAt
        completedAt
        paymentCondition
        shipmentType
        pickupCheckpoint {
          warehouseId
          extId
          thirdCompanyId
          thirdCompanyOwner
          thirdCompanyName
          thirdCompanyVat
          name
          maxLength
          tools
          cargoBay
          trades
          containerUnloading
          note
        }
        pickupDateStart
        pickupDateEnd
        pickupSlots {
          from
          to
        }
        depotCheckpoint {
          warehouseId
          extId
          thirdCompanyId
          thirdCompanyOwner
          thirdCompanyName
          thirdCompanyVat
          name
          maxLength
          tools
          cargoBay
          trades
          containerUnloading
          note
        }
        depotDateStart
        depotDateEnd
        depotSlots {
          from
          to
        }
        deliveryCheckpoint {
          warehouseId
          extId
          thirdCompanyId
          thirdCompanyOwner
          thirdCompanyName
          thirdCompanyVat
          name
          maxLength
          tools
          cargoBay
          trades
          containerUnloading
          note
        }
        deliveryDateStart
        deliveryDateEnd
        deliverySlots {
          from
          to
        }
        pickupAddress
        deliveryAddress
        depotAddress
        availability {
          from
          to
        }
        status
        orderNumber
        trades
        docs {
          date
          number
          type
        }
        support
        warnings
        quantity
        size
        temperature
        loadingMeter
        grossWeight
        netWeight
        packages
        perishable
        stackable
        palletInfo {
          value
          size
          type
          system
        }
        customer {
          id
          name
          vatNumber
          uniqueCode
          pec
        }
        lastPosition {
          place_id
          region
          province
          city
          address
          coordinate
        }
        collectChecks
        checksAmount
        log {
          authorId
          author
          description
          timestamp
        }
        billingType
        note
        sender {
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
          owner
        }
        carrier {
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
          owner
        }
        receiver {
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
          owner
        }
        pickupStorage {
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
          owner
        }
        deliveryStorage {
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
          owner
        }
        checks {
          nextToken
        }
        travels {
          nextToken
        }
      }
      travel {
        id
        stamp
        carrierId
        tenant
        status
        createdAt
        departureDate
        updatedAt
        licensePlate
        vehicleName
        driverFiscalCode
        driverName
        driver {
          username
          companyId
          name
          fiscalCode
          email
          phone
          job
          task
          tenant
        }
        estimatedTravelTime
        estimatedTravelLength
        estimatedTransportCosts
        palletHandlings {
          nextToken
        }
        start {
          id
          companyName
          companyId
          tenantCompany
          estimatedLength
          estimatedTime
          completed
        }
        waypoints {
          id
          companyName
          companyId
          tenantCompany
          estimatedLength
          estimatedTime
          completed
        }
        end {
          id
          companyName
          companyId
          tenantCompany
          estimatedLength
          estimatedTime
          completed
        }
        plannedOrderIds
        travelType
        lastPosition {
          place_id
          region
          province
          city
          address
          coordinate
        }
        note
        log {
          authorId
          author
          description
          timestamp
        }
        orders {
          nextToken
        }
      }
    }
  }
`;
export const deleteTravelsOrders = /* GraphQL */ `
  mutation DeleteTravelsOrders(
    $input: DeleteTravelsOrdersInput!
    $condition: ModelTravelsOrdersConditionInput
  ) {
    deleteTravelsOrders(input: $input, condition: $condition) {
      id
      departureDate
      arrivalDate
      carrierId
      tenantCarrier
      customerId
      tenantCustomer
      orderId
      travelId
      waypoint {
        id
        orders {
          orderId
          plannedId
          orderStamp
          orderStatus
          operation
          operationValue
        }
        companyName
        companyId
        tenantCompany
        checkpoint {
          warehouseId
          extId
          thirdCompanyId
          thirdCompanyOwner
          thirdCompanyName
          thirdCompanyVat
          name
          maxLength
          tools
          cargoBay
          trades
          containerUnloading
          note
        }
        estimatedLength
        estimatedTime
        completed
      }
      operation
      operationValue
      createdAt
      updatedAt
      order {
        id
        extId
        stamp
        name
        preOrderId
        carrierId
        senderId
        receiverId
        pickupStorageId
        deliveryStorageId
        tenantCarrier
        tenantSender
        tenantReceiver
        tenantPickupStorage
        tenantDeliveryStorage
        carrierName
        senderName
        receiverName
        pickupStorageName
        deliveryStorageName
        carrierVat
        senderVat
        receiverVat
        pickupStorageVat
        deliveryStorageVat
        createdAt
        updatedAt
        completedAt
        paymentCondition
        shipmentType
        pickupCheckpoint {
          warehouseId
          extId
          thirdCompanyId
          thirdCompanyOwner
          thirdCompanyName
          thirdCompanyVat
          name
          maxLength
          tools
          cargoBay
          trades
          containerUnloading
          note
        }
        pickupDateStart
        pickupDateEnd
        pickupSlots {
          from
          to
        }
        depotCheckpoint {
          warehouseId
          extId
          thirdCompanyId
          thirdCompanyOwner
          thirdCompanyName
          thirdCompanyVat
          name
          maxLength
          tools
          cargoBay
          trades
          containerUnloading
          note
        }
        depotDateStart
        depotDateEnd
        depotSlots {
          from
          to
        }
        deliveryCheckpoint {
          warehouseId
          extId
          thirdCompanyId
          thirdCompanyOwner
          thirdCompanyName
          thirdCompanyVat
          name
          maxLength
          tools
          cargoBay
          trades
          containerUnloading
          note
        }
        deliveryDateStart
        deliveryDateEnd
        deliverySlots {
          from
          to
        }
        pickupAddress
        deliveryAddress
        depotAddress
        availability {
          from
          to
        }
        status
        orderNumber
        trades
        docs {
          date
          number
          type
        }
        support
        warnings
        quantity
        size
        temperature
        loadingMeter
        grossWeight
        netWeight
        packages
        perishable
        stackable
        palletInfo {
          value
          size
          type
          system
        }
        customer {
          id
          name
          vatNumber
          uniqueCode
          pec
        }
        lastPosition {
          place_id
          region
          province
          city
          address
          coordinate
        }
        collectChecks
        checksAmount
        log {
          authorId
          author
          description
          timestamp
        }
        billingType
        note
        sender {
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
          owner
        }
        carrier {
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
          owner
        }
        receiver {
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
          owner
        }
        pickupStorage {
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
          owner
        }
        deliveryStorage {
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
          owner
        }
        checks {
          nextToken
        }
        travels {
          nextToken
        }
      }
      travel {
        id
        stamp
        carrierId
        tenant
        status
        createdAt
        departureDate
        updatedAt
        licensePlate
        vehicleName
        driverFiscalCode
        driverName
        driver {
          username
          companyId
          name
          fiscalCode
          email
          phone
          job
          task
          tenant
        }
        estimatedTravelTime
        estimatedTravelLength
        estimatedTransportCosts
        palletHandlings {
          nextToken
        }
        start {
          id
          companyName
          companyId
          tenantCompany
          estimatedLength
          estimatedTime
          completed
        }
        waypoints {
          id
          companyName
          companyId
          tenantCompany
          estimatedLength
          estimatedTime
          completed
        }
        end {
          id
          companyName
          companyId
          tenantCompany
          estimatedLength
          estimatedTime
          completed
        }
        plannedOrderIds
        travelType
        lastPosition {
          place_id
          region
          province
          city
          address
          coordinate
        }
        note
        log {
          authorId
          author
          description
          timestamp
        }
        orders {
          nextToken
        }
      }
    }
  }
`;
