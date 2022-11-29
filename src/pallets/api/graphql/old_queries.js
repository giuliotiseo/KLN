export const palletHandlingByCustomerOperationDate = /* GraphQL */ `
  query PalletHandlingByCustomerOperationDate(
    $customerId: ID
    $operationDate: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPalletHandlingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    palletHandlingByCustomerOperationDate(
      customerId: $customerId
      operationDate: $operationDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        waypoint {
          id
          companyName
          companyId
          tenantCompany
          estimatedLength
          estimatedTime
          completed
        }
        carrierOperatorName
        carrierOperator {
          username
          companyId
          name
          email
          phone
          job
          task
          tenant
        }
        vehicleLicensePlate
        vehicleOperator {
          licensePlate
          name
        }
        type
        status
        carrierValidation
        carrierValidatorName
        carrierValidator {
          username
          companyId
          name
          email
          phone
          job
          task
          tenant
        }
        carrierValidationMessage
        customerValidation
        customerValidatorName
        customerValidator {
          username
          companyId
          name
          email
          phone
          job
          task
          tenant
        }
        customerValidationMessage
        isVoucher
        voucherImage {
          filename
          identityId
          bucket
          region
          key
          extension
          timestamp
        }
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
          estimatedTravelTime
          estimatedTravelLength
          estimatedTransportCosts
          plannedOrderIds
          travelType
          note
        }
      }
      nextToken
    }
  }
`;

export const palletHandlingByCustomerTravelOperationDate = /* GraphQL */ `
  query PalletHandlingByCustomerTravelOperationDate(
    $customerId: ID
    $travelStampOperationDate: ModelPalletHandlingPalletHandlingByCustomerTravelOperationDateCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPalletHandlingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    palletHandlingByCustomerTravelOperationDate(
      customerId: $customerId
      travelStampOperationDate: $travelStampOperationDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        waypoint {
          id
          companyName
          companyId
          tenantCompany
          estimatedLength
          estimatedTime
          completed
        }
        carrierOperatorName
        carrierOperator {
          username
          companyId
          name
          email
          phone
          job
          task
          tenant
        }
        vehicleLicensePlate
        vehicleOperator {
          licensePlate
          name
        }
        type
        status
        carrierValidation
        carrierValidatorName
        carrierValidator {
          username
          companyId
          name
          email
          phone
          job
          task
          tenant
        }
        carrierValidationMessage
        customerValidation
        customerValidatorName
        customerValidator {
          username
          companyId
          name
          email
          phone
          job
          task
          tenant
        }
        customerValidationMessage
        isVoucher
        voucherImage {
          filename
          identityId
          bucket
          region
          key
          extension
          timestamp
        }
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
          estimatedTravelTime
          estimatedTravelLength
          estimatedTransportCosts
          plannedOrderIds
          travelType
          note
        }
      }
      nextToken
    }
  }
`;