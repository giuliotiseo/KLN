export const createTravel = /* GraphQL */ `
  mutation CreateTravel(
    $input: CreateTravelInput!
    $condition: ModelTravelConditionInput
  ) {
    createTravel(input: $input, condition: $condition) {
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
      driverName
      driver {
        username
        companyId
        name
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
        orders {
          orderId
          plannedId
          orderStamp
          orderStatus
          operation
          operationValue
        }
        companyName
        companyId
        tenantCompany
        checkpoint {
          warehouseId
          extId
          thirdCompanyId
          thirdCompanyOwner
          thirdCompanyName
          thirdCompanyVat
          name
          maxLength
          tools
          note
        }
        estimatedLength
        estimatedTime
        completed
      }
      waypoints {
        id
        orders {
          orderId
          plannedId
          orderStamp
          orderStatus
          operation
          operationValue
        }
        companyName
        companyId
        tenantCompany
        checkpoint {
          warehouseId
          extId
          thirdCompanyId
          thirdCompanyOwner
          thirdCompanyName
          thirdCompanyVat
          name
          maxLength
          tools
          note
        }
        estimatedLength
        estimatedTime
        completed
      }
      end {
        id
        orders {
          orderId
          plannedId
          orderStamp
          orderStatus
          operation
          operationValue
        }
        companyName
        companyId
        tenantCompany
        checkpoint {
          warehouseId
          extId
          thirdCompanyId
          thirdCompanyOwner
          thirdCompanyName
          thirdCompanyVat
          name
          maxLength
          tools
          note
        }
        estimatedLength
        estimatedTime
        completed
      }
      plannedOrderIds
      travelType
      lastPosition {
        place_id
        region
        province
        city
        address
        coordinate
      }
      note
      log {
        authorId
        author
        description
        timestamp
      }
      orders {
        items {
          id
          departureDate
          arrivalDate
          carrierId
          tenantCarrier
          customerId
          tenantCustomer
          orderId
          travelId
          operation
          operationValue
          createdAt
          updatedAt
        }
        nextToken
      }
      palletHandlings {
        items {
          id
          stamp
          carrierId
          tenantCarrier
          carrierName
          customerId
          tenantCustomer
          customerName
          reversalId
          tenantReversal
          reversalName
          createdAt
          operationDate
          updatedAt
          loadQuantity
          loadNote
          disposableLoad
          disposableLoadNote
          unloadQuantity
          unloadNote
          disposableUnload
          disposableUnloadNote
          reversalQuantity
          reversalNote
          palletHandlingRefId
          travelId
          travelStamp
          carrierOperatorName
          vehicleLicensePlate
          type
          status
          carrierValidation
          carrierValidatorName
          carrierValidationMessage
          customerValidation
          customerValidatorName
          customerValidationMessage
          isVoucher
        }
        nextToken
      }
    }
  }
`;

