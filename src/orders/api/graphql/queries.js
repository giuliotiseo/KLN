// Carrier ------------------------------------------------------------------------------------------------------------------------
export const ORDER_BY_CARRIER = /* GraphQL */ `
  query OrderByCarrierCreatedAt(
    $companyId: ID
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderByCarrierCreatedAt(
      carrierId: $companyId
      createdAt: {
        between: [ $start, $end ]
      }
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
        pickupStorageName
        pickupStorageVat
        tenantPickupStorage
        deliveryStorageId
        deliveryStorageName
        deliveryStorageVat
        tenantDeliveryStorage
        tenantCarrier
        tenantSender
        tenantReceiver
        carrierName
        senderName
        receiverName
        carrierVat
        senderVat
        receiverVat
        createdAt
        updatedAt
        completedAt
        shipmentType
        loadingMeter
        netWeight
        pickupCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        pickupDateStart
        pickupDateEnd
        depotCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        depotDateStart
        depotDateEnd
        deliveryCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        deliveryDateStart
        deliveryDateEnd
        pickupAddress
        deliveryAddress
        depotAddress
        status
        support
        quantity
        size
      }
      nextToken
    }
  }
`;

export const ORDER_BY_CARRIER_PENDING = /* GraphQL */ `
  query OrderByCarrierStatusCreatedAt(
    $companyId: ID
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderByCarrierStatusCreatedAt(
      carrierId: $companyId
      statusCreatedAt: {
        between: [{
          status: PENDING,
          createdAt: $start
        }, {
          status: PENDING,
          createdAt: $end
        }]
      }
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
        pickupStorageName
        pickupStorageVat
        tenantPickupStorage
        deliveryStorageId
        deliveryStorageName
        deliveryStorageVat
        tenantDeliveryStorage
        tenantCarrier
        tenantSender
        tenantReceiver
        carrierName
        senderName
        receiverName
        carrierVat
        senderVat
        receiverVat
        createdAt
        updatedAt
        completedAt
        shipmentType
        loadingMeter
        netWeight
        pickupCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        pickupDateStart
        pickupDateEnd
        depotCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        depotDateStart
        depotDateEnd
        deliveryCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        deliveryDateStart
        deliveryDateEnd
        pickupAddress
        deliveryAddress
        depotAddress
        status
        support
        quantity
        size
      }
      nextToken
    }
  }
`;

export const ORDER_BY_CARRIER_PICKEDUP = /* GraphQL */ `
  query OrderByCarrierStatusCreatedAt(
    $companyId: ID
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderByCarrierStatusCreatedAt(
      carrierId: $companyId
      statusCreatedAt: {
        between: [{
          status: PICKEDUP,
          createdAt: $start
        }, {
          status: PICKEDUP,
          createdAt: $end
        }]
      }
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
        pickupStorageName
        pickupStorageVat
        tenantPickupStorage
        deliveryStorageId
        deliveryStorageName
        deliveryStorageVat
        tenantDeliveryStorage
        tenantCarrier
        tenantSender
        tenantReceiver
        carrierName
        senderName
        receiverName
        carrierVat
        senderVat
        receiverVat
        createdAt
        updatedAt
        completedAt
        shipmentType
        loadingMeter
        netWeight
        pickupCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        pickupDateStart
        pickupDateEnd
        depotCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        depotDateStart
        depotDateEnd
        deliveryCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        deliveryDateStart
        deliveryDateEnd
        pickupAddress
        deliveryAddress
        depotAddress
        status
        support
        quantity
        size
      }
      nextToken
    }
  }
`;

export const ORDER_BY_CARRIER_STOCKED = /* GraphQL */ `
  query OrderByCarrierStatusCreatedAt(
    $companyId: ID
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderByCarrierStatusCreatedAt(
      carrierId: $companyId
      statusCreatedAt: {
        between: [{
          status: STOCKED,
          createdAt: $start
        }, {
          status: STOCKED,
          createdAt: $end
        }]
      }
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
        pickupStorageName
        pickupStorageVat
        tenantPickupStorage
        deliveryStorageId
        deliveryStorageName
        deliveryStorageVat
        tenantDeliveryStorage
        tenantCarrier
        tenantSender
        tenantReceiver
        carrierName
        senderName
        receiverName
        carrierVat
        senderVat
        receiverVat
        createdAt
        updatedAt
        completedAt
        shipmentType
        loadingMeter
        netWeight
        pickupCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        pickupDateStart
        pickupDateEnd
        depotCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        depotDateStart
        depotDateEnd
        deliveryCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        deliveryDateStart
        deliveryDateEnd
        pickupAddress
        deliveryAddress
        depotAddress
        status
        support
        quantity
        size
      }
      nextToken
    }
  }
`;

export const ORDER_BY_CARRIER_DELIVERING = /* GraphQL */ `
  query OrderByCarrierStatusCreatedAt(
    $companyId: ID
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderByCarrierStatusCreatedAt(
      carrierId: $companyId
      statusCreatedAt: {
        between: [{
          status: DELIVERING,
          createdAt: $start
        }, {
          status: DELIVERING,
          createdAt: $end
        }]
      }
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
        pickupStorageName
        pickupStorageVat
        tenantPickupStorage
        deliveryStorageId
        deliveryStorageName
        deliveryStorageVat
        tenantDeliveryStorage
        tenantCarrier
        tenantSender
        tenantReceiver
        carrierName
        senderName
        receiverName
        carrierVat
        senderVat
        receiverVat
        createdAt
        updatedAt
        completedAt
        shipmentType
        loadingMeter
        netWeight
        pickupCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        pickupDateStart
        pickupDateEnd
        depotCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        depotDateStart
        depotDateEnd
        deliveryCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        deliveryDateStart
        deliveryDateEnd
        pickupAddress
        deliveryAddress
        depotAddress
        status
        support
        quantity
        size
      }
      nextToken
    }
  }
`;

