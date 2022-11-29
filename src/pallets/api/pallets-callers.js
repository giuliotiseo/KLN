import { portableGraphqlQuery } from "../../app/services/graphqlBaseQuery";

// Queries
import {
  palletHandlingByCustomerOperationDate,
  palletHandlingByCustomerTravelOperationDate
} from "./graphql/old_queries";

import {
  PALLET_BY_CARRIER_CUSTOMER,
  PALLET_BY_CARRIER_REVERSAL,
  PALLET_BY_CUSTOMER_CARRIER,
  PALLET_BY_ID_CARRIER,
  PALLET_BY_ID_CUSTOMER,
  PALLET_HANDLINGS_BY_CARRIER_OPERATIONDATE,
  PALLET_HANDLINGS_BY_CARRIER_TRAVEL_OPERATIONDATE,
  PALLET_HANDLINGS_BY_TYPE_OPERATIONDATE
} from "./graphql/queries";

import {
  createPalletHandling as CREATE_PALLET_HANDLING
} from "./graphql/old_mutations";

// Formatters
import { 
  formatParamsCreatePalletHandling,
  formatParamsCreateReversal,
  formatParamsPalletHandlingsByCarrier,
  formatParamsPalletHandlingsByCarrierCustomer,
  formatParamsPalletHandlingsByCarrierReversal,
  formatParamsPalletHandlingsByCarrierTravel,
  formatParamsPalletHandlingsByCarrierType,
  formatParamsPalletHandlingsByCustomer,
  formatParamsPalletHandlingsByCustomerCarrier,
  formatParamsPalletHandlingsByCustomerTravel,
  formatParamsPalletHandlingsByCustomerType,
  formatParamsUpdatePalletHandling,
} from "./pallets-params-formatters";
import { generateLegacyLogList } from "../../globals/libs/helpers";
import { UPDATE_PALLET_HANDLING } from "./graphql/mutations";


// Callers
// Get --------------------------------------------------------------------------------------------------------------------------------
export const getPalletHandlingByIdCarrier = async (params) => {
  const result = await portableGraphqlQuery({
    body: PALLET_BY_ID_CARRIER,
    args: { id: params.id }
  });

  if(result) {
    return result?.data;
  } else {
    return {}
  }
};

export const getPalletHandlingByIdCustomer = async (params) => {
  const result = await portableGraphqlQuery({
    body: PALLET_BY_ID_CUSTOMER,
    args: { id: params.id }
  });

  if(result) {
    return result?.data;
  } else {
    return {}
  }
};

export const getPalletHandlingsByCarrierOperationDate = (params) => ({
  body: PALLET_HANDLINGS_BY_CARRIER_OPERATIONDATE,
  args: formatParamsPalletHandlingsByCarrier(params)
});

export const getPalletHandlingsByCustomerOperationDate = (params) => ({
  body: palletHandlingByCustomerOperationDate,
  args: formatParamsPalletHandlingsByCustomer(params)
});

export const getPalletHandlingsByCarrierType = (params) => ({
  body: PALLET_HANDLINGS_BY_TYPE_OPERATIONDATE,
  args: formatParamsPalletHandlingsByCarrierType(params)
});

export const getPalletHandlingsByCustomerType = (params) => ({
  body: PALLET_HANDLINGS_BY_CARRIER_TRAVEL_OPERATIONDATE,
  args: formatParamsPalletHandlingsByCustomerType(params)
});

export const getPalletHandlingsByCarrierTravel = async (params) => {
  const result = await portableGraphqlQuery({
    body:  PALLET_HANDLINGS_BY_CARRIER_TRAVEL_OPERATIONDATE,
    args: formatParamsPalletHandlingsByCarrierTravel(params)
  });

  console.log(result);
  return result?.data || null
};

export const getPalletHandlingsByCustomerTravel = (params) => ({
  body: palletHandlingByCustomerTravelOperationDate,
  args: formatParamsPalletHandlingsByCustomerTravel(params)
});

