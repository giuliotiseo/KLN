export const getVehicles = /* GraphQL */ `
  query VehicleByCompany(
    $carrierId: ID
    $licensePlate: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelVehicleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    vehicleByCompany(
      companyId: $carrierId
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
        note
      }
      nextToken
    }
  }
`;