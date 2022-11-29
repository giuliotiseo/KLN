import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addOrderToSpecificWaypoint,
  addOrderToWaypoint, 
  getOrderDataForWaypoint, 
  removeOrderFromWaypoint,
} from "../libs/helpers";

//  CREATOR ------------------------------------------------------------------------------------------------------------
export const addTravelCreatorOperationThunk = createAsyncThunk(
  'travelCreatorSlice/addTravelCreatorOperation',
  async ({ order, waypoints }) => {
    if(!order?.id) return;
    const readyWaypoints = await addOrderToWaypoint(waypoints, order);
    return { order, waypoints: readyWaypoints.waypoints }
  }
)

export const removeTravelCreatorOperationThunk = createAsyncThunk(
  'travelCreatorSlice/removeTravelCreatorOperation',
  async ({ order }, { getState }) => {
    const { travels: { creator: { waypoints }}} = getState();
    if(!order?.id) { return };
    const { waypoints: readyWaypoints } = await removeOrderFromWaypoint(waypoints, order);
    return { order, waypoints: readyWaypoints }
  }
)

//  EDITOR ------------------------------------------------------------------------------------------------------------
export const addTravelEditorOperationThunk = createAsyncThunk(
  'travelEditorSlice/addTravelEditorOperation',
  async ({ order }, { getState }) => {
    const { travels: { editor: { waypoints }}} = getState();
    if(!order?.id) return;
    const readyWaypoints = await addOrderToWaypoint(waypoints, order);
    console.log("...readyWaypoints...", readyWaypoints);
    

    return {
      order: { ...order, plannedId: readyWaypoints.plannedId }, 
      waypoints: readyWaypoints.waypoints
    }
  }
)

export const addTravelEditorNewOperationThunk = createAsyncThunk(
  'travelEditorSlice/addTravelEditorNewOperation',
  async ({ order, waypoint, waypointId }, { getState }) => {
    const { travels: { editor: { waypoints }}} = getState();
    let readyWaypoints = { ...waypoints };
    let newWaypoint = [];
    if(!order?.id) return;

    if(waypoint?.[0]?.id) {
      /* 
        Se sto lavorando su un waypoint valido, vuol dire che ho pinnato una fermata esistente,
        per cui non è necessaria la costruzione di un nuovo waypoint da zero
      */
      const validWaypointId = waypoint?.[0]?.valid ? waypointId : false;

      // Se trovo un waypoint valido...
      if(validWaypointId) {
        // ...genero i dati dell'ordine che voglio caricare secondo lo standard adeguato al waypoint editor
        let orderDataForWaypoint = await getOrderDataForWaypoint(order, validWaypointId.split("_").at(-1));
        orderDataForWaypoint.valid = true;
        order.onTheFly = true; // attribuisco una marcatura agli ordini aggiunti in questo modo, così da renderli riconoscibili nel caso di una eventuale rimozione dalla tabella di marcia
        newWaypoint = [orderDataForWaypoint];
        readyWaypoints[validWaypointId] = readyWaypoints[validWaypointId].concat(newWaypoint);
      } else {
        // Genero un waypoint nel formato corretto
        newWaypoint = await addOrderToSpecificWaypoint(waypoint, order, validWaypointId && validWaypointId.split("_").at(-1));
        order.onTheFly = true;
        // Aggiungo il nuuovo waypoint all'elenco ufficiale dei waypoint in tabella di marcia
        readyWaypoints[newWaypoint[0].id] = newWaypoint;
        // Ottengo tutti gli id dei waypoint per trovare quello relativo al waypoint di origine con id generato casualmente
        let readyIds = Object.keys(readyWaypoints);
        const targetIndex = readyIds.indexOf(waypoint[0].id);
        // Sostituisco l'id originale, con quello del nuovo waypoint (quindi sostituisco un uuid con un place_id+timestamp)
        readyIds[targetIndex] = newWaypoint[0].id;
        // Ricostruisco i waypoints nell'ordine corretto
        readyWaypoints = readyIds.reduce((acc, val) => ({ ...acc, [val]: readyWaypoints[val] }), {});      
        // console.groupCollapsed("Controllo costruzione nuovo waypoint");
        // console.log("newWaypoint", newWaypoint)
        // console.log("waypoint[0].id", waypoint[0].id)
        // console.log("Object.keys(readyWaypoints)", Object.keys(readyWaypoints))
        // console.log("readyIds", readyIds)
        // console.log("targetIndex", targetIndex)
        // console.log("newWaypoint[0].id", newWaypoint[0].id)
        // console.log("readyWaypoints", readyWaypoints)
        // console.groupEnd();
      }
    }

    return {
      order,
      waypoints: readyWaypoints,
      newWaypoint
    }
  }
)

export const removeTravelEditorOperationThunk = createAsyncThunk(
  'travelEditorSlice/removeTravelEditorOperation',
  async ({ order }, { getState }) => {
    const { travels: { editor: { waypoints }}} = getState();
    if(!order?.id) { return };
    const { waypoints: readyWaypoints, plannedIdTarget } = await removeOrderFromWaypoint(waypoints, order);
    return { order: { ...order, plannedId: plannedIdTarget }, waypoints: readyWaypoints }
  }
)