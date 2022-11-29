export const TRAVEL_BY_CARRIER = /* GraphQL */ `
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
      createdAt
      travelType
      departureDate
      carrierId
      estimatedTravelLength
      estimatedTravelTime
      waypoints {
        id
        companyName
        companyId
        tenantCompany
      }
      start {
        id
        companyName
        tenantCompany
        estimatedLength
        estimatedTime
        checkpoint { location { address city coordinate place_id province region  }}
      }
      driverName
      vehicleName
      licensePlate
      status
      palletHandlings { items { id waypoint { id companyName companyId tenantCompany }}}
    }
    nextToken
  }
}
`;

export const TRAVEL_BY_CARRIER_STATIONARY = /* GraphQL */ `
query TravelByCarrierStatusDepartureDate(
    $carrierId: ID
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelTravelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    travelByCarrierStatusDepartureDate(
      carrierId: $carrierId
      statusDepartureDate: {
        between: [{
          status: STATIONARY,
          departureDate: $start
        }, {
          status: STATIONARY,
          departureDate: $end
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
      createdAt
      travelType
      departureDate
      carrierId
      estimatedTravelLength
      estimatedTravelTime
      start {
        id
        companyName
        tenantCompany
        estimatedLength
        estimatedTime
        checkpoint { location { address city coordinate place_id province region  }}
      }
      driverName
      vehicleName
      licensePlate
      status
      palletHandlings { items { id }}
    }
    nextToken
  }
}
`;

export const TRAVEL_BY_CARRIER_PICKUP = /* GraphQL */ `
query TravelByCarrierStatusDepartureDate(
    $carrierId: ID
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelTravelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    travelByCarrierStatusDepartureDate(
      carrierId: $carrierId
      statusDepartureDate: {
        between: [{
          status: PICKUP,
          departureDate: $start
        }, {
          status: PICKUP,
          departureDate: $end
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
      createdAt
      travelType
      departureDate
      carrierId
      estimatedTravelLength
      estimatedTravelTime
      start {
        id
        companyName
        tenantCompany
        estimatedLength
        estimatedTime
        checkpoint { location { address city coordinate place_id province region  }}
      }
      driverName
      vehicleName
      licensePlate
      status
      palletHandlings { items { id }}
    }
    nextToken
  }
}
`;


export const TRAVEL_BY_CARRIER_DEPOT = /* GraphQL */ `
query TravelByCarrierStatusDepartureDate(
    $carrierId: ID
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelTravelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    travelByCarrierStatusDepartureDate(
      carrierId: $carrierId
      statusDepartureDate: {
        between: [{
          status: DEPOT,
          departureDate: $start
        }, {
          status: DEPOT,
          departureDate: $end
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
      createdAt
      travelType
      departureDate
      carrierId
      estimatedTravelLength
      estimatedTravelTime
      start {
        id
        companyName
        tenantCompany
        estimatedLength
        estimatedTime
        checkpoint { location { address city coordinate place_id province region  }}
      }
      driverName
      vehicleName
      licensePlate
      status
      palletHandlings { items { id }}
    }
    nextToken
  }
}
`;

export const TRAVEL_BY_CARRIER_DELIVERY = /* GraphQL */ `
query TravelByCarrierStatusDepartureDate(
    $carrierId: ID
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelTravelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    travelByCarrierStatusDepartureDate(
      carrierId: $carrierId
      statusDepartureDate: {
        between: [{
          status: DELIVERY,
          departureDate: $start
        }, {
          status: DELIVERY,
          departureDate: $end
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
      createdAt
      travelType
      departureDate
      carrierId
      estimatedTravelLength
      estimatedTravelTime
      start {
        id
        companyName
        tenantCompany
        estimatedLength
        estimatedTime
        checkpoint { location { address city coordinate place_id province region  }}
      }
      driverName
      vehicleName
      licensePlate
      status
      palletHandlings { items { id }}
    }
    nextToken
  }
}
`;

export const TRAVEL_BY_CARRIER_RETURN = /* GraphQL */ `
query TravelByCarrierStatusDepartureDate(
    $carrierId: ID
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelTravelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    travelByCarrierStatusDepartureDate(
      carrierId: $carrierId
      statusDepartureDate: {
        between: [{
          status: RETURN,
          departureDate: $start
        }, {
          status: RETURN,
          departureDate: $end
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
      createdAt
      travelType
      departureDate
      carrierId
      estimatedTravelLength
      estimatedTravelTime
      start {
        id
        companyName
        tenantCompany
        estimatedLength
        estimatedTime
        checkpoint { location { address city coordinate place_id province region  }}
      }
      driverName
      vehicleName
      licensePlate
      status
      palletHandlings { items { id }}
    }
    nextToken
  }
}
`;

export const TRAVEL_BY_CARRIER_COMPLETED = /* GraphQL */ `
query TravelByCarrierStatusDepartureDate(
    $carrierId: ID
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelTravelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    travelByCarrierStatusDepartureDate(
      carrierId: $carrierId
      statusDepartureDate: {
        between: [{
          status: COMPLETED,
          departureDate: $start
        }, {
          status: COMPLETED,
          departureDate: $end
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
      createdAt
      travelType
      departureDate
      carrierId
      estimatedTravelLength
      estimatedTravelTime
      start {
        id
        companyName
        tenantCompany
        estimatedLength
        estimatedTime
        checkpoint { location { address city coordinate place_id province region  }}
      }
      driverName
      vehicleName
      licensePlate
      status
      palletHandlings { items { id }}
    }
    nextToken
  }
}
`;

