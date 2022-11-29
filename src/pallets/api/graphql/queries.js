export const PALLET_BY_BOOKED = /* GraphQL */ `
  query PalletHandlingByStatusOperationDate(
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelPalletHandlingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    palletHandlingByStatusOperationDate(
      status: BOOKED
      operationDate: {
        between: [ $start, $end ]
      }
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        stamp
        carrierId
        carrierName
        customerId
        customerName
        reversalId
        reversalName
        operationDate
        loadQuantity
        unloadQuantity
        reversalQuantity
        palletHandlingRefId
        travelStamp
        type
        status
        carrierValidation
        customerValidation
        carrierValidatorName
      }
      nextToken
    }
  }
`;

export const PALLET_BY_BOOKED_TYPE = /* GraphQL */ `
  query PalletHandlingByStatusTypeDate(
    $type: PalletHandlingType
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelPalletHandlingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    palletHandlingByStatusTypeDate(
      status: BOOKED
      typeOperationDate: {
        between: [{
          type: $type,
          operationDate: $start
        }, {
          type: $type,
          operationDate: $end
        }]
      }
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        stamp
        carrierId
        carrierName
        customerId
        customerName
        reversalId
        reversalName
        operationDate
        loadQuantity
        unloadQuantity
        reversalQuantity
        palletHandlingRefId
        travelStamp
        type
        status
        carrierValidation
        customerValidation
        carrierValidatorName
      }
      nextToken
    }
  }
`;

export const REPORT_PALLETS_FROM_CUSTOMERS = /* GraphQL */ `
  query customerByTenant(
    $companyId: ID!
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelCustomerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    customerByTenant(     # ATTENZIONE: NELLA VERSIONE DEFINITIVA AGGIORNATA ATTRIBUTO customerByTenant diventa customerByCompany
      tenant: $companyId  # ATTENZIONE: NELLA VERSIONE DEFINITIVA AGGIORNATA ATTRIBUTO tenant diventa companyId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items { 
        id name vatNumber tenant # ATTENZIONE: NELLA VERSIONE DEFINITIVA AGGIORNATA ATTRIBUTO tenant diventa companyId
        company {
          id location { place_id city province region coordinate }
          customerPalletHandlings(
            operationDate: {
              between: [$start, $end]
            }
          ) {
            items {
              id
              stamp
              carrierId
              carrierName
              customerId
              customerName
              reversalId
              reversalName
              operationDate
              loadQuantity
              unloadQuantity
              reversalQuantity
              palletHandlingRefId
              travelStamp
              type
              status
              carrierValidation
              customerValidation
              carrierValidatorName
            }
          }
          carrierPalletHandlings (
            operationDate: {
              between: [$start, $end]
            }
          ) {
            items {
              id
              stamp
              carrierId
              carrierName
              customerId
              customerName
              reversalId
              reversalName
              operationDate
              loadQuantity
              unloadQuantity
              reversalQuantity
              palletHandlingRefId
              travelStamp
              type
              status
              carrierValidation
              customerValidation
              carrierValidatorName
            }
          }
          reversalPalletHandlings (
            operationDate: {
              between: [$start, $end]
            }
          ) {
            items {
              id
              stamp
              carrierId
              carrierName
              customerId
              customerName
              reversalId
              reversalName
              operationDate
              loadQuantity
              unloadQuantity
              reversalQuantity
              palletHandlingRefId
              travelStamp
              type
              status
              carrierValidation
              customerValidation
              carrierValidatorName
            }
          }
        }
      }
      nextToken
    }
  }
`;

export const PALLET_BY_CARRIER = /* GraphQL */ `
  query PalletHandlingByCarrierOperationDate(
    $companyId: ID
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelPalletHandlingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    palletHandlingByCarrierOperationDate(
      carrierId: $companyId
      operationDate: {
        between: [$start, $end]
      }
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        stamp
        carrierName
        customerName
        reversalName
        operationDate
        loadQuantity
        unloadQuantity
        reversalQuantity
        palletHandlingRefId
        travelStamp
        type
        status
        carrierValidation
        customerValidation
        carrierValidatorName
      }
      nextToken
    }
  }
`;

