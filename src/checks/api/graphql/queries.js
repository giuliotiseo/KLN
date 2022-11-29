// CARRIER ---------------------------------------------------------------------------------------------------------------------------------------
export const CHECK_BY_CARRIER = /* GraphQL */ `
  query CheckByCarrier(
    $companyId: ID
    $orderCreationDate: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCheckFilterInput
    $limit: Int
    $nextToken: String
  ) {
    checkByCarrier(
      carrierId: $companyId
      orderCreationDate: $orderCreationDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        stamp
        order { stamp }
        senderId
        receiverId
        carrierId
        orderCreationDate
        orderId
        orderStamp
        keyDocNum
        docsRef { date number type }
        receiverName
        senderName
        carrierName
        beneficiary
        createdAt
        updatedAt
        checkNum
        amount
        status
      }
      nextToken
    }
  }
`;

export const CHECK_BY_CARRIER_STATUS = /* GraphQL */ `
  query CheckByCarrierStatus(
    $companyId: ID
    $statusOrderCreationDate: ModelCheckCheckByCarrierStatusCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCheckFilterInput
    $limit: Int
    $nextToken: String
  ) {
    checkByCarrierStatus(
      companyId: $companyId
      statusOrderCreationDate: $statusOrderCreationDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        stamp
        order { stamp }
        senderId
        receiverId
        carrierId
        orderCreationDate
        orderId
        orderStamp
        keyDocNum
        docsRef { date number type }
        receiverName
        senderName
        carrierName
        beneficiary
        createdAt
        updatedAt
        checkNum
        amount
        status
      }
      nextToken
    }
  }
`;

export const CHECK_BY_CARRIER_PENDING = /* GraphQL */ `
  query CheckByCarrierStatus(
    $companyId: ID
    $sortDirection: ModelSortDirection
    $start: String
    $end: String
    $filter: ModelCheckFilterInput
    $limit: Int
    $nextToken: String
  ) {
    checkByCarrierStatus(
      carrierId: $companyId
      statusOrderCreationDate: {
        between: [{
          status: PENDING,
          orderCreationDate: $start
        }, {
          status: PENDING,
          orderCreationDate: $end
        }]
      }
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        stamp
        order { stamp }
        senderId
        receiverId
        carrierId
        orderCreationDate
        orderId
        orderStamp
        keyDocNum
        docsRef { date number type }
        receiverName
        senderName
        carrierName
        beneficiary
        createdAt
        updatedAt
        checkNum
        amount
        status
      }
      nextToken
    }
  }
`;

export const CHECK_BY_CARRIER_PICKEDUP = /* GraphQL */ `
  query CheckByCarrierStatus(
    $companyId: ID
    $sortDirection: ModelSortDirection
    $start: String
    $end: String
    $filter: ModelCheckFilterInput
    $limit: Int
    $nextToken: String
  ) {
    checkByCarrierStatus(
      carrierId: $companyId
      statusOrderCreationDate: {
        between: [{
          status: PICKEDUP,
          orderCreationDate: $start
        }, {
          status: PICKEDUP,
          orderCreationDate: $end
        }]
      }
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        stamp
        order { stamp }
        senderId
        receiverId
        carrierId
        orderCreationDate
        orderId
        orderStamp
        keyDocNum
        docsRef { date number type }
        receiverName
        senderName
        carrierName
        beneficiary
        createdAt
        updatedAt
        checkNum
        amount
        status
      }
      nextToken
    }
  }
`;

export const CHECK_BY_CARRIER_RECORDING = /* GraphQL */ `
  query CheckByCarrierStatus(
    $companyId: ID
    $sortDirection: ModelSortDirection
    $start: String
    $end: String
    $filter: ModelCheckFilterInput
    $limit: Int
    $nextToken: String
  ) {
    checkByCarrierStatus(
      carrierId: $companyId
      statusOrderCreationDate: {
        between: [{
          status: RECORDING,
          orderCreationDate: $start
        }, {
          status: RECORDING,
          orderCreationDate: $end
        }]
      }
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        stamp
        order { stamp }
        senderId
        receiverId
        carrierId
        orderCreationDate
        orderId
        orderStamp
        keyDocNum
        docsRef { date number type }
        receiverName
        senderName
        carrierName
        beneficiary
        createdAt
        updatedAt
        checkNum
        amount
        status
      }
      nextToken
    }
  }
`;

