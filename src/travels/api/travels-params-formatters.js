import { capitalize, formatWindowsToDynamoDb } from "../../globals/libs/helpers";
import { formatLocationCoords } from "../../warehouses/libs/helpers";
import { waypointTargetByStatusShipment } from "../libs/helpers";

/* 
  * Utility for generate filter variables which will be run in gql
*/
const fieldsToUpdate = [
  "id",
  "stamp",
  "tenant",
  "status",
  "createdAt",
  "departureDate",
  "licensePlate",
  "vehicleName",
  "driverName",
]

const travelsOrdersFieldsToUpdate = [
  "id",
  "departureDate",
  "arrivalDate",
  "tenantCarrier",
  "tenantCustomer",
  "orderId",
  "travelId",
]

const dataFiltersGenerator = (filters) => {
  let dataFilters = [];

  // Estimated transport costs
  if(filters?.estimatedTransportCosts) {
    if(!filters.estimatedTransportCosts.some(cost => !cost)) {
      dataFilters.push({
        id: "estimatedTransportCosts",
        value: filters.estimatedTransportCosts.map(c => parseFloat(c)),
        operation: "between"
      });
    }
  }

  // Return formatted filters
  return dataFilters.length !== 0
    ? dataFilters.reduce((acc, filter) => ({
      ...acc,
      [filter.id]: {[filter.operation]: filter.value }
    }), {})
    : null;
}



/* 
  * Utility to generate sort keys dynamically
*/
const generateTravelsSortKey = (data) => {
  const sortBy = ["status", "driverName", "licensePlate", "departureDate"];
  const data_input = Object.keys(data);
  const sorted = data_input.sort((a,b) => sortBy.indexOf(a) - sortBy.indexOf(b));

  const keyString = sorted
  .reduce((acc, val, index) => index === 0 
    ? acc.concat(val)
    : acc.concat(capitalize(val)),
  "");

  return {
    [keyString]: {
      between: data.departureDate.map(ocd => ({
        status: data.status.toUpperCase(),
      ...data,
        departureDate: ocd,
      }))
    }
  }
}; 


/* Format params before queries */
// Fetch list ----------------------------------------------------------------------------------------------------
export function formatParamsTravelsByTenant(params, key) {
  const sortKey = generateTravelsSortKey(params.sortKey);
  let dataToReturn = {
    [key]: params[key],
    ...sortKey,
    limit: params.limit,
    nextToken: params.nextToken
  }

  // Filter generation
  const filter = dataFiltersGenerator(params.filters);
  if(filter) dataToReturn = { ...dataToReturn, filter };

  console.log("dataToReturn: ", { dataToReturn });

  // Return
  return dataToReturn;
}

export function formatParamsTravelsByStamp(params) {
  let dataToReturn = {
    stamp: params.stamp,
    limit: params.limit,
    nextToken: params.nextToken
  }
  
  // Return
  return dataToReturn;
}

export function formatParamsTravelsByTenantDepurtureDate(params, key) {
  let dataToReturn = {
    carrierId: params.carrierId,
    departureDate: { between: params.departureDate },
    limit: params.limit,
    nextToken: params.nextToken
  }

  // Return
  return dataToReturn;
}

export function formatParamsOrdersByTenantStatusCompany(params) {
  console.log("Vedi params: ", { params })

  let dataToReturn = {
    carrierId: params.carrierId,
    statusPickupStorageIdCreatedAt: {
      between: params.createdAt.map(cat => ({
        status: params.status,
        pickupStorageId: params.pickupStorageId,
        createdAt: cat
      }))
    },
    limit: params.limit,
    nextToken: params.nextToken
  }

  console.log("dataToReturn testa ", { dataToReturn });

  // Return
  return dataToReturn;
}