export const PALLET_BY_CARRIER_CUSTOMER = /* GraphQL */ `
  query PalletHandlingByCarrierCustomerOperationDate(
    $companyId: ID
    $start: String
    $end: String
    $customerId: ID 
    $sortDirection: ModelSortDirection
    $filter: ModelPalletHandlingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    palletHandlingByCarrierCustomerOperationDate(
      carrierId: $companyId
      customerIdOperationDate: {
        between: [{
          customerId: $customerId,
          operationDate: $start
        }, {
          customerId: $customerId,
          operationDate: $end
        }]
      }
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        stamp
        carrierName
        customerName
        reversalName
        operationDate
        loadQuantity
        unloadQuantity
        reversalQuantity
        palletHandlingRefId
        travelStamp
        type
        status
        carrierValidation
        customerValidation
        carrierValidatorName
      }
      nextToken
    }
  }
`;

export const PALLET_BY_CARRIER_TYPE = /* GraphQL */ `
  query PalletHandlingByCarrierTypeOperationDate(
    $companyId: ID
    $start: String
    $end: String
    $type: PalletHandlingType
    $sortDirection: ModelSortDirection
    $filter: ModelPalletHandlingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    palletHandlingByCarrierTypeOperationDate(
      carrierId: $companyId
      typeOperationDate: {
        between: [{
          type: $type,
          operationDate: $start
        }, {
          type: $type,
          operationDate: $end
        }]
      }
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
  ) {
    items {
      id
      stamp
      carrierName
      customerName
      reversalName
      operationDate
      loadQuantity
      unloadQuantity
      reversalQuantity
      palletHandlingRefId
      travelStamp
      type
      status
      carrierValidation
      customerValidation
      carrierValidatorName
    }
    nextToken
  }
}
`;

export const PALLET_BY_CARRIER_TRAVEL = /* GraphQL */ `
  query PalletHandlingByCarrierTypeOperationDate(
    $companyId: ID
    $start: String
    $end: String
    $travelStamp: ID
    $sortDirection: ModelSortDirection
    $filter: ModelPalletHandlingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    palletHandlingByCarrierTravelOperationDate(
      carrierId: $companyId
      travelStampOperationDate: {
        between: [{
          travelStamp: $travelStamp,
          operationDate: $start
        }, {
          travelStamp: $travelStamp,
          operationDate: $end
        }]
      }
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
    items {
      id
      stamp
      carrierId
      customerId
      reversalId
      carrierName
      customerName
      reversalName
      operationDate
      loadQuantity
      unloadQuantity
      reversalQuantity
      palletHandlingRefId
      travelStamp
      type
      status
      carrierValidation
      customerValidation
      carrierValidatorName
    }
    nextToken
  }
}
`;

export const PALLET_BY_CARRIER_REVERSAL = /* GraphQL */ `
  query PalletHandlingByCustomerReversalOperationDate(
    $companyId: ID
    $start: String
    $end: String
    $reversalId: ID
    $sortDirection: ModelSortDirection
    $filter: ModelPalletHandlingFilterInput
    $nextToken: String
  ) {
    palletHandlingByCarrierReversalOperationDate(
      carrierId: $companyId
      reversalIdOperationDate: {
        between: [{
          reversalId: $reversalId,
          operationDate: $start
        }, {
          reversalId: $reversalId,
          operationDate: $end
        }]
      }
      sortDirection: $sortDirection
      filter: $filter
      limit: 9999
      nextToken: $nextToken
    ) {
    items {
      id
      stamp
      carrierName
      customerName
      reversalName
      operationDate
      loadQuantity
      unloadQuantity
      reversalQuantity
      palletHandlingRefId
      travelStamp
      type
      status
      carrierValidation
      customerValidation
      carrierValidatorName
    }
    nextToken
  }
}
`;