export const CHECK_BY_CARRIER_DELIVERING = /* GraphQL */ `
  query CheckByCarrierStatus(
    $companyId: ID
    $sortDirection: ModelSortDirection
    $start: String
    $end: String
    $filter: ModelCheckFilterInput
    $limit: Int
    $nextToken: String
  ) {
    checkByCarrierStatus(
      carrierId: $companyId
      statusOrderCreationDate: {
        between: [{
          status: DELIVERING,
          orderCreationDate: $start
        }, {
          status: DELIVERING,
          orderCreationDate: $end
        }]
      }
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        stamp
        order { stamp }
        senderId
        receiverId
        carrierId
        orderCreationDate
        orderId
        orderStamp
        keyDocNum
        docsRef { date number type }
        receiverName
        senderName
        carrierName
        beneficiary
        createdAt
        updatedAt
        checkNum
        amount
        status
      }
      nextToken
    }
  }
`;

export const CHECK_BY_CARRIER_DELIVERED = /* GraphQL */ `
  query CheckByCarrierStatus(
    $companyId: ID
    $sortDirection: ModelSortDirection
    $start: String
    $end: String
    $filter: ModelCheckFilterInput
    $limit: Int
    $nextToken: String
  ) {
    checkByCarrierStatus(
      carrierId: $companyId
      statusOrderCreationDate: {
        between: [{
          status: DELIVERED,
          orderCreationDate: $start
        }, {
          status: DELIVERED,
          orderCreationDate: $end
        }]
      }
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        stamp
        order { stamp }
        senderId
        receiverId
        carrierId
        orderCreationDate
        orderId
        orderStamp
        keyDocNum
        docsRef { date number type }
        receiverName
        senderName
        carrierName
        beneficiary
        createdAt
        updatedAt
        checkNum
        amount
        status
      }
      nextToken
    }
  }
`;

export const CHECK_BY_CARRIER_ARCHIVED = /* GraphQL */ `
  query CheckByCarrierStatus(
    $companyId: ID
    $sortDirection: ModelSortDirection
    $start: String
    $end: String
    $filter: ModelCheckFilterInput
    $limit: Int
    $nextToken: String
  ) {
    checkByCarrierStatus(
      carrierId: $companyId
      statusOrderCreationDate: {
        between: [{
          status: ARCHIVED,
          orderCreationDate: $start
        }, {
          status: ARCHIVED,
          orderCreationDate: $end
        }]
      }
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        stamp
        order { stamp }
        senderId
        receiverId
        carrierId
        orderCreationDate
        orderId
        orderStamp
        keyDocNum
        docsRef { date number type }
        receiverName
        senderName
        carrierName
        beneficiary
        createdAt
        updatedAt
        checkNum
        amount
        status
      }
      nextToken
    }
  }
`;

// SENDER ---------------------------------------------------------------------------------------------------------------------------------------
export const CHECK_BY_SENDER = /* GraphQL */ `
  query CheckBySender(
    $companyId: ID
    $orderCreationDate: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCheckFilterInput
    $limit: Int
    $nextToken: String
  ) {
    checkBySender(
      senderId: $companyId
      orderCreationDate: $orderCreationDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        stamp
        order { stamp }
        senderId
        receiverId
        carrierId
        orderCreationDate
        orderId
        orderStamp
        keyDocNum
        docsRef { date number type }
        receiverName
        senderName
        carrierName
        beneficiary
        createdAt
        updatedAt
        checkNum
        amount
        status
      }
      nextToken
    }
  }
`;

