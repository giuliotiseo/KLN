import { portableGraphqlQuery } from "../../app/services/graphqlBaseQuery";
import { 
  formatParamsCreateTravel,
  formatParamsUpdateTravel,
  formatParamsTravelsByStamp,
  formatParamsCreateTravelsOrders,
  formatParamsTravelsByTenantDepurtureDate,
  formatParamsOrdersByTenantStatusCompany,
  formatUpdateTravelStatus,
  formatUpdateLastPositionTravel,
  formatUpdateCompletedWaypointTravel,
  formatUpdateCompletedWaypointPlan
} from "./travels-params-formatters";

import { createTravel, createTravelsOrders, deleteTravel, deleteTravelsOrders, updateTravel, updateTravelsOrders } from "./graphql/old_mutations";
import { TRAVEL_BY_ID, TRAVEL_BY_STAMP, TRAVELS_BY_TENANT_STATUS_DEPARTUREDATE, TRAVEL_ORDERS_BY_STATUS_COMPANY_CREATEDAT } from "./graphql/queries";
import { ORDER_BY_CARRIER_STATUS_CREATEDAT } from "../../orders/api/graphql/queries";
import { dataFiltersGenerator } from "../../orders/slices/ordersListSlice";

// Format query ---------------------------------------------------------------------------------------------------------
export function formatParamsOrdersByCompany(params) {
  
  let dataToReturn = {
    carrierId: params.carrierId,
    status: { eq: params.status },
    limit: params.limit,
    nextToken: params?.nextToken
  }

  // Filter generation
  const filter = dataFiltersGenerator(params.filters);
  if(filter) dataToReturn = { ...dataToReturn, filter };

  console.log("dataToReturn: ", { dataToReturn });

  // Return
  return dataToReturn;
}

// Callers
// Get --------------------------------------------------------------------------------------------------------------------------------
export const getTravelById = async (params) => {
  const result = await portableGraphqlQuery({
    body: TRAVEL_BY_ID,
    args: { id: params.id }
  });

  if(result) {
    return result?.data;
  } else {
    return {}
  }
};


export const getTravelsByStamp = (params) => ({
  body: TRAVEL_BY_STAMP,
  args: formatParamsTravelsByStamp(params)
});

export const getTravelsByTenantDepartureDate = (params) => ({
  body: TRAVELS_BY_TENANT_STATUS_DEPARTUREDATE,
  args: formatParamsTravelsByTenantDepurtureDate(params)
});

export const getTravelOrdersByStatusCompanyCreatedAt = async (params) => {
  const result = await portableGraphqlQuery({
    body: TRAVEL_ORDERS_BY_STATUS_COMPANY_CREATEDAT,
    args: formatParamsOrdersByTenantStatusCompany(params)
  });

  if(result) {
    return result?.data;
  } else {
    return {}
  }
};

export const getPortableOrdersByCarrierStatusCreatedAt = async (params) => {
  const result = await portableGraphqlQuery({
    body: ORDER_BY_CARRIER_STATUS_CREATEDAT,
    args: formatParamsOrdersByCompany(params)
  });

  if(result) {
    return result?.data;
  } else {
    return {}
  }
};

// Create --------------------------------------------------------------------------------------------------------------------------------
export const createTravelByTenant = (params) => ({
  body: createTravel,
  args: formatParamsCreateTravel(params)
});

export const createTravelMutation = async (params) => {
  const travelShape = formatParamsCreateTravel(params);

  console.log("Verifichiamo travelShape", travelShape);
  const travel_result = await portableGraphqlQuery({
    body: createTravel,
    args: { ...travelShape }
  });
  
  console.log("Vedo il travelresult", travel_result);
  const travelsOrdersShape = formatParamsCreateTravelsOrders(travel_result.data);
  const travelsOrdersIndexes = Object.keys(travelsOrdersShape);

  let travelsOrders = [];
  for(let to_key of travelsOrdersIndexes) {
    const travelsOrders_result = await portableGraphqlQuery({
      body: createTravelsOrders,
      args: { input: travelsOrdersShape[to_key] }
    });

    travelsOrders.push(travelsOrders_result.data);
  }
  
  return travel_result.data;
};