export const PALLET_BY_CUSTOMER = /* GraphQL */ `
  query PalletHandlingByCustomerOperationDate(
    $companyId: ID
    $start: String
    $end: String
    $sortDirection: ModelSortDirection
    $filter: ModelPalletHandlingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    palletHandlingByCustomerOperationDate(
      customerId: $companyId
      operationDate: {
        between: [$start, $end]
      }
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        stamp
        carrierName
        customerName
        reversalName
        operationDate
        loadQuantity
        unloadQuantity
        reversalQuantity
        palletHandlingRefId
        travelStamp
        type
        status
        carrierValidation
        customerValidation
        carrierValidatorName
      }
      nextToken
    }
  }
`;

export const PALLET_BY_CUSTOMER_CARRIER = /* GraphQL */ `
  query PalletHandlingByCustomerCarrierOperationDate(
    $companyId: ID
    $start: String
    $end: String
    $carrierId: ID 
    $sortDirection: ModelSortDirection
    $filter: ModelPalletHandlingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    palletHandlingByCustomerCarrierOperationDate(
      customerId: $companyId
      carrierIdOperationDate: {
        between: [{
          carrierId: $carrierId,
          operationDate: $start
        }, {
          carrierId: $carrierId,
          operationDate: $end
        }]
      }
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        stamp
        carrierName
        customerName
        reversalName
        operationDate
        loadQuantity
        unloadQuantity
        reversalQuantity
        palletHandlingRefId
        travelStamp
        type
        status
        carrierValidation
        customerValidation
        carrierValidatorName
      }
      nextToken
    }
  }
`;

export const PALLET_BY_CUSTOMER_TYPE = /* GraphQL */ `
  query PalletHandlingByCustomerTypeOperationDate(
    $companyId: ID
    $start: String
    $end: String
    $type: PalletHandlingType
    $sortDirection: ModelSortDirection
    $filter: ModelPalletHandlingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    palletHandlingByCustomerTypeOperationDate(
      customerId: $companyId
      typeOperationDate: {
        between: [{
          type: $type,
          operationDate: $start
        }, {
          type: $type,
          operationDate: $end
        }]
      }
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
  ) {
    items {
      id
      stamp
      carrierName
      customerName
      reversalName
      operationDate
      loadQuantity
      unloadQuantity
      reversalQuantity
      palletHandlingRefId
      travelStamp
      type
      status
      carrierValidation
      customerValidation
      carrierValidatorName
    }
    nextToken
  }
}
`;

export const PALLET_BY_CUSTOMER_TRAVEL = /* GraphQL */ `
  query PalletHandlingByCustomerTypeOperationDate(
    $companyId: ID
    $start: String
    $end: String
    $travelStamp: ID
    $sortDirection: ModelSortDirection
    $filter: ModelPalletHandlingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    palletHandlingByCarrierTravelOperationDate(
      customerId: $companyId
      travelStampOperationDate: {
        between: [{
          travelStamp: $travelStamp,
          operationDate: $start
        }, {
          travelStamp: $travelStamp,
          operationDate: $end
        }]
      }
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
    items {
      id
      stamp
      carrierName
      customerName
      reversalName
      operationDate
      loadQuantity
      unloadQuantity
      reversalQuantity
      palletHandlingRefId
      travelStamp
      type
      status
      carrierValidation
      customerValidation
      carrierValidatorName
    }
    nextToken
  }
}
`;

export const PALLET_BY_ID_CARRIER = /* GraphQL */ `
  query GetPalletHandling($id: ID!) {
    getPalletHandling(id: $id) {
      id
      stamp
      carrierId
      carrierName
      customerId
      customerName
      reversalId
      reversalName
      tenantCustomer
      tenantCarrier
      tenantReversal
      travelId
      travelStamp
      createdAt
      operationDate
      palletHandlingRefId
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
      type
      status
      carrierValidation
      carrierValidatorName
      travel { stamp licensePlate vehicleName palletHandlings { items { id stamp carrierName customerName reversalName
        waypoint { checkpoint { location { address }}}
      }}}
      carrierValidator { username name email phone task job tenant companyId }
      carrierOperator { name email phone task job }
      vehicleOperator { name licensePlate }
      carrierValidationMessage
      customerValidation
      customerValidatorName
      customerValidator { username name email phone task job tenant companyId }
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
    }
  }
`;