export const TRAVEL_BY_ID = /* GraphQL */ `
  query GetTravel($id: ID!) {
    getTravel(id: $id) {
      id
      stamp
      tenant
      status
      createdAt
      carrierId
      departureDate
      updatedAt
      licensePlate
      vehicleName
      driverName
      driver { username name email phone task job tenant }
      estimatedTravelTime
      estimatedTravelLength
      estimatedTransportCosts
      log { authorId author description timestamp }
      start {
        id
        companyName
        tenantCompany
        estimatedLength
        estimatedTime
        completed
        checkpoint {
          warehouseId
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
      }
      waypoints {
        id
        companyName
        tenantCompany
        companyId
        estimatedLength
        estimatedTime
        checkpoint {  location { address city coordinate place_id province region  }}
        orders { plannedId orderId operation operationValue orderStamp }
        completed
      }
      end {
        id
        companyName
        tenantCompany
        estimatedLength
        estimatedTime
        completed
        checkpoint {
          warehouseId
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
      }
      orders { 
        items {
          id orderId travelId operation operationValue tenantCarrier tenantCustomer departureDate arrivalDate
          waypoint { completed }
          order {
            id stamp name 
            carrierName tenantCarrier carrierId 
            receiverName tenantReceiver receiverId 
            senderName tenantSender senderId
            pickupStorageName pickupStorageId tenantPickupStorage 
            deliveryStorageName deliveryStorageId  tenantDeliveryStorage
            pickupDateStart pickupDateEnd deliveryDateStart deliveryDateEnd depotDateStart depotDateEnd
            pickupCheckpoint { location { address city region province coordinate place_id }}
            deliveryCheckpoint { location { address city region province coordinate place_id }}
            depotCheckpoint { location { address city region province coordinate place_id }}
            palletInfo { value size type system }
            shipmentType
            status
          }
        }
      }
      palletHandlings { items { id waypoint { id } }}
      lastPosition { place_id region province city address coordinate }
      plannedOrderIds
      travelType
      note
    }
  }
`;

export const TRAVEL_BY_STAMP = /* GraphQL */ `
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
        createdAt
        travelType
        carrierId
        departureDate
        estimatedTravelLength
        estimatedTravelTime
        start {
          id
          companyName
          tenantCompany
          estimatedLength
          estimatedTime
          checkpoint { location { address city coordinate place_id province region  }}
        }
        driverName
        vehicleName
        licensePlate
        status
        waypoints {
          id
          companyName
          companyId
          tenantCompany
        }
        palletHandlings {
          items {
            id
            waypoint {
              id
              companyName
              companyId
              tenantCompany
            }
          }
        }
      }
    }
  }
`;

export const travelsByTenantStatusDepartureDate = /* GraphQL */ `
  query TravelsByTenantStatusDepartureDate(
    $tenant: ID
    $statusDepartureDate: ModelTravelTravelsByTenantStatusDepartureDateCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTravelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    travelsByTenantStatusDepartureDate(
      tenant: $tenant
      statusDepartureDate: $statusDepartureDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        stamp
        createdAt
        carrierId
        departureDate
        estimatedTravelLength
        estimatedTravelTime
        start {
          id
          companyName
          tenantCompany
          estimatedLength
          estimatedTime
          checkpoint { location { address city coordinate place_id province region  }}
        }
        driverName
        vehicleName
        licensePlate
        status
        palletHandlings { items { id }}
      }
      nextToken
    }
  }
`;

export const TRAVELS_BY_TENANT_STATUS_DEPARTUREDATE = /* GraphQL */ `
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
        createdAt
        carrierId
        tenant
        status
        createdAt
        departureDate
        updatedAt
        licensePlate
        vehicleName
        driverName
        driver { username name email phone task job jobId tenant }
        estimatedTravelTime
        estimatedTravelLength
        estimatedTransportCosts
        palletHandlings { items { id stamp waypoint { id } } }
        start { id companyName tenantCompany estimatedLength estimatedTime }
        waypoints { id companyName tenantCompany estimatedLength estimatedTime completed }
        end { id companyName tenantCompany estimatedLength estimatedTime }
        plannedOrderIds
        travelType
        note
        log { authorId author description timestamp }
      }
      nextToken
    }
  }
`;

export const TRAVEL_ORDERS_BY_STATUS_COMPANY_CREATEDAT = /* GraphQL */ `
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
        stamp
        name
        carrierId
        receiverId
        senderId
        pickupStorageId
        deliveryStorageId
        tenantReceiver
        tenantPickupStorage
        tenantDeliveryStorage
        receiverName
        tenantSender
        senderName
        tenantCarrier
        carrierName
        pickupStorageName
        deliveryStorageName
        createdAt
        shipmentType
        pickupCheckpoint { name location { place_id region province city address coordinate } contacts { contactId name email phone }  windows { start end days type }  maxLength tools note }
        depotCheckpoint { name location { place_id region province city address coordinate } contacts { contactId name email phone }  windows { start end days type }  maxLength tools note }
        deliveryCheckpoint { name location { place_id region province city address coordinate } contacts { contactId name email phone }  windows { start end days type }  maxLength tools note }
        status
        trades
        loadingMeter
        temperature
        paymentCondition
        pickupDateStart
        pickupDateEnd
        deliveryDateStart
        deliveryDateEnd
        pickupSlots { from to }
        travels { items { id }}
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
        perishable
        stackable
        note
      }
      nextToken
    }
  }
`;