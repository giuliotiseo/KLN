import produce from "immer";
import { set, has } from "lodash";
import { formatLocationsToWarehouses } from "../../warehouses/libs/helpers";
import { OrderStatus, PaymentCondition, STANDARD_DIMENSIONS_INDEXES } from "./helpers";
import { ShipmentType } from "../../globals/libs/models";

// Reducer ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const defaultDeliveryInfo = {
  receiver: null,
  paymentCondition: PaymentCondition.FRANCO,
  // Info di trasporto
  delivery: { start: null, end: null, checkpoint: null},
  collectChecks: "NONE",
  checksAmount: "",
  // Info di carico
  orderNumber: "",
  trades: [],
  docs: [],
  support: "PALLET",
  quantity: 1,
  loadingMeter: 0.4,
  size: 0,
  temperature: 0,
  grossWeight: 1,
  netWeight: 2,
  packages: 1,
  perishable: true,
  stackable: false,
  warnings: [],
  palletInfo: { EPAL: [], EUR: []},
  note: null,
  // Billing informations
  customer: { id: null, name: "", vatNumber: "", uniqueCode: "", pec: "" },
}


export const initialOrderState = {
  preOrderId: null,
  sender: null,
  carrier: null,
  // Info di trasporto
  shipmentType: ShipmentType.GROUPAGE,
  pickup: { start: null, end: null, checkpoint: null },
  depot: { start: null, end: null, checkpoint: null },
  status: OrderStatus.PENDING,
  ...defaultDeliveryInfo,
};

export function enhancedReducer(state, updateArg) {
  // check if the type of update argument is a callback function
  if (updateArg.constructor === Function) {
    return { ...state, ...updateArg(state) };
  }

  // if the type of update argument is an object
  if (updateArg.constructor === Object) {
    // does the update object have _path and _value as it's keys
    // if yes then use them to update deep object values
    if (has(updateArg, "_path") && has(updateArg, "_value")) {
      const { _path, _value } = updateArg;
      return produce(state, draft => {
        set(draft, _path, _value);
      });
    } else {
      return { ...state, ...updateArg };
    }
  }
};

export function updateFormLogic ({ name, type, value, updateOrderState }) {
  const updatePath = name.split(".");
  const target_operation = {
    "sender": "pickup",
    "carrier": "carrier",
    "receiver": "delivery"
  }

  // if the input is a checkbox then use callback function to update
  // the toggle state based on previous state
  if (type === 'checkbox') {
    updateOrderState((prevState) => ({
      [name]: !prevState[name]
    }))

    return;
  }

  if (type === "reset") {
    if(name === "delivery") {
      updateOrderState({ ...defaultDeliveryInfo });
      return;
    }

    updateOrderState({
      [name]: initialOrderState[name],
      [target_operation[name]]: initialOrderState[target_operation[name]],
      customer: initialOrderState.customer
    });

    return;
  }
  
  // Override state values with preorder's info
  if(type === "copypaste") {
    if(name === "preOrder") {
      if(!value.id) return null;
      
      updateOrderState({
        preOrderId: value.id,
        sender: { name: value.senderName, tenant: value.tenantSender, vatNumber: value.senderVat },
        carrier: { name: value.carrierName, tenant: value.tenantCarrier, vatNumber: value.carrierVat },
        pickup: { start: value.pickupDateStart, end: value.pickupDateEnd, checkpoint: value.checkpoint },
        shipmentType: value.shipmentType,
        perishable: value.perishable,
        trades: value.trades
      });
    }

    if(name === "customer") {
      updateOrderState({
        customer: { 
          id: value.id,
          name: value.name,
          vatNumber: value.vatNumber,
          uniqueCode: value?.uniqueCode || "",
          pec: value?.pec || ""
        },
      });
    }

    if(name === "all") {
      updateOrderState({
        ...value,
        sender: { name: value.senderName, tag: value.tenantSender },
        carrier: { name: value.carrierName, tag: value.tenantCarrier },
        receiver: { name: value.receiverName, tag: value.tenantReceiver },
        size: typeof value.size !== "number" ? STANDARD_DIMENSIONS_INDEXES[value.support].findIndex(el => el === value.size) : value.size,
        quantity: value.quantity,
        pickup: { 
          checkpoint: {...value.pickupCheckpoint },
          start: value.pickupDateStart,
          end: value.pickupDateEnd
        },
        depot: { 
          checkpoint: {...value.depotCheckpoint },
          start: value.depotDateStart,
          end: value.depotDateEnd
        },
        delivery: { 
          checkpoint: {...value.deliveryCheckpoint },
          start: value.deliveryDateStart,
          end: value.deliveryDateEnd
        },
        palletInfo: value.palletInfo.reduce((acc, val) => ({
          ...acc,
          [val.type]: [].concat.apply([], value.palletInfo.filter(plt => plt.type === val.type).map(plt => ({
            value: plt.value,
            size: plt.size,
            type: plt.type,
            system: plt.system
          })))
        }), { "EPAL": [], "EUR": []}
      )});
    }

    return;
  }

  if(type === "undo") {
    if(name === "preOrder" && value) {
      updateOrderState({
        preOrderId: initialOrderState.preOrderId,
        sender: initialOrderState.sender,
        carrier: initialOrderState.carrier,
        pickup: initialOrderState.pickup,
        shipmentType: initialOrderState.shipmentType,
        perishable: initialOrderState.perishable,
        trades: initialOrderState.trades,
        customer: initialOrderState.customer
      })
    } else {
      updateOrderState({...initialOrderState })
    }

    return;
  }

  // if we have to update the root level nodes in the form
  if (updatePath.length === 1) {
    const [key] = updatePath;
    let outputValue = value && value.constructor === Object ? { ...value } : value;
    
    // If try to update companies states, remember to calculate locations values
    if((name === "sender" && value) || (name === "receiver" && value )) {
      if(value?.locations || value?.warehouses) {
        // If company value is been get from query by tag, it has warehouses property else is a simple contact with locations data 
        const locationsToWarehouses = value?.warehouses
           ? value.warehouses.items
           : formatLocationsToWarehouses(value?.locations);
        
        outputValue.locations = {...locationsToWarehouses}
      }
    }

    updateOrderState({ [key]: outputValue });
  }

  // if we have to update nested nodes in the form object
  // use _path and _value to update them.
  if (updatePath.length === 2) {
    if(type === "contacts") {
      updateOrderState((prevState) => ({
        [updatePath[0]]: {
          ...prevState[updatePath[0]], 
          [updatePath[1]]: {
            ...prevState[updatePath[0]][updatePath[1]],
            [type]: value[type]
          }}
      }));

      return;
    }

    updateOrderState({
      _path: updatePath,
      _value: value
    });
  }
}
