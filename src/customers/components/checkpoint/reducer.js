import { v4 } from "uuid";
import { starterCheckpoint, windowOppositeTypes } from "../../libs/constants";
import { reformattedWindows } from "../../libs/helpers";

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
    case "import_warehouse":
      if(action?.value?.id) {
        return {
          ...state,
          warehouseId: action.value.id,
          location: action.value.location,
          contacts: action.value.contacts,
          windows: reformattedWindows(action.value.windows),
          maxLength: action.value.maxLength,
          tools: action.value.tools,
          trades: action.value.trades,
          cargoBay: action.value.cargoBay,
          containerUnloading: action.value.containerUnloading,
          note: action.value.note
        }
      } else {
        const name = state.name;
        const thirdCompany = state.thirdCompany;
        return {
          ...starterCheckpoint,
          name,
          thirdCompany
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
