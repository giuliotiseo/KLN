import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { removeDuplicates } from "../../globals/libs/helpers";
import { addFileToPalletCreatorThunk, addImageToPalletCreatorThunk, changePalletCreatorHandlingRefThunk, changePalletCreatorTravelThunk, changePalletCreatorWaypointThunk } from "../api/pallets-thunks";
import { calculatePalletInfoByCompanies, calculateReversal, getAllLoadData, getAllUnloadData, getCompliantAndDisposableFeatures, getCompliantAndDisposableValues } from "../libs/helpers";

export const operationValueToKey = {
  0: "CARICA",
  1: "SCARICA"
}

// Slice reducer -----------------------------------------------------------------------------------------------------------------------------------------------------
const travelState = {
  // Related travel info
  travel: {}, // need: id, stamp
  travelStamp: "",
}

const contentState = {
  waypoint: { PICKUP: null, DELIVERY: null },
  waypointReadOnly: { id: null },
  waypointTab: "PICKUP",
  hasDelivery: false,
  companiesPalletInfo: null,
  type: "TRADE",
  operationDate: new Date().toISOString(),
  // Companies data
  carrier: null,
  customer: null,
  reversal: null, /* [{ name: company.name String!, tenant: company.tenant ID, quantity: Int note: String }] */
  // Load + Unload
  loadQuantity: 0,
  loadFeatures: [],
  loadNote: "",
  unloadQuantity: 0,
  fixedUnloadQuantity: 0,
  unloadFeatures: [],
  unloadNote: "",
  // Disposables load + disposable unload
  disposableLoad: 0,
  disposableFeatures: [],
  disposableUnload: 0,
  disposableUnloadFeatures: [],
  disposableLoadNote: "",
  disposableUnloadNote: "",
  // Validations info
  status: "COMPLETED",
  adminValidation: false,
  adminValidator: null,
  // Attachments
  voucherImage: null,
  files: [],
  // Additional data
  text: "",
  note: "",
  badge: true,
  palletHandlingRef: { stamp: "", id: "", status: "ready" }
}

const initialState = {
  ...travelState, ...contentState
}