export const updateTravel = /* GraphQL */ `
  mutation UpdateTravel(
    $input: UpdateTravelInput!
    $condition: ModelTravelConditionInput
  ) {
    updateTravel(input: $input, condition: $condition) {
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
      driverName
      driver {
        username
        companyId
        name
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
        orders {
          orderId
          plannedId
          orderStamp
          orderStatus
          operation
          operationValue
        }
        companyName
        companyId
        tenantCompany
        checkpoint {
          warehouseId
          extId
          thirdCompanyId
          thirdCompanyOwner
          thirdCompanyName
          thirdCompanyVat
          name
          maxLength
          tools
          note
        }
        estimatedLength
        estimatedTime
        completed
      }
      waypoints {
        id
        orders {
          orderId
          plannedId
          orderStamp
          orderStatus
          operation
          operationValue
        }
        companyName
        companyId
        tenantCompany
        checkpoint {
          warehouseId
          extId
          thirdCompanyId
          thirdCompanyOwner
          thirdCompanyName
          thirdCompanyVat
          name
          maxLength
          tools
          note
        }
        estimatedLength
        estimatedTime
        completed
      }
      end {
        id
        orders {
          orderId
          plannedId
          orderStamp
          orderStatus
          operation
          operationValue
        }
        companyName
        companyId
        tenantCompany
        checkpoint {
          warehouseId
          extId
          thirdCompanyId
          thirdCompanyOwner
          thirdCompanyName
          thirdCompanyVat
          name
          maxLength
          tools
          note
        }
        estimatedLength
        estimatedTime
        completed
      }
      plannedOrderIds
      travelType
      lastPosition {
        place_id
        region
        province
        city
        address
        coordinate
      }
      note
      log {
        authorId
        author
        description
        timestamp
      }
      orders {
        items {
          id
          departureDate
          arrivalDate
          carrierId
          tenantCarrier
          customerId
          tenantCustomer
          orderId
          travelId
          operation
          operationValue
          createdAt
          updatedAt
        }
        nextToken
      }
      palletHandlings {
        items {
          id
          stamp
          carrierId
          tenantCarrier
          carrierName
          customerId
          tenantCustomer
          customerName
          reversalId
          tenantReversal
          reversalName
          createdAt
          operationDate
          updatedAt
          loadQuantity
          loadNote
          disposableLoad
          disposableLoadNote
          unloadQuantity
          unloadNote
          disposableUnload
          disposableUnloadNote
          reversalQuantity
          reversalNote
          palletHandlingRefId
          travelId
          travelStamp
          carrierOperatorName
          vehicleLicensePlate
          type
          status
          carrierValidation
          carrierValidatorName
          carrierValidationMessage
          customerValidation
          customerValidatorName
          customerValidationMessage
          isVoucher
        }
        nextToken
      }
    }
  }
`;

export const deleteTravel = /* GraphQL */ `
  mutation DeleteTravel(
    $input: DeleteTravelInput!
    $condition: ModelTravelConditionInput
  ) {
    deleteTravel(input: $input, condition: $condition) {
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
      driverName
      driver {
        username
        companyId
        name
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
        orders {
          orderId
          plannedId
          orderStamp
          orderStatus
          operation
          operationValue
        }
        companyName
        companyId
        tenantCompany
        checkpoint {
          warehouseId
          extId
          thirdCompanyId
          thirdCompanyOwner
          thirdCompanyName
          thirdCompanyVat
          name
          maxLength
          tools
          note
        }
        estimatedLength
        estimatedTime
        completed
      }
      waypoints {
        id
        orders {
          orderId
          plannedId
          orderStamp
          orderStatus
          operation
          operationValue
        }
        companyName
        companyId
        tenantCompany
        checkpoint {
          warehouseId
          extId
          thirdCompanyId
          thirdCompanyOwner
          thirdCompanyName
          thirdCompanyVat
          name
          maxLength
          tools
          note
        }
        estimatedLength
        estimatedTime
        completed
      }
      end {
        id
        orders {
          orderId
          plannedId
          orderStamp
          orderStatus
          operation
          operationValue
        }
        companyName
        companyId
        tenantCompany
        checkpoint {
          warehouseId
          extId
          thirdCompanyId
          thirdCompanyOwner
          thirdCompanyName
          thirdCompanyVat
          name
          maxLength
          tools
          note
        }
        estimatedLength
        estimatedTime
        completed
      }
      plannedOrderIds
      travelType
      lastPosition {
        place_id
        region
        province
        city
        address
        coordinate
      }
      note
      log {
        authorId
        author
        description
        timestamp
      }
      orders {
        items {
          id
          departureDate
          arrivalDate
          carrierId
          tenantCarrier
          customerId
          tenantCustomer
          orderId
          travelId
          operation
          operationValue
          createdAt
          updatedAt
        }
        nextToken
      }
      palletHandlings {
        items {
          id
          stamp
          carrierId
          tenantCarrier
          carrierName
          customerId
          tenantCustomer
          customerName
          reversalId
          tenantReversal
          reversalName
          createdAt
          operationDate
          updatedAt
          loadQuantity
          loadNote
          disposableLoad
          disposableLoadNote
          unloadQuantity
          unloadNote
          disposableUnload
          disposableUnloadNote
          reversalQuantity
          reversalNote
          palletHandlingRefId
          travelId
          travelStamp
          carrierOperatorName
          vehicleLicensePlate
          type
          status
          carrierValidation
          carrierValidatorName
          carrierValidationMessage
          customerValidation
          customerValidatorName
          customerValidationMessage
          isVoucher
        }
        nextToken
      }
    }
  }
`;

