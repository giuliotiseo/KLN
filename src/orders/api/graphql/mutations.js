export const CREATE_ORDER = /* GraphQL */ `
  mutation CreateOrder(
    $input: CreateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    createOrder(input: $input, condition: $condition) {
      id
        extId
        stamp
        name
        preOrderId
        carrierId
        senderId
        receiverId
        deliveryStorageId
        pickupStorageId
        deliveryStorageName
        pickupStorageName
        deliveryStorageVat
        pickupStorageVat
        deliveryStorageId
        pickupStorageId
        deliveryStorageName
        pickupStorageName
        deliveryStorageVat
        pickupStorageVat
        tenantCarrier
        tenantSender
        tenantReceiver
        carrierName
        senderName
        receiverName
        carrierVat
        senderVat
        receiverVat
        createdAt
        updatedAt
        completedAt
        shipmentType
        pickupCheckpoint { location { address region }}
        pickupDateStart
        pickupDateEnd
        depotCheckpoint { location { address region }}
        depotDateStart
        depotDateEnd
        deliveryCheckpoint { location { address region }}
        deliveryDateStart
        deliveryDateEnd
        pickupAddress
        deliveryAddress
        depotAddress
        status
        support
        quantity
        size
    }
  }
`;

export const UPDATE_ORDER = /* GraphQL */ `
  mutation UpdateOrder(
    $input: UpdateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    updateOrder(input: $input, condition: $condition) {
      id
      extId
      stamp
      name
      preOrderId
      carrierId
      senderId
      receiverId
      deliveryStorageId
      pickupStorageId
      deliveryStorageName
      pickupStorageName
      deliveryStorageVat
      pickupStorageVat
      tenantCarrier
      tenantSender
      tenantReceiver
      carrierName
      senderName
      receiverName
      carrierVat
      senderVat
      receiverVat
      createdAt
      updatedAt
      completedAt
      shipmentType
      pickupCheckpoint { location { address region }}
      pickupDateStart
      pickupDateEnd
      depotCheckpoint { location { address region }}
      depotDateStart
      depotDateEnd
      deliveryCheckpoint { location { address region }}
      deliveryDateStart
      deliveryDateEnd
      pickupAddress
      deliveryAddress
      depotAddress
      status
      support
      quantity
      size
    }
  }
`;

export const DELETE_ORDER = /* GraphQL */ `
  mutation DeleteOrder(
    $input: DeleteOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    deleteOrder(input: $input, condition: $condition) {
      id
      extId
      stamp
      name
      preOrderId
      carrierId
      senderId
      receiverId
      deliveryStorageId
      pickupStorageId
      deliveryStorageName
      pickupStorageName
      deliveryStorageVat
      pickupStorageVat
      tenantCarrier
      tenantSender
      tenantReceiver
      carrierName
      senderName
      receiverName
      carrierVat
      senderVat
      receiverVat
      createdAt
      updatedAt
      completedAt
      shipmentType
      pickupCheckpoint { location { address region }}
      pickupDateStart
      pickupDateEnd
      depotCheckpoint { location { address region }}
      depotDateStart
      depotDateEnd
      deliveryCheckpoint { location { address region }}
      deliveryDateStart
      deliveryDateEnd
      pickupAddress
      deliveryAddress
      depotAddress
      status
      support
      quantity
      size
    }
  }
`;
