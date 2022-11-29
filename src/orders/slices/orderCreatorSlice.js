import { createSlice } from "@reduxjs/toolkit";
import { round } from "../../globals/libs/helpers";
import { addFileToOrderCreatorThunk } from "../api/orders-thunks";
import { STANDARD_DIMENSIONS } from "../libs/constants";
import { isCollectChecksChanged, isPaymentConditionChanged, isPickupMethodChanged, isReceiverChanged, isReceiverRemoved, isSelectedPreOrderChanged, isSenderChanged, isSenderRemoved, isShipmentTypeChanged, isSupportOrSizeChanged } from "./matchers";

// Constants
const standardSupportDimensionsIndexes = Object.keys(STANDARD_DIMENSIONS)
  .reduce((acc, val) => {
    return ({
      ...acc,
      [val]: STANDARD_DIMENSIONS[val].map(el => el.text)
    })
}, []);

const initialState = {
  creatorType: {},
  pickupPickerMethod: "PREORDER",
  selectedPreOrder: null,
  // Companies
  carrier: null,
  sender: null,
  receiver: null,
  pickupStorage: null,
  deliveryStorage: null,
  // Pickup
  pickupCheckpoint: null,
  pickupDateStart: null,
  pickupDateEnd: null,
  // Depot
  depotCheckpoint: null,
  depotDateStart: null,
  depotDateEnd: null,
  // Delivery
  deliveryCheckpoint: null,
  deliveryDateStart: null,
  deliveryDateEnd: null,
  // Transport info
  paymentCondition: "SCONOSCIUTO",
  shipmentType: "GROUPAGE",
  warnings: [],
  temperature: 0,
  loadingMeter: 0,
  perishable: true,
  // UDC Content
  quantity: 0,
  support: "PALLET",
  size: 0, // su pallet è 80x120 in base all'index della select
  orderNumber: "",
  docs: [],
  trades: [],
  grossWeight: 0,
  netWeight: 0,
  packages: 0,
  stackable: false,
  palletInfo: { EPAL: [], EUR: []},
  // Other
  customer: null,
  collectChecks: "NONE",
  checksAmount: 0,
  billingType: "GROUPAGE",
  note: "",
}