export const createTravelsOrders = /* GraphQL */ `
  mutation CreateTravelsOrders(
    $input: CreateTravelsOrdersInput!
    $condition: ModelTravelsOrdersConditionInput
  ) {
    createTravelsOrders(input: $input, condition: $condition) {
      id
      departureDate
      arrivalDate
      carrierId
      tenantCarrier
      customerId
      tenantCustomer
      orderId
      travelId
      waypoint {
        id
        orders {
          orderId
          plannedId
          orderStamp
          orderStatus
          operation
          operationValue
        }
        companyName
        companyId
        tenantCompany
        checkpoint {
          warehouseId
          extId
          thirdCompanyId
          thirdCompanyOwner
          thirdCompanyName
          thirdCompanyVat
          name
          maxLength
          tools
          note
        }
        estimatedLength
        estimatedTime
        completed
      }
      operation
      operationValue
      createdAt
      updatedAt
      order {
        id
        extId
        stamp
        name
        preOrderId
        carrierId
        senderId
        receiverId
        pickupStorageId
        deliveryStorageId
        tenantCarrier
        tenantSender
        tenantReceiver
        tenantPickupStorage
        tenantDeliveryStorage
        carrierName
        senderName
        receiverName
        pickupStorageName
        deliveryStorageName
        carrierVat
        senderVat
        receiverVat
        pickupStorageVat
        deliveryStorageVat
        createdAt
        updatedAt
        completedAt
        paymentCondition
        shipmentType
        pickupCheckpoint {
          warehouseId
          extId
          thirdCompanyId
          thirdCompanyOwner
          thirdCompanyName
          thirdCompanyVat
          name
          maxLength
          tools
          note
        }
        pickupDateStart
        pickupDateEnd
        pickupSlots {
          from
          to
        }
        depotCheckpoint {
          warehouseId
          extId
          thirdCompanyId
          thirdCompanyOwner
          thirdCompanyName
          thirdCompanyVat
          name
          maxLength
          tools
          note
        }
        depotDateStart
        depotDateEnd
        depotSlots {
          from
          to
        }
        deliveryCheckpoint {
          warehouseId
          extId
          thirdCompanyId
          thirdCompanyOwner
          thirdCompanyName
          thirdCompanyVat
          name
          maxLength
          tools
          note
        }
        deliveryDateStart
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
        billingType
        note
        sender {
          id
          companyCode
          vatNumber
          name
          fiscalCode
          city
          address
          uniqueCode
          pec
          trades
          type
          authorCustomersRaw
          createdAt
          updatedAt
          owner
        }
        carrier {
          id
          companyCode
          vatNumber
          name
          fiscalCode
          city
          address
          uniqueCode
          pec
          trades
          type
          authorCustomersRaw
          createdAt
          updatedAt
          owner
        }
        receiver {
          id
          companyCode
          vatNumber
          name
          fiscalCode
          city
          address
          uniqueCode
          pec
          trades
          type
          authorCustomersRaw
          createdAt
          updatedAt
          owner
        }
        pickupStorage {
          id
          companyCode
          vatNumber
          name
          fiscalCode
          city
          address
          uniqueCode
          pec
          trades
          type
          authorCustomersRaw
          createdAt
          updatedAt
          owner
        }
        deliveryStorage {
          id
          companyCode
          vatNumber
          name
          fiscalCode
          city
          address
          uniqueCode
          pec
          trades
          type
          authorCustomersRaw
          createdAt
          updatedAt
          owner
        }
        checks {
          nextToken
        }
        travels {
          nextToken
        }
      }
      travel {
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
        driverName
        driver {
          username
          companyId
          name
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
        lastPosition {
          place_id
          region
          province
          city
          address
          coordinate
        }
        note
        log {
          authorId
          author
          description
          timestamp
        }
        orders {
          nextToken
        }
        palletHandlings {
          nextToken
        }
      }
    }
  }
`;

