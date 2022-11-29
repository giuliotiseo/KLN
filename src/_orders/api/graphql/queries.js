// General ----------------------------------------------------------------------------------------------------------
export const GET_ORDER = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
      id
      extId
      stamp
      name
      preOrderId
      tenantReceiver
      receiverName
      tenantSender
      senderName
      tenantCarrier
      carrierName
      createdAt
      updatedAt
      shipmentType
      pickupCheckpoint {
        warehouseId
        extId
        name
        location { place_id region province city address coordinate } 
        contacts { contactId name email phone }  
        windows { start end days type } 
        maxLength tools note 
      }
      depotCheckpoint {
        warehouseId
        extId
        name 
        location { place_id region province city address coordinate } 
        contacts { contactId name email phone } 
        windows { start end days type } 
        maxLength tools note 
      }
      deliveryCheckpoint { 
        warehouseId
        extId
        name 
        location { place_id region province city address coordinate } 
        contacts { contactId name email phone } 
        windows { start end days type } 
        maxLength tools note 
      }
      depotDateStart
      depotDateEnd
      depotSlots { from to }
      status
      trades
      log { authorId author description timestamp }
      loadingMeter
      temperature
      docs { date number type files { identityId bucket region key extension timestamp } }
      customer { id name vatNumber uniqueCode pec }
      paymentCondition
      pickupDateStart
      pickupDateEnd
      deliveryDateStart
      deliveryDateEnd
      pickupSlots { from to }
      deliverySlots { from to }
      availability { from to }
      palletInfo { value size type system }
      lastPosition { place_id region province city address coordinate }
      orderNumber
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
      pickupAddress
      deliveryAddress
      depotAddress
      collectChecks
      checksAmount
      note
      billingType
    }
  }
`

export const LIST_ORDERS_BY_PREORDER = /* GraphQL */ `
  query OrdersByPreOrderId($preOrderId: ID!) {
    ordersByPreOrderId(preOrderId: $preOrderId) {
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
        tenantCarrier
        carrierName
        createdAt
        updatedAt
        shipmentType
        pickupCheckpoint { warehouseId extId name location { place_id region province city address coordinate } contacts { contactId name email phone }  windows { start end days type } maxLength tools note }
        depotCheckpoint { warehouseId extId name location { place_id region province city address coordinate } contacts { contactId name email phone }  windows { start end days type } maxLength tools note }
        deliveryCheckpoint { warehouseId extId name location { place_id region province city address coordinate } contacts { contactId name email phone }  windows { start end days type } maxLength tools note }
        status
        trades
        log { authorId author description timestamp }
        loadingMeter
        temperature
        docs { date number type files { identityId bucket region key extension timestamp } }
        customer { id name vatNumber uniqueCode pec }
        paymentCondition
        pickupDateStart
        pickupDateEnd
        deliveryDateStart
        deliveryDateEnd
        pickupSlots { from to }
        depotDateStart
        depotDateEnd
        depotSlots { from to }
        deliverySlots { from to }
        availability { from to }
        palletInfo { value size type system }
        lastPosition { place_id region province city address coordinate }
        orderNumber
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
        pickupAddress
        deliveryAddress
        depotAddress
        collectChecks
        checksAmount
        note
      }
    }
  }
`

/* ----------------------------------------------------------------------------------------------------------
  Carrier 
*/
export const SEARCH_ORDERS_BY_CARRIER_STATUS_CREATEDAT = /* GraphQL */ `
  query OrdersByCarrierStatusCreatedAt(
    $tenantCarrier: ID
    $statusCreatedAt: ModelOrderOrdersByCarrierStatusCreatedAtCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ordersByCarrierStatusCreatedAt(
      tenantCarrier: $tenantCarrier
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
        tenantCarrier
        carrierName
        createdAt
        updatedAt
        shipmentType
        pickupCheckpoint { warehouseId extId name location { place_id region province city address coordinate } contacts { contactId name email phone }  windows { start end days type } maxLength tools note }
        depotCheckpoint { warehouseId extId name location { place_id region province city address coordinate } contacts { contactId name email phone }  windows { start end days type } maxLength tools note }
        deliveryCheckpoint { warehouseId extId name location { place_id region province city address coordinate } contacts { contactId name email phone }  windows { start end days type } maxLength tools note }
        status
        trades
        log { authorId author description timestamp }
        loadingMeter
        temperature
        docs { date number type files { identityId bucket region key extension timestamp } }
        customer { id name vatNumber uniqueCode pec }
        paymentCondition
        pickupDateStart
        pickupDateEnd
        deliveryDateStart
        deliveryDateEnd
        pickupSlots { from to }
        deliverySlots { from to }
        depotDateStart
        depotDateEnd
        depotSlots { from to }
        availability { from to }
        palletInfo { value size type system }
        lastPosition { place_id region province city address coordinate }
        orderNumber
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
        pickupAddress
        deliveryAddress
        depotAddress
        collectChecks
        checksAmount
        note
      }
      nextToken
    }
  }