// Slice
export const orderCreatorSlice = createSlice({
  name: "orderCreatorSlice",
  initialState,
  reducers: {
    // Global actions
    resetOrderCreator: () => initialState,
    changeOrderCreatorForm(state, { payload }) {
      if(payload.type === "checkbox") {
        state[payload.name] = !state[payload.name];
        return;
      }

      if(payload.type === "warnings") {
        if(!state.warnings.includes(payload.value)) {
          state.warnings.push(payload.value);
        } else {
          const indexToRemove = state.warnings.indexOf(payload.value); 
          state.warnings.splice(indexToRemove, 1);
        }

        return;
      }

      state[payload.name] = payload.value 
    },
    // Pickup actions
    changeOrderCreatorType: (state, { payload }) => {
      if(payload.type === "SENDER" || payload.type === "CARRIER") {
        state.creatorType = payload.type;
        state[payload.type.toLowerCase] = payload.currentCompany;
      }
    },
    changeOrderCreatorPreOrder: (state, { payload }) => {
      if(payload?.id) {
        if(payload.id === state.selectedPreOrder?.id) {
          state.selectedPreOrder = null;
          state.pickupDateStart = initialState.pickupDateStart;
          state.pickupDateEnd = initialState.pickupDateEnd;
          state.trades = initialState.trades;
          state.perishable = initialState.perishable;
          state.pickupCheckpoint = initialState.checkpoint;
          state.shipmentType = initialState.shipmentType;
          state.billingType = initialState.billingType;
          state.sender = initialState.sender;
          state.carrier = initialState.carrier;
          state.pickupStorage = initialState.pickupStorage;
        } else {
          state.selectedPreOrder = payload;
          state.pickupDateStart = payload.pickupDateStart;
          state.pickupDateEnd = payload.pickupDateEnd;
          state.trades = payload.trades;
          state.perishable = payload.perishable;
          state.pickupCheckpoint = payload.checkpoint;
          state.shipmentType = payload.shipmentType;
          state.billingType = payload.billingType;
          state.sender = {
            id: payload.senderId,
            vatNumber: payload.senderVat,
            name: payload.senderName,
            owner: payload.tenantSender,
          };
          state.carrier = {
            id: payload.carrierId,
            vatNumber: payload.carrierVat,
            name: payload.carrierName,
            owner: payload.tenantCarrier
          }
          if(payload.senderId === payload.storageId) {
            state.pickupStorage = state.sender;
          } else {
            state.pickupStorage = {
              id: payload.storageId,
              vatNumber: payload.storageVat,
              name: payload.storageName,
              owner: payload.tenantStorage
            }
          }
        }
      }
    },
    changeOrderCreatorSender(state, { payload }) {
      if(payload?.id === state?.sender?.id) {
        state.sender= null;
      } else {
        state.sender = payload;
      }
    },
    changeOrderCreatorCarrier(state, { payload }) {
      if(payload?.id === state?.carrier?.id) {
        state.carrier= null;
      } else {
        state.carrier = payload;
      }
    },
    changeOrderCreatorReceiver(state, { payload }) {
      if(payload?.id === state?.receiver?.id) {
        state.receiver= initialState.receiver;
        state.deliveryCheckpoint = initialState.deliveryCheckpoint;
        state.deliveryDateStart = initialState.deliveryDateStart;
        state.deliveryDateEnd = initialState.deliveryDateEnd;
      } else {
        state.receiver = payload;
      }
    },
    changeOrderCreatorCheckpoint(state, { payload }) {
      const property = `${payload.opType}Checkpoint`;
      if(payload?.extId) {
        if(state?.[property]?.extId === payload.extId) {
          state[property] = initialState[property];
        } else {
          state[property] = {
            warehouseId: payload?.id,
            extId: payload?.extId,
            thirdCompanyId: payload?.thirdCompanyId || payload?.warehouseLink?.companyOwner.id || "",
            thirdCompanyName: payload?.thirdCompanyName || payload?.warehouseLink?.companyOwner?.name || "",
            thirdCompanyOwner: payload?.thirdCompanyOwner || payload?.warehouseLink?.companyOwner?.owner || "",
            thirdCompanyVat: payload?.thirdCompanyVat || payload?.warehouseLink?.companyOwner?.vatNumber || "",
            name: payload?.name,
            location: payload?.location,
            contacts: payload?.contacts,
            windows: payload?.windows,
            maxLength: payload?.maxLength,
            tools: payload?.tools,
            note: payload.note
          };
        }
      } else {
        state[property] = initialState[property];
      }
    },
    changeOrderCreatorPalletInfo(state, { payload }) {
      const { value, opType } = payload;
      if(opType === "ADD") {
        state.palletInfo[value.type].push({
          value: value.value,
          size: value.size,
          type: value.type,
          system: value.system
        })
      }

      if(opType === "REMOVE") {
        state.palletInfo[value.type].splice(value.index, 1);
      }
    },
    changeOrderCreatorCustomer(state, { payload }) {
      state.customer[payload.name] = payload.value;
    },
    // Cargo actions
    changeOrderCreatorTrades(state, { payload }) {
      if(state.trades.includes(payload)) {
        const indexToRemove = state.trades.indexOf(payload);
        state.trades.splice(indexToRemove, 1);
      } else {
        state.trades.push(payload);
      }
    },
    changeOrderCreatorQuantity(state, { payload }) {
      let sizeIndex = null;
      if(typeof state.size === "string") {
        sizeIndex = standardSupportDimensionsIndexes[state.support].findIndex(el => el === state.size)
      } else {
        sizeIndex = state.size;
      }

      // Escape when sizeIndex get -1
      if(sizeIndex < 0) return null;

      // Recalculate loading meter
      const calculateLoadingMeter = parseFloat(
        (STANDARD_DIMENSIONS[state.support][sizeIndex].values
          .reduce((acc, val) => ((acc / 100) * (val / 100))/2.4) * payload
        )
      );

      state.quantity = payload;
      state.loadingMeter = round(calculateLoadingMeter, 10);      
    },
    changeOrderCreatorSize(state, { payload }) {
      state.size = parseInt(payload);
    },
    // Files
    removeOrderCreatorFile(state, { payload: { indexToRemove }}) {
      state.files = [...state.files.slice(0, indexToRemove), ...state.files.slice(indexToRemove, state.files.length - 1)]
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addFileToOrderCreatorThunk.fulfilled, (state, { payload }) => {
        if(!payload) return null;
        state.files = state.files.concat(payload)
      })
      .addMatcher(isSenderRemoved, (state) => {
        state = { ...initialState }
      })
      .addMatcher(isReceiverRemoved, (state) => {
        state.deliveryCheckpoint = initialState.deliveryCheckpoint;
        state.deliveryDateStart = initialState.deliveryDateStart;
        state.deliveryDateEnd = initialState.deliveryDateEnd;
        if(state.paymentCondition === "ASSEGNATO") {
          state.customer = initialState.customer;
        }
      })
      .addMatcher(isSenderChanged, (state) => {
        if(state.paymentCondition === "FRANCO") {
          state.customer = { ...state.sender };
        }
      })
      .addMatcher(isReceiverChanged, (state) => {
        if(state.paymentCondition === "ASSEGNATO") {
          state.customer = { ...state.receiver };
        }
      })
      .addMatcher(isPickupMethodChanged, (state) => {
        state.selectedPreOrder = null;
        state.pickupDateStart = initialState.pickupDateStart;
        state.pickupDateEnd = initialState.pickupDateEnd;
        state.trades = initialState.trades;
        state.perishable = initialState.perishable;
        state.pickupCheckpoint = initialState.checkpoint;
        state.shipmentType = initialState.shipmentType;
        state.billingType = initialState.billingType;
        state.sender = initialState.sender;
        state.pickupStorage = initialState.pickupStorage;
      })
      .addMatcher(isPickupMethodChanged, (state) => {
        state.selectedPreOrder = null;
        state.pickupDateStart = initialState.pickupDateStart;
        state.pickupDateEnd = initialState.pickupDateEnd;
        state.trades = initialState.trades;
        state.perishable = initialState.perishable;
        state.pickupCheckpoint = initialState.checkpoint;
        state.shipmentType = initialState.shipmentType;
        state.billingType = initialState.billingType;
        state.sender = initialState.sender;
        state.pickupStorage = initialState.pickupStorage;
      })
      .addMatcher(isShipmentTypeChanged, (state) => {
        state.billingType = state.shipmentType
      })
      .addMatcher(isCollectChecksChanged, (state) => {
        state.checksAmount = 0
      })
      .addMatcher(isSupportOrSizeChanged, (state) => {
        let sizeIndex = null;
        if(typeof state.size === "string") {
          sizeIndex = standardSupportDimensionsIndexes.findIndex(el => el === state.size)
        } else {
          sizeIndex = state.size;
        }
        
        // Escape when sizeIndex get -1
        if(sizeIndex < 0) return null;
        
        // Recalculate loading meter
        const calculateLoadingMeter = parseFloat(
          (STANDARD_DIMENSIONS[state.support][sizeIndex].values
            .reduce((acc, val) => ((acc / 100) * (val / 100))/2.4) * state.quantity
            )
            );
            
       state.loadingMeter = round(calculateLoadingMeter, 10);   
      })
      .addMatcher(isSelectedPreOrderChanged, (state) => {
        if(state.paymentCondition === "SCONOSCIUTO") {
          state.customer = initialState.customer;
        }

        if(state.paymentCondition === "ASSEGNATO") {
          state.customer = state.receiver;
        }

        if(state.paymentCondition === "FRANCO") {
          state.customer = state.sender;
        }
      })
      .addMatcher(isPaymentConditionChanged, (state) => {
        if(state.paymentCondition === "SCONOSCIUTO") {
          state.customer = initialState.customer;
        }

        if(state.paymentCondition === "ASSEGNATO") {
          state.customer = state.receiver;
        }

        if(state.paymentCondition === "FRANCO") {
          state.customer = state.sender;
        }
      })
  }
})