// Update --------------------------------------------------------------------------------------------------------------------------------
// Aggiornamento tabella di marcia
export const updateTravelByTenant = async (params) => {
  console.log("Params... ancora...", params);
  const travelShape = formatParamsUpdateTravel(params);
  
  // Intercetta i TravelsOrders da aggiornare
  let updatedTravelsOrders = [];
  for(const travelsOrders of params.travelsOrdersToUpdate) {
    const updateResult = await portableGraphqlQuery({
      body: updateTravelsOrders,
      args: { input: travelsOrders }
    });

    updatedTravelsOrders.push(updateResult.data);
  }

  // Intercetta i TravelsOrders da eliminare
  let removedTravelsOrders = [];
  for(const id of params.plannedIdToRemove) {
    const deleteResult = await portableGraphqlQuery({
      body: deleteTravelsOrders,
      args: { input: { id } }
    });

    removedTravelsOrders.push(deleteResult.data);
  }
    
  // Intercetta i TravelsOrders da aggiungere
  let addedTravelsOrders = [];
  for(const travelsOrders of params.travelsOrdersToCreate) {
    const createResult = await portableGraphqlQuery({
      body: createTravelsOrders,
      args: { input: travelsOrders }
    });

    addedTravelsOrders.push(createResult.data);
  }

  // lancia l'aggiornamento del viaggio
  const travel_result = await portableGraphqlQuery({
    body: updateTravel,
    args: { ...travelShape }
  });

  console.groupCollapsed("Controllo operazioni svolte")
  console.log("Viaggio aggiornato", travel_result);
  console.log("Pianificazioni aggiornate", updatedTravelsOrders);
  console.log("Pianificazioni eliminate", removedTravelsOrders);
  console.log("Pianificazioni create", addedTravelsOrders);
  console.groupEnd()

  return travel_result;
};

// Aggiornamento status viaggio
export const updateTravelStatusCaller = (params) => ({
  body: updateTravel,
  args: formatUpdateTravelStatus(params)
});

// Aggiornamento ultima posizione viaggio
export const updateLastPositionTravelCaller = (params) => ({
  body: updateTravel,
  args: formatUpdateLastPositionTravel(params)
});

// Aggiornamento waypoints completati
export const updateCompletedWaypointCaller = async (params) => {
  const { travel, waypoint, waypointId } = params 

  /*
    Significa che mi devo aggiornare tutti i dati contenuti in travels,
    ma che devo avere anche un elenco di pianificazioni contenute nel waypoint
  */

  console.log("Params", params);

  const travelShape = formatUpdateCompletedWaypointTravel(params);
  const isStartOrEnd = waypointId.includes("start") || waypointId.includes("end"); 

  console.groupCollapsed("Update operation start");
  if(!isStartOrEnd && waypoint?.orders?.length > 0) {
    let plannedShapes = [];
    for(let waypointOrder of waypoint.orders) {
      console.log("waypointOrder", waypointOrder);
      const plannedOrderShape = formatUpdateCompletedWaypointPlan({ waypointOrder, travel, waypoint });
      plannedShapes.push(plannedOrderShape);
    }
  
    // Lancio aggiornamento per ogni ordine pianificato
    console.log("Vedo i plannedShapes", plannedShapes);

    for(let plannedShape of plannedShapes) {
      const updateTravelsOrdersResult = await portableGraphqlQuery({
        body: updateTravelsOrders,
        args: plannedShape
      });
  
      console.log("Aggiornata pianificazione", updateTravelsOrdersResult);
    }
  }

  // Lancio l'aggiornamento per il viaggio
  const travel_result = await portableGraphqlQuery({
    body: updateTravel,
    args: { ...travelShape }
  });

  console.log("Aggiornato viaggio", travel_result);
  console.groupEnd();

  return travel_result;
}

// Remove --------------------------------------------------------------------------------------------------------------------------------
export const removePortableTravel = async (id) => {
  const result = await portableGraphqlQuery({
    body: deleteTravel,
    args: { input: { id }}
  });

  if(result) {
    return result?.data;
  } else {
    return {}
  }
};

export const removePortableTravelsOrders = async (id) => {
  const result = await portableGraphqlQuery({
    body: deleteTravelsOrders,
    args: { input: { id }}
  });

  if(result) {
    return result?.data;
  } else {
    return {}
  }
};