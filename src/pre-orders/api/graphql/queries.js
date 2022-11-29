export const PREORDER_BY_CARRIER = /* GraphQL */ `
  query PreOrderByCarrier(
    $companyId: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPreOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    preOrderByCarrier(
      carrierId: $companyId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        stamp
        name
        carrierId
        senderId
        tenantCarrier
        tenantSender
        senderName
        carrierName
        senderVat
        carrierVat
        storageId
        storageVat
        storageName
        tenantStorage
        shipmentType
        pickupDateStart
        checkpoint { location { address region }}
        pickupDateEnd
        status
        createdAt
        updatedAt
        completedAt
        deliveryAreas
        deliveryRegions
        slot
        address
        trades
        billingType
        vehicleType
      }
      nextToken
    }
  }
`;

export const PREORDER_BY_SENDER = /* GraphQL */ `
  query PreOrderBySender(
    $companyId: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPreOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    preOrderBySender(
      senderId: $companyId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        stamp
        name
        carrierId
        senderId
        tenantCarrier
        tenantSender
        senderName
        carrierName
        senderVat
        carrierVat
        storageId
        storageVat
        storageName
        tenantStorage
        shipmentType
        pickupDateStart
        pickupDateEnd
        checkpoint { location { address region }}
        status
        createdAt
        updatedAt
        completedAt
        deliveryAreas
        deliveryRegions
        slot
        address
        trades
        billingType
        vehicleType
      }
      nextToken
    }
  }
`;

export const PREORDER_BY_CARRIER_PENDING = /* GraphQL */ `
  query PreOrderByCarrierStatus(
    $companyId: ID
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelPreOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    preOrderByCarrierStatus(
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
        stamp
        name
        carrierId
        senderId
        tenantCarrier
        tenantSender
        senderName
        carrierName
        senderVat
        carrierVat
        storageId
        storageVat
        storageName
        tenantStorage
        shipmentType
        pickupDateStart
        pickupDateEnd
        checkpoint { location { address region }}
        status
        createdAt
        updatedAt
        completedAt
        deliveryAreas
        deliveryRegions
        slot
        address
        trades
        billingType
        vehicleType
      }
      nextToken
    }
  }
`;

export const PREORDER_BY_CARRIER_ACCEPTED = /* GraphQL */ `
  query PreOrderByCarrierStatus(
    $companyId: ID
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelPreOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    preOrderByCarrierStatus(
      carrierId: $companyId
      statusCreatedAt: {
        between: [{
          status: ACCEPTED,
          createdAt: $start
        }, {
          status: ACCEPTED,
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
        stamp
        name
        carrierId
        senderId
        tenantCarrier
        tenantSender
        senderName
        carrierName
        senderVat
        carrierVat
        storageId
        storageVat
        storageName
        tenantStorage
        shipmentType
        pickupDateStart
        pickupDateEnd
        checkpoint { location { address region }}
        status
        createdAt
        updatedAt
        completedAt
        deliveryAreas
        deliveryRegions
        slot
        address
        trades
        billingType
        vehicleType
      }
      nextToken
    }
  }
`;

export const PREORDER_BY_CARRIER_REJECTED = /* GraphQL */ `
  query PreOrderByCarrierStatus(
    $companyId: ID
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelPreOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    preOrderByCarrierStatus(
      carrierId: $companyId
      statusCreatedAt: {
        between: [{
          status: REJECTED,
          createdAt: $start
        }, {
          status: REJECTED,
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
        stamp
        name
        carrierId
        senderId
        tenantCarrier
        tenantSender
        senderName
        carrierName
        senderVat
        carrierVat
        storageId
        storageVat
        storageName
        tenantStorage
        shipmentType
        pickupDateStart
        pickupDateEnd
        checkpoint { location { address region }}
        status
        createdAt
        updatedAt
        completedAt
        deliveryAreas
        deliveryRegions
        slot
        address
        trades
        billingType
        vehicleType
      }
      nextToken
    }
  }
`;