export const ORDER_BY_CARRIER_DELIVERED = /* GraphQL */ `
  query OrderByCarrierStatusCreatedAt(
    $companyId: ID
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderByCarrierStatusCreatedAt(
      carrierId: $companyId
      statusCreatedAt: {
        between: [{
          status: DELIVERED,
          createdAt: $start
        }, {
          status: DELIVERED,
          createdAt: $end
        }]
      }
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
        pickupStorageName
        pickupStorageVat
        tenantPickupStorage
        deliveryStorageId
        deliveryStorageName
        deliveryStorageVat
        tenantDeliveryStorage
        tenantCarrier
        tenantSender
        tenantReceiver
        carrierName
        senderName
        receiverName
        carrierVat
        senderVat
        receiverVat
        createdAt
        updatedAt
        completedAt
        shipmentType
        loadingMeter
        netWeight
        pickupCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        pickupDateStart
        pickupDateEnd
        depotCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        depotDateStart
        depotDateEnd
        deliveryCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        deliveryDateStart
        deliveryDateEnd
        pickupAddress
        deliveryAddress
        depotAddress
        status
        support
        quantity
        size
      }
      nextToken
    }
  }
`;

export const ORDER_BY_CARRIER_ARCHIVED = /* GraphQL */ `
  query OrderByCarrierStatusCreatedAt(
    $companyId: ID
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderByCarrierStatusCreatedAt(
      carrierId: $companyId
      statusCreatedAt: {
        between: [{
          status: ARCHIVED,
          createdAt: $start
        }, {
          status: ARCHIVED,
          createdAt: $end
        }]
      }
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
        pickupStorageName
        pickupStorageVat
        tenantPickupStorage
        deliveryStorageId
        deliveryStorageName
        deliveryStorageVat
        tenantDeliveryStorage
        tenantCarrier
        tenantSender
        tenantReceiver
        carrierName
        senderName
        receiverName
        carrierVat
        senderVat
        receiverVat
        createdAt
        updatedAt
        completedAt
        shipmentType
        loadingMeter
        netWeight
        pickupCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        pickupDateStart
        pickupDateEnd
        depotCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        depotDateStart
        depotDateEnd
        deliveryCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        deliveryDateStart
        deliveryDateEnd
        pickupAddress
        deliveryAddress
        depotAddress
        status
        support
        quantity
        size
      }
      nextToken
    }
  }
`;

export const ORDER_BY_CARRIER_COLLECTCHECKS = /* GraphQL */ `
  query OrderByCarrierCollectChecksStatus(
    $companyId: ID
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderByCarrierCollectChecksStatus(
      carrierId: $companyId
      collectChecksStatus: {
        beginsWith: {
          collectChecks: 1
        }
      }
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
        pickupStorageName
        pickupStorageVat
        tenantPickupStorage
        deliveryStorageId
        deliveryStorageName
        deliveryStorageVat
        tenantDeliveryStorage
        tenantCarrier
        tenantSender
        tenantReceiver
        carrierName
        senderName
        receiverName
        carrierVat
        senderVat
        receiverVat
        createdAt
        docs {
          date
          number
          files { filename identityId bucket region key extension timestamp }
          type
        }
        updatedAt
        completedAt
        shipmentType
        loadingMeter
        netWeight
        pickupCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        pickupDateStart
        pickupDateEnd
        depotCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        depotDateStart
        depotDateEnd
        deliveryCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        deliveryDateStart
        deliveryDateEnd
        pickupAddress
        deliveryAddress
        depotAddress
        status
        support
        quantity
        checksAmount
        size
      }
      nextToken
    }
  }
`;


// Sender ------------------------------------------------------------------------------------------------------------------------
export const ORDER_BY_SENDER = /* GraphQL */ `
  query OrderBySenderCreatedAt(
    $companyId: ID
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderBySenderCreatedAt(
      senderId: $companyId
      createdAt: {
        between: [ $start, $end ]
      }
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
        pickupStorageName
        pickupStorageVat
        tenantPickupStorage
        deliveryStorageId
        deliveryStorageName
        deliveryStorageVat
        tenantDeliveryStorage
        tenantCarrier
        tenantSender
        tenantReceiver
        carrierName
        senderName
        receiverName
        carrierVat
        senderVat
        receiverVat
        createdAt
        updatedAt
        completedAt
        shipmentType
        loadingMeter
        netWeight
        pickupCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        pickupDateStart
        pickupDateEnd
        depotCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        depotDateStart
        depotDateEnd
        deliveryCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        deliveryDateStart
        deliveryDateEnd
        pickupAddress
        deliveryAddress
        depotAddress
        status
        support
        quantity
        size
      }
      nextToken
    }
  }
`;

export const ORDER_BY_SENDER_PENDING = /* GraphQL */ `
  query OrderBySenderStatusCreatedAt(
    $companyId: ID
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderBySenderStatusCreatedAt(
      senderId: $companyId
      statusCreatedAt: {
        between: [{
          status: PENDING,
          createdAt: $start
        }, {
          status: PENDING,
          createdAt: $end
        }]
      }
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
        pickupStorageName
        pickupStorageVat
        tenantPickupStorage
        deliveryStorageId
        deliveryStorageName
        deliveryStorageVat
        tenantDeliveryStorage
        tenantCarrier
        tenantSender
        tenantReceiver
        carrierName
        senderName
        receiverName
        carrierVat
        senderVat
        receiverVat
        createdAt
        updatedAt
        completedAt
        shipmentType
        loadingMeter
        netWeight
        pickupCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        pickupDateStart
        pickupDateEnd
        depotCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        depotDateStart
        depotDateEnd
        deliveryCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        deliveryDateStart
        deliveryDateEnd
        pickupAddress
        deliveryAddress
        depotAddress
        status
        support
        quantity
        size
      }
      nextToken
    }
  }
`;

