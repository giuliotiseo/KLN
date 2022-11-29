export const VEHICLE_BY_COMPANY = /* GraphQL */ `
  query VehicleByCompany(
    $companyId: ID!
    $licensePlate: String
    $sortDirection: ModelSortDirection
    $filter: ModelVehicleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    vehicleByCompany(
      companyId: $companyId
      licensePlate: {
        beginsWith: $licensePlate
      }
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        licensePlate
        type
        brand
        model
        maxWeight
        status
        lastPosition { place_id region province city address coordinate }
      }
      nextToken
    }
  }
`;

export const VANS_BY_COMPANY = /* GraphQL */ `
  query VehicleByCompanyType(
    $companyId: ID!
    $licensePlate: String
    $sortDirection: ModelSortDirection
    $filter: ModelVehicleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    vehicleByCompanyType(
      companyId: $companyId
      typeLicensePlate: {
        beginsWith: {
          type: FURGONE,
          licensePlate: $licensePlate
        }
      }
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        licensePlate
        type
        brand
        model
        maxWeight
        status
        lastPosition { place_id region province city address coordinate }
      }
      nextToken
    }
  }
`;

export const TRACTOR_BY_COMPANY = /* GraphQL */ `
  query VehicleByCompanyType(
    $companyId: ID!
    $licensePlate: String
    $sortDirection: ModelSortDirection
    $filter: ModelVehicleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    vehicleByCompanyType(
      companyId: $companyId
      typeLicensePlate: {
        beginsWith: {
          type: TRATTORE,
          licensePlate: $licensePlate
        }
      }
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        licensePlate
        type
        brand
        model
        maxWeight
        status
        lastPosition { place_id region province city address coordinate }
      }
      nextToken
    }
  }
`;


export const MOTOR_BY_COMPANY = /* GraphQL */ `
  query VehicleByCompanyType(
    $companyId: ID!
    $licensePlate: String
    $sortDirection: ModelSortDirection
    $filter: ModelVehicleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    vehicleByCompanyType(
      companyId: $companyId
      typeLicensePlate: {
        beginsWith: {
          type: MOTRICE,
          licensePlate: $licensePlate
        }
      }
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        licensePlate
        type
        brand
        model
        maxWeight
        status
        lastPosition { place_id region province city address coordinate }
      }
      nextToken
    }
  }
`;


export const TRAILER_BY_COMPANY = /* GraphQL */ `
  query VehicleByCompanyType(
    $companyId: ID!
    $licensePlate: String
    $sortDirection: ModelSortDirection
    $filter: ModelVehicleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    vehicleByCompanyType(
      companyId: $companyId
      typeLicensePlate: {
        beginsWith: {
          type: RIMORCHIO,
          licensePlate: $licensePlate
        }
      }
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        licensePlate
        type
        brand
        model
        maxWeight
        status
        lastPosition { place_id region province city address coordinate }
      }
      nextToken
    }
  }
`;

export const SEMITRAIL_BY_COMPANY = /* GraphQL */ `
  query VehicleByCompanyType(
    $companyId: ID!
    $licensePlate: String
    $sortDirection: ModelSortDirection
    $filter: ModelVehicleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    vehicleByCompanyType(
      companyId: $companyId
      typeLicensePlate: {
        beginsWith: {
          type: SEMIRIMORCHIO,
          licensePlate: $licensePlate
        }
      }
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        licensePlate
        type
        brand
        model
        maxWeight
        status
        lastPosition { place_id region province city address coordinate }
      }
      nextToken
    }
  }
`;

export const VEHICLE_BY_COMPANY_TOWING = /* GraphQL */ `
  query VehicleByCompany(
    $companyId: ID!
    $licensePlate: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $limit: Int
    $nextToken: String
  ) {
    vehicleByCompany(
      companyId: $companyId
      licensePlate: $licensePlate
      sortDirection: $sortDirection
      filter: {
        or: [{
          type: { eq: FURGONE }
        }, {
          type: { eq: MOTRICE }
        }, {
          type: { eq: TRATTORE }
        }]
      }
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        licensePlate
        type
        brand
        model
        maxWeight
        status
        lastPosition { place_id region province city address coordinate }
      }
      nextToken
    }
  }
`;

export const VEHICLE_BY_COMPANY_TOWED = /* GraphQL */ `
  query VehicleByCompany(
    $companyId: ID!
    $licensePlate: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $limit: Int
    $nextToken: String
  ) {
    vehicleByCompany(
      companyId: $companyId
      licensePlate: $licensePlate
      sortDirection: $sortDirection
      filter: {
        or: [{
          type: { eq: SEMIRIMORCHIO }
        }, {
          type: { eq: RIMORCHIO }
        }]
      }
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        licensePlate
        type
        brand
        model
        maxWeight
        status
        lastPosition { place_id region province city address coordinate }
      }
      nextToken
    }
  }
`;

export const VEHICLE_BY_ID = /* GraphQL */ `
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

export const VEHICLE_BY_LICENSEPLATE = /* GraphQL */  `
  query VehicleByCompany(
    $companyId: ID!
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
`