export const palletCreatorSlice = createSlice({
  name: "palletCreatorSlice",
  initialState,
  reducers: {
    initPalletCreatorQuantity(state, { payload: { waypoint, orders, carrier }}) {
      const handlingStored = state.travel?.palletHandlings?.items?.map(item => item.id) || [];

      // Get main data
      const waypointOrdersStackObject = waypoint.orders.reduce((acc, val) => ({ ...acc,
        [val.orderId]: {
        ...orders[val.orderId].order,
        operationKey: operationValueToKey[val.operationValue], // CARICA || SCARICA
        operation: val.operation
      }}), {});
  
      const loadUnloadOperations = Object.keys(waypointOrdersStackObject).reduce((acc, val) => {
        const selectedKey = waypointOrdersStackObject[val].operationKey; // selectedKey = CARICA || SCARICA 
        return ({
          ...acc,
          [selectedKey]: acc?.[selectedKey] 
            ? [...acc[selectedKey]].concat.apply([...acc[selectedKey]], waypointOrdersStackObject[val].palletInfo) // merge array of arrays
            : waypointOrdersStackObject[val].palletInfo
        })
      }, {});
  
      // Escape
      if(Object.keys(loadUnloadOperations)?.length < 1) return;
      
      // Determino se la movimentazione selezionata è stata già registrata
      if(handlingStored.includes(waypoint?.handlingId)) {
        state.waypointReadOnly.id = waypoint.handlingId;
        return;
      } else {
        state.waypointReadOnly.id = null;
      }

      // Quantità caricate
      const loadDataObject = getAllLoadData(loadUnloadOperations?.["CARICA"]);
      state.loadQuantity = loadDataObject.quantity;
      state.disposableLoad = loadDataObject.disposableQuantity;
      state.loadFeatures = loadDataObject.features;
      state.disposableFeatures = loadDataObject.disposableFeatures;
      state.loadNote = "";
      state.disposableLoadNote = "";

      // Quantità scaricate
      const unloadDataObject = getAllUnloadData(loadUnloadOperations?.["SCARICA"]);
      state.unloadQuantity = unloadDataObject.quantity;
      state.fixedUnloadQuantity = state.unloadQuantity;
      state.disposableUnload = unloadDataObject.disposableQuantity;
      state.unloadFeatures = unloadDataObject.features;
      state.disposableUnloadFeatures = unloadDataObject.disposableFeatures;
      state.unloadNote = "";
      state.disposableUnloadNote = "";

      // Altre info
      state.carrier = { name: carrier.name, tenant: carrier?.tenant || carrier?.owner, id: carrier.id }
      state.customer = { name: waypoint.companyName, tenant: waypoint.tenantCompany, id: waypoint.companyId }
      state.operationDate = new Date().toISOString();
      state.voucherImage = null;
      state.files = [];

      // Traccia la presenza di una consegna nel waypoint selezionato
      const hasDelivery = waypoint?.orders?.filter(order => order.operation === "DELIVERY")?.length ? true : false;
      if(hasDelivery) {
        state.hasDelivery = true;
        // Prendi gli ordini o ottieni gli scarichi validi dai palletinfo inserendoli all'interno di un oggetto marcato con tenant aziendale
        state.companiesPalletInfo = calculatePalletInfoByCompanies({ waypoint, orders });
        state.reversal = calculateReversal({
          companiesPalletInfo: state.companiesPalletInfo,
          loadQuantity: state.loadQuantity,
          unloadQuantity: state.unloadQuantity,
        });
      } else {
        state.hasDelivery = false;
        state.reversal = null;
      }
    },
    initStaticPalletCreator(state, { payload }) {
      const opposites = {
        carrier: "customer",
        customer: "carrier",
      }

      if(!payload?.company || !payload?.queryFrom) {
        return;
      } else {
        state[payload.queryFrom] = {
          ...payload.company,
          tenant: payload.company.owner
        };
        
        state[opposites[payload.queryFrom]] = "NO_COMPANY"
      }
    },
    changePalletCreatorTravelStamp(state, { payload }) {
      if(!payload?.value) {
        state.travelStamp = "";
        return;
      }

      state.travelStamp = payload.value;
    },
    changePalletCreatorTravel(state, { payload }) {
      if(!payload) {
        state.travel = {};
        state.waypoint = initialState.waypoint;
        state.waypointTab = initialState.waypointTab
        state.waypointReadOnly = null;
        return;
      } else {
        state.travel = payload
      }

    },
    changePalletCreatorWaypoint(state, { payload }) {
      if(!payload) {
        state.waypoint = null;
        return;
      }

      if(payload.id === state.waypoint?.id) {
        state.waypoint = null
        return;
      }

      state.waypoint.PICKUP = payload.orders.filter(order => order.operation === "PICKUP")?.length > 0
        ? { ...payload, orders: payload.orders.filter(order => order.operation === "PICKUP")}
        : null;
      
      state.waypoint.DELIVERY = payload.orders.filter(order => order.operation === "DELIVERY")?.length > 0 
        ? { ...payload, orders: payload.orders.filter(order => order.operation === "DELIVERY")}
        : null;

      if(!state.waypoint.PICKUP && !state.waypoint.DELIVERY) {
        state.waypointTab = null
      }
      if(!state.waypoint.PICKUP && state.waypoint.DELIVERY) {
        state.waypointTab = "DELIVERY";
      } else {
        state.waypointTab = "PICKUP";
      }
    },
    changePalletCreatorWaypointTab(state, { payload }) {
      if(!state.waypoint[payload]) return state;
      state.waypointTab = payload;
    },
    changePalletCreatorCustomer(state, { payload }) {
      if(!payload) {
        state.customer = null;
        return;
      }

      state.customer = payload;
    },
    changePalletCreatorLoad(state, { payload }) {
      if(typeof payload !== "number")  return;
      state.loadQuantity = payload;
      // Traccia la presenza di una consegna nel waypoint selezionato
      if(state.hasDelivery) {
        state.reversal = calculateReversal({
          companiesPalletInfo: state.companiesPalletInfo,
          loadQuantity: state.loadQuantity,
          unloadQuantity: state.unloadQuantity,
        });
      }
    },
    changePalletCreatorLoadNote(state, { payload }) {
      if(!payload) return state;
      state.loadNote = payload;
    },
    changePalletCreatorUnload(state, { payload }) {
      if(typeof payload !== "number")  return;
      state.unloadQuantity = payload;
      // Traccia la presenza di una consegna nel waypoint selezionato
      if(state.hasDelivery) {
        if(state.badge) {
          toast.warn("Attenzione! stai modificando le quantità indicate negli ordini. Gli storni potrebbero generare valori indesiderati.");
          state.badge = false;
        }

        if(!state.badge && (payload === state.fixedUnloadQuantity)) {
          state.badge = true;
        }

        state.reversal = calculateReversal({
          companiesPalletInfo: state.companiesPalletInfo,
          loadQuantity: state.loadQuantity,
          unloadQuantity: state.unloadQuantity,
        });
      }
    },
    changePalletCreatorUnloadNote(state, { payload }) {
      if(!payload) return state;
      state.unloadNote = payload;
    },
    changePalletCreatorDisposableLoad(state, { payload }) {
      if(typeof payload !== "number")  return;
      state.disposableLoad = payload;
    },
    changePalletCreatorDisposableLoadNote(state, { payload }) {
      if(!payload) return state;
      state.disposableLoadNote = payload;
    },
    changePalletCreatorDisposableUnload(state, { payload }) {
      if(typeof payload !== "number")  return;
      state.disposableUnload = payload;
    },
    changePalletCreatorDisposableUnloadNote(state, { payload }) {
      if(!payload) return state;
      state.disposableUnloadNote = payload;
    },
    changePalletCreatorReversalQuantity(state, { payload }) {
      if(!state.reversal?.[payload.index]) return;
      state.reversal[payload.index].value = payload.value;
    },
    changePalletCreatorReversalNote(state, { payload }) {
      if(!state.reversal?.[payload.index]) return;
      state.reversal[payload.index].note = payload.value;
    },
    changePalletCreatorOperationDate(state, { payload }) {
      if(!payload) {
        state.operationDate = null;
        return;
      };

      state.operationDate = payload;
    },
    changePalletCreatorAdminValidation(state, { payload }) {
      state.adminValidation = !state.adminValidation;
      if(!state.adminValidation) {
        state.adminValidator = null;
      } else {
        state.adminValidator = payload;
      }
    },
    changePalletCreatorNote(state, { payload }) {
      state.note = payload;
    },
    changePalletCreatorReversal(state, { payload }) {
      if(!payload || !payload?.name) {        
        state.reversal = null
        return;
      } else {
        state.reversal = [{
          ...payload,
          id: payload.id,
          tenant: payload?.owner || payload?.tenant || payload.id,
          value: 0,
          note: ""
        }]
      }
      
    },
    changePalletCreatorLicensePlate(state, { payload }) {
      const indexToChange = payload.id;
      let modifiedLicensePlate = payload?.licensePlate?.split("+"); 
      modifiedLicensePlate[indexToChange] = payload.value;
      state.travel.licensePlate =  modifiedLicensePlate.join("+")
    },
    changePalletCreatorVehicleName(state, { payload }) {
      const indexToChange = payload.id;
      let modifiedVehicleName = payload?.vehicleName?.split(";"); 
      modifiedVehicleName[indexToChange] = payload.value;
      state.travel.vehicleName = modifiedVehicleName.join(";");
    },
    changePalletCreatorCarrierOperator(state, { payload }) {
      state.travel.driver = state?.travel?.driver
        ? { ...state.travel.driver, [payload.id]: payload.value }
        : { ...payload.carrierOperator, [payload.id]: payload.value }
    },
    // Attachements
    removePalletCreatorImage(state, { payload }) {
      state.voucherImage = {
        keyToRemove: payload.db_format.key,
        raw_format: null,
        db_format: null,
        online: false,
      }
    },
    removePalletCreatorFile(state, { payload: { indexToRemove }}) {
      state.files = [...state.files.slice(0, indexToRemove), ...state.files.slice(indexToRemove, state.files.length - 1)]
    },
    // Reset fields
    resetPalletCreator: () => initialState,
    resetPalletCreatorContent: (state) => ({
      ...state, 
      ...contentState
    }),
  },
  extraReducers(builder) {
    builder
    .addCase(changePalletCreatorTravelThunk.fulfilled, (state, { payload }) => {
      if(!payload) return;

      // Realizzazione counter movimentazioni preparare x waypoint
      /* Metto da una parte tutti gli id dei waypoint le cui movimentazioni sono già state registrate
         escludendo i null e gli storni
      */
      const storedPalletHandlingsWpIds = payload.palletHandlings.items
        .filter(item => item?.waypoint)
        .filter(newItem => !newItem.id.includes("REV"))
        .map(filtered_item => filtered_item.waypoint.id);

      /*
        Controllo quante operazioni sono state fatte per ciascun waypoint
      */
      const opNumHandlingWaypoint =  storedPalletHandlingsWpIds.reduce((acc, val) => {
        return ({
          ...acc,
          [val]: storedPalletHandlingsWpIds.filter(el => el === val).length
        })
      }, {});

      /*
        Vedo i waypoints del viaggio, verifico quante operazioni sono previste 
        e le metto a confronto con le oeprazioni già registrate
      */
     const palletHandlingCounter = payload.waypoints.reduce((acc, val) => ({
      ...acc,
      [val.id]: (opNumHandlingWaypoint?.[val.id] || 0) + `/` + removeDuplicates(val.orders.map(order => order.operation)).length 
     }), {})


      state.travel = {...payload, palletHandlingCounter }
    })
    .addCase(addImageToPalletCreatorThunk.fulfilled, (state, { payload }) => {
      if(!payload) return;
      state.voucherImage = { ...payload }
    })
    .addCase(addFileToPalletCreatorThunk.fulfilled, (state, { payload }) => {
      if(!payload) return;
      state.files = state.files.concat(payload)
    })
    .addCase(changePalletCreatorWaypointThunk.fulfilled, (state, { payload }) => {
      if(!payload) return;

      /* Se ricevo il payload del tipo "STORED" vuol dire che ho selezionato una movimentazione 
        già registrata in precedenza */
      if(payload?.type === "STORED") {
        state.waypointReadOnly = { id: payload?.id }
        state.waypointTab = payload.waypointTab;
        state.waypoint = { PICKUP: payload.PICKUP, DELIVERY: payload.DELIVERY };
      } else {
        state.waypoint = { PICKUP: payload.PICKUP, DELIVERY: payload.DELIVERY };
        state.waypointTab = payload.waypointTab;
        state.waypointReadOnly = { id: null };
      }

    })
    .addCase(changePalletCreatorHandlingRefThunk.pending, (state) => {
      state.palletHandlingRef.status = "loading"
    })
    .addCase(changePalletCreatorHandlingRefThunk.fulfilled, (state, { payload }) => {
      if(!payload || !payload?.stamp || !payload?.id) {
        state.palletHandlingRef = {
          stamp: "",
          id: "",
          status: "ready"
        }

        toast.error("Nessuna movimentazione trovata");
      } else {
        state.palletHandlingRef = {
          status: "success",
          stamp: payload.stamp,
          id: payload.id,
          customerName: payload.customerName,
          customerId: payload.customerId,
          tenantCustomer: payload.tenantCustomer,
          travelStamp: payload.travelStamp,
          travelId: payload.travelId,
        } 
      }
    })
    .addCase(changePalletCreatorHandlingRefThunk.rejected, (state) => {
      state.palletHandlingRef.status = "error"
    })
  }
})