export const ORDER_BY_SENDER_PICKEDUP = /* GraphQL */ `
  query OrderBySenderStatusCreatedAt(
    $companyId: ID
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderBySenderStatusCreatedAt(
      senderId: $companyId
      statusCreatedAt: {
        between: [{
          status: PICKEDUP,
          createdAt: $start
        }, {
          status: PICKEDUP,
          createdAt: $end
        }]
      }
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
        pickupStorageName
        pickupStorageVat
        tenantPickupStorage
        deliveryStorageId
        deliveryStorageName
        deliveryStorageVat
        tenantDeliveryStorage
        tenantCarrier
        tenantSender
        tenantReceiver
        carrierName
        senderName
        receiverName
        carrierVat
        senderVat
        receiverVat
        createdAt
        updatedAt
        completedAt
        shipmentType
        loadingMeter
        netWeight
        pickupCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        pickupDateStart
        pickupDateEnd
        depotCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        depotDateStart
        depotDateEnd
        deliveryCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        deliveryDateStart
        deliveryDateEnd
        pickupAddress
        deliveryAddress
        depotAddress
        status
        support
        quantity
        size
      }
      nextToken
    }
  }
`;

export const ORDER_BY_SENDER_STOCKED = /* GraphQL */ `
  query OrderBySenderStatusCreatedAt(
    $companyId: ID
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderBySenderStatusCreatedAt(
      senderId: $companyId
      statusCreatedAt: {
        between: [{
          status: STOCKED,
          createdAt: $start
        }, {
          status: STOCKED,
          createdAt: $end
        }]
      }
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
        pickupStorageName
        pickupStorageVat
        tenantPickupStorage
        deliveryStorageId
        deliveryStorageName
        deliveryStorageVat
        tenantDeliveryStorage
        tenantCarrier
        tenantSender
        tenantReceiver
        carrierName
        senderName
        receiverName
        carrierVat
        senderVat
        receiverVat
        createdAt
        updatedAt
        completedAt
        shipmentType
        loadingMeter
        netWeight
        pickupCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        pickupDateStart
        pickupDateEnd
        depotCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        depotDateStart
        depotDateEnd
        deliveryCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        deliveryDateStart
        deliveryDateEnd
        pickupAddress
        deliveryAddress
        depotAddress
        status
        support
        quantity
        size
      }
      nextToken
    }
  }
`;

export const ORDER_BY_SENDER_DELIVERING = /* GraphQL */ `
  query OrderBySenderStatusCreatedAt(
    $companyId: ID
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderBySenderStatusCreatedAt(
      senderId: $companyId
      statusCreatedAt: {
        between: [{
          status: DELIVERING,
          createdAt: $start
        }, {
          status: DELIVERING,
          createdAt: $end
        }]
      }
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
        pickupStorageName
        pickupStorageVat
        tenantPickupStorage
        deliveryStorageId
        deliveryStorageName
        deliveryStorageVat
        tenantDeliveryStorage
        tenantCarrier
        tenantSender
        tenantReceiver
        carrierName
        senderName
        receiverName
        carrierVat
        senderVat
        receiverVat
        createdAt
        updatedAt
        completedAt
        shipmentType
        loadingMeter
        netWeight
        pickupCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        pickupDateStart
        pickupDateEnd
        depotCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        depotDateStart
        depotDateEnd
        deliveryCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        deliveryDateStart
        deliveryDateEnd
        pickupAddress
        deliveryAddress
        depotAddress
        status
        support
        quantity
        size
      }
      nextToken
    }
  }
`;

export const ORDER_BY_SENDER_DELIVERED = /* GraphQL */ `
  query OrderBySenderStatusCreatedAt(
    $companyId: ID
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderBySenderStatusCreatedAt(
      senderId: $companyId
      statusCreatedAt: {
        between: [{
          status: DELIVERED,
          createdAt: $start
        }, {
          status: DELIVERED,
          createdAt: $end
        }]
      }
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
        pickupStorageName
        pickupStorageVat
        tenantPickupStorage
        deliveryStorageId
        deliveryStorageName
        deliveryStorageVat
        tenantDeliveryStorage
        tenantCarrier
        tenantSender
        tenantReceiver
        carrierName
        senderName
        receiverName
        carrierVat
        senderVat
        receiverVat
        createdAt
        updatedAt
        completedAt
        shipmentType
        loadingMeter
        netWeight
        pickupCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        pickupDateStart
        pickupDateEnd
        depotCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        depotDateStart
        depotDateEnd
        deliveryCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        deliveryDateStart
        deliveryDateEnd
        pickupAddress
        deliveryAddress
        depotAddress
        status
        support
        quantity
        size
      }
      nextToken
    }
  }
`;

export const ORDER_BY_SENDER_ARCHIVED = /* GraphQL */ `
  query OrderBySenderStatusCreatedAt(
    $companyId: ID
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderBySenderStatusCreatedAt(
      senderId: $companyId
      statusCreatedAt: {
        between: [{
          status: ARCHIVED,
          createdAt: $start
        }, {
          status: ARCHIVED,
          createdAt: $end
        }]
      }
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
        pickupStorageName
        pickupStorageVat
        tenantPickupStorage
        deliveryStorageId
        deliveryStorageName
        deliveryStorageVat
        tenantDeliveryStorage
        tenantCarrier
        tenantSender
        tenantReceiver
        carrierName
        senderName
        receiverName
        carrierVat
        senderVat
        receiverVat
        createdAt
        updatedAt
        completedAt
        shipmentType
        loadingMeter
        netWeight
        pickupCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        pickupDateStart
        pickupDateEnd
        depotCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        depotDateStart
        depotDateEnd
        deliveryCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        deliveryDateStart
        deliveryDateEnd
        pickupAddress
        deliveryAddress
        depotAddress
        status
        support
        quantity
        size
      }
      nextToken
    }
  }
`;

// Receiver ------------------------------------------------------------------------------------------------------------------------
export const ORDER_BY_RECEIVER = /* GraphQL */ `
  query OrderByReceiverCreatedAt(
    $companyId: ID
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderByReceiverCreatedAt(
      receiverId: $companyId
      createdAt: {
        between: [ $start, $end ]
      }
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
        pickupStorageName
        pickupStorageVat
        tenantPickupStorage
        deliveryStorageId
        deliveryStorageName
        deliveryStorageVat
        tenantDeliveryStorage
        tenantCarrier
        tenantSender
        tenantReceiver
        carrierName
        senderName
        receiverName
        carrierVat
        senderVat
        receiverVat
        createdAt
        updatedAt
        completedAt
        shipmentType
        loadingMeter
        netWeight
        pickupCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        pickupDateStart
        pickupDateEnd
        depotCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        depotDateStart
        depotDateEnd
        deliveryCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        deliveryDateStart
        deliveryDateEnd
        pickupAddress
        deliveryAddress
        depotAddress
        status
        support
        quantity
        size
      }
      nextToken
    }
  }
`;