export const PREORDER_BY_SENDER_PENDING = /* GraphQL */ `
  query PreOrderBySenderStatus(
    $companyId: ID
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelPreOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    preOrderBySenderStatus(
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
        stamp
        name
        carrierId
        senderId
        tenantCarrier
        tenantSender
        senderName
        carrierName
        senderVat
        carrierVat
        storageId
        storageVat
        storageName
        tenantStorage
        shipmentType
        pickupDateStart
        pickupDateEnd
        checkpoint { location { address region }}
        status
        createdAt
        updatedAt
        completedAt
        deliveryAreas
        deliveryRegions
        slot
        address
        trades
        billingType
        vehicleType
      }
      nextToken
    }
  }
`;

export const PREORDER_BY_SENDER_ACCEPTED = /* GraphQL */ `
  query PreOrderBySenderStatus(
    $companyId: ID
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelPreOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    preOrderBySenderStatus(
      senderId: $companyId
      statusCreatedAt: {
        between: [{
          status: ACCEPTED,
          createdAt: $start
        }, {
          status: ACCEPTED,
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
        stamp
        name
        carrierId
        senderId
        tenantCarrier
        tenantSender
        senderName
        carrierName
        senderVat
        carrierVat
        storageId
        storageVat
        storageName
        tenantStorage
        shipmentType
        pickupDateStart
        pickupDateEnd
        checkpoint { location { address region }}
        status
        createdAt
        updatedAt
        completedAt
        deliveryAreas
        deliveryRegions
        slot
        address
        trades
        billingType
        vehicleType
      }
      nextToken
    }
  }
`;

export const PREORDER_BY_SENDER_REJECTED = /* GraphQL */ `
  query PreOrderBySenderStatus(
    $companyId: ID
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelPreOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    preOrderBySenderStatus(
      senderId: $companyId
      statusCreatedAt: {
        between: [{
          status: REJECTED,
          createdAt: $start
        }, {
          status: REJECTED,
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
        stamp
        name
        carrierId
        senderId
        tenantCarrier
        tenantSender
        senderName
        carrierName
        senderVat
        carrierVat
        storageId
        storageVat
        storageName
        tenantStorage
        shipmentType
        pickupDateStart
        pickupDateEnd
        checkpoint { location { address region }}
        status
        createdAt
        updatedAt
        completedAt
        deliveryAreas
        deliveryRegions
        slot
        address
        trades
        billingType
        vehicleType
      }
      nextToken
    }
  }
`;


export const PREORDER_BY_STORAGE = /* GraphQL */ `
  query PreOrderByStorage(
    $companyId: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPreOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    preOrderByStorage(
      storageId: $companyId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        stamp
        name
        carrierId
        senderId
        tenantCarrier
        tenantSender
        senderName
        carrierName
        senderVat
        carrierVat
        storageId
        storageVat
        storageName
        tenantStorage
        shipmentType
        pickupDateStart
        pickupDateEnd
        checkpoint { location { address region }}
        status
        createdAt
        updatedAt
        completedAt
        deliveryAreas
        deliveryRegions
        slot
        address
        trades
        billingType
        vehicleType
      }
      nextToken
    }
  }
`;

export const PREORDER_BY_STORAGE_PENDING = /* GraphQL */ `
  query PreOrderByStorageStatus(
    $companyId: ID
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelPreOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    preOrderByStorageStatus(
      storageId: $companyId
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
        stamp
        name
        carrierId
        senderId
        tenantCarrier
        tenantSender
        senderName
        carrierName
        senderVat
        carrierVat
        storageId
        storageVat
        storageName
        tenantStorage
        shipmentType
        pickupDateStart
        pickupDateEnd
        checkpoint { location { address region }}
        status
        createdAt
        updatedAt
        completedAt
        deliveryAreas
        deliveryRegions
        slot
        address
        trades
        billingType
        vehicleType
      }
      nextToken
    }
  }
`;