`;

export const ORDERS_BY_CARRIER_CREATEDAT = /* GraphQL */ `
  query OrdersByCarrierCreatedAt(
    $tenantCarrier: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ordersByCarrierCreatedAt(
      tenantCarrier: $tenantCarrier
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
        tenantReceiver
        receiverName
        tenantSender
        senderName
        senderVat
        carrierVat
        receiverVat
        tenantCarrier
        carrierName
        createdAt
        updatedAt
        completedAt
        paymentCondition
        shipmentType
        travels { items { id }}
        pickupCheckpoint {
          warehouseId
          extId
          name
          maxLength
          tools
          note
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

export const ORDERS_BY_CARRIER_STATUS_CREATEDAT = /* GraphQL */ `
  query OrdersByCarrierStatusCreatedAt(
    $carrierId: ID
    $statusCreatedAt: ModelOrderOrdersByCarrierStatusCreatedAtCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ordersByCarrierStatusCreatedAt(
      tenantCarrier: $tenantCarrier
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


/* ----------------------------------------------------------------------------------------------------------
  Sender 
*/
export const SEARCH_ORDERS_BY_SENDER_STATUS_CREATEDAT = /* GraphQL */ `
  query OrdersBySenderStatusCreatedAt(
    $tenantSender: ID
    $statusCreatedAt: ModelOrderOrdersBySenderStatusCreatedAtCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ordersBySenderStatusCreatedAt(
      tenantSender: $tenantSender
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
        tenantCarrier
        carrierName
        createdAt
        updatedAt
        shipmentType
        pickupCheckpoint { extId warehouseId name location { place_id region province city address coordinate } contacts { contactId name email phone }  windows { start end days type } maxLength tools note }
        depotCheckpoint { extId warehouseId name location { place_id region province city address coordinate } contacts { contactId name email phone }  windows { start end days type } maxLength tools note }
        deliveryCheckpoint { extId warehouseId name location { place_id region province city address coordinate } contacts { contactId name email phone }  windows { start end days type } maxLength tools note }
        status
        trades
        log { authorId author description timestamp }
        loadingMeter
        temperature
        docs { date number type files { identityId bucket region key extension timestamp } }
        customer { id name vatNumber uniqueCode pec }
        paymentCondition
        pickupDateStart
        pickupDateEnd
        deliveryDateStart
        deliveryDateEnd
        pickupSlots { from to }
        depotDateStart
        depotDateEnd
        depotSlots { from to }
        deliverySlots { from to }
        availability { from to }
        palletInfo { value size type system }
        lastPosition { place_id region province city address coordinate }
        orderNumber
        pickupAddress
        deliveryAddress
        depotAddress
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
        note
      }
      nextToken
    }
  }
`;

/* ----------------------------------------------------------------------------------------------------------
  Receiver 
*/
export const SEARCH_ORDERS_BY_RECEIVER_STATUS_CREATEDAT = /* GraphQL */ `
  query OrdersByReceiverStatusCreatedAt(
    $tenantReceiver: ID
    $statusCreatedAt: ModelOrderOrdersByReceiverStatusCreatedAtCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ordersByReceiverStatusCreatedAt(
      tenantReceiver: $tenantReceiver
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
        tenantCarrier
        carrierName
        createdAt
        updatedAt
        shipmentType
        pickupCheckpoint { warehouseId extId name location { place_id region province city address coordinate } contacts { contactId name email phone }  windows { start end days type } maxLength tools note }
        depotCheckpoint { warehouseId extId name location { place_id region province city address coordinate } contacts { contactId name email phone }  windows { start end days type } maxLength tools note }
        deliveryCheckpoint { warehouseId extId name location { place_id region province city address coordinate } contacts { contactId name email phone }  windows { start end days type } maxLength tools note }
        status
        trades
        log { authorId author description timestamp }
        loadingMeter
        temperature
        docs { date number type files { identityId bucket region key extension timestamp } }
        customer { id name vatNumber uniqueCode pec }
        paymentCondition
        pickupDateStart
        pickupDateEnd
        deliveryDateStart
        deliveryDateEnd
        pickupSlots { from to }
        depotDateStart
        depotDateEnd
        depotSlots { from to }
        deliverySlots { from to }
        availability { from to }
        palletInfo { value size type system }
        lastPosition { place_id region province city address coordinate }
        orderNumber
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
        pickupAddress
        deliveryAddress
        depotAddress
        collectChecks
        checksAmount
        note
      }
      nextToken
    }
  }
`