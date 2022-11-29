export const CREATE_ORDER = /* GraphQL */ `
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      id
      extId
      stamp
      name
      preOrderId
      tenantCarrier
      tenantSender
      tenantReceiver
      senderName
      carrierName
      receiverName
      senderVat
      carrierVat
      receiverVat
      shipmentType
      status
      collectChecks
      checksAmount
      createdAt
      perishable
      updatedAt
      completedAt
      pickupDateStart
      pickupDateEnd
      loadingMeter
      quantity
      support
      size
      pickupCheckpoint {
        warehouseId
        extId
        name
        location { place_id region province city address coordinate }
        contacts { contactId name email phone }
        windows { start end days type }
        note
      }
      depotCheckpoint {
        warehouseId
        extId
        name
        location { place_id region province city address coordinate }
        contacts { contactId name email phone }
        windows { start end days type }
        note
      }
      pickupAddress
      deliveryAddress
      depotAddress
      deliveryDateStart
      deliveryDateEnd
      deliveryCheckpoint {
        warehouseId
        extId
        name
        location { place_id region province city address coordinate }
        contacts { contactId name email phone }
        windows { start end days type }
        note
      }
      trades
      docs { number date type files { identityId bucket region key extension timestamp }}
      log { authorId author description timestamp }
      note
    }
  }
`

export const UPDATE_ORDER = /* GraphQL */ `
  mutation UpdateOrder(
    $input: UpdateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    updateOrder(input: $input, condition: $condition) {
      id
      stamp
      name
      preOrderId
      tenantReceiver
      receiverName
      tenantSender
      senderName
      tenantCarrier
      carrierName
      senderVat
      carrierVat
      receiverVat
      createdAt
      updatedAt
      completedAt
      paymentCondition
      shipmentType
      pickupCheckpoint {
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
        maxLength
        tools
        contacts {
          contactId
          name
          email
          phone
        }
        windows {
          start
          end
          days
          type
        }
        note
      }
      depotCheckpoint {
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
        maxLength
        tools
        contacts {
          contactId
          name
          email
          phone
        }
        windows {
          start
          end
          days
          type
        }
        note
      }
      pickupDateStart
      pickupDateEnd
      pickupSlots {
        from
        to
      }
      deliveryCheckpoint {
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
        maxLength
        tools
        contacts {
          contactId
          name
          email
          phone
        }
        windows {
          start
          end
          days
          type
        }
        note
      }
      deliveryDateStart
      depotDateStart
      depotDateEnd
      depotSlots { from to }
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
    }
  }
`;


export const DELETE_ORDER = /* GraphQL */ `
  mutation DeleteOrder($input: DeleteOrderInput!) {
    deleteOrder(input: $input) {
      id
      stamp
      name
      preOrderId
      tenantCarrier
      tenantSender
      tenantReceiver
      senderVat
      carrierVat
      receiverVat
      senderName
      carrierName
      receiverName
      shipmentType
      status
      createdAt
      pickupDateStart
      pickupDateEnd
      deliveryDateStart
      deliveryDateEnd
    }
  }
`