// Export actions -----------------------------------------------------------------------------------------------------------------------------------------------------
export const {
  resetOrderCreator,
  changeOrderCreatorType,
  changeOrderCreatorPreOrder,
  changeOrderCreatorForm,
  changeOrderCreatorSender,
  changeOrderCreatorCarrier,
  changeOrderCreatorReceiver,
  changeOrderCreatorCheckpoint,
  changeOrderCreatorTrades,
  changeOrderCreatorQuantity,
  changeOrderCreatorSize,
  changeOrderCreatorPalletInfo,
  changeOrderCreatorCustomer,
  removeOrderCreatorFile,
  changeOrderCreatorDocs,
} = orderCreatorSlice.actions;

// Export selectors -----------------------------------------------------------------------------------------------------------------------------------------------------
export const selectOrderCreator = ({ orders: { creator }}) => creator;
export const selectOrderCreatorCheckpoint = ({ orders: { creator }}) => creator.checkpoint;
export const selectOrderCreatorPickupPickerMethod = ({ orders: { creator }}) => creator.pickupPickerMethod;
export const selectOrderCreatorSelectedPreOrder = ({ orders: { creator }}) => creator.selectedPreOrder;

// Reducer export -----------------------------------------------------------------------------------------------------------------------------------------------------
export default orderCreatorSlice.reducer;