export const getPalletHandlingsByCarrierCustomer = async (params) => {
  const customerResult = await portableGraphqlQuery({
    body: PALLET_BY_CARRIER_CUSTOMER,
    args: formatParamsPalletHandlingsByCarrierCustomer(params)
  });

  let reversalResult = null
  if(params.isShowReversals) {
    reversalResult = await portableGraphqlQuery({
      body: PALLET_BY_CARRIER_REVERSAL,
      args: formatParamsPalletHandlingsByCarrierReversal(params)
    });
  }

  return {
    company: customerResult?.data?.items || [],
    nextToken: customerResult?.nextToken,
    reversal: reversalResult?.data?.items || [],
  }
};


export const getPalletHandlingsByCustomerCarrier = async (params) => {
  const carrierResult = await portableGraphqlQuery({
    body: PALLET_BY_CUSTOMER_CARRIER,
    args: formatParamsPalletHandlingsByCustomerCarrier(params)
  });

  let reversalResult = null
  if(params.isShowReversals) {
    reversalResult = await portableGraphqlQuery({
      body: PALLET_BY_CARRIER_REVERSAL,
      args: formatParamsPalletHandlingsByCarrierReversal({
        ...params,
        companyId: params.carrierId,
        customerId: params.companyId
      })
    });
  }

  return {
    company: carrierResult?.data?.items || [],
    nextToken: carrierResult?.nextToken,
    reversal: reversalResult?.data?.items || [],
  }
};


// Create --------------------------------------------------------------------------------------------------------------------------------
export const createPalletHandlingCaller = async (params) => {
  let palletResult = [];
  const totalReversal = params?.reversal?.length > 0
    ? params.reversal.reduce((acc, val) => acc + val.value, 0)
    : 0

  // Verifico globalmente la presenza di storni
  if(totalReversal) {
    // Il primo push lo faccio senza reversal per avere il dato di carico e scarico
    const palletMainShape = formatParamsCreatePalletHandling({
      ...params,
      reversal: null
    });

    const result = await portableGraphqlQuery({
      body: CREATE_PALLET_HANDLING,
      args: palletMainShape
    });

    if(result?.data) {
      palletResult.push(result.data);
    }

    // I push successivi li faccio senza carico e scarico e solo con reversal per avere tutti gli storni separatamente
    for(let [index, reversal_item] of params.reversal.entries()) {
      if(reversal_item.value > 0) {
        const log = await generateLegacyLogList({
          list: [],
          action: 'Creazione',
          subject: `storno pallet da ${params.carrier.name} sul conto di ${reversal_item.name}.`
        });

        const palletShape = formatParamsCreatePalletHandling({
          ...params,
          id: `REV${index}_${params.id}`,
          loadQuantity: 0,
          loadNote: "",
          disposableLoad: 0,
          disposableLoadNote: "",
          unloadQuantity: 0,
          unloadNote: "",
          disposableUnload: 0,
          disposableUnloadNote: "",
          reversal: reversal_item,
          palletHandlingRefId: params.id,
          log,
        });
    
        const result = await portableGraphqlQuery({
          body: CREATE_PALLET_HANDLING,
          args: palletShape
        });
        
        if(result?.data) {
          palletResult.push(result.data);
        }
      }
    }
  } else {
    // Registro una movimentazione senza storni
    const palletShape = formatParamsCreatePalletHandling(params);
    const result = await portableGraphqlQuery({
      body: CREATE_PALLET_HANDLING,
      args: palletShape
    });

    if(result?.data) {
      palletResult.push(result.data);
    }
  }
  
  return palletResult;
};

export const createReversalCaller = async (params) => {
  const reversal_item = params.reversal[0]; 
  const palletShape = formatParamsCreateReversal({
    ...params,
    id: params.id,
    loadQuantity: 0,
    loadNote: "",
    disposableLoad: 0,
    disposableLoadNote: "",
    unloadQuantity: 0,
    unloadNote: "",
    disposableUnload: 0,
    disposableUnloadNote: "",
    reversal: reversal_item,
  });

  const result = await portableGraphqlQuery({
    body: CREATE_PALLET_HANDLING,
    args: palletShape
  });

  return result;
};

// Update --------------------------------------------------------------------------------------------------------------------------------
export const updatePalletHandlingCaller = (params) => ({
  body: UPDATE_PALLET_HANDLING,
  args: formatParamsUpdatePalletHandling(params)
});

// Remove --------------------------------------------------------------------------------------------------------------------------------
// export const removePalletHandling = (id) => ({
//   body: deletePalletHandling,
//   args: formatRemovePalletHandlingById(id)
// })