export const ORDER_BY_RECEIVER_PENDING = /* GraphQL */ `
  query OrderByReceiverStatusCreatedAt(
    $companyId: ID
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderByReceiverStatusCreatedAt(
      receiverId: $companyId
      statusCreatedAt: {
        between: [{
          status: PENDING,
          createdAt: $start
        }, {
          status: PENDING,
          createdAt: $end
        }]
      }
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
        pickupStorageName
        pickupStorageVat
        tenantPickupStorage
        deliveryStorageId
        deliveryStorageName
        deliveryStorageVat
        tenantDeliveryStorage
        tenantCarrier
        tenantSender
        tenantReceiver
        carrierName
        senderName
        receiverName
        carrierVat
        senderVat
        receiverVat
        createdAt
        updatedAt
        completedAt
        shipmentType
        loadingMeter
        netWeight
        pickupCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        pickupDateStart
        pickupDateEnd
        depotCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        depotDateStart
        depotDateEnd
        deliveryCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        deliveryDateStart
        deliveryDateEnd
        pickupAddress
        deliveryAddress
        depotAddress
        status
        support
        quantity
        size
      }
      nextToken
    }
  }
`;

export const ORDER_BY_RECEIVER_PICKEDUP = /* GraphQL */ `
  query OrderByReceiverStatusCreatedAt(
    $companyId: ID
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderByReceiverStatusCreatedAt(
      receiverId: $companyId
      statusCreatedAt: {
        between: [{
          status: PICKEDUP,
          createdAt: $start
        }, {
          status: PICKEDUP,
          createdAt: $end
        }]
      }
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
        pickupStorageName
        pickupStorageVat
        tenantPickupStorage
        deliveryStorageId
        deliveryStorageName
        deliveryStorageVat
        tenantDeliveryStorage
        tenantCarrier
        tenantSender
        tenantReceiver
        carrierName
        senderName
        receiverName
        carrierVat
        senderVat
        receiverVat
        createdAt
        updatedAt
        completedAt
        shipmentType
        loadingMeter
        netWeight
        pickupCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        pickupDateStart
        pickupDateEnd
        depotCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        depotDateStart
        depotDateEnd
        deliveryCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        deliveryDateStart
        deliveryDateEnd
        pickupAddress
        deliveryAddress
        depotAddress
        status
        support
        quantity
        size
      }
      nextToken
    }
  }
`;

export const ORDER_BY_RECEIVER_STOCKED = /* GraphQL */ `
  query OrderByReceiverStatusCreatedAt(
    $companyId: ID
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderByReceiverStatusCreatedAt(
      receiverId: $companyId
      statusCreatedAt: {
        between: [{
          status: STOCKED,
          createdAt: $start
        }, {
          status: STOCKED,
          createdAt: $end
        }]
      }
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
        pickupStorageName
        pickupStorageVat
        tenantPickupStorage
        deliveryStorageId
        deliveryStorageName
        deliveryStorageVat
        tenantDeliveryStorage
        tenantCarrier
        tenantSender
        tenantReceiver
        carrierName
        senderName
        receiverName
        carrierVat
        senderVat
        receiverVat
        createdAt
        updatedAt
        completedAt
        shipmentType
        loadingMeter
        netWeight
        pickupCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        pickupDateStart
        pickupDateEnd
        depotCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        depotDateStart
        depotDateEnd
        deliveryCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        deliveryDateStart
        deliveryDateEnd
        pickupAddress
        deliveryAddress
        depotAddress
        status
        support
        quantity
        size
      }
      nextToken
    }
  }
`;

export const ORDER_BY_RECEIVER_DELIVERING = /* GraphQL */ `
  query OrderByReceiverStatusCreatedAt(
    $companyId: ID
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderByReceiverStatusCreatedAt(
      receiverId: $companyId
      statusCreatedAt: {
        between: [{
          status: DELIVERING,
          createdAt: $start
        }, {
          status: DELIVERING,
          createdAt: $end
        }]
      }
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
        pickupStorageName
        pickupStorageVat
        tenantPickupStorage
        deliveryStorageId
        deliveryStorageName
        deliveryStorageVat
        tenantDeliveryStorage
        tenantCarrier
        tenantSender
        tenantReceiver
        carrierName
        senderName
        receiverName
        carrierVat
        senderVat
        receiverVat
        createdAt
        updatedAt
        completedAt
        shipmentType
        loadingMeter
        netWeight
        pickupCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        pickupDateStart
        pickupDateEnd
        depotCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        depotDateStart
        depotDateEnd
        deliveryCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        deliveryDateStart
        deliveryDateEnd
        pickupAddress
        deliveryAddress
        depotAddress
        status
        support
        quantity
        size
      }
      nextToken
    }
  }
`;

export const ORDER_BY_RECEIVER_DELIVERED = /* GraphQL */ `
  query OrderByReceiverStatusCreatedAt(
    $companyId: ID
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderByReceiverStatusCreatedAt(
      receiverId: $companyId
      statusCreatedAt: {
        between: [{
          status: DELIVERED,
          createdAt: $start
        }, {
          status: DELIVERED,
          createdAt: $end
        }]
      }
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
        pickupStorageName
        pickupStorageVat
        tenantPickupStorage
        deliveryStorageId
        deliveryStorageName
        deliveryStorageVat
        tenantDeliveryStorage
        tenantCarrier
        tenantSender
        tenantReceiver
        carrierName
        senderName
        receiverName
        carrierVat
        senderVat
        receiverVat
        createdAt
        updatedAt
        completedAt
        shipmentType
        loadingMeter
        netWeight
        pickupCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        pickupDateStart
        pickupDateEnd
        depotCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        depotDateStart
        depotDateEnd
        deliveryCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        deliveryDateStart
        deliveryDateEnd
        pickupAddress
        deliveryAddress
        depotAddress
        status
        support
        quantity
        size
      }
      nextToken
    }
  }
`;