export const CHECK_BY_SENDER_PENDING = /* GraphQL */ `
  query CheckBySenderStatus(
    $companyId: ID
    $sortDirection: ModelSortDirection
    $start: String
    $end: String
    $filter: ModelCheckFilterInput
    $limit: Int
    $nextToken: String
  ) {
    checkBySenderStatus(
      senderId: $companyId
      statusOrderCreationDate: {
        between: [{
          status: PENDING,
          orderCreationDate: $start
        }, {
          status: PENDING,
          orderCreationDate: $end
        }]
      }
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        stamp
        order { stamp }
        senderId
        receiverId
        carrierId
        orderCreationDate
        orderId
        orderStamp
        keyDocNum
        docsRef { date number type }
        receiverName
        senderName
        carrierName
        beneficiary
        createdAt
        updatedAt
        checkNum
        amount
        status
      }
      nextToken
    }
  }
`;

export const CHECK_BY_SENDER_PICKEDUP = /* GraphQL */ `
  query CheckBySenderStatus(
    $companyId: ID
    $sortDirection: ModelSortDirection
    $start: String
    $end: String
    $filter: ModelCheckFilterInput
    $limit: Int
    $nextToken: String
  ) {
    checkBySenderStatus(
      senderId: $companyId
      statusOrderCreationDate: {
        between: [{
          status: PICKEDUP,
          orderCreationDate: $start
        }, {
          status: PICKEDUP,
          orderCreationDate: $end
        }]
      }
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        stamp
        order { stamp }
        senderId
        receiverId
        carrierId
        orderCreationDate
        orderId
        orderStamp
        keyDocNum
        docsRef { date number type }
        receiverName
        senderName
        carrierName
        beneficiary
        createdAt
        updatedAt
        checkNum
        amount
        status
      }
      nextToken
    }
  }
`;

export const CHECK_BY_SENDER_RECORDING = /* GraphQL */ `
  query CheckBySenderStatus(
    $companyId: ID
    $sortDirection: ModelSortDirection
    $start: String
    $end: String
    $filter: ModelCheckFilterInput
    $limit: Int
    $nextToken: String
  ) {
    checkBySenderStatus(
      senderId: $companyId
      statusOrderCreationDate: {
        between: [{
          status: RECORDING,
          orderCreationDate: $start
        }, {
          status: RECORDING,
          orderCreationDate: $end
        }]
      }
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        stamp
        order { stamp }
        senderId
        receiverId
        carrierId
        orderCreationDate
        orderId
        orderStamp
        keyDocNum
        docsRef { date number type }
        receiverName
        senderName
        carrierName
        beneficiary
        createdAt
        updatedAt
        checkNum
        amount
        status
      }
      nextToken
    }
  }
`;

export const CHECK_BY_SENDER_DELIVERING = /* GraphQL */ `
  query CheckBySenderStatus(
    $companyId: ID
    $sortDirection: ModelSortDirection
    $start: String
    $end: String
    $filter: ModelCheckFilterInput
    $limit: Int
    $nextToken: String
  ) {
    checkBySenderStatus(
      senderId: $companyId
      statusOrderCreationDate: {
        between: [{
          status: DELIVERING,
          orderCreationDate: $start
        }, {
          status: DELIVERING,
          orderCreationDate: $end
        }]
      }
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        stamp
        order { stamp }
        senderId
        receiverId
        carrierId
        orderCreationDate
        orderId
        orderStamp
        keyDocNum
        docsRef { date number type }
        receiverName
        senderName
        carrierName
        beneficiary
        createdAt
        updatedAt
        checkNum
        amount
        status
      }
      nextToken
    }
  }
`;

export const CHECK_BY_SENDER_DELIVERED = /* GraphQL */ `
query CheckBySenderStatus(
  $companyId: ID
  $sortDirection: ModelSortDirection
  $start: String
  $end: String
  $filter: ModelCheckFilterInput
  $limit: Int
  $nextToken: String
) {
  checkBySenderStatus(
    senderId: $companyId
    statusOrderCreationDate: {
      between: [{
        status: DELIVERED,
        orderCreationDate: $start
      }, {
        status: DELIVERED,
        orderCreationDate: $end
      }]
    }
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      stamp
      order { stamp }
      senderId
      receiverId
      carrierId
      orderCreationDate
      orderId
      orderStamp
      keyDocNum
      docsRef { date number type }
      receiverName
      senderName
      carrierName
      beneficiary
      createdAt
      updatedAt
      checkNum
      amount
      status
    }
    nextToken
  }
}
`;