export const updateTravelsOrders = /* GraphQL */ `
  mutation UpdateTravelsOrders(
    $input: UpdateTravelsOrdersInput!
    $condition: ModelTravelsOrdersConditionInput
  ) {
    updateTravelsOrders(input: $input, condition: $condition) {
      id
      departureDate
      arrivalDate
      carrierId
      tenantCarrier
      customerId
      tenantCustomer
      orderId
      travelId
      waypoint {
        id
        orders {
          orderId
          plannedId
          orderStamp
          orderStatus
          operation
          operationValue
        }
        companyName
        companyId
        tenantCompany
        checkpoint {
          warehouseId
          extId
          thirdCompanyId
          thirdCompanyOwner
          thirdCompanyName
          thirdCompanyVat
          name
          maxLength
          tools
          note
        }
        estimatedLength
        estimatedTime
        completed
      }
      operation
      operationValue
      createdAt
      updatedAt
      order {
        id
        extId
        stamp
        name
        preOrderId
        carrierId
        senderId
        receiverId
        pickupStorageId
        deliveryStorageId
        tenantCarrier
        tenantSender
        tenantReceiver
        tenantPickupStorage
        tenantDeliveryStorage
        carrierName
        senderName
        receiverName
        pickupStorageName
        deliveryStorageName
        carrierVat
        senderVat
        receiverVat
        pickupStorageVat
        deliveryStorageVat
        createdAt
        updatedAt
        completedAt
        paymentCondition
        shipmentType
        pickupCheckpoint {
          warehouseId
          extId
          thirdCompanyId
          thirdCompanyOwner
          thirdCompanyName
          thirdCompanyVat
          name
          maxLength
          tools
          note
        }
        pickupDateStart
        pickupDateEnd
        pickupSlots {
          from
          to
        }
        depotCheckpoint {
          warehouseId
          extId
          thirdCompanyId
          thirdCompanyOwner
          thirdCompanyName
          thirdCompanyVat
          name
          maxLength
          tools
          note
        }
        depotDateStart
        depotDateEnd
        depotSlots {
          from
          to
        }
        deliveryCheckpoint {
          warehouseId
          extId
          thirdCompanyId
          thirdCompanyOwner
          thirdCompanyName
          thirdCompanyVat
          name
          maxLength
          tools
          note
        }
        deliveryDateStart
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
        billingType
        note
        sender {
          id
          companyCode
          vatNumber
          name
          fiscalCode
          city
          address
          uniqueCode
          pec
          trades
          type
          authorCustomersRaw
          createdAt
          updatedAt
          owner
        }
        carrier {
          id
          companyCode
          vatNumber
          name
          fiscalCode
          city
          address
          uniqueCode
          pec
          trades
          type
          authorCustomersRaw
          createdAt
          updatedAt
          owner
        }
        receiver {
          id
          companyCode
          vatNumber
          name
          fiscalCode
          city
          address
          uniqueCode
          pec
          trades
          type
          authorCustomersRaw
          createdAt
          updatedAt
          owner
        }
        pickupStorage {
          id
          companyCode
          vatNumber
          name
          fiscalCode
          city
          address
          uniqueCode
          pec
          trades
          type
          authorCustomersRaw
          createdAt
          updatedAt
          owner
        }
        deliveryStorage {
          id
          companyCode
          vatNumber
          name
          fiscalCode
          city
          address
          uniqueCode
          pec
          trades
          type
          authorCustomersRaw
          createdAt
          updatedAt
          owner
        }
        checks {
          nextToken
        }
        travels {
          nextToken
        }
      }
      travel {
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
        driverName
        driver {
          username
          companyId
          name
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
        lastPosition {
          place_id
          region
          province
          city
          address
          coordinate
        }
        note
        log {
          authorId
          author
          description
          timestamp
        }
        orders {
          nextToken
        }
        palletHandlings {
          nextToken
        }
      }
    }
  }
`;