export const ORDER_BY_RECEIVER_ARCHIVED = /* GraphQL */ `
  query OrderByReceiverStatusCreatedAt(
    $companyId: ID
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderByReceiverStatusCreatedAt(
      receiverId: $companyId
      statusCreatedAt: {
        between: [{
          status: ARCHIVED,
          createdAt: $start
        }, {
          status: ARCHIVED,
          createdAt: $end
        }]
      }
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
        pickupStorageName
        pickupStorageVat
        tenantPickupStorage
        deliveryStorageId
        deliveryStorageName
        deliveryStorageVat
        tenantDeliveryStorage
        tenantCarrier
        tenantSender
        tenantReceiver
        carrierName
        senderName
        receiverName
        carrierVat
        senderVat
        receiverVat
        createdAt
        updatedAt
        completedAt
        shipmentType
        loadingMeter
        netWeight
        pickupCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        pickupDateStart
        pickupDateEnd
        depotCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        depotDateStart
        depotDateEnd
        deliveryCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        deliveryDateStart
        deliveryDateEnd
        pickupAddress
        deliveryAddress
        depotAddress
        status
        support
        quantity
        size
      }
      nextToken
    }
  }
`;

export const ORDER_BY_RECEIVER_COLLECTCHECKS = /* GraphQL */ `
  query OrderByReceiverCollectChecksStatus(
    $companyId: ID
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderByReceiverCollectChecksStatus(
      receiverId: $companyId
      collectChecksStatus: {
        beginsWith: {
          collectChecks: 1
        }
      }
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
        createdAt
        pickupStorageId
        pickupStorageName
        pickupStorageVat
        tenantPickupStorage
        deliveryStorageId
        deliveryStorageName
        deliveryStorageVat
        tenantDeliveryStorage
        tenantCarrier
        tenantSender
        tenantReceiver
        carrierName
        senderName
        receiverName
        carrierVat
        senderVat
        receiverVat
        docs {
          date
          number
          files { filename identityId bucket region key extension timestamp }
          type
        }
        updatedAt
        completedAt
        shipmentType
        loadingMeter
        netWeight
        pickupCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        pickupDateStart
        pickupDateEnd
        depotCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        depotDateStart
        depotDateEnd
        deliveryCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        deliveryDateStart
        deliveryDateEnd
        pickupAddress
        deliveryAddress
        checksAmount
        depotAddress
        status
        support
        quantity
        size
      }
      nextToken
    }
  }
`;

export const ORDER_BY_CARRIER_TRAVEL = /* GraphQL */ `
  query OrderByCarrierTravel(
    $companyId: ID
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $nextToken: String
  ) {
    orderByCarrierCreatedAt(
      carrierId: $companyId
      createdAt: {
        between: [ $start, $end ]
      }
      filter: $filter
      sortDirection: $sortDirection
      limit: 9999
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
        createdAt
        pickupStorageId
        pickupStorageName
        pickupStorageVat
        tenantPickupStorage
        deliveryStorageId
        deliveryStorageName
        deliveryStorageVat
        tenantDeliveryStorage
        tenantCarrier
        tenantSender
        tenantReceiver
        carrierName
        senderName
        receiverName
        carrierVat
        senderVat
        receiverVat
        docs {
          date
          number
          files { filename identityId bucket region key extension timestamp }
          type
        }
        updatedAt
        completedAt
        shipmentType
        pickupCheckpoint {
          warehouseId
          extId
          thirdCompanyId
          thirdCompanyOwner
          thirdCompanyName
          thirdCompanyVat
          name
          location { place_id region province city address coordinate }
          contacts { contactId name email phone job }
          windows { start end days type }
          maxLength
          tools
          note
        }
        pickupDateStart
        pickupDateEnd
        depotCheckpoint {
          warehouseId
          extId
          thirdCompanyId
          thirdCompanyOwner
          thirdCompanyName
          thirdCompanyVat
          name
          location { place_id region province city address coordinate }
          contacts { contactId name email phone job }
          windows { start end days type }
          maxLength
          tools
          note
        }
        depotDateStart
        depotDateEnd
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
          windows { start end days type }
          maxLength
          tools
          note
        }
        deliveryDateStart
        deliveryDateEnd
        pickupAddress
        deliveryAddress
        checksAmount
        depotAddress
        status
        support
        quantity
        travels { items { id }}
        size
      }
      nextToken
    }
  }
`;

// Pickup Storage ------------------------------------------------------------------------------------------------------------------------
export const ORDER_BY_PICKUP_STORAGE = /* GraphQL */ `
  query OrderByPickupStorageCreatedAt(
    $companyId: ID
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderByPickupStorageCreatedAt(
      pickupStorageId: $companyId
      createdAt: {
        between: [$start, $end ]
      }
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
        pickupStorageName
        pickupStorageVat
        tenantPickupStorage
        deliveryStorageId
        deliveryStorageName
        deliveryStorageVat
        tenantDeliveryStorage
        tenantCarrier
        tenantSender
        tenantReceiver
        carrierName
        senderName
        receiverName
        carrierVat
        senderVat
        receiverVat
        createdAt
        updatedAt
        completedAt
        shipmentType
        loadingMeter
        netWeight
        pickupCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        pickupDateStart
        pickupDateEnd
        depotCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        depotDateStart
        depotDateEnd
        deliveryCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        deliveryDateStart
        deliveryDateEnd
        pickupAddress
        deliveryAddress
        depotAddress
        status
        support
        quantity
        size
      }
      nextToken
    }
  }
`;

