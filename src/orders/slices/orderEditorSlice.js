import { createSlice } from "@reduxjs/toolkit";
import { formatLocationCoords, formatWindowsToDynamoDb, round } from "../../globals/libs/helpers";
import { addFileToOrderEditorThunk } from "../api/orders-thunks";
import { STANDARD_DIMENSIONS } from "../libs/constants";
import { isCarrierRemoved, isCollectChecksChanged, isReceiverRemoved, isSenderRemoved, isShipmentTypeChanged } from "./matchers";

// Constants
const standardSupportDimensionsIndexes = Object.keys(STANDARD_DIMENSIONS)
  .reduce((acc, val) => {
    return ({
      ...acc,
      [val]: STANDARD_DIMENSIONS[val].map(el => el.text)
    })
}, []);

const operationTypeToCompany = {
  pickup: "sender",
  depot: "carrier",
  delivery: "receiver"
}

const initialState = {}

// Slice
export const orderEditorSlice = createSlice({
  name: "orderEditorSlice",
  initialState,
  reducers: {
    // Global actions
    resetOrderEditor: () => initialState,
    changeOrderEditorForm(state, { payload }) {
      if(payload.type === "checkbox") {
        state[payload.name] = !payload.value;
        return;
      }

      if(payload.type === "warnings") {
        if(state?.warnings) {
          if(!state.warnings.includes(payload.value)) {
            state.warnings.push(payload.value);
          } else {
            const indexToRemove = state.warnings.indexOf(payload.value); 
            state.warnings.splice(indexToRemove, 1);
          }
        } else {
          state.warnings = [payload.value];
        }

        return;
      }

      state[payload.name] = payload.value 
    },
    changeOrderEditorPreOrder(state, { payload }) {
      if(payload?.id) {
        if(payload.id === state.preOrder?.id) {
          state.preOrder = null;
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
          state.preOrder = payload;
          state.pickupDateStart = payload.pickupDateStart;
          state.pickupDateEnd = payload.pickupDateEnd;
          state.trades = payload.trades;
          state.perishable = payload.perishable;
          state.pickupCheckpoint = payload.checkpoint;
          state.shipmentType = payload.shipmentType;
          state.billingType = payload.billingType;
          state.sender = {
            id: payload.storageId,
            vatNumber: payload.storageVat,
            name: payload.storageName,
            owner: payload.tenantStorage,
          };

          state.carrier = {
            id: payload.carrierId,
            vatNumber: payload.carrierVat,
            name: payload.carrierName,
            owner: payload.tenantCarrier
          }
        }
      }
    },
    // Pickup actions
    changeOrderEditorSender(state, { payload }) {
      if(payload?.id === state?.sender?.id) {
        state.sender= null;
      } else {
        state.sender = payload;
      }
    },
    changeOrderEditorCarrier(state, { payload }) {
      if(payload?.id === state?.carrier?.id) {
        state.carrier= null;
      } else {
        state.carrier = payload;
      }
    },
    changeOrderEditorReceiver(state, { payload }) {
      if(payload?.id === state?.receiver?.id) {
        state.receiver= null;
      } else {
        state.receiver = payload;
      }
    },
    changeOrderEditorCheckpoint(state, { payload }) {
      const property = `${payload.opType}Checkpoint`;
      const companyTarget = operationTypeToCompany[payload.opType];
      const dateTargetStart = `${payload.opType}DateStart`
      const dateTargetEnd = `${payload.opType}DateEnd`

      console.log("Payload", payload);
      if(payload?.extId) {
        if(state?.[property]?.extId === payload.extId) {
          state[property] = null;
          state[dateTargetStart] = null;
          state[dateTargetEnd] = null;
          if(!state?.[companyTarget]) {
            state[companyTarget] = {...payload.company, company: payload.company }
          }
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
        state[property] = null;
        state[dateTargetStart] = null;
        state[dateTargetEnd] = null;
        if(!state?.[companyTarget]) {
          state[companyTarget] = {...payload.company, company: payload.company }
        }
      }
    },
    changeOrderEditorPalletInfo(state, { payload }) {
      const { value, opType, prev } = payload;
      if(opType === "ADD") {
        const palletOrderData = { value: value.value, size: value.size, type: value.type, system: value.system }
        if(state?.palletInfo?.[value.type]) {
          state.palletInfo[value.type].push(palletOrderData)
        } else {
          state.palletInfo = {
            ...prev,
            [value.type]: [palletOrderData]
          }
        }
      }

      if(opType === "REMOVE") {
        if(state?.palletInfo?.[value.type]) {
          state.palletInfo[value.type].splice(value.index, 1);
        } else {
          state.palletInfo = {
            ...prev,
            [value.type]: prev[value.type].filter((_, index) => index !== value.index)
          }
        }
      }
    },
    changeOrderEditorCustomer(state, { payload }) {
      if(state?.customer) {
        state.customer[payload.name] = payload.value;
      } else {
        state.customer = {
          [payload.name]: payload.value
        }
      }
    },
    // Cargo actions
    changeOrderEditorTrades(state, { payload }) {
      if(state?.trades) {
        if(state.trades.includes(payload)) {
          const indexToRemove = state.trades.indexOf(payload);
          state.trades.splice(indexToRemove, 1);
        } else {
          state.trades.push(payload);
        }
      } else {
        state.trades = [payload];
      }
    },
    changeOrderEditorQuantity(state, { payload }) {
      const { quantity, size, support } = payload;
      let sizeIndex = null;
      if(typeof size === "string") {
        sizeIndex = standardSupportDimensionsIndexes[support].findIndex(el => el === size)
      } else {
        sizeIndex = size;
      }

      // Escape when sizeIndex get -1
      if(sizeIndex < 0) return null;

      // Recalculate loading meter
      const calculateLoadingMeter = parseFloat(
        (STANDARD_DIMENSIONS[support][sizeIndex].values
          .reduce((acc, val) => ((acc / 100) * (val / 100))/2.4) * quantity
        )
      );

      state.quantity = quantity;
      state.loadingMeter = round(calculateLoadingMeter, 10);      
    },
    changeOrderEditorSize(state, { payload }) {
      state.size = parseInt(payload);
    },
    // Files
    removeOrderCreatorFile(state, { payload: { indexToRemove }}) {
      state.files = [...state.files.slice(0, indexToRemove), ...state.files.slice(indexToRemove, state.files.length - 1)]
    },
    // Files
    removeOrderEditorFile(state, { payload: { docs, files, docIndexToSelect, fileIndexToRemove }}) {
      state.docs = [
        ...docs.slice(0, docIndexToSelect),
        {
          ...docs[docIndexToSelect],
          files: docs[docIndexToSelect].files.reduce((acc, val, index) => {
            if(index === fileIndexToRemove) {
              return val.online
              ? [
                  ...acc ,
                  { ...val, keyToRemove: val.db_format.key }
                ]
              : [ ...acc ]
            } else {
              return [...acc, { ...val }]
            }
          }, [])
        },
        ...docs.slice(docIndexToSelect + 1)
      ]
    },
    restoreOrderEditorFile(state, { payload: {docIndexToSelect, indexToRestore }}) {
      delete state.docs[docIndexToSelect].files[indexToRestore].keyToRemove;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addFileToOrderEditorThunk.fulfilled, (state, { payload }) => {
        if(!payload) return null;
        state.docs = payload;
      })
      .addMatcher(isSenderRemoved, (state) => {
        state.sender = null;
        state.pickupCheckpoint = null;
        state.pickupDateStart = null;
        state.pickupDateEnd = null;
      })
      .addMatcher(isCarrierRemoved, (state) => {
        state.carrier = null;
        state.depotCheckpoint = null;
        state.depotDateStart = null;
        state.depotDateEnd = null;
      })
      .addMatcher(isReceiverRemoved, (state) => {
        state.receiver = null;
        state.deliveryCheckpoint = null;
        state.deliveryDateStart = null;
        state.deliveryDateEnd = null;
      })
      .addMatcher(isShipmentTypeChanged, (state) => {
        state.billingType = state.shipmentType
      })
      .addMatcher(isCollectChecksChanged, (state) => {
        state.checksAmount = 0
      })
  }
})

// Export actions -----------------------------------------------------------------------------------------------------------------------------------------------------
export const {
  resetOrderEditor,
  changeOrderEditorForm,
  changeOrderEditorPreOrder,
  changeOrderEditorSender,
  changeOrderEditorCarrier,
  changeOrderEditorReceiver,
  changeOrderEditorCheckpoint,
  changeOrderEditorPalletInfo,
  changeOrderEditorCustomer,
  changeOrderEditorTrades,
  changeOrderEditorQuantity,
  changeOrderEditorSize,
  removeOrderEditorFile,
  restoreOrderEditorFile,
} = orderEditorSlice.actions;

// Export selectors -----------------------------------------------------------------------------------------------------------------------------------------------------
export const selectOrderEditor = ({ orders: { editor }}) => editor;
export const selectOrderEditorCheckpoint = ({ orders: { editor }}) => editor.checkpoint;
export const selectOrderBeforeUpdate = ({ orders: { editor }}) => {
  let dataToReturn = { ...editor };
  if(dataToReturn?.pickupCheckpoint?.location?.place_id) {
    dataToReturn.pickupCheckpoint = {
      ...dataToReturn.pickupCheckpoint,
      windows: formatWindowsToDynamoDb(dataToReturn.pickupCheckpoint.windows),
      location: {
        ...dataToReturn.pickupCheckpoint.location,
        coordinate: formatLocationCoords(dataToReturn.pickupCheckpoint.location.coordinate)
      }
    }
  }

  if(dataToReturn?.depotCheckpoint?.location?.place_id) {
    dataToReturn.depotCheckpoint = {
      ...dataToReturn.depotCheckpoint,
      windows: formatWindowsToDynamoDb(dataToReturn.depotCheckpoint.windows),
      location: {
        ...dataToReturn.depotCheckpoint.location,
        coordinate: formatLocationCoords(dataToReturn.depotCheckpoint.location.coordinate)
      }
    }
  }

  if(dataToReturn?.deliveryCheckpoint?.location?.place_id) {
    dataToReturn.deliveryCheckpoint = {
      ...dataToReturn.deliveryCheckpoint,
      windows: formatWindowsToDynamoDb(dataToReturn.deliveryCheckpoint.windows),
      location: {
        ...dataToReturn.deliveryCheckpoint.location,
        coordinate: formatLocationCoords(dataToReturn.deliveryCheckpoint.location.coordinate)
      }
    }
  }

  return dataToReturn;
};

// Reducer export -----------------------------------------------------------------------------------------------------------------------------------------------------
export default orderEditorSlice.reducer;