export const deleteTravelsOrders = /* GraphQL */ `
  mutation DeleteTravelsOrders(
    $input: DeleteTravelsOrdersInput!
    $condition: ModelTravelsOrdersConditionInput
  ) {
    deleteTravelsOrders(input: $input, condition: $condition) {
      id
      departureDate
      arrivalDate
      carrierId
      tenantCarrier
      customerId
      tenantCustomer
      orderId
      travelId
      waypoint {
        id
        orders {
          orderId
          plannedId
          orderStamp
          orderStatus
          operation
          operationValue
        }
        companyName
        companyId
        tenantCompany
        checkpoint {
          warehouseId
          extId
          thirdCompanyId
          thirdCompanyOwner
          thirdCompanyName
          thirdCompanyVat
          name
          maxLength
          tools
          note
        }
        estimatedLength
        estimatedTime
        completed
      }
      operation
      operationValue
      createdAt
      updatedAt
      order {
        id
        extId
        stamp
        name
        preOrderId
        carrierId
        senderId
        receiverId
        pickupStorageId
        deliveryStorageId
        tenantCarrier
        tenantSender
        tenantReceiver
        tenantPickupStorage
        tenantDeliveryStorage
        carrierName
        senderName
        receiverName
        pickupStorageName
        deliveryStorageName
        carrierVat
        senderVat
        receiverVat
        pickupStorageVat
        deliveryStorageVat
        createdAt
        updatedAt
        completedAt
        paymentCondition
        shipmentType
        pickupCheckpoint {
          warehouseId
          extId
          thirdCompanyId
          thirdCompanyOwner
          thirdCompanyName
          thirdCompanyVat
          name
          maxLength
          tools
          note
        }
        pickupDateStart
        pickupDateEnd
        pickupSlots {
          from
          to
        }
        depotCheckpoint {
          warehouseId
          extId
          thirdCompanyId
          thirdCompanyOwner
          thirdCompanyName
          thirdCompanyVat
          name
          maxLength
          tools
          note
        }
        depotDateStart
        depotDateEnd
        depotSlots {
          from
          to
        }
        deliveryCheckpoint {
          warehouseId
          extId
          thirdCompanyId
          thirdCompanyOwner
          thirdCompanyName
          thirdCompanyVat
          name
          maxLength
          tools
          note
        }
        deliveryDateStart
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
        billingType
        note
        sender {
          id
          companyCode
          vatNumber
          name
          fiscalCode
          city
          address
          uniqueCode
          pec
          trades
          type
          authorCustomersRaw
          createdAt
          updatedAt
          owner
        }
        carrier {
          id
          companyCode
          vatNumber
          name
          fiscalCode
          city
          address
          uniqueCode
          pec
          trades
          type
          authorCustomersRaw
          createdAt
          updatedAt
          owner
        }
        receiver {
          id
          companyCode
          vatNumber
          name
          fiscalCode
          city
          address
          uniqueCode
          pec
          trades
          type
          authorCustomersRaw
          createdAt
          updatedAt
          owner
        }
        pickupStorage {
          id
          companyCode
          vatNumber
          name
          fiscalCode
          city
          address
          uniqueCode
          pec
          trades
          type
          authorCustomersRaw
          createdAt
          updatedAt
          owner
        }
        deliveryStorage {
          id
          companyCode
          vatNumber
          name
          fiscalCode
          city
          address
          uniqueCode
          pec
          trades
          type
          authorCustomersRaw
          createdAt
          updatedAt
          owner
        }
        checks {
          nextToken
        }
        travels {
          nextToken
        }
      }
      travel {
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
        driverName
        driver {
          username
          companyId
          name
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
        lastPosition {
          place_id
          region
          province
          city
          address
          coordinate
        }
        note
        log {
          authorId
          author
          description
          timestamp
        }
        orders {
          nextToken
        }
        palletHandlings {
          nextToken
        }
      }
    }
  }
`;