
export const CREATE_VEHICLE = /* GraphQL */ `
  mutation CreateVehicle($input: CreateVehicleInput!) {
    createVehicle(input: $input) {
      id
      licensePlate
      type
      brand
      model
      axle
      fuel
      kilometers
      dimensions { x y z }
      lastPosition { place_id region province city address coordinate }
      log { authorId author description timestamp }
      indipendent
      note
      maxWeight
      bulkhead
      tailLift
      status
      spot
    }
  }
`

export const UPDATE_VEHICLE = /* GraphQL */ `
  mutation UpdateVehicle(
    $input: UpdateVehicleInput!
    $condition: ModelVehicleConditionInput
  ) {
    updateVehicle(input: $input, condition: $condition) {
      id
      licensePlate
      companyId
      type
      brand
      model
      dimensions { x y z }
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
      lastPosition { place_id region province city address coordinate }
      indipendent
      log { authorId author description timestamp }
      note
    }
  }
`;
export const DELETE_VEHICLE = /* GraphQL */ `
  mutation DeleteVehicle(
    $input: DeleteVehicleInput!
    $condition: ModelVehicleConditionInput
  ) {
    deleteVehicle(input: $input, condition: $condition) {
      licensePlate
      brand
      model
      log { authorId author description timestamp }
    }
  }
`;