// Create item ----------------------------------------------------------------------------------------------------
export function formatParamsCreateTravel(travel) {
  console.log("Il travel che devo formattare", travel);

  let plannedOrderIds = []
  Object.keys(travel.waypoints).forEach(w_id => {
    const ordersWaypoint = travel.waypoints[w_id];
    ordersWaypoint.forEach(order => plannedOrderIds.push(order.plannedId));
  })

  const licensePlate = travel?.towedVehicle?.licensePlate
    ? `${travel.towingVehicle.licensePlate}+${travel.towedVehicle.licensePlate}`
    : travel.towingVehicle.licensePlate;

  const vehicleName = travel?.towedVehicle?.licensePlate
    ? `${travel.towingVehicle.brand} ${travel.towingVehicle.model};${travel.towedVehicle.brand} ${travel.towedVehicle.model}`
    : `${travel.towingVehicle.brand} ${travel.towingVehicle.model}`;

  const startCheckpoint = Object.keys(travel.start).filter(key => key !== "id").reduce((acc, val) => ({
    ...acc,
    [val]: travel.start[val],
    windows: formatWindowsToDynamoDb(travel.start?.windows),
    location: {
      ...travel.start.location,
      coordinate: formatLocationCoords(travel.start.location.coordinate),
    }
  }), {})

  const endCheckpoint = Object.keys(travel.start).filter(key => key !== "id").reduce((acc, val) => ({
    ...acc,
    [val]: travel.end[val],
    windows: formatWindowsToDynamoDb(travel.end?.windows),
    location: {
      ...travel.end.location,
      coordinate: formatLocationCoords(travel.end.location.coordinate),
    }
  }), {});

  const dataToSend = {
    id: travel.id, // travel id
    stamp: travel.stamp, // travel stampo
    carrierId: travel.company.id,
    tenant: travel.company.owner,
    createdAt: travel.createdAt,
    departureDate: travel.departureDate,
    licensePlate,
    vehicleName,
    driverName: travel?.driver?.searchable.toUpperCase() || travel?.driver?.name,
    status: "STATIONARY",
    driver: {
      username: travel?.driver?.id,
      companyId: travel?.driver?.jobId,
      job: travel?.driver?.jobName,
      name: travel?.driver?.searchable?.toUpperCase() || travel?.driver?.name,
      email: travel?.driver?.email,
      phone: travel?.driver?.phone,
      task: travel?.driver?.type,
      tenant: travel.company.owner,
    },
    estimatedTravelTime: travel?.estimatedTravelTime.text,
    estimatedTravelLength: travel?.estimatedTravelLength.text,
    estimatedTransportCosts: travel?.estimatedTransportCosts,
    start: {
      id: `start_${travel.id}`,
      checkpoint: startCheckpoint,
      companyName: travel.company.name,
      tenantCompany: travel.company.owner
    },
    waypoints: Object.keys(travel.waypoints).map(w_id => {
      let ordersWaypoint = travel.waypoints[w_id]; // dentro ci sono le operazioni sugli ordini!
      const targetOrder = travel.orders[ordersWaypoint[0].orderId];
      const target = waypointTargetByStatusShipment[`${targetOrder.status}#${targetOrder.shipmentType}`];
      const targetCheckpoint = target.checkpoint[ordersWaypoint[0].operationValue];
      return ({
        id: w_id,
        orders: ordersWaypoint.map(ow => ({
          plannedId: ow.plannedId,
          orderId: ow.orderId,
          orderStamp: ow.stamp,
          orderStatus: ow.orderStatus,
          operation: ow.operation,
          operationValue: ow.operationValue,
        })),
        estimatedLength: travel?.waypointsForesight?.[w_id]?.distance?.text,
        estimatedTime: travel?.waypointsForesight?.[w_id]?.time?.text,
        companyName: ordersWaypoint[0].companyName,
        tenantCompany: ordersWaypoint[0].tenantCompany,
        companyId: ordersWaypoint[0].companyId,
        checkpoint: travel.orders[ordersWaypoint[0].orderId][targetCheckpoint],
      })
    }),
    end: {
      id: `end_${travel.id}`,
      checkpoint: endCheckpoint,
      companyName: travel.company.name,
      tenantCompany: travel.company.owner
    },
    plannedOrderIds: plannedOrderIds,
    travelType: travel.travelType,
    log: travel.log,
  }

  return {
    input: dataToSend
  }
}

export function formatParamsCreateTravelsOrders(travel) {
  console.log("travel...", travel);
  console.groupCollapsed("formatParamsCreateTravelsOrders");
  const ordersStackObject = travel.waypoints.reduce((acc, val, index) => {
    return {
      ...acc, 
      [`orders_stack_${index}`]: val.orders.reduce((acc_order, val_order) => ([
        ...acc_order, 
        { ...val_order,
          tenantCompany: val.tenantCompany,
          companyId: val.companyId,
          departureDate: travel.departureDate,
          arrivalDate: travel.departureDate, // da sostituire con arrivalDate corretto!!
          waypoint: val,
        }
      ]), [])
    }
  }, {});

  console.log("ordersStackObject", ordersStackObject);
  const ordersStackList = Object.keys(ordersStackObject).map(elem => ordersStackObject[elem])
  console.log("ordersStackList", ordersStackList);
  const mergedOrderStack = [].concat.apply([], ordersStackList);
  console.log("mergedOrderStack", mergedOrderStack);
  // console.log("mergedOrderStack", mergedOrderStack);
  console.groupEnd();

  const ordersShape = mergedOrderStack.reduce((acc, val) => ({
    ...acc,
    [val.plannedId]: {
      id: val.plannedId,
      carrierId: travel.carrierId,
      tenantCarrier: travel.tenant,
      customerId: val.companyId,
      tenantCustomer: val.tenantCompany,
      orderId: val.orderId,
      travelId: travel.id,
      departureDate: travel.departureDate,
      arrivalDate: val.arrivalDate,
      waypoint: val.waypoint,
      operation: val.operation,
      operationValue: val.operationValue
    }
  }), {});

  return ordersShape;
}