// Export actions -----------------------------------------------------------------------------------------------------------------------------------------------------
export const {
  // Init
  initPalletCreatorQuantity,
  initStaticPalletCreator,
  // Change
  changePalletCreatorTravelStamp,
  changePalletCreatorTravel,
  changePalletCreatorWaypoint,
  changePalletCreatorWaypointTab,
  changePalletCreatorOperationDate,
  changePalletCreatorLoad,
  changePalletCreatorLoadNote,
  changePalletCreatorUnload,
  changePalletCreatorUnloadNote,
  changePalletCreatorDisposableLoad,
  changePalletCreatorDisposableLoadNote,
  changePalletCreatorDisposableUnload,
  changePalletCreatorDisposableUnloadNote,
  changePalletCreatorReversalQuantity,
  changePalletCreatorReversalNote,
  changePalletCreatorReversal,
  changePalletCreatorAdminValidation,
  changePalletCreatorNote,
  changePalletCreatorLicensePlate,
  changePalletCreatorVehicleName,
  changePalletCreatorCarrierOperator,
  // Remove
  removePalletCreatorImage,
  removePalletCreatorFile,
  // Reset
  resetPalletCreator,
  resetPalletCreatorContent,
} = palletCreatorSlice.actions;

// Export selectors -----------------------------------------------------------------------------------------------------------------------------------------------------
export const selectPalletCreator = ({ pallets: { creator }}) => {
  return {
    companiesPalletInfo: creator.companiesPalletInfo,
    travelStamp: creator.travelStamp,
    travel: creator.travel,
    waypointTab: creator.waypointTab,
    waypoint: creator?.waypoint?.[creator.waypointTab],
    waypointReadOnly: creator.waypointReadOnly,
    carrier: creator.carrier,
    customer: creator.customer,
    hasDelivery: creator.hasDelivery,
    files: creator.files,
    image: creator.voucherImage,
    operationDate: creator.operationDate,
    adminValidation: creator.adminValidation,
    adminValidator: creator.adminValidator,
    loadQuantity: creator.loadQuantity,
    loadNote: creator.loadNote,
    unloadQuantity: creator.unloadQuantity,
    unloadNote: creator.unloadNote,
    disposableLoad: creator.disposableLoad,
    disposableLoadNote: creator.disposableLoadNote,
    disposableUnload: creator.disposableUnload,
    disposableUnloadNote: creator.disposableUnloadNote,
    reversal: creator.reversal,
    note: creator.note,
    palletHandlingRef: creator.palletHandlingRef,
  }
};