export const ORDER_BY_PICKUP_STORAGE_PENDING = /* GraphQL */ `
  query OrderByPickupStorageStatusCreatedAt(
    $companyId: ID
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderByPickupStorageStatusCreatedAt(
      pickupStorageId: $companyId
      statusCreatedAt: {
        between: [{
          status: PENDING,
          createdAt: $start
        }, {
          status: PENDING,
          createdAt: $end
        }]
      }
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
        pickupStorageName
        pickupStorageVat
        tenantPickupStorage
        deliveryStorageId
        deliveryStorageName
        deliveryStorageVat
        tenantDeliveryStorage
        tenantCarrier
        tenantSender
        tenantReceiver
        carrierName
        senderName
        receiverName
        carrierVat
        senderVat
        receiverVat
        createdAt
        updatedAt
        completedAt
        shipmentType
        loadingMeter
        netWeight
        pickupCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        pickupDateStart
        pickupDateEnd
        depotCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        depotDateStart
        depotDateEnd
        deliveryCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        deliveryDateStart
        deliveryDateEnd
        pickupAddress
        deliveryAddress
        depotAddress
        status
        support
        quantity
        size
      }
      nextToken
    }
  }
`;

export const ORDER_BY_PICKUP_STORAGE_PICKEDUP = /* GraphQL */ `
  query OrderByStorageStatusCreatedAt(
    $companyId: ID
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderByPickupStorageStatusCreatedAt(
      pickupStorageId: $companyId
      statusCreatedAt: {
        between: [{
          status: PICKEDUP,
          createdAt: $start
        }, {
          status: PICKEDUP,
          createdAt: $end
        }]
      }
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
        pickupStorageName
        pickupStorageVat
        tenantPickupStorage
        deliveryStorageId
        deliveryStorageName
        deliveryStorageVat
        tenantDeliveryStorage
        tenantCarrier
        tenantSender
        tenantReceiver
        carrierName
        senderName
        receiverName
        carrierVat
        senderVat
        receiverVat
        createdAt
        updatedAt
        completedAt
        shipmentType
        loadingMeter
        netWeight
        pickupCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        pickupDateStart
        pickupDateEnd
        depotCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        depotDateStart
        depotDateEnd
        deliveryCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        deliveryDateStart
        deliveryDateEnd
        pickupAddress
        deliveryAddress
        depotAddress
        status
        support
        quantity
        size
      }
      nextToken
    }
  }
`;

export const ORDER_BY_PICKUP_STORAGE_STOCKED = /* GraphQL */ `
  query OrderByStorageStatusCreatedAt(
    $companyId: ID
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderByPickupStorageStatusCreatedAt(
      pickupStorageId: $companyId
      statusCreatedAt: {
        between: [{
          status: STOCKED,
          createdAt: $start
        }, {
          status: STOCKED,
          createdAt: $end
        }]
      }
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
        pickupStorageName
        pickupStorageVat
        tenantPickupStorage
        deliveryStorageId
        deliveryStorageName
        deliveryStorageVat
        tenantDeliveryStorage
        tenantCarrier
        tenantSender
        tenantReceiver
        carrierName
        senderName
        receiverName
        carrierVat
        senderVat
        receiverVat
        createdAt
        updatedAt
        completedAt
        shipmentType
        loadingMeter
        netWeight
        pickupCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        pickupDateStart
        pickupDateEnd
        depotCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        depotDateStart
        depotDateEnd
        deliveryCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        deliveryDateStart
        deliveryDateEnd
        pickupAddress
        deliveryAddress
        depotAddress
        status
        support
        quantity
        size
      }
      nextToken
    }
  }
`;

export const ORDER_BY_PICKUP_STORAGE_DELIVERING = /* GraphQL */ `
  query OrderByPickupStorageStatusCreatedAt(
    $companyId: ID
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderByPickupStorageStatusCreatedAt(
      pickupStorageId: $companyId
      statusCreatedAt: {
        between: [{
          status: DELIVERING,
          createdAt: $start
        }, {
          status: DELIVERING,
          createdAt: $end
        }]
      }
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
        pickupStorageName
        pickupStorageVat
        tenantPickupStorage
        deliveryStorageId
        deliveryStorageName
        deliveryStorageVat
        tenantDeliveryStorage
        tenantCarrier
        tenantSender
        tenantReceiver
        carrierName
        senderName
        receiverName
        carrierVat
        senderVat
        receiverVat
        createdAt
        updatedAt
        completedAt
        shipmentType
        loadingMeter
        netWeight
        pickupCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        pickupDateStart
        pickupDateEnd
        depotCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        depotDateStart
        depotDateEnd
        deliveryCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        deliveryDateStart
        deliveryDateEnd
        pickupAddress
        deliveryAddress
        depotAddress
        status
        support
        quantity
        size
      }
      nextToken
    }
  }
`;

export const ORDER_BY_PICKUP_STORAGE_DELIVERED = /* GraphQL */ `
  query OrderByPickupStorageStatusCreatedAt(
    $companyId: ID
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderByPickupStorageStatusCreatedAt(
      pickupStorageId: $companyId
      statusCreatedAt: {
        between: [{
          status: DELIVERED,
          createdAt: $start
        }, {
          status: DELIVERED,
          createdAt: $end
        }]
      }
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
        pickupStorageName
        pickupStorageVat
        tenantPickupStorage
        deliveryStorageId
        deliveryStorageName
        deliveryStorageVat
        tenantDeliveryStorage
        tenantCarrier
        tenantSender
        tenantReceiver
        carrierName
        senderName
        receiverName
        carrierVat
        senderVat
        receiverVat
        createdAt
        updatedAt
        completedAt
        shipmentType
        loadingMeter
        netWeight
        pickupCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        pickupDateStart
        pickupDateEnd
        depotCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        depotDateStart
        depotDateEnd
        deliveryCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        deliveryDateStart
        deliveryDateEnd
        pickupAddress
        deliveryAddress
        depotAddress
        status
        support
        quantity
        size
      }
      nextToken
    }
  }
`;