// Update item ----------------------------------------------------------------------------------------------------
export function formatParamsUpdateTravel(params) {
  console.log("Params...", params);
  let plannedOrderIds = [];

  params.waypoints.forEach(waypoint => {
    const ordersWaypoint = waypoint.orders;
    ordersWaypoint.forEach(order => plannedOrderIds.push(order.plannedId));
  })

  const licensePlate = params?.towed?.licensePlate
    ? `${params.towing.licensePlate}+${params.towed.licensePlate}`
    : params.towing.licensePlate;

  const vehicleName = params?.towed?.licensePlate
    ? `${params.towing.brand} ${params.towing.model};${params.towed.brand} ${params.towed.model}`
    : `${params.towing.brand} ${params.towing.model}`;

  const startCheckpoint = {
    ...params.start,
    checkpoint: {
      ...params.start.checkpoint,
      windows: formatWindowsToDynamoDb(params.start.checkpoint.windows),
      location: {
        ...params.start.checkpoint.location,
        coordinate: formatLocationCoords(params.start.checkpoint.location.coordinate)
      }
    }
  }

  const endCheckpoint = {
    ...params.end,
    checkpoint: {
      ...params.end.checkpoint,
      windows: formatWindowsToDynamoDb(params.end.checkpoint.windows),
      location: {
        ...params.end.checkpoint.location,
        coordinate: formatLocationCoords(params.end.checkpoint.location.coordinate)
      }
    }
  }

  const dataToSend = {
    id: params.travel.id, // travel id
    stamp: params.travel.stamp, // travel stampo
    tenant: params.travel.tenant,
    status: params?.status || params.travel.status,
    createdAt: params.travel.createdAt,
    departureDate: params.departureDate, // Todo: da rendere modificabile
    travelType: params.travelType,
    licensePlate,
    vehicleName,
    driverName: params?.driver?.searchable?.toUpperCase() || params?.driver?.name,
    driver: params.driver,
    estimatedTravelTime: params?.estimatedTravelTime.text,
    estimatedTravelLength: params?.estimatedTravelLength.text,
    estimatedTransportCosts: params?.estimatedTransportCosts,
    start: startCheckpoint,
    waypoints: params.waypoints,
    end: endCheckpoint,
    plannedOrderIds: plannedOrderIds,
    log: params.log,
  }


  console.groupCollapsed("Dati di base")
  console.log("licensePlate", licensePlate)
  console.log("vehicleName", vehicleName)
  console.log("startCheckpoint", startCheckpoint)
  console.log("endCheckpoint", endCheckpoint)
  console.log("dataToSend", dataToSend)
  console.groupEnd();
  
  return {
    input: dataToSend
  }
}

export function formatUpdateTravelStatus(params) {
  let input = fieldsToUpdate.reduce((acc, val) => ({
    ...acc,
    [val]: params[val]
  }), {});

  return { input }
}

export function formatUpdateLastPositionTravel(params) {
  let input = fieldsToUpdate.reduce((acc, val) => ({
    ...acc,
    [val]: params[val],
  }), {});

  return { input: {
    ...input,
    lastPosition: {
      ...params.lastPosition,
      coordinate: [params.lastPosition.coordinate.lat, params.lastPosition.coordinate.lng]
    } 
  }}
}

export function formatUpdateCompletedWaypointTravel(params) {
  const { travel, waypointId, waypointIndex, waypoint } = params;
  let input = fieldsToUpdate.reduce((acc, val) => ({
    ...acc,
    [val]: travel[val],
  }), {});

  if(waypointId.includes("start")) {
    return { input: {
      ...input,
      start: { ...waypoint, completed: waypoint?.completed ? false : true }
    }}
  } else if(waypointId.includes("end")) {
    return { input: {
      ...input,
      end: { ...waypoint, completed: waypoint?.completed ? false : true }
    }}
  } else {
    return { input: {
      ...input,
      waypoints: [
        ...travel.waypoints.slice(0, waypointIndex),
        { ...waypoint, completed: waypoint?.completed ? false : true },
        ...travel.waypoints.slice(waypointIndex + 1)
      ]
    }}
  }
}

export function formatUpdateCompletedWaypointPlan(params) {
  const { waypointOrder, travel, waypoint } = params;
  const getTravelsOrders = travel.orders.items.filter(order => waypointOrder.plannedId === order.id)[0];
  return { input: {
    id: getTravelsOrders.id,
    departureDate: getTravelsOrders.departureDate,
    arrivalDate: getTravelsOrders.arrivalDate,
    carrierId: getTravelsOrders.carrierId,
    tenantCarrier: getTravelsOrders.tenantCarrier,
    customerId: getTravelsOrders.customerId,
    tenantCustomer: getTravelsOrders.tenantCustomer,
    orderId: getTravelsOrders.orderId,
    waypoint: {
      ...waypoint,
      completed: waypointOrder?.completed ? false : true,
    }
  }}
}

// Remove item ----------------------------------------------------------------------------------------------------
export function formatRemoveTravelById(id) {
  return { input: { id }}
}
