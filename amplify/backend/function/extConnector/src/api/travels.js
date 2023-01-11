export const getTravels = /* GraphQL */ `
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
        orders {
          items {
            order { id stamp quantity size grossWeight netWeight }
          }
        }
      }
      nextToken
    }
  }
`;