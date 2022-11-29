export const CREATE_PREORDER = /* GraphQL */ `
  mutation CreatePreOrder(
    $input: CreatePreOrderInput!
    $condition: ModelPreOrderConditionInput
  ) {
    createPreOrder(input: $input, condition: $condition) {
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
    }
  }
`;

export const UPDATE_PREORDER = /* GraphQL */ `
  mutation UpdatePreOrder(
    $input: UpdatePreOrderInput!
    $condition: ModelPreOrderConditionInput
  ) {
    updatePreOrder(input: $input, condition: $condition) {
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
      address
      trades
      files {
        filename
        identityId
        bucket
        region
        key
        extension
        timestamp
      }
      log {
        authorId
        author
        description
        timestamp
      }
      note
      billingType
    }
  }
`;

export const DELETE_PREORDER = /* GraphQL */ `
  mutation DeletePreOrder(
    $input: DeletePreOrderInput!
    $condition: ModelPreOrderConditionInput
  ) {
    deletePreOrder(input: $input, condition: $condition) {
      id
      name
      carrierId
      senderId
    }
  }
`;