export const CHECK_BY_SENDER_ARCHIVED = /* GraphQL */ `
query CheckBySenderStatus(
  $companyId: ID
  $sortDirection: ModelSortDirection
  $start: String
  $end: String
  $filter: ModelCheckFilterInput
  $limit: Int
  $nextToken: String
) {
  checkBySenderStatus(
    senderId: $companyId
    statusOrderCreationDate: {
      between: [{
        status: ARCHIVED,
        orderCreationDate: $start
      }, {
        status: ARCHIVED,
        orderCreationDate: $end
      }]
    }
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      stamp
      order { stamp }
      senderId
      receiverId
      carrierId
      orderCreationDate
      orderId
      orderStamp
      keyDocNum
      docsRef { date number type }
      receiverName
      senderName
      carrierName
      beneficiary
      createdAt
      updatedAt
      checkNum
      amount
      status
    }
    nextToken
  }
}
`;


// RECEIVER ---------------------------------------------------------------------------------------------------------------------------------------
export const CHECK_BY_RECEIVER = /* GraphQL */ `
  query CheckByReceiver(
    $companyId: ID
    $orderCreationDate: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCheckFilterInput
    $limit: Int
    $nextToken: String
  ) {
    checkByReceiver(
      receiverId: $companyId
      orderCreationDate: $orderCreationDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        stamp
        order { stamp }
        senderId
        receiverId
        carrierId
        orderCreationDate
        orderId
        orderStamp
        keyDocNum
        docsRef { date number type }
        receiverName
        senderName
        carrierName
        beneficiary
        createdAt
        updatedAt
        checkNum
        amount
        status
      }
      nextToken
    }
  }
`;

export const CHECK_BY_RECEIVER_PENDING = /* GraphQL */ `
query CheckByReceiverStatus(
  $companyId: ID
  $sortDirection: ModelSortDirection
  $start: String
  $end: String
  $filter: ModelCheckFilterInput
  $limit: Int
  $nextToken: String
) {
  checkByReceiverStatus(
    receiverId: $companyId
    statusOrderCreationDate: {
      between: [{
        status: PENDING,
        orderCreationDate: $start
      }, {
        status: PENDING,
        orderCreationDate: $end
      }]
    }
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      stamp
      order { stamp }
      senderId
      receiverId
      carrierId
      orderCreationDate
      orderId
      orderStamp
      keyDocNum
      docsRef { date number type }
      receiverName
      senderName
      carrierName
      beneficiary
      createdAt
      updatedAt
      checkNum
      amount
      status
    }
    nextToken
  }
}
`;

export const CHECK_BY_RECEIVER_PICKEDUP = /* GraphQL */ `
query CheckByReceiverStatus(
  $companyId: ID
  $sortDirection: ModelSortDirection
  $start: String
  $end: String
  $filter: ModelCheckFilterInput
  $limit: Int
  $nextToken: String
) {
  checkByReceiverStatus(
    receiverId: $companyId
    statusOrderCreationDate: {
      between: [{
        status: PICKEDUP,
        orderCreationDate: $start
      }, {
        status: PICKEDUP,
        orderCreationDate: $end
      }]
    }
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      stamp
      order { stamp }
      senderId
      receiverId
      carrierId
      orderCreationDate
      orderId
      orderStamp
      keyDocNum
      docsRef { date number type }
      receiverName
      senderName
      carrierName
      beneficiary
      createdAt
      updatedAt
      checkNum
      amount
      status
    }
    nextToken
  }
}
`;