export const PALLET_BY_ID_CUSTOMER = /* GraphQL */ `
  query GetPalletHandling($id: ID!) {
    getPalletHandling(id: $id) {
      id
      stamp
      carrierId
      carrierName
      customerId
      customerName
      reversalId
      reversalName
      tenantCustomer
      tenantCarrier
      tenantReversal
      travelId
      travelStamp
      createdAt
      operationDate
      palletHandlingRefId
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
      type
      status
      carrierValidation
      carrierValidatorName
      carrierValidator { username name email phone task job tenant companyId }
      carrierOperator { name email phone task job }
      vehicleOperator { name licensePlate }
      carrierValidationMessage
      customerValidation
      customerValidatorName
      customerValidator { username name email phone task job tenant companyId }
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
    }
  }
`;

export const PALLET_BY_CUSTOMER_REVERSAL = /* GraphQL */ `
  query PalletHandlingByCustomerReversalOperationDate(
    $companyId: ID
    $start: String
    $end: String
    $reversalId: ID
    $sortDirection: ModelSortDirection
    $filter: ModelPalletHandlingFilterInput
    $nextToken: String
  ) {
    palletHandlingByCustomerReversalOperationDate(
      customerId: $companyId
      reversalIdOperationDate: {
        between: [{
          reversalId: $reversalId,
          operationDate: $start
        }, {
          reversalId: $reversalId,
          operationDate: $end
        }]
      }
      sortDirection: $sortDirection
      filter: $filter
      limit: 9999
      nextToken: $nextToken
    ) {
    items {
      id
      stamp
      carrierName
      customerName
      reversalName
      operationDate
      loadQuantity
      unloadQuantity
      reversalQuantity
      palletHandlingRefId
      travelStamp
      type
      status
      carrierValidation
      customerValidation
      carrierValidatorName
    }
    nextToken
  }
}
`;

export const GET_PALLET_HANDLING_BY_STAMP = /* GraphQL */ `
  query PalletHandlingByStamp($stamp: ID!) {
    palletHandlingByStamp(stamp: $stamp) {
      items {
        id
        stamp
        customerName
        tenantCustomer
        carrierName
        tenantCarrier
        travelStamp
        travelId
        type
        status
      }
    }
  }
`;

export const PALLET_HANDLINGS_BY_CARRIER_OPERATIONDATE = /* GraphQL */ `
  query PalletHandlingByCarrierOperationDate(
    $carrierId: ID
    $operationDate: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPalletHandlingFilterInput
    $limit: Int,
    $nextToken: String
  ) {
    palletHandlingByCarrierOperationDate(
      carrierId: $carrierId
      operationDate: $operationDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        stamp
        carrierName
        customerName
        reversalName
        operationDate
        loadQuantity
        unloadQuantity
        reversalQuantity
        palletHandlingRefId
        travelStamp
        type
        status
        carrierValidation
        customerValidation
        carrierValidatorName
      }
      nextToken
    }
  }
`;

export const PALLET_HANDLINGS_BY_CARRIER_CUSTOMER_OPERATIONDATE = /* GraphQL */ `
  query PalletHandlingByCarrierCustomerOperationDate(
    $companyId: ID
    $customerNameOperationDate: ModelPalletHandlingPalletHandlingByCarrierCustomerOperationDateCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPalletHandlingFilterInput
    $limit: Int
  ) {
    palletHandlingByCarrierCustomerOperationDate(
      carrierId: $companyId
      customerNameOperationDate: $customerNameOperationDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
    ) {
      items {
        id
        stamp
        carrierName
        customerName
        reversalName
        operationDate
        loadQuantity
        unloadQuantity
        reversalQuantity
        palletHandlingRefId
        travelStamp
        type
        status
        carrierValidation
        customerValidation
        carrierValidatorName
      }
    }
  }
`;

