export const createPalletHandling = /* GraphQL */ `
  mutation CreatePalletHandling(
    $input: CreatePalletHandlingInput!
    $condition: ModelPalletHandlingConditionInput
  ) {
    createPalletHandling(input: $input, condition: $condition) {
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