export const CHECK_BY_RECEIVER_RECORDING = /* GraphQL */ `
query CheckByReceiverStatus(
  $companyId: ID
  $sortDirection: ModelSortDirection
  $start: String
  $end: String
  $filter: ModelCheckFilterInput
  $limit: Int
  $nextToken: String
) {
  checkByReceiverStatus(
    receiverId: $companyId
    statusOrderCreationDate: {
      between: [{
        status: RECORDING,
        orderCreationDate: $start
      }, {
        status: RECORDING,
        orderCreationDate: $end
      }]
    }
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      stamp
      order { stamp }
      senderId
      receiverId
      carrierId
      orderCreationDate
      orderId
      orderStamp
      keyDocNum
      docsRef { date number type }
      receiverName
      senderName
      carrierName
      beneficiary
      createdAt
      updatedAt
      checkNum
      amount
      status
    }
    nextToken
  }
}
`;

export const CHECK_BY_RECEIVER_DELIVERING = /* GraphQL */ `
query CheckByReceiverStatus(
  $companyId: ID
  $sortDirection: ModelSortDirection
  $start: String
  $end: String
  $filter: ModelCheckFilterInput
  $limit: Int
  $nextToken: String
) {
  checkByReceiverStatus(
    receiverId: $companyId
    statusOrderCreationDate: {
      between: [{
        status: DELIVERING,
        orderCreationDate: $start
      }, {
        status: DELIVERING,
        orderCreationDate: $end
      }]
    }
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      stamp
      order { stamp }
      senderId
      receiverId
      carrierId
      orderCreationDate
      orderId
      orderStamp
      keyDocNum
      docsRef { date number type }
      receiverName
      senderName
      carrierName
      beneficiary
      createdAt
      updatedAt
      checkNum
      amount
      status
    }
    nextToken
  }
}
`;

export const CHECK_BY_RECEIVER_DELIVERED = /* GraphQL */ `
query CheckByReceiverStatus(
  $companyId: ID
  $sortDirection: ModelSortDirection
  $start: String
  $end: String
  $filter: ModelCheckFilterInput
  $limit: Int
  $nextToken: String
) {
  checkByReceiverStatus(
    receiverId: $companyId
    statusOrderCreationDate: {
      between: [{
        status: DELIVERED,
        orderCreationDate: $start
      }, {
        status: DELIVERED,
        orderCreationDate: $end
      }]
    }
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      stamp
      order { stamp }
      senderId
      receiverId
      carrierId
      orderCreationDate
      orderId
      orderStamp
      keyDocNum
      docsRef { date number type }
      receiverName
      senderName
      carrierName
      beneficiary
      createdAt
      updatedAt
      checkNum
      amount
      status
    }
    nextToken
  }
}
`;

export const CHECK_BY_RECEIVER_ARCHIVED = /* GraphQL */ `
query CheckByReceiverStatus(
  $companyId: ID
  $sortDirection: ModelSortDirection
  $start: String
  $end: String
  $filter: ModelCheckFilterInput
  $limit: Int
  $nextToken: String
) {
  checkByReceiverStatus(
    receiverId: $companyId
    statusOrderCreationDate: {
      between: [{
        status: ARCHIVED,
        orderCreationDate: $start
      }, {
        status: ARCHIVED,
        orderCreationDate: $end
      }]
    }
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      stamp
      order { stamp }
      senderId
      receiverId
      carrierId
      orderCreationDate
      orderId
      orderStamp
      keyDocNum
      docsRef { date number type }
      receiverName
      senderName
      carrierName
      beneficiary
      createdAt
      updatedAt
      checkNum
      amount
      status
    }
    nextToken
  }
}
`;

// GET ---------------------------------------------------------------------------------------------------------------------------------------
export const CHECK_BY_ORDERID = /* GraphQL */ `
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
        stamp
        order { stamp }
        senderId
        receiverId
        carrierId
        orderCreationDate
        orderId
        orderStamp
        keyDocNum
        docsRef { date number type }
        receiverName
        senderName
        carrierName
        beneficiary
        createdAt
        updatedAt
        checkNum
        amount
        status
      }
    }
  }
`;

export const CHECK_BY_ID = /* GraphQL */ `
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
          files { filename identityId bucket region key extension timestamp }
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
          tag
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
          tag
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
          tag
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
          tag
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
          tag
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
