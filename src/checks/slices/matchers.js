// Matchers -----------------------------------------------------------------------------------------------------------------------------------------------------
const dateIds_validation_fields = ["issuingDate", "pickupDate", "checkInDate", "checkOutDate", "deliveryDate",]
export const isCheckDateChangedFromCreator = (action) => {
  if(action.type.includes('changeCheckCreatorForm') && dateIds_validation_fields.includes(action?.payload?.id)) {
    return true;
  }
}

export const isCheckIbanChangedFromCreator = action => {
  if(action.type.includes('changeCheckCreatorForm') && action?.payload?.id === "iban") {
    return true;
  }
}

export const isCheckDateChangedFromEditor = (action) => {
  if(action.type.includes('changeCheckEditorForm') && dateIds_validation_fields.includes(action?.payload?.id)) {
    return true;
  }
}

export const isCheckIbanChanged = action => {
  if(action.type.includes('changeCheckEditorForm') && action?.payload?.id === "iban") {
    return true;
  }
}