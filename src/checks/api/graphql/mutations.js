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
        carrier {
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
        receiver {
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
        pickupStorage {
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
        deliveryStorage {
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
        carrier {
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
        receiver {
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
        pickupStorage {
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
        deliveryStorage {
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
        carrier {
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
        receiver {
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
        pickupStorage {
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
        deliveryStorage {
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