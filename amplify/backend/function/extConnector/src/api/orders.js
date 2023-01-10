export const getOrders = /* GraphQL */ `
  query OrderByCarrierStatusCompletedAt(
    $carrierId: ID
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderByCarrierStatusCompletedAt(
      carrierId: $carrierId
      statusCompletedAt: {
        between: [{
          status: DELIVERED,
          completedAt: $start
        }, {
          status: DELIVERED,
          completedAt: $end
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
        receiverId
        senderId
        pickupStorageId
        deliveryStorageId
        carrierName
        senderName
        receiverName
        pickupStorageName
        deliveryStorageName
        senderVat
        carrierVat
        receiverVat
        pickupStorageVat
        deliveryStorageVat
        completedAt
        paymentCondition
        shipmentType
        billingType
        pickupCheckpoint { extId name thirdCompanyId thirdCompanyName thirdCompanyVat location { place_id region province city address coordinate }}
        pickupDateStart
        pickupDateEnd
        depotCheckpoint { extId name thirdCompanyId thirdCompanyName thirdCompanyVat location { place_id region province city address coordinate }}
        depotDateStart
        depotDateEnd
        deliveryCheckpoint { extId name  thirdCompanyId thirdCompanyName thirdCompanyVat location { place_id region province city address coordinate }}
        deliveryDateStart
        deliveryDateEnd
        status
        orderNumber
        docs { date number type }
        support
        quantity
        size
        loadingMeter
        grossWeight
        netWeight
        packages
        customer { id name vatNumber uniqueCode pec }
        palletInfo { value size type system }
        collectChecks
        checks { items { id orderId amount carrierId senderId receiverId carrierName senderName receiverName }}
        travels {
          items {
            id departureDate arrivalDate carrierId customerId operation operationValue
            waypoint {
              companyName companyId estimatedLength estimatedTime
              checkpoint { extId name  thirdCompanyId thirdCompanyName thirdCompanyVat location { place_id region province city address coordinate }}
            }
            travel {
              id
              stamp
              departureDate
              licensePlate
              vehicleName
              driverName
              start {
                companyName estimatedLength estimatedTime
                checkpoint { extId name  thirdCompanyId thirdCompanyName thirdCompanyVat location { place_id region province city address coordinate }}
              }
              end {
                companyName estimatedLength estimatedTime
                checkpoint { extId name thirdCompanyId thirdCompanyName thirdCompanyVat location { place_id region province city address coordinate }}
              }
              estimatedTravelTime
              estimatedTravelLength
              estimatedTransportCosts
              status
            }
          }
        }
      }
      nextToken
    }
  }
`;

export const getOrdersBySender = /* GraphQL */ `
  query OrderByCarrierStatusSenderVatCompletedAt(
    $carrierId: ID
    $senderVat: String
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderByCarrierStatusSenderVatCompletedAt(
      carrierId: $carrierId
      statusSenderVatCompletedAt: {
        between: [{
          status: DELIVERED,
          senderVat: $senderVat,
          completedAt: $start
        }, {
          status: DELIVERED,
          senderVat: $senderVat,
          completedAt: $end
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
        receiverId
        senderId
        pickupStorageId
        deliveryStorageId
        carrierName
        senderName
        receiverName
        pickupStorageName
        deliveryStorageName
        senderVat
        carrierVat
        receiverVat
        pickupStorageVat
        deliveryStorageVat
        completedAt
        paymentCondition
        shipmentType
        billingType
        pickupCheckpoint { extId name thirdCompanyId thirdCompanyName thirdCompanyVat location { place_id region province city address coordinate }}
        pickupDateStart
        pickupDateEnd
        depotCheckpoint { extId name thirdCompanyId thirdCompanyName thirdCompanyVat location { place_id region province city address coordinate }}
        depotDateStart
        depotDateEnd
        deliveryCheckpoint { extId name  thirdCompanyId thirdCompanyName thirdCompanyVat location { place_id region province city address coordinate }}
        deliveryDateStart
        deliveryDateEnd
        status
        orderNumber
        docs { date number type }
        support
        quantity
        size
        loadingMeter
        grossWeight
        netWeight
        packages
        customer { id name vatNumber uniqueCode pec }
        palletInfo { value size type system }
        travels {
          items {
            id departureDate arrivalDate carrierId customerId operation operationValue
            waypoint {
              companyName companyId estimatedLength estimatedTime
              checkpoint { extId name  thirdCompanyId thirdCompanyName thirdCompanyVat location { place_id region province city address coordinate }}
            }
            travel {
              id
              stamp
              departureDate
              licensePlate
              vehicleName
              driverName
              start {
                companyName estimatedLength estimatedTime
                checkpoint { extId name  thirdCompanyId thirdCompanyName thirdCompanyVat location { place_id region province city address coordinate }}
              }
              end {
                companyName estimatedLength estimatedTime
                checkpoint { extId name  thirdCompanyId thirdCompanyName thirdCompanyVat location { place_id region province city address coordinate }}
              }
              estimatedTravelTime
              estimatedTravelLength
              estimatedTransportCosts
              status
            }
          }
        }
      }
      nextToken
    }
  }
`;