export const ORDER_BY_PICKUP_STORAGE_ARCHIVED = /* GraphQL */ `
  query OrderByPickupStorageStatusCreatedAt(
    $companyId: ID
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderByPickupStorageStatusCreatedAt(
      pickupStorageId: $companyId
      statusCreatedAt: {
        between: [{
          status: DELIVERED,
          createdAt: $start
        }, {
          status: DELIVERED,
          createdAt: $end
        }]
      }
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
        pickupStorageName
        pickupStorageVat
        tenantPickupStorage
        deliveryStorageId
        deliveryStorageName
        deliveryStorageVat
        tenantDeliveryStorage
        tenantCarrier
        tenantSender
        tenantReceiver
        carrierName
        senderName
        receiverName
        carrierVat
        senderVat
        receiverVat
        createdAt
        updatedAt
        completedAt
        shipmentType
        loadingMeter
        netWeight
        pickupCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        pickupDateStart
        pickupDateEnd
        depotCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        depotDateStart
        depotDateEnd
        deliveryCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        deliveryDateStart
        deliveryDateEnd
        pickupAddress
        deliveryAddress
        depotAddress
        status
        support
        quantity
        size
      }
      nextToken
    }
  }
`;


// Delivery Storage ------------------------------------------------------------------------------------------------------------------------
export const ORDER_BY_DELIVERY_STORAGE = /* GraphQL */ `
  query OrderByDeliveryStorageCreatedAt(
    $companyId: ID
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderByDeliveryStorageCreatedAt(
      deliveryStorageId: $companyId
      createdAt: {
        between: [ $start, $end ]
      }
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
        pickupStorageName
        pickupStorageVat
        tenantPickupStorage
        deliveryStorageId
        deliveryStorageName
        deliveryStorageVat
        tenantDeliveryStorage
        tenantCarrier
        tenantSender
        tenantReceiver
        carrierName
        senderName
        receiverName
        carrierVat
        senderVat
        receiverVat
        createdAt
        updatedAt
        completedAt
        shipmentType
        loadingMeter
        netWeight
        pickupCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        pickupDateStart
        pickupDateEnd
        depotCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        depotDateStart
        depotDateEnd
        deliveryCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        deliveryDateStart
        deliveryDateEnd
        pickupAddress
        deliveryAddress
        depotAddress
        status
        support
        quantity
        size
      }
      nextToken
    }
  }
`;

export const ORDER_BY_DELIVERY_STORAGE_PENDING = /* GraphQL */ `
  query OrderByDeliveryStorageStatusCreatedAt(
    $companyId: ID
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderByDeliveryStorageStatusCreatedAt(
      deliveryStorageId: $companyId
      statusCreatedAt: {
        between: [{
          status: PENDING,
          createdAt: $start
        }, {
          status: PENDING,
          createdAt: $end
        }]
      }
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
        pickupStorageName
        pickupStorageVat
        tenantPickupStorage
        deliveryStorageId
        deliveryStorageName
        deliveryStorageVat
        tenantDeliveryStorage
        tenantCarrier
        tenantSender
        tenantReceiver
        carrierName
        senderName
        receiverName
        carrierVat
        senderVat
        receiverVat
        createdAt
        updatedAt
        completedAt
        shipmentType
        loadingMeter
        netWeight
        pickupCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        pickupDateStart
        pickupDateEnd
        depotCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        depotDateStart
        depotDateEnd
        deliveryCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        deliveryDateStart
        deliveryDateEnd
        pickupAddress
        deliveryAddress
        depotAddress
        status
        support
        quantity
        size
      }
      nextToken
    }
  }
`;

export const ORDER_BY_DELIVERY_STORAGE_PICKEDUP = /* GraphQL */ `
  query OrderByDeliveryStorageStatusCreatedAt(
    $companyId: ID
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderByDeliveryStorageStatusCreatedAt(
      deliveryStorageId: $companyId
      statusCreatedAt: {
        between: [{
          status: PICKEDUP,
          createdAt: $start
        }, {
          status: PICKEDUP,
          createdAt: $end
        }]
      }
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
        pickupStorageName
        pickupStorageVat
        tenantPickupStorage
        deliveryStorageId
        deliveryStorageName
        deliveryStorageVat
        tenantDeliveryStorage
        tenantCarrier
        tenantSender
        tenantReceiver
        carrierName
        senderName
        receiverName
        carrierVat
        senderVat
        receiverVat
        createdAt
        updatedAt
        completedAt
        shipmentType
        loadingMeter
        netWeight
        pickupCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        pickupDateStart
        pickupDateEnd
        depotCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        depotDateStart
        depotDateEnd
        deliveryCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        deliveryDateStart
        deliveryDateEnd
        pickupAddress
        deliveryAddress
        depotAddress
        status
        support
        quantity
        size
      }
      nextToken
    }
  }
`;

export const ORDER_BY_DELIVERY_STORAGE_STOCKED = /* GraphQL */ `
  query OrderByDeliveryStorageStatusCreatedAt(
    $companyId: ID
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderByDeliveryStorageStatusCreatedAt(
      deliveryStorageId: $companyId
      statusCreatedAt: {
        between: [{
          status: STOCKED,
          createdAt: $start
        }, {
          status: STOCKED,
          createdAt: $end
        }]
      }
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
        pickupStorageName
        pickupStorageVat
        tenantPickupStorage
        deliveryStorageId
        deliveryStorageName
        deliveryStorageVat
        tenantDeliveryStorage
        tenantCarrier
        tenantSender
        tenantReceiver
        carrierName
        senderName
        receiverName
        carrierVat
        senderVat
        receiverVat
        createdAt
        updatedAt
        completedAt
        shipmentType
        loadingMeter
        netWeight
        pickupCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        pickupDateStart
        pickupDateEnd
        depotCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        depotDateStart
        depotDateEnd
        deliveryCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        deliveryDateStart
        deliveryDateEnd
        pickupAddress
        deliveryAddress
        depotAddress
        status
        support
        quantity
        size
      }
      nextToken
    }
  }
`;

