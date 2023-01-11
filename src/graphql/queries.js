/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProfile = /* GraphQL */ `
  query GetProfile($id: ID!) {
    getProfile(id: $id) {
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
        contacts {
          nextToken
        }
        warehouses {
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
        customers {
          nextToken
        }
        vehicles {
          nextToken
        }
      }
    }
  }
`;
export const listProfiles = /* GraphQL */ `
  query ListProfiles(
    $filter: ModelProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
      nextToken
    }
  }
`;
export const getContact = /* GraphQL */ `
  query GetContact($id: ID!) {
    getContact(id: $id) {
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
        contacts {
          nextToken
        }
        warehouses {
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
        customers {
          nextToken
        }
        vehicles {
          nextToken
        }
      }
    }
  }
`;
export const listContacts = /* GraphQL */ `
  query ListContacts(
    $filter: ModelContactFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listContacts(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
      nextToken
    }
  }
`;
export const getWarehouse = /* GraphQL */ `
  query GetWarehouse($id: ID!) {
    getWarehouse(id: $id) {
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
export const listWarehouses = /* GraphQL */ `
  query ListWarehouses(
    $filter: ModelWarehouseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWarehouses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getWarehouseLink = /* GraphQL */ `
  query GetWarehouseLink($id: ID!) {
    getWarehouseLink(id: $id) {
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
        contacts {
          nextToken
        }
        warehouses {
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
        customers {
          nextToken
        }
        vehicles {
          nextToken
        }
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
        contacts {
          nextToken
        }
        warehouses {
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
        customers {
          nextToken
        }
        vehicles {
          nextToken
        }
      }
    }
  }
`;
export const listWarehouseLinks = /* GraphQL */ `
  query ListWarehouseLinks(
    $filter: ModelWarehouseLinkFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWarehouseLinks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getPreOrder = /* GraphQL */ `
  query GetPreOrder($id: ID!) {
    getPreOrder(id: $id) {
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
export const listPreOrders = /* GraphQL */ `
  query ListPreOrders(
    $filter: ModelPreOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPreOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getPalletHandling = /* GraphQL */ `
  query GetPalletHandling($id: ID!) {
    getPalletHandling(id: $id) {
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
export const listPalletHandlings = /* GraphQL */ `
  query ListPalletHandlings(
    $filter: ModelPalletHandlingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPalletHandlings(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
        waypoint {
          id
          companyName
          companyId
          tenantCompany
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
          estimatedTravelTime
          estimatedTravelLength
          estimatedTransportCosts
          plannedOrderIds
          travelType
          note
        }
      }
      nextToken
    }
  }
`;
export const profileByCompany = /* GraphQL */ `
  query ProfileByCompany(
    $companyId: ID
    $searchable: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    profileByCompany(
      companyId: $companyId
      searchable: $searchable
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      nextToken
    }
  }
`;
export const profileByFiscalCode = /* GraphQL */ `
  query ProfileByFiscalCode(
    $fiscalCode: String
    $sortDirection: ModelSortDirection
    $filter: ModelProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    profileByFiscalCode(
      fiscalCode: $fiscalCode
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      nextToken
    }
  }
`;
export const profileBySearchable = /* GraphQL */ `
  query ProfileBySearchable(
    $searchable: String
    $sortDirection: ModelSortDirection
    $filter: ModelProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    profileBySearchable(
      searchable: $searchable
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      nextToken
    }
  }
`;
export const profileByEmail = /* GraphQL */ `
  query ProfileByEmail(
    $email: String
    $sortDirection: ModelSortDirection
    $filter: ModelProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    profileByEmail(
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      nextToken
    }
  }
`;
export const contactByCompany = /* GraphQL */ `
  query ContactByCompany(
    $companyId: ID
    $searchable: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelContactFilterInput
    $limit: Int
    $nextToken: String
  ) {
    contactByCompany(
      companyId: $companyId
      searchable: $searchable
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      nextToken
    }
  }
`;
export const contactByCompanyType = /* GraphQL */ `
  query ContactByCompanyType(
    $companyId: ID
    $typeSearchable: ModelContactContactByCompanyTypeCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelContactFilterInput
    $limit: Int
    $nextToken: String
  ) {
    contactByCompanyType(
      companyId: $companyId
      typeSearchable: $typeSearchable
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      nextToken
    }
  }
`;
export const employeeByCompany = /* GraphQL */ `
  query EmployeeByCompany(
    $companyId: ID
    $employeeSearchable: ModelContactEmployeeByCompanyCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelContactFilterInput
    $limit: Int
    $nextToken: String
  ) {
    employeeByCompany(
      companyId: $companyId
      employeeSearchable: $employeeSearchable
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      nextToken
    }
  }
`;
export const employeeByCompanyType = /* GraphQL */ `
  query EmployeeByCompanyType(
    $companyId: ID
    $employeeTypeSearchable: ModelContactEmployeeByCompanyTypeCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelContactFilterInput
    $limit: Int
    $nextToken: String
  ) {
    employeeByCompanyType(
      companyId: $companyId
      employeeTypeSearchable: $employeeTypeSearchable
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      nextToken
    }
  }
`;
export const warehouseByCompany = /* GraphQL */ `
  query WarehouseByCompany(
    $companyId: ID
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
      nextToken
    }
  }
`;
export const depositWarehouseByCompany = /* GraphQL */ `
  query DepositWarehouseByCompany(
    $companyId: ID
    $isDepositStatus: ModelWarehouseDepositWarehouseByCompanyCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelWarehouseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    depositWarehouseByCompany(
      companyId: $companyId
      isDepositStatus: $isDepositStatus
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
      nextToken
    }
  }
`;
export const interWarehouseByCompany = /* GraphQL */ `
  query InterWarehouseByCompany(
    $companyId: ID
    $isInterStatus: ModelWarehouseInterWarehouseByCompanyCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelWarehouseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    interWarehouseByCompany(
      companyId: $companyId
      isInterStatus: $isInterStatus
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
      nextToken
    }
  }
`;
export const hubWarehouseByCompany = /* GraphQL */ `
  query HubWarehouseByCompany(
    $companyId: ID
    $isHubStatus: ModelWarehouseHubWarehouseByCompanyCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelWarehouseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    hubWarehouseByCompany(
      companyId: $companyId
      isHubStatus: $isHubStatus
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
      nextToken
    }
  }
`;
export const linkedWarehouseByCompany = /* GraphQL */ `
  query LinkedWarehouseByCompany(
    $companyId: ID
    $isLinkedStatus: ModelWarehouseLinkedWarehouseByCompanyCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelWarehouseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    linkedWarehouseByCompany(
      companyId: $companyId
      isLinkedStatus: $isLinkedStatus
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
      nextToken
    }
  }
`;
export const warehouseLinkByClient = /* GraphQL */ `
  query WarehouseLinkByClient(
    $companyClientId: ID
    $sortDirection: ModelSortDirection
    $filter: ModelWarehouseLinkFilterInput
    $limit: Int
    $nextToken: String
  ) {
    warehouseLinkByClient(
      companyClientId: $companyClientId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const warehouseLinkByOwner = /* GraphQL */ `
  query WarehouseLinkByOwner(
    $companyOwnerId: ID
    $sortDirection: ModelSortDirection
    $filter: ModelWarehouseLinkFilterInput
    $limit: Int
    $nextToken: String
  ) {
    warehouseLinkByOwner(
      companyOwnerId: $companyOwnerId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const preOrderByStamp = /* GraphQL */ `
  query PreOrderByStamp(
    $stamp: ID
    $sortDirection: ModelSortDirection
    $filter: ModelPreOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    preOrderByStamp(
      stamp: $stamp
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const preOrderByCarrier = /* GraphQL */ `
  query PreOrderByCarrier(
    $carrierId: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPreOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    preOrderByCarrier(
      carrierId: $carrierId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const preOrderByCarrierStatus = /* GraphQL */ `
  query PreOrderByCarrierStatus(
    $carrierId: ID
    $statusCreatedAt: ModelPreOrderPreOrderByCarrierStatusCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPreOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    preOrderByCarrierStatus(
      carrierId: $carrierId
      statusCreatedAt: $statusCreatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const preOrderByCarrierPickupDate = /* GraphQL */ `
  query PreOrderByCarrierPickupDate(
    $carrierId: ID
    $pickupDateStartPickupDateEnd: ModelPreOrderPreOrderByCarrierPickupDateCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPreOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    preOrderByCarrierPickupDate(
      carrierId: $carrierId
      pickupDateStartPickupDateEnd: $pickupDateStartPickupDateEnd
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const preOrderBySender = /* GraphQL */ `
  query PreOrderBySender(
    $senderId: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPreOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    preOrderBySender(
      senderId: $senderId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const preOrderBySenderStatus = /* GraphQL */ `
  query PreOrderBySenderStatus(
    $senderId: ID
    $statusCreatedAt: ModelPreOrderPreOrderBySenderStatusCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPreOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    preOrderBySenderStatus(
      senderId: $senderId
      statusCreatedAt: $statusCreatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const preOrderBySenderPickupDate = /* GraphQL */ `
  query PreOrderBySenderPickupDate(
    $senderId: ID
    $pickupDateStartPickupDateEnd: ModelPreOrderPreOrderBySenderPickupDateCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPreOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    preOrderBySenderPickupDate(
      senderId: $senderId
      pickupDateStartPickupDateEnd: $pickupDateStartPickupDateEnd
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const preOrderByStorage = /* GraphQL */ `
  query PreOrderByStorage(
    $storageId: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPreOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    preOrderByStorage(
      storageId: $storageId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const preOrderByStorageStatus = /* GraphQL */ `
  query PreOrderByStorageStatus(
    $storageId: ID
    $statusCreatedAt: ModelPreOrderPreOrderByStorageStatusCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPreOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    preOrderByStorageStatus(
      storageId: $storageId
      statusCreatedAt: $statusCreatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const preOrderByStoragePickupDate = /* GraphQL */ `
  query PreOrderByStoragePickupDate(
    $storageId: ID
    $pickupDateStartPickupDateEnd: ModelPreOrderPreOrderByStoragePickupDateCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPreOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    preOrderByStoragePickupDate(
      storageId: $storageId
      pickupDateStartPickupDateEnd: $pickupDateStartPickupDateEnd
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const travelsOrdersByCustomer = /* GraphQL */ `
  query TravelsOrdersByCustomer(
    $customerId: ID
    $arrivalDate: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTravelsOrdersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    travelsOrdersByCustomer(
      customerId: $customerId
      arrivalDate: $arrivalDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        waypoint {
          id
          companyName
          companyId
          tenantCompany
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
          estimatedTravelTime
          estimatedTravelLength
          estimatedTransportCosts
          plannedOrderIds
          travelType
          note
        }
      }
      nextToken
    }
  }
`;
export const travelsOrdersByCarrier = /* GraphQL */ `
  query TravelsOrdersByCarrier(
    $carrierId: ID
    $arrivalDate: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTravelsOrdersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    travelsOrdersByCarrier(
      carrierId: $carrierId
      arrivalDate: $arrivalDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        waypoint {
          id
          companyName
          companyId
          tenantCompany
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
          estimatedTravelTime
          estimatedTravelLength
          estimatedTransportCosts
          plannedOrderIds
          travelType
          note
        }
      }
      nextToken
    }
  }
`;
export const palletHandlingByStamp = /* GraphQL */ `
  query PalletHandlingByStamp(
    $stamp: ID
    $sortDirection: ModelSortDirection
    $filter: ModelPalletHandlingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    palletHandlingByStamp(
      stamp: $stamp
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        waypoint {
          id
          companyName
          companyId
          tenantCompany
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
          estimatedTravelTime
          estimatedTravelLength
          estimatedTransportCosts
          plannedOrderIds
          travelType
          note
        }
      }
      nextToken
    }
  }
`;
export const palletHandlingByStatusOperationDate = /* GraphQL */ `
  query PalletHandlingByStatusOperationDate(
    $status: PalletHandlingStatus
    $operationDate: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPalletHandlingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    palletHandlingByStatusOperationDate(
      status: $status
      operationDate: $operationDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        waypoint {
          id
          companyName
          companyId
          tenantCompany
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
          estimatedTravelTime
          estimatedTravelLength
          estimatedTransportCosts
          plannedOrderIds
          travelType
          note
        }
      }
      nextToken
    }
  }
`;
export const palletHandlingByStatusCarrierDate = /* GraphQL */ `
  query PalletHandlingByStatusCarrierDate(
    $status: PalletHandlingStatus
    $carrierIdOperationDate: ModelPalletHandlingPalletHandlingByStatusCarrierDateCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPalletHandlingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    palletHandlingByStatusCarrierDate(
      status: $status
      carrierIdOperationDate: $carrierIdOperationDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        waypoint {
          id
          companyName
          companyId
          tenantCompany
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
          estimatedTravelTime
          estimatedTravelLength
          estimatedTransportCosts
          plannedOrderIds
          travelType
          note
        }
      }
      nextToken
    }
  }
`;
export const palletHandlingByStatusCustomerDate = /* GraphQL */ `
  query PalletHandlingByStatusCustomerDate(
    $status: PalletHandlingStatus
    $customerIdOperationDate: ModelPalletHandlingPalletHandlingByStatusCustomerDateCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPalletHandlingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    palletHandlingByStatusCustomerDate(
      status: $status
      customerIdOperationDate: $customerIdOperationDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        waypoint {
          id
          companyName
          companyId
          tenantCompany
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
          estimatedTravelTime
          estimatedTravelLength
          estimatedTransportCosts
          plannedOrderIds
          travelType
          note
        }
      }
      nextToken
    }
  }
`;
export const palletHandlingByStatusReversalDate = /* GraphQL */ `
  query PalletHandlingByStatusReversalDate(
    $status: PalletHandlingStatus
    $reversalIdOperationDate: ModelPalletHandlingPalletHandlingByStatusReversalDateCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPalletHandlingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    palletHandlingByStatusReversalDate(
      status: $status
      reversalIdOperationDate: $reversalIdOperationDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        waypoint {
          id
          companyName
          companyId
          tenantCompany
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
          estimatedTravelTime
          estimatedTravelLength
          estimatedTransportCosts
          plannedOrderIds
          travelType
          note
        }
      }
      nextToken
    }
  }
`;
export const palletHandlingByStatusTravelDate = /* GraphQL */ `
  query PalletHandlingByStatusTravelDate(
    $status: PalletHandlingStatus
    $travelStampOperationDate: ModelPalletHandlingPalletHandlingByStatusTravelDateCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPalletHandlingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    palletHandlingByStatusTravelDate(
      status: $status
      travelStampOperationDate: $travelStampOperationDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        waypoint {
          id
          companyName
          companyId
          tenantCompany
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
          estimatedTravelTime
          estimatedTravelLength
          estimatedTransportCosts
          plannedOrderIds
          travelType
          note
        }
      }
      nextToken
    }
  }
`;
export const palletHandlingByStatusTypeDate = /* GraphQL */ `
  query PalletHandlingByStatusTypeDate(
    $status: PalletHandlingStatus
    $typeOperationDate: ModelPalletHandlingPalletHandlingByStatusTypeDateCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPalletHandlingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    palletHandlingByStatusTypeDate(
      status: $status
      typeOperationDate: $typeOperationDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        waypoint {
          id
          companyName
          companyId
          tenantCompany
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
          estimatedTravelTime
          estimatedTravelLength
          estimatedTransportCosts
          plannedOrderIds
          travelType
          note
        }
      }
      nextToken
    }
  }
`;
export const palletHandlingByCarrierOperationDate = /* GraphQL */ `
  query PalletHandlingByCarrierOperationDate(
    $carrierId: ID
    $operationDate: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPalletHandlingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    palletHandlingByCarrierOperationDate(
      carrierId: $carrierId
      operationDate: $operationDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        waypoint {
          id
          companyName
          companyId
          tenantCompany
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
          estimatedTravelTime
          estimatedTravelLength
          estimatedTransportCosts
          plannedOrderIds
          travelType
          note
        }
      }
      nextToken
    }
  }
`;
export const palletHandlingByCustomerOperationDate = /* GraphQL */ `
  query PalletHandlingByCustomerOperationDate(
    $customerId: ID
    $operationDate: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPalletHandlingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    palletHandlingByCustomerOperationDate(
      customerId: $customerId
      operationDate: $operationDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        waypoint {
          id
          companyName
          companyId
          tenantCompany
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
          estimatedTravelTime
          estimatedTravelLength
          estimatedTransportCosts
          plannedOrderIds
          travelType
          note
        }
      }
      nextToken
    }
  }
`;
export const palletHandlingByReversalOperationDate = /* GraphQL */ `
  query PalletHandlingByReversalOperationDate(
    $reversalId: ID
    $operationDate: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPalletHandlingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    palletHandlingByReversalOperationDate(
      reversalId: $reversalId
      operationDate: $operationDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        waypoint {
          id
          companyName
          companyId
          tenantCompany
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
          estimatedTravelTime
          estimatedTravelLength
          estimatedTransportCosts
          plannedOrderIds
          travelType
          note
        }
      }
      nextToken
    }
  }
`;
export const palletHandlingByCarrierTypeOperationDate = /* GraphQL */ `
  query PalletHandlingByCarrierTypeOperationDate(
    $carrierId: ID
    $typeOperationDate: ModelPalletHandlingPalletHandlingByCarrierTypeOperationDateCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPalletHandlingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    palletHandlingByCarrierTypeOperationDate(
      carrierId: $carrierId
      typeOperationDate: $typeOperationDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        waypoint {
          id
          companyName
          companyId
          tenantCompany
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
          estimatedTravelTime
          estimatedTravelLength
          estimatedTransportCosts
          plannedOrderIds
          travelType
          note
        }
      }
      nextToken
    }
  }
`;
export const palletHandlingByCustomerTypeOperationDate = /* GraphQL */ `
  query PalletHandlingByCustomerTypeOperationDate(
    $customerId: ID
    $typeOperationDate: ModelPalletHandlingPalletHandlingByCustomerTypeOperationDateCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPalletHandlingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    palletHandlingByCustomerTypeOperationDate(
      customerId: $customerId
      typeOperationDate: $typeOperationDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        waypoint {
          id
          companyName
          companyId
          tenantCompany
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
          estimatedTravelTime
          estimatedTravelLength
          estimatedTransportCosts
          plannedOrderIds
          travelType
          note
        }
      }
      nextToken
    }
  }
`;
export const palletHandlingByTravelCreatedAt = /* GraphQL */ `
  query PalletHandlingByTravelCreatedAt(
    $travelId: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPalletHandlingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    palletHandlingByTravelCreatedAt(
      travelId: $travelId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        waypoint {
          id
          companyName
          companyId
          tenantCompany
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
          estimatedTravelTime
          estimatedTravelLength
          estimatedTransportCosts
          plannedOrderIds
          travelType
          note
        }
      }
      nextToken
    }
  }
`;
export const palletHandlingByCarrierTravelOperationDate = /* GraphQL */ `
  query PalletHandlingByCarrierTravelOperationDate(
    $carrierId: ID
    $travelStampOperationDate: ModelPalletHandlingPalletHandlingByCarrierTravelOperationDateCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPalletHandlingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    palletHandlingByCarrierTravelOperationDate(
      carrierId: $carrierId
      travelStampOperationDate: $travelStampOperationDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        waypoint {
          id
          companyName
          companyId
          tenantCompany
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
          estimatedTravelTime
          estimatedTravelLength
          estimatedTransportCosts
          plannedOrderIds
          travelType
          note
        }
      }
      nextToken
    }
  }
`;
export const palletHandlingByCustomerTravelOperationDate = /* GraphQL */ `
  query PalletHandlingByCustomerTravelOperationDate(
    $customerId: ID
    $travelStampOperationDate: ModelPalletHandlingPalletHandlingByCustomerTravelOperationDateCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPalletHandlingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    palletHandlingByCustomerTravelOperationDate(
      customerId: $customerId
      travelStampOperationDate: $travelStampOperationDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        waypoint {
          id
          companyName
          companyId
          tenantCompany
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
          estimatedTravelTime
          estimatedTravelLength
          estimatedTransportCosts
          plannedOrderIds
          travelType
          note
        }
      }
      nextToken
    }
  }
`;
export const palletHandlingByCarrierCustomerOperationDate = /* GraphQL */ `
  query PalletHandlingByCarrierCustomerOperationDate(
    $carrierId: ID
    $customerIdOperationDate: ModelPalletHandlingPalletHandlingByCarrierCustomerOperationDateCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPalletHandlingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    palletHandlingByCarrierCustomerOperationDate(
      carrierId: $carrierId
      customerIdOperationDate: $customerIdOperationDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        waypoint {
          id
          companyName
          companyId
          tenantCompany
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
          estimatedTravelTime
          estimatedTravelLength
          estimatedTransportCosts
          plannedOrderIds
          travelType
          note
        }
      }
      nextToken
    }
  }
`;
export const palletHandlingByCarrierReversalOperationDate = /* GraphQL */ `
  query PalletHandlingByCarrierReversalOperationDate(
    $carrierId: ID
    $reversalIdOperationDate: ModelPalletHandlingPalletHandlingByCarrierReversalOperationDateCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPalletHandlingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    palletHandlingByCarrierReversalOperationDate(
      carrierId: $carrierId
      reversalIdOperationDate: $reversalIdOperationDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        waypoint {
          id
          companyName
          companyId
          tenantCompany
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
          estimatedTravelTime
          estimatedTravelLength
          estimatedTransportCosts
          plannedOrderIds
          travelType
          note
        }
      }
      nextToken
    }
  }
`;
export const palletHandlingByCustomerReversalOperationDate = /* GraphQL */ `
  query PalletHandlingByCustomerReversalOperationDate(
    $customerId: ID
    $reversalIdOperationDate: ModelPalletHandlingPalletHandlingByCustomerReversalOperationDateCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPalletHandlingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    palletHandlingByCustomerReversalOperationDate(
      customerId: $customerId
      reversalIdOperationDate: $reversalIdOperationDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        waypoint {
          id
          companyName
          companyId
          tenantCompany
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
          estimatedTravelTime
          estimatedTravelLength
          estimatedTransportCosts
          plannedOrderIds
          travelType
          note
        }
      }
      nextToken
    }
  }
`;
export const palletHandlingByCustomerCarrierOperationDate = /* GraphQL */ `
  query PalletHandlingByCustomerCarrierOperationDate(
    $customerId: ID
    $carrierIdOperationDate: ModelPalletHandlingPalletHandlingByCustomerCarrierOperationDateCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPalletHandlingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    palletHandlingByCustomerCarrierOperationDate(
      customerId: $customerId
      carrierIdOperationDate: $carrierIdOperationDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        waypoint {
          id
          companyName
          companyId
          tenantCompany
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
          estimatedTravelTime
          estimatedTravelLength
          estimatedTransportCosts
          plannedOrderIds
          travelType
          note
        }
      }
      nextToken
    }
  }
`;
export const companyByVatNumber = /* GraphQL */ `
  query CompanyByVatNumber(
    $vatNumber: ID
    $city: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCompanyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    companyByVatNumber(
      vatNumber: $vatNumber
      city: $city
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        contacts {
          nextToken
        }
        warehouses {
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
        customers {
          nextToken
        }
        vehicles {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const companyByName = /* GraphQL */ `
  query CompanyByName(
    $name: String
    $sortDirection: ModelSortDirection
    $filter: ModelCompanyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    companyByName(
      name: $name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        contacts {
          nextToken
        }
        warehouses {
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
        customers {
          nextToken
        }
        vehicles {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const companyByCompanyCode = /* GraphQL */ `
  query CompanyByCompanyCode(
    $companyCode: ID
    $sortDirection: ModelSortDirection
    $filter: ModelCompanyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    companyByCompanyCode(
      companyCode: $companyCode
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        contacts {
          nextToken
        }
        warehouses {
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
        customers {
          nextToken
        }
        vehicles {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const companyByFiscalCode = /* GraphQL */ `
  query CompanyByFiscalCode(
    $fiscalCode: ID
    $sortDirection: ModelSortDirection
    $filter: ModelCompanyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    companyByFiscalCode(
      fiscalCode: $fiscalCode
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        contacts {
          nextToken
        }
        warehouses {
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
        customers {
          nextToken
        }
        vehicles {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getCompany = /* GraphQL */ `
  query GetCompany($id: ID!) {
    getCompany(id: $id) {
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
    }
  }
`;
export const listCompanies = /* GraphQL */ `
  query ListCompanies(
    $filter: ModelCompanyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCompanies(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        contacts {
          nextToken
        }
        warehouses {
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
        customers {
          nextToken
        }
        vehicles {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getCustomer = /* GraphQL */ `
  query GetCustomer($id: ID!) {
    getCustomer(id: $id) {
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
        contacts {
          nextToken
        }
        warehouses {
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
        customers {
          nextToken
        }
        vehicles {
          nextToken
        }
      }
      owner
    }
  }
`;
export const listCustomers = /* GraphQL */ `
  query ListCustomers(
    $filter: ModelCustomerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCustomers(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
        customCheckpoints {
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
        owner
      }
      nextToken
    }
  }
`;
export const customerByCompany = /* GraphQL */ `
  query CustomerByCompany(
    $ownerCompanyId: ID
    $searchable: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCustomerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    customerByCompany(
      ownerCompanyId: $ownerCompanyId
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
        customCheckpoints {
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
        owner
      }
      nextToken
    }
  }
`;
export const customerByVatNumber = /* GraphQL */ `
  query CustomerByVatNumber(
    $ownerCompanyId: ID
    $vatNumber: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCustomerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    customerByVatNumber(
      ownerCompanyId: $ownerCompanyId
      vatNumber: $vatNumber
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
        customCheckpoints {
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
        owner
      }
      nextToken
    }
  }
`;
export const customerByCompanyCode = /* GraphQL */ `
  query CustomerByCompanyCode(
    $ownerCompanyId: ID
    $companyCode: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCustomerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    customerByCompanyCode(
      ownerCompanyId: $ownerCompanyId
      companyCode: $companyCode
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
        customCheckpoints {
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
        owner
      }
      nextToken
    }
  }
`;
export const senderCustomerByCompany = /* GraphQL */ `
  query SenderCustomerByCompany(
    $ownerCompanyId: ID
    $isSenderSearchable: ModelCustomerSenderCustomerByCompanyCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCustomerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    senderCustomerByCompany(
      ownerCompanyId: $ownerCompanyId
      isSenderSearchable: $isSenderSearchable
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
        customCheckpoints {
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
        owner
      }
      nextToken
    }
  }
`;
export const carrierCustomerByCompany = /* GraphQL */ `
  query CarrierCustomerByCompany(
    $ownerCompanyId: ID
    $isCarrierSearchable: ModelCustomerCarrierCustomerByCompanyCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCustomerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    carrierCustomerByCompany(
      ownerCompanyId: $ownerCompanyId
      isCarrierSearchable: $isCarrierSearchable
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
        customCheckpoints {
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
        owner
      }
      nextToken
    }
  }
`;
export const receiverCustomerByCompany = /* GraphQL */ `
  query ReceiverCustomerByCompany(
    $ownerCompanyId: ID
    $isReceiverSearchable: ModelCustomerReceiverCustomerByCompanyCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCustomerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    receiverCustomerByCompany(
      ownerCompanyId: $ownerCompanyId
      isReceiverSearchable: $isReceiverSearchable
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
        customCheckpoints {
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
        owner
      }
      nextToken
    }
  }
`;
export const getVehicle = /* GraphQL */ `
  query GetVehicle($id: ID!) {
    getVehicle(id: $id) {
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
export const listVehicles = /* GraphQL */ `
  query ListVehicles(
    $filter: ModelVehicleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVehicles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const vehicleByCompany = /* GraphQL */ `
  query VehicleByCompany(
    $companyId: ID
    $licensePlate: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelVehicleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    vehicleByCompany(
      companyId: $companyId
      licensePlate: $licensePlate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const vehicleByCompanyType = /* GraphQL */ `
  query VehicleByCompanyType(
    $companyId: ID
    $typeLicensePlate: ModelVehicleVehicleByCompanyTypeCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelVehicleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    vehicleByCompanyType(
      companyId: $companyId
      typeLicensePlate: $typeLicensePlate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const vehicleByCompanyStatusType = /* GraphQL */ `
  query VehicleByCompanyStatusType(
    $companyId: ID
    $statusType: ModelVehicleVehicleByCompanyStatusTypeCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelVehicleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    vehicleByCompanyStatusType(
      companyId: $companyId
      statusType: $statusType
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getOrder = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
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
        contacts {
          nextToken
        }
        warehouses {
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
        customers {
          nextToken
        }
        vehicles {
          nextToken
        }
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
        contacts {
          nextToken
        }
        warehouses {
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
        customers {
          nextToken
        }
        vehicles {
          nextToken
        }
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
        contacts {
          nextToken
        }
        warehouses {
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
        customers {
          nextToken
        }
        vehicles {
          nextToken
        }
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
        contacts {
          nextToken
        }
        warehouses {
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
        customers {
          nextToken
        }
        vehicles {
          nextToken
        }
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
        contacts {
          nextToken
        }
        warehouses {
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
        customers {
          nextToken
        }
        vehicles {
          nextToken
        }
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
export const listOrders = /* GraphQL */ `
  query ListOrders(
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
      nextToken
    }
  }
`;
export const orderByPreOrderId = /* GraphQL */ `
  query OrderByPreOrderId(
    $preOrderId: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderByPreOrderId(
      preOrderId: $preOrderId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      nextToken
    }
  }
`;
export const orderByStamp = /* GraphQL */ `
  query OrderByStamp(
    $stamp: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderByStamp(
      stamp: $stamp
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      nextToken
    }
  }
`;
export const orderByCarrierCreatedAt = /* GraphQL */ `
  query OrderByCarrierCreatedAt(
    $carrierId: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderByCarrierCreatedAt(
      carrierId: $carrierId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      nextToken
    }
  }
`;
export const orderBySenderCreatedAt = /* GraphQL */ `
  query OrderBySenderCreatedAt(
    $senderId: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderBySenderCreatedAt(
      senderId: $senderId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      nextToken
    }
  }
`;
export const orderByReceiverCreatedAt = /* GraphQL */ `
  query OrderByReceiverCreatedAt(
    $receiverId: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderByReceiverCreatedAt(
      receiverId: $receiverId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      nextToken
    }
  }
`;
export const orderByPickupStorageCreatedAt = /* GraphQL */ `
  query OrderByPickupStorageCreatedAt(
    $pickupStorageId: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderByPickupStorageCreatedAt(
      pickupStorageId: $pickupStorageId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      nextToken
    }
  }
`;
export const orderByDeliveryStorageCreatedAt = /* GraphQL */ `
  query OrderByDeliveryStorageCreatedAt(
    $deliveryStorageId: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderByDeliveryStorageCreatedAt(
      deliveryStorageId: $deliveryStorageId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      nextToken
    }
  }
`;
export const orderByCarrierStatusCreatedAt = /* GraphQL */ `
  query OrderByCarrierStatusCreatedAt(
    $carrierId: ID
    $statusCreatedAt: ModelOrderOrderByCarrierStatusCreatedAtCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderByCarrierStatusCreatedAt(
      carrierId: $carrierId
      statusCreatedAt: $statusCreatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      nextToken
    }
  }
`;
export const orderBySenderStatusCreatedAt = /* GraphQL */ `
  query OrderBySenderStatusCreatedAt(
    $senderId: ID
    $statusCreatedAt: ModelOrderOrderBySenderStatusCreatedAtCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderBySenderStatusCreatedAt(
      senderId: $senderId
      statusCreatedAt: $statusCreatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      nextToken
    }
  }
`;
export const orderByReceiverStatusCreatedAt = /* GraphQL */ `
  query OrderByReceiverStatusCreatedAt(
    $receiverId: ID
    $statusCreatedAt: ModelOrderOrderByReceiverStatusCreatedAtCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderByReceiverStatusCreatedAt(
      receiverId: $receiverId
      statusCreatedAt: $statusCreatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      nextToken
    }
  }
`;
export const orderByPickupStorageStatusCreatedAt = /* GraphQL */ `
  query OrderByPickupStorageStatusCreatedAt(
    $pickupStorageId: ID
    $statusCreatedAt: ModelOrderOrderByPickupStorageStatusCreatedAtCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderByPickupStorageStatusCreatedAt(
      pickupStorageId: $pickupStorageId
      statusCreatedAt: $statusCreatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      nextToken
    }
  }
`;
export const orderByDeliveryStorageStatusCreatedAt = /* GraphQL */ `
  query OrderByDeliveryStorageStatusCreatedAt(
    $deliveryStorageId: ID
    $statusCreatedAt: ModelOrderOrderByDeliveryStorageStatusCreatedAtCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderByDeliveryStorageStatusCreatedAt(
      deliveryStorageId: $deliveryStorageId
      statusCreatedAt: $statusCreatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      nextToken
    }
  }
`;
export const orderByCarrierStatusPickupDate = /* GraphQL */ `
  query OrderByCarrierStatusPickupDate(
    $carrierId: ID
    $pickupDateStartPickupDateEnd: ModelOrderOrderByCarrierStatusPickupDateCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderByCarrierStatusPickupDate(
      carrierId: $carrierId
      pickupDateStartPickupDateEnd: $pickupDateStartPickupDateEnd
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      nextToken
    }
  }
`;
export const orderByCarrierStatusDeliveryDate = /* GraphQL */ `
  query OrderByCarrierStatusDeliveryDate(
    $carrierId: ID
    $deliveryDateStartDeliveryDateEnd: ModelOrderOrderByCarrierStatusDeliveryDateCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderByCarrierStatusDeliveryDate(
      carrierId: $carrierId
      deliveryDateStartDeliveryDateEnd: $deliveryDateStartDeliveryDateEnd
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      nextToken
    }
  }
`;
export const orderByCarrierStatusPickupStorageCreatedAt = /* GraphQL */ `
  query OrderByCarrierStatusPickupStorageCreatedAt(
    $carrierId: ID
    $statusPickupStorageIdCreatedAt: ModelOrderOrderByCarrierStatusPickupStorageCreatedAtCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderByCarrierStatusPickupStorageCreatedAt(
      carrierId: $carrierId
      statusPickupStorageIdCreatedAt: $statusPickupStorageIdCreatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      nextToken
    }
  }
`;
export const orderByCarrierCollectChecksStatus = /* GraphQL */ `
  query OrderByCarrierCollectChecksStatus(
    $carrierId: ID
    $collectChecksStatus: ModelOrderOrderByCarrierCollectChecksStatusCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderByCarrierCollectChecksStatus(
      carrierId: $carrierId
      collectChecksStatus: $collectChecksStatus
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      nextToken
    }
  }
`;
export const orderByReceiverCollectChecksStatus = /* GraphQL */ `
  query OrderByReceiverCollectChecksStatus(
    $receiverId: ID
    $collectChecksStatus: ModelOrderOrderByReceiverCollectChecksStatusCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderByReceiverCollectChecksStatus(
      receiverId: $receiverId
      collectChecksStatus: $collectChecksStatus
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      nextToken
    }
  }
`;
export const orderByCarrierStatusCompletedAt = /* GraphQL */ `
  query OrderByCarrierStatusCompletedAt(
    $carrierId: ID
    $statusCompletedAt: ModelOrderOrderByCarrierStatusCompletedAtCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderByCarrierStatusCompletedAt(
      carrierId: $carrierId
      statusCompletedAt: $statusCompletedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      nextToken
    }
  }
`;
export const getCheck = /* GraphQL */ `
  query GetCheck($id: ID!) {
    getCheck(id: $id) {
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
export const listChecks = /* GraphQL */ `
  query ListChecks(
    $filter: ModelCheckFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChecks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      }
      nextToken
    }
  }
`;
export const checkByStamp = /* GraphQL */ `
  query CheckByStamp(
    $stamp: ID
    $sortDirection: ModelSortDirection
    $filter: ModelCheckFilterInput
    $limit: Int
    $nextToken: String
  ) {
    checkByStamp(
      stamp: $stamp
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      }
      nextToken
    }
  }
`;
export const checkByOrderId = /* GraphQL */ `
  query CheckByOrderId(
    $orderId: ID
    $orderCreationDate: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCheckFilterInput
    $limit: Int
    $nextToken: String
  ) {
    checkByOrderId(
      orderId: $orderId
      orderCreationDate: $orderCreationDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      }
      nextToken
    }
  }
`;
export const checkByCarrier = /* GraphQL */ `
  query CheckByCarrier(
    $carrierId: ID
    $orderCreationDate: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCheckFilterInput
    $limit: Int
    $nextToken: String
  ) {
    checkByCarrier(
      carrierId: $carrierId
      orderCreationDate: $orderCreationDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      }
      nextToken
    }
  }
`;
export const checkBySender = /* GraphQL */ `
  query CheckBySender(
    $senderId: ID
    $orderCreationDate: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCheckFilterInput
    $limit: Int
    $nextToken: String
  ) {
    checkBySender(
      senderId: $senderId
      orderCreationDate: $orderCreationDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      }
      nextToken
    }
  }
`;
export const checkByReceiver = /* GraphQL */ `
  query CheckByReceiver(
    $receiverId: ID
    $orderCreationDate: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCheckFilterInput
    $limit: Int
    $nextToken: String
  ) {
    checkByReceiver(
      receiverId: $receiverId
      orderCreationDate: $orderCreationDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      }
      nextToken
    }
  }
`;
export const checkBySenderStatus = /* GraphQL */ `
  query CheckBySenderStatus(
    $senderId: ID
    $statusOrderCreationDate: ModelCheckCheckBySenderStatusCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCheckFilterInput
    $limit: Int
    $nextToken: String
  ) {
    checkBySenderStatus(
      senderId: $senderId
      statusOrderCreationDate: $statusOrderCreationDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      }
      nextToken
    }
  }
`;
export const checkByCarrierStatus = /* GraphQL */ `
  query CheckByCarrierStatus(
    $carrierId: ID
    $statusOrderCreationDate: ModelCheckCheckByCarrierStatusCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCheckFilterInput
    $limit: Int
    $nextToken: String
  ) {
    checkByCarrierStatus(
      carrierId: $carrierId
      statusOrderCreationDate: $statusOrderCreationDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      }
      nextToken
    }
  }
`;
export const checkByReceiverStatus = /* GraphQL */ `
  query CheckByReceiverStatus(
    $receiverId: ID
    $statusOrderCreationDate: ModelCheckCheckByReceiverStatusCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCheckFilterInput
    $limit: Int
    $nextToken: String
  ) {
    checkByReceiverStatus(
      receiverId: $receiverId
      statusOrderCreationDate: $statusOrderCreationDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      }
      nextToken
    }
  }
`;
export const checkBySenderStatusCarrierDate = /* GraphQL */ `
  query CheckBySenderStatusCarrierDate(
    $senderId: ID
    $statusCarrierNameOrderCreationDate: ModelCheckCheckBySenderStatusCarrierDateCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCheckFilterInput
    $limit: Int
    $nextToken: String
  ) {
    checkBySenderStatusCarrierDate(
      senderId: $senderId
      statusCarrierNameOrderCreationDate: $statusCarrierNameOrderCreationDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      }
      nextToken
    }
  }
`;
export const checkBySenderStatusReceiverDate = /* GraphQL */ `
  query CheckBySenderStatusReceiverDate(
    $senderId: ID
    $statusReceiverNameOrderCreationDate: ModelCheckCheckBySenderStatusReceiverDateCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCheckFilterInput
    $limit: Int
    $nextToken: String
  ) {
    checkBySenderStatusReceiverDate(
      senderId: $senderId
      statusReceiverNameOrderCreationDate: $statusReceiverNameOrderCreationDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      }
      nextToken
    }
  }
`;
export const checkByCarrierStatusSenderDate = /* GraphQL */ `
  query CheckByCarrierStatusSenderDate(
    $carrierId: ID
    $statusSenderNameOrderCreationDate: ModelCheckCheckByCarrierStatusSenderDateCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCheckFilterInput
    $limit: Int
    $nextToken: String
  ) {
    checkByCarrierStatusSenderDate(
      carrierId: $carrierId
      statusSenderNameOrderCreationDate: $statusSenderNameOrderCreationDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      }
      nextToken
    }
  }
`;
export const checkByCarrierStatusReceiverDate = /* GraphQL */ `
  query CheckByCarrierStatusReceiverDate(
    $carrierId: ID
    $statusReceiverNameOrderCreationDate: ModelCheckCheckByCarrierStatusReceiverDateCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCheckFilterInput
    $limit: Int
    $nextToken: String
  ) {
    checkByCarrierStatusReceiverDate(
      carrierId: $carrierId
      statusReceiverNameOrderCreationDate: $statusReceiverNameOrderCreationDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      }
      nextToken
    }
  }
`;
export const checkByReceiverStatusSenderDate = /* GraphQL */ `
  query CheckByReceiverStatusSenderDate(
    $receiverId: ID
    $statusSenderNameOrderCreationDate: ModelCheckCheckByReceiverStatusSenderDateCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCheckFilterInput
    $limit: Int
    $nextToken: String
  ) {
    checkByReceiverStatusSenderDate(
      receiverId: $receiverId
      statusSenderNameOrderCreationDate: $statusSenderNameOrderCreationDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      }
      nextToken
    }
  }
`;
export const checkByReceiverStatusCarrierDate = /* GraphQL */ `
  query CheckByReceiverStatusCarrierDate(
    $receiverId: ID
    $statusCarrierNameOrderCreationDate: ModelCheckCheckByReceiverStatusCarrierDateCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCheckFilterInput
    $limit: Int
    $nextToken: String
  ) {
    checkByReceiverStatusCarrierDate(
      receiverId: $receiverId
      statusCarrierNameOrderCreationDate: $statusCarrierNameOrderCreationDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      }
      nextToken
    }
  }
`;
export const getTravel = /* GraphQL */ `
  query GetTravel($id: ID!) {
    getTravel(id: $id) {
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
export const listTravels = /* GraphQL */ `
  query ListTravels(
    $filter: ModelTravelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTravels(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const travelByStampCreatedAt = /* GraphQL */ `
  query TravelByStampCreatedAt(
    $stamp: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTravelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    travelByStampCreatedAt(
      stamp: $stamp
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const travelByCarrierDepartureDate = /* GraphQL */ `
  query TravelByCarrierDepartureDate(
    $carrierId: ID
    $departureDate: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTravelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    travelByCarrierDepartureDate(
      carrierId: $carrierId
      departureDate: $departureDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const travelByCarrierStatusDepartureDate = /* GraphQL */ `
  query TravelByCarrierStatusDepartureDate(
    $carrierId: ID
    $statusDepartureDate: ModelTravelTravelByCarrierStatusDepartureDateCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTravelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    travelByCarrierStatusDepartureDate(
      carrierId: $carrierId
      statusDepartureDate: $statusDepartureDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const travelByCarrierStatusDriverDeparture = /* GraphQL */ `
  query TravelByCarrierStatusDriverDeparture(
    $carrierId: ID
    $statusDriverFiscalCodeDepartureDate: ModelTravelTravelByCarrierStatusDriverDepartureCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTravelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    travelByCarrierStatusDriverDeparture(
      carrierId: $carrierId
      statusDriverFiscalCodeDepartureDate: $statusDriverFiscalCodeDepartureDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const travelByCarrierStatusLicenseDeparture = /* GraphQL */ `
  query TravelByCarrierStatusLicenseDeparture(
    $carrierId: ID
    $statusLicensePlateDepartureDate: ModelTravelTravelByCarrierStatusLicenseDepartureCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTravelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    travelByCarrierStatusLicenseDeparture(
      carrierId: $carrierId
      statusLicensePlateDepartureDate: $statusLicensePlateDepartureDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const travelByCarrierDriverDepartureDate = /* GraphQL */ `
  query TravelByCarrierDriverDepartureDate(
    $carrierId: ID
    $driverFiscalCodeDepartureDate: ModelTravelTravelByCarrierDriverDepartureDateCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTravelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    travelByCarrierDriverDepartureDate(
      carrierId: $carrierId
      driverFiscalCodeDepartureDate: $driverFiscalCodeDepartureDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