export const selectPalletCreatorBadgeStatus = ({ pallets: { creator }}) => creator.badge;
export const selectPalletCreatorStoredHandlings = ({ pallets: { creator }}) => creator.travel?.palletHandlings?.items?.map(el => el.id) || [];
export const selectPalletCreatorOrdersHandlingIds = ({ pallets: { creator }}) => {
  return {
    PICKUP: creator.waypoint.PICKUP?.handlingId,
    DELIVERY: creator.waypoint.DELIVERY?.handlingId,
  }
}

export const selectPalletCreatorOrdersSelection = ({ pallets: { creator }}) => creator.waypointTab;
export const selectPalletCreatorOrdersSelectionTab = ({ pallets: { creator }}) => {
  return {
    PICKUP: creator.waypoint.PICKUP?.orders ? creator.waypoint.PICKUP?.orders.length : 0,
    DELIVERY: creator.waypoint.DELIVERY?.orders ? creator.waypoint.DELIVERY?.orders.length : 0,
  }
}

export const selectPalletCreatorCompaniesNames = ({ pallets: { creator }}) => {
  if(!creator.customer) return null;
  return creator.reversal?.length > 0
    ? creator.reversal.map(r => r?.name).concat(creator?.customer?.name)
    : [creator?.customer?.name]
}

export const selectPalletCreatorCompanies = ({ pallets: { creator }}) => {
  if(!creator.customer) return null;
  return creator.reversal?.length > 0
    ? creator.reversal.map(r => r).concat(creator?.customer)
    : [creator?.customer]
}

export const selectPalletCreatorLoads = ({ pallets: { creator }}) => ({
  COMPLIANT: {
    value: creator.loadQuantity,
    features: creator.loadFeatures,
    note: creator.loadNote
  },
  DISPOSABLE: {
    value: creator.disposableLoad,
    features: creator.disposableFeatures,
    note: creator.disposableLoadNote
  }
});

export const selectPalletCreatorUnloads = ({ pallets: { creator }}) => ({
  COMPLIANT: {
    value: creator.unloadQuantity,
    features: creator.unloadFeatures,
    note: creator.unloadNote
  },
  DISPOSABLE: {
    value: creator.disposableUnload,
    features: creator.disposableUnloadFeatures,
    note:  creator.disposableUnloadNote
  }
});


// Reducer export ----------------------------------------------------------------------------------------------------------------------------------------------------
export default palletCreatorSlice.reducer;