export const PALLET_HANDLINGS_BY_CUSTOMER_CARRIER_OPERATIONDATE = /* GraphQL */ `
  query PalletHandlingByCustomerCarrierOperationDate(
    $companyId: ID
    $carrierNameOperationDate: ModelPalletHandlingPalletHandlingByCustomerCarrierOperationDateCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPalletHandlingFilterInput
    $limit: Int
  ) {
    palletHandlingByCarrierCustomerOperationDate(
      customerId: $companyId
      carrierNameOperationDate: $carrierNameOperationDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
    ) {
      items {
        id
        stamp
        carrierName
        customerName
        reversalName
        operationDate
        loadQuantity
        unloadQuantity
        reversalQuantity
        palletHandlingRefId
        travelStamp
        type
        status
        carrierValidation
        customerValidation
        carrierValidatorName
      }
    }
  }
`;

export const PALLET_HANDLINGS_BY_CARRIER_REVERSAL_OPERATIONDATE = /* GraphQL */ `
  query PalletHandlingByCarrierReversalOperationDate(
    $companyId: ID
    $reversalNameOperationDate: ModelPalletHandlingPalletHandlingByCarrierReversalOperationDateCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPalletHandlingFilterInput
    $limit: Int
  ) {
    palletHandlingByCarrierReversalOperationDate(
      carrierId: $companyId
      reversalNameOperationDate: $reversalNameOperationDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
    ) {
      items {
        id
        stamp
        carrierName
        customerName
        reversalName
        operationDate
        loadQuantity
        unloadQuantity
        reversalQuantity
        palletHandlingRefId
        travelStamp
        type
        status
        carrierValidation
        customerValidation
        carrierValidatorName
      }
    }
  }
`;

export const PALLET_HANDLINGS_BY_CUSTOMER_REVERSAL_OPERATIONDATE = /* GraphQL */ `
  query PalletHandlingByCustomerReversalOperationDate(
    $companyId: ID
    $reversalNameOperationDate: ModelPalletHandlingPalletHandlingByCarrierReversalOperationDateCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPalletHandlingFilterInput
    $limit: Int
  ) {
    palletHandlingByCarrierReversalOperationDate(
      carrierId: $companyId
      reversalNameOperationDate: $reversalNameOperationDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
    ) {
      items {
        id
        stamp
        carrierName
        customerName
        reversalName
        operationDate
        loadQuantity
        unloadQuantity
        reversalQuantity
        palletHandlingRefId
        travelStamp
        type
        status
        carrierValidation
        customerValidation
        carrierValidatorName
      }
    }
  }
`;

export const PALLET_HANDLINGS_BY_TYPE_OPERATIONDATE = /* GraphQL */ `
  query PalletHandlingByCarrierTypeOperationDate(
    $carrierId: ID
    $typeOperationDate: ModelPalletHandlingPalletHandlingByCarrierTypeOperationDateCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPalletHandlingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    palletHandlingByCarrierTypeOperationDate(
      carrierId: $carrierId
      typeOperationDate: $typeOperationDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        stamp
        carrierName
        customerName
        reversalName
        operationDate
        loadQuantity
        unloadQuantity
        reversalQuantity
        palletHandlingRefId
        travelStamp
        type
        status
        carrierValidation
        customerValidation
        carrierValidatorName
      }
      nextToken
    }
  }
`;

export const PALLET_HANDLINGS_BY_CARRIER_TRAVEL_OPERATIONDATE = /* GraphQL */ `
  query PalletHandlingByCarrierTravelOperationDate(
    $carrierId: ID
    $travelStampOperationDate: ModelPalletHandlingPalletHandlingByCarrierTravelOperationDateCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPalletHandlingFilterInput
    $limit: Int
    $nextToken: String

  ) {
    palletHandlingByCarrierTravelOperationDate(
      carrierId: $carrierId
      travelStampOperationDate: $travelStampOperationDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        stamp
        carrierName
        customerName
        reversalName
        operationDate
        loadQuantity
        unloadQuantity
        reversalQuantity
        palletHandlingRefId
        travelStamp
        type
        status
        carrierValidation
        customerValidation
        carrierValidatorName
      }
    }
  }
`;