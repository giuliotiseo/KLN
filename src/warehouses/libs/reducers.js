import { v4 } from "uuid";
import { starterWindow } from "./constants";
import { reformattedWindows, starterCheckpoint } from "./helpers";

// Reducer for main state in CreateWarehouseContainer ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export const initialState = {
  name: "",
  contacts: [],
  contactIds: [],
  specialization: "GENERALE",
  scope: [],
  maxLength: 20,
  tools: [],
  automationLevel: "LOW",
  type: "FRIGO",
  warehouseLinkId: "",
  windows: reformattedWindows([{ ...starterWindow, type: "CARICO" }, { ...starterWindow, type: "SCARICO" }]),
};

export function customWarehouseFormLogic ({ name, type, value, updateState }) {
  if(type === "custom") {
    if(name === "toggle_day") {
      updateState(({ windows: {
        [value.windowType]: [
          ...value.windows[value.windowType].slice(0, value.index),
          {
            ...value.windows[value.windowType][value.index],
            days: value.windows[value.windowType][value.index].days.includes(parseInt(value.value))
              ?  value.windows[value.windowType][value.index].days.filter(d => d !== parseInt(value.value)).sort()
              :  value.windows[value.windowType][value.index].days.concat(parseInt(value.value)).sort()
          },
          ...value.windows[value.windowType].slice(value.index + 1),
        ]
      }}));
  
      return;
    }

    if(name === "windows_time") {
      updateState(({ windows: {
        [value.windowType]: [
          ...value.windows[value.windowType].slice(0, value.index),
          {
            ...value.windows[value.windowType][value.index],
            [value.name]: value.value
          },
          ...value.windows[value.windowType].slice(value.index + 1),
        ]
      }}));
  
      return;
    }

    return;
  }
  
  return;
}

// Reducer from ContactCheckpointCompiler ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export const days = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"];

export const windowOppositeTypes = {
  CARICO: "SCARICO",
  SCARICO: "CARICO"
}

export function checkpointReducer (state, action) {
  switch(action.type) {
    case "overwrite":
      return { ...action.value }
    case "change_checkpoint":
      return {
        ...state,
        warehouseId: null,
        extId: state?.extId ? state.extId : v4(),
        [action.name]: action.value
      };
    case "remove_window":
      return {
        ...state,
        windows: {
          ...state.windows,
          [action.windowType]: state.windows[action.windowType].filter((_, idx) => idx !== action.index)
        }
      }
    case "add_window":
      return {
        ...state,
        windows: {
          ...state.windows,
          [action.value.type]: [...state.windows[action.value.type], action.value],
        }
      }
    case "toggle_day":
      return {
        ...state,
        windows:  {
          ...state.windows,
          [action.windowType]: [
            ...state.windows[action.windowType].slice(0, action.index),
            {
              ...state.windows[action.windowType][action.index],
              days: state.windows[action.windowType][action.index].days.includes(parseInt(action.value))
                ?  state.windows[action.windowType][action.index].days.filter(d => d !== parseInt(action.value)).sort()
                :  state.windows[action.windowType][action.index].days.concat(parseInt(action.value)).sort()
            },
            ...state.windows[action.windowType].slice(action.index + 1),
          ]
        }
      }
    case "windows_time":
      return {
        ...state,
        windows: {
          ...state.windows,
          [action.windowType]: [
            ...state.windows[action.windowType].slice(0, action.index),
            {
              ...state.windows[action.windowType][action.index],
              [action.name]: action.value
            },
            ...state.windows[action.windowType].slice(action.index + 1),
          ]
        }
      }
    case "copy_paste":
      return {
        ...state,
        windows: {
          ...state.windows,
          [windowOppositeTypes[action.windowType].toUpperCase()]: state.windows[action.windowType].map(wind => ({ ...wind, type: windowOppositeTypes[action.windowType]}))
        }
      }
    case "reset":
      if(action.name === "location") {
        return {
          ...state,
          name: "",
          location: { ...starterCheckpoint.location }
        }
      }
      return action.value
    // Return the current state as default
    default: return state;
  }
}
