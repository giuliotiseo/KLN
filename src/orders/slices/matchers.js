// Matchers
export const isSenderRemoved = (action) => {
  if((action.type.includes('Sender')) && !action?.payload?.id) {
    return true;
  }
}

export const isReceiverRemoved = (action) => {
  if(action.type.includes('Receiver') && !action?.payload?.id) {
    return true;
  }
}

export const isSenderChanged = (action) => {
  if((action.type.includes('Sender')) && action?.payload?.id) {
    return true;
  }
}

export const isReceiverChanged = (action) => {
  if(action.type.includes('Receiver') && action?.payload?.id) {
    return true;
  }
}

export const isCarrierRemoved = (action) => {
  if(action.type.includes('Carrier') && !action?.payload?.id) {
    return true;
  }
}


export const isShipmentTypeChanged = (action) => {
  if( action?.payload?.name === "shipmentType") {
    return true;
  }
}

export const isPickupMethodChanged = (action) => {
  if(action.type.includes('changeOrderCreatorForm') && action?.payload?.name === "pickupPickerMethod") {
    return true;
  }
}

export const isSupportOrSizeChanged = (action) => {
  if(action.type.includes('changeOrderCreatorSize') || (action?.payload?.name === "support")) {
    return true;
  }
}

export const isSelectedPreOrderChanged = (action) => {
  if(action.type.includes('changeOrderCreatorPreOrder') && action?.payload?.id) {
    return true;
  }
}

export const isPaymentConditionChanged = (action) => {
  if(action.type.includes('changeOrderCreatorForm') && (action?.payload?.name === "paymentCondition")) {
    return true;
  }
}

export const isCollectChecksChanged = (action) => {
  if(action?.payload?.name === "collectChecks") {
    return true;
  }
}