export const PREORDER_BY_STORAGE_ACCEPTED = /* GraphQL */ `
  query PreOrderByStorageStatus(
    $companyId: ID
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelPreOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    preOrderByStorageStatus(
      storageId: $companyId
      statusCreatedAt: {
        between: [{
          status: ACCEPTED,
          createdAt: $start
        }, {
          status: ACCEPTED,
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
        stamp
        name
        carrierId
        senderId
        tenantCarrier
        tenantSender
        senderName
        carrierName
        senderVat
        carrierVat
        storageId
        storageVat
        storageName
        tenantStorage
        shipmentType
        pickupDateStart
        pickupDateEnd
        checkpoint { location { address region }}
        status
        createdAt
        updatedAt
        completedAt
        deliveryAreas
        deliveryRegions
        slot
        address
        trades
        billingType
        vehicleType
      }
      nextToken
    }
  }
`;

export const PREORDER_BY_STORAGE_REJECTED = /* GraphQL */ `
  query PreOrderByStorageStatus(
    $companyId: ID
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelPreOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    preOrderByStorageStatus(
      storageId: $companyId
      statusCreatedAt: {
        between: [{
          status: REJECTED,
          createdAt: $start
        }, {
          status: REJECTED,
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
        stamp
        name
        carrierId
        senderId
        tenantCarrier
        tenantSender
        senderName
        carrierName
        senderVat
        carrierVat
        storageId
        storageVat
        storageName
        tenantStorage
        shipmentType
        pickupDateStart
        pickupDateEnd
        checkpoint { location { address region }}
        status
        createdAt
        updatedAt
        completedAt
        deliveryAreas
        deliveryRegions
        slot
        address
        trades
        billingType
        vehicleType
      }
      nextToken
    }
  }
`;


export const PREORDER_BY_ID = /* GraphQL */ `
  query GetPreOrder($id: ID!) {
    getPreOrder(id: $id) {
      id
      stamp
      name
      carrierId
      senderId
      tenantCarrier
      tenantSender
      senderName
      carrierName
      senderVat
      carrierVat
      storageId
      storageVat
      storageName
      tenantStorage
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
      address
      trades
      files { filename identityId bucket region key extension timestamp }
      log { authorId author description timestamp }
      note
      billingType
      orders {
        items { id stamp name }
        nextToken
      }
    }
  }
`;


export const PREORDER_BY_CARRIER_FROM_ORDER = /* GraphQL */ `
  query PreOrderByCarrier(
    $companyId: ID
    $createdAt: ModelStringKeyConditionInput
    $limit: Int
    $nextToken: String
  ) {
    preOrderByCarrier(
      carrierId: $companyId
      createdAt: $createdAt
      sortDirection:DESC
      filter: {
        status: { 
          ne: REJECTED
        }
      }
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        stamp
        name
        carrierId
        senderId
        tenantCarrier
        tenantSender
        senderName
        carrierName
        senderVat
        carrierVat
        storageId
        storageVat
        storageName
        tenantStorage
        shipmentType
        pickupDateStart
        checkpoint {
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
        pickupDateEnd
        status
        createdAt
        updatedAt
        completedAt
        deliveryAreas
        deliveryRegions
        slot
        address
        trades
        billingType
        vehicleType
      }
      nextToken
    }
  }
`;


export const PREORDER_BY_SENDER_FROM_ORDER = /* GraphQL */ `
  query PreOrderBySender(
    $companyId: ID
    $createdAt: ModelStringKeyConditionInput
    $limit: Int
    $nextToken: String
  ) {
    preOrderBySender(
      senderId: $companyId
      createdAt: $createdAt
      sortDirection:DESC
      filter: {
        status: { 
          ne: REJECTED
        }
      }
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        stamp
        name
        carrierId
        senderId
        tenantCarrier
        tenantSender
        senderName
        carrierName
        senderVat
        carrierVat
        storageId
        storageVat
        storageName
        tenantStorage
        shipmentType
        pickupDateStart
        pickupDateEnd
        checkpoint {
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
        status
        createdAt
        updatedAt
        completedAt
        deliveryAreas
        deliveryRegions
        slot
        address
        trades
        billingType
        vehicleType
      }
      nextToken
    }
  }
`;