export const ORDER_BY_DELIVERY_STORAGE_DELIVERING = /* GraphQL */ `
  query OrderByDeliveryStorageStatusCreatedAt(
    $companyId: ID
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderByDeliveryStorageStatusCreatedAt(
      deliveryStorageId: $companyId
      statusCreatedAt: {
        between: [{
          status: DELIVERING,
          createdAt: $start
        }, {
          status: DELIVERING,
          createdAt: $end
        }]
      }
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
        pickupStorageName
        pickupStorageVat
        tenantPickupStorage
        deliveryStorageId
        deliveryStorageName
        deliveryStorageVat
        tenantDeliveryStorage
        tenantCarrier
        tenantSender
        tenantReceiver
        carrierName
        senderName
        receiverName
        carrierVat
        senderVat
        receiverVat
        createdAt
        updatedAt
        completedAt
        shipmentType
        loadingMeter
        netWeight
        pickupCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        pickupDateStart
        pickupDateEnd
        depotCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        depotDateStart
        depotDateEnd
        deliveryCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        deliveryDateStart
        deliveryDateEnd
        pickupAddress
        deliveryAddress
        depotAddress
        status
        support
        quantity
        size
      }
      nextToken
    }
  }
`;

export const ORDER_BY_DELIVERY_STORAGE_DELIVERED = /* GraphQL */ `
  query OrderByDeliveryStorageStatusCreatedAt(
    $companyId: ID
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderByDeliveryStorageStatusCreatedAt(
      deliveryStorageId: $companyId
      statusCreatedAt: {
        between: [{
          status: DELIVERED,
          createdAt: $start
        }, {
          status: DELIVERED,
          createdAt: $end
        }]
      }
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
        pickupStorageName
        pickupStorageVat
        tenantPickupStorage
        deliveryStorageId
        deliveryStorageName
        deliveryStorageVat
        tenantDeliveryStorage
        tenantCarrier
        tenantSender
        tenantReceiver
        carrierName
        senderName
        receiverName
        carrierVat
        senderVat
        receiverVat
        createdAt
        updatedAt
        completedAt
        shipmentType
        loadingMeter
        netWeight
        pickupCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        pickupDateStart
        pickupDateEnd
        depotCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        depotDateStart
        depotDateEnd
        deliveryCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        deliveryDateStart
        deliveryDateEnd
        pickupAddress
        deliveryAddress
        depotAddress
        status
        support
        quantity
        size
      }
      nextToken
    }
  }
`;

export const ORDER_BY_DELIVERY_STORAGE_ARCHIVED = /* GraphQL */ `
  query OrderByDeliveryStorageStatusCreatedAt(
    $companyId: ID
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderByDeliveryStorageStatusCreatedAt(
      deliveryStorageId: $companyId
      statusCreatedAt: {
        between: [{
          status: ARCHIVED,
          createdAt: $start
        }, {
          status: ARCHIVED,
          createdAt: $end
        }]
      }
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
        pickupStorageName
        pickupStorageVat
        tenantPickupStorage
        deliveryStorageId
        deliveryStorageName
        deliveryStorageVat
        tenantDeliveryStorage
        tenantCarrier
        tenantSender
        tenantReceiver
        carrierName
        senderName
        receiverName
        carrierVat
        senderVat
        receiverVat
        createdAt
        updatedAt
        completedAt
        shipmentType
        loadingMeter
        netWeight
        pickupCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        pickupDateStart
        pickupDateEnd
        depotCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        depotDateStart
        depotDateEnd
        deliveryCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        deliveryDateStart
        deliveryDateEnd
        pickupAddress
        deliveryAddress
        depotAddress
        status
        support
        quantity
        size
      }
      nextToken
    }
  }
`;

// Orders by id
export const ORDER_BY_ID = /* GraphQL */ `
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
      pickupStorageName
      pickupStorageVat
      tenantPickupStorage
      deliveryStorageId
      deliveryStorageName
      deliveryStorageVat
      tenantDeliveryStorage
      tenantCarrier
      tenantSender
      tenantReceiver
      carrierName
      senderName
      receiverName
      carrierVat
      senderVat
      receiverVat
      createdAt
      updatedAt
      completedAt
      billingType
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
        trades
        cargoBay
        containerUnloading
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
        windows { start end days type }
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
        trades
        cargoBay
        containerUnloading
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
        trades
        cargoBay
        containerUnloading
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
      note
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
          tenantReceiver
          tenantSender
          tenantCarrier
          receiverName
          senderName
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
          tenantCarrier
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

export const ORDER_BY_PREORDERID = /* GraphQL */ `
  query OrderByPreOrderId(
    $preOrderId: ID
  ) {
    orderByPreOrderId(
      preOrderId: $preOrderId
      limit: 1000
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
        pickupStorageName
        pickupStorageVat
        tenantPickupStorage
        deliveryStorageId
        deliveryStorageName
        deliveryStorageVat
        tenantDeliveryStorage
        tenantCarrier
        tenantSender
        tenantReceiver
        carrierName
        senderName
        receiverName
        carrierVat
        senderVat
        receiverVat
        createdAt
        updatedAt
        completedAt
        shipmentType
        loadingMeter
        loadingMeter
        netWeight
        pickupCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        pickupDateStart
        pickupDateEnd
        depotCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        depotDateStart
        depotDateEnd
        deliveryCheckpoint { extId name windows { start end days type } location { address region city province coordinate }}
        deliveryDateStart
        deliveryDateEnd
        pickupAddress
        deliveryAddress
        depotAddress
        status
        support
        quantity
        size
      }
    }
  }
`;

export const ORDER_BY_CARRIER_STATUS_CREATEDAT = /* GraphQL */ `
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
        tenantReceiver
        receiverName
        tenantSender
        senderName
        senderVat
        carrierVat
        receiverVat
        tenantCarrier
        carrierName
        pickupStorageId
        pickupStorageName
        tenantPickupStorage
        pickupStorageVat
        deliveryStorageId
        deliveryStorageName
        tenantDeliveryStorage
        deliveryStorageVat
        createdAt
        updatedAt
        completedAt
        paymentCondition
        shipmentType
        pickupCheckpoint {
          warehouseId
          extId
          name
          maxLength
          tools
          note
          trades
          cargoBay
          containerUnloading
          location { address city region province coordinate place_id }
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
          name
          maxLength
          tools
          note
          trades
          cargoBay
          containerUnloading
          location { address city region province coordinate place_id }
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
          name
          maxLength
          tools
          note
          trades
          cargoBay
          containerUnloading
          location { address city region province coordinate place_id }
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
        travels { items { id }}
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
        checks {
          nextToken
        }
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