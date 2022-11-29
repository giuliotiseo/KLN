export const ON_CREATE_ORDER_BY_TENANT_SENDER = /* GraphQL */ `
  subscription OnCreateOrderByTenantSender($tenantSender: ID!) {
    onCreateOrderByTenantSender(tenantSender: $tenantSender) {
      id
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
        name
        location { place_id region province city address coordinate }
        contacts { contactId name email phone }
        windows { start end days type }
        maxLength
        tools
        note
      }
      pickupAddress
      deliveryAddress
      depotAddress
      deliveryDateStart
      deliveryDateEnd
      deliveryCheckpoint {
        name
        location { place_id region province city address coordinate }
        contacts { contactId name email phone }
        windows { start end days type }
        maxLength
        tools
        note
      }
      trades
      docs { number date type files { identityId bucket region key extension timestamp }}
      log { authorId author description timestamp }
      note
    }
  }
`;

export const ON_CREATE_ORDER_BY_TENANT_CARRIER = /* GraphQL */ `
  subscription OnCreateOrderByTenantCarrier($tenantCarrier: ID!) {
    onCreateOrderByTenantCarrier(tenantCarrier: $tenantCarrier) {
      id
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
        name
        location { place_id region province city address coordinate }
        contacts { contactId name email phone }
        windows { start end days type }
        maxLength
        tools
        note
      }
      pickupAddress
      deliveryAddress
      depotAddress
      deliveryDateStart
      deliveryDateEnd
      deliveryCheckpoint {
        name
        location { place_id region province city address coordinate }
        contacts { contactId name email phone }
        windows { start end days type }
        maxLength
        tools
        note
      }
      trades
      docs { number date type files { identityId bucket region key extension timestamp }}
      log { authorId author description timestamp }
      note
    }
  }
`;

export const ON_DELETE_ORDER_BY_TENANT_CARRIER = /* GraphQL */ `
  subscription OnDeleteOrderByTenantCarrier($tenantCarrier: ID!) {
    onDeleteOrderByCarrier(tenantCarrier: $tenantCarrier) {
      id
      stamp
      name
      preOrderId
      tenantCarrier
      tenantSender
      tenantReceiver
      senderName
      carrierName
      senderVat
      carrierVat
      receiverVat
      receiverName
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
        name
        location { place_id region province city address coordinate }
        contacts { contactId name email phone }
        windows { start end days type }
        maxLength
        tools
        note
      }
      pickupAddress
      deliveryAddress
      depotAddress
      deliveryDateStart
      deliveryDateEnd
      deliveryCheckpoint {
        name
        location { place_id region province city address coordinate }
        contacts { contactId name email phone }
        windows { start end days type }
        maxLength
        tools
        note
      }
      trades
      docs { number date type files { identityId bucket region key extension timestamp }}
      log { authorId author description timestamp }
      note
    }
  }
`;

export const ON_CREATE_ORDER_BY_TENANT_RECEIVER = /* GraphQL */ `
  subscription OnCreateOrderByTenantReceiver($tenantReceiver: ID!) {
    onCreateOrderByTenantReceiver(tenantReceiver: $tenantReceiver) {
      id
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
        name
        location { place_id region province city address coordinate }
        contacts { contactId name email phone }
        windows { start end days type }
        maxLength
        tools
        note
      }
      pickupAddress
      deliveryAddress
      depotAddress
      deliveryDateStart
      deliveryDateEnd
      deliveryCheckpoint {
        name
        location { place_id region province city address coordinate }
        contacts { contactId name email phone }
        windows { start end days type }
        maxLength
        tools
        note
      }
      trades
      docs { number date type files { identityId bucket region key extension timestamp }}
      log { authorId author description timestamp }
      note
    }
  }
`;

export const ON_UPDATE_ORDER_BY_TENANT_SENDER = /* GraphQL */ `
  subscription OnUpdateOrderByTenantSender($tenantSender: ID!) {
    onUpdateOrderByTenantSender(tenantSender: $tenantSender) {
      id
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
        name
        location { place_id region province city address coordinate }
        contacts { contactId name email phone }
        windows { start end days type }
        maxLength
        tools
        note
      }
      depotCheckpoint {
        name
        location { place_id region province city address coordinate }
        contacts { contactId name email phone }
        windows { start end days type }
        maxLength
        tools
        note
      }
      pickupAddress
      deliveryAddress
      depotAddress
      deliveryDateStart
      deliveryDateEnd
      depotDateStart
      depotDateEnd
      deliveryCheckpoint {
        name
        location { place_id region province city address coordinate }
        contacts { contactId name email phone }
        windows { start end days type }
        maxLength
        tools
        note
      }
      trades
      docs { number date type files { identityId bucket region key extension timestamp }}
      log { authorId author description timestamp }
      note
    }
  }
`;

export const ON_UPDATE_ORDER_BY_TENANT_RECEIVER = /* GraphQL */ `
  subscription onUpdateOrderByTenantReceiver($tenantReceiver: ID!) {
    onUpdateOrderByTenantReceiver(tenantReceiver: $tenantReceiver) {
      id
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
        name
        location { place_id region province city address coordinate }
        contacts { contactId name email phone }
        windows { start end days type }
        maxLength
        tools
        note
      }
      depotCheckpoint {
        name
        location { place_id region province city address coordinate }
        contacts { contactId name email phone }
        windows { start end days type }
        maxLength
        tools
        note
      }
      pickupAddress
      deliveryAddress
      depotAddress
      deliveryDateStart
      deliveryDateEnd
      depotDateStart
      depotDateEnd
      deliveryCheckpoint {
        name
        location { place_id region province city address coordinate }
        contacts { contactId name email phone }
        windows { start end days type }
        maxLength
        tools
        note
      }
      trades
      docs { number date type files { identityId bucket region key extension timestamp }}
      log { authorId author description timestamp }
      note
    }
  }
`;


export const ON_DELETE_ORDER_BY_TENANT_RECEIVER = /* GraphQL */ `
  subscription onDeleteOrderByReceiver($tenantReceiver: ID!) {
    onDeleteOrderByReceiver(tenantReceiver: $tenantReceiver) {
      id
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
        name
        location { place_id region province city address coordinate }
        contacts { contactId name email phone }
        windows { start end days type }
        maxLength
        tools
        maxLength
        tools
        note
      }
      pickupAddress
      deliveryAddress
      depotAddress
      deliveryDateStart
      deliveryDateEnd
      deliveryCheckpoint {
        name
        location { place_id region province city address coordinate }
        contacts { contactId name email phone }
        windows { start end days type }
        maxLength
        tools
        maxLength
        tools
        note
      }
      trades
      docs { number date type files { identityId bucket region key extension timestamp }}
      log { authorId author description timestamp }
      note
    }
  }
`;