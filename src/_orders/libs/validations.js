import { hasWhiteSpace } from "../../globals/libs/helpers";
import { ShipmentType } from "../../globals/libs/models";
import { OrderStatus, PaymentCondition, STANDARD_DIMENSIONS, TRANSPORT_SUPPORTS } from "./helpers";

export function validateOrderCreation(order) {
  let validations = {
    passed: [],  // { text: "", field: "" }
    errors: []  // { text: "", field: "" }
  };

  function addResponse(payload) {
    validations[payload.value].push(payload);
  }
 
  validateTenants([order.tenantSender, order.tenantCarrier, order.tenantReceiver], addResponse);
  validatePaymentCondition(order.paymentCondition, addResponse);
  validateShipmentType(order.shipmentType, addResponse);
  validatePickupCheckpoint(order.pickupCheckpoint, addResponse);
  validatePickupDateStart(order.pickupDateStart, addResponse);
  validatePickupDateEnd(order.pickupDateEnd, addResponse);
  validateDeliveryCheckpoint(order.deliveryCheckpoint, addResponse);
  validateDeliveryDateStart(order.deliveryDateStart, addResponse);
  validateDeliveryDateEnd(order.deliveryDateEnd, addResponse);
  validateStatus(order.status, addResponse);
  validateSupport(order.support, addResponse);
  validateSize({size: order.size, support: order.support }, addResponse);

  return validations;
}

/* 
  Check the correct ID format with 6 values
*/
//   return addResponse({ field, text: "check", value: "passed" })
// }

/* 
  Check the correct PreOrderId format
*/
/* 
  Check the correct tenants format: it needs to have @ character and must not have white space
*/
const validateTenants = (tenants, addResponse) => {
  const positionFields = ["tenantSender", "tenantCarrier", "tenantReceiver"];
  const companiesFields = {
    tenantSender: "mittente", tenantCarrier: "vettore", tenantReceiver: "destinatario" 
  }

  for(let i = 0; i < tenants.length; i++) {
    if((!tenants[i]?.includes("@") || !tenants[i]?.includes("local:")) && hasWhiteSpace(tenants[i])) {
      console.error(`${positionFields[i]}'s value is incorrect`, { input: tenants[i] });
      addResponse({
        field: positionFields[i], 
        text: `L'azienda ${companiesFields[positionFields[i]]} selezionata non è valida. Verificare la correttezza dei dati o contattare il team di svilupppo.`,
        value: "errors"
      })
    } else {
      addResponse({ field: positionFields[i], text: "check", value: "passed" })
    }
  }

  return;
}

/* 
  Check the correct paymentCondition format
*/
const validatePaymentCondition = (paymentCondition, addResponse) => {
  const field = "paymentCondition";
  const paymentConditions = Object.keys(PaymentCondition);
  if(!paymentConditions.includes(paymentCondition)) {
    console.error(`Payment condition not valid`, { input: paymentCondition });
    return addResponse({
      field, 
      text: `Le condizioni di pagamento selezionate non sono valide: ${paymentCondition}`,
      value: "errors"
    })
  }

  return addResponse({ field, text: "check", value: "passed" });
}

/* 
  Check the correct shipmentType format
*/
const validateShipmentType = (shipmentType, addResponse) => {
  const field = "shipmentType";
  const shipmentTypes = Object.keys(ShipmentType);
  if(!shipmentTypes.includes(shipmentType)) {
    console.error(`Shipment type not valid`, { input: shipmentType });
    return addResponse({
      field, 
      text: `Il metodo di spedizione scelto non è valido: ${shipmentType}`,
      value: "errors"
    })
  }

  return addResponse({ field, text: "check", value: "passed" });
}

/* 
  Check if pickup checkpoint has location
*/
const validatePickupCheckpoint = (pickupCheckpoint, addResponse) => {
  const field = "pickupCheckpoint";
  if(!pickupCheckpoint?.location) {
    console.error(`No location specified as pickup checkpoint`, { input: pickupCheckpoint });
    return addResponse({
      field, 
      text: `Punto di ritiro non trovato`,
      value: "errors"
    })
  }

  return addResponse({ field, text: "check", value: "passed" });
}

/* 
  Check if pickup date start is a date
*/
const validatePickupDateStart = (pickupDateStart, addResponse) => {
  const field = "pickupDateStart";
  if (!(new Date(pickupDateStart) instanceof Date)) {
    console.error(`pickupDateStart is not a valid date`, { input: pickupDateStart });
    return addResponse({
      field, 
      text: `La prima data di ritiro impostata non è valida`,
      value: "errors"
    })
  }

  return addResponse({ field, text: "check", value: "passed" });
}

/* 
  Check if pickup date end is a date
*/
const validatePickupDateEnd = (pickupDateEnd, addResponse) => {
  const field = "pickupDateEnd";
  if (!(new Date(pickupDateEnd) instanceof Date)) {
    console.error(`pickupDateEnd is not a valid date`, { input: pickupDateEnd });
    return addResponse({
      field, 
      text: `La seconda data di ritiro impostata non è valida`,
      value: "errors"
    })
  }

  return addResponse({ field, text: "check", value: "passed" });
}

/* 
  Check if delivery checkpoint has location
*/
const validateDeliveryCheckpoint = (deliveryCheckpoint, addResponse) => {
  const field = "deliveryCheckpoint";
  if(!deliveryCheckpoint?.location) {
    console.error(`No location specified as delivery checkpoint`, { input: deliveryCheckpoint });
    return addResponse({
      field, 
      text: `Punto di consegna non trovato`,
      value: "errors"
    })
  }

  return addResponse({ field, text: "check", value: "passed" });
}

/* 
  Check if delivery date start is a date
*/
const validateDeliveryDateStart = (deliveryDateStart, addResponse) => {
  const field = "deliveryDateStart";
  if (!(new Date(deliveryDateStart) instanceof Date)) {
    console.error(`deliveryDateStart is not a valid date`, { input: deliveryDateStart });
    return addResponse({
      field, 
      text: `La prima data di consegna impostata non è valida`,
      value: "errors"
    })
  }

  return addResponse({ field, text: "check", value: "passed" });
}

/* 
  Check if delivery date end is a date
*/
const validateDeliveryDateEnd = (deliveryDateEnd, addResponse) => {
  const field = "deliveryDateEnd";
  if (!(new Date(deliveryDateEnd) instanceof Date)) {
    console.error(`deliveryDateEnd is not a valid date`, { input: deliveryDateEnd });
    return addResponse({
      field, 
      text: `La seconda data di consegna impostata non è valida`,
      value: "errors"
    })
  }

  return addResponse({ field, text: "check", value: "passed" });
}

/* 
  Check if status is available by models provided
*/
const validateStatus = (status, addResponse) => {
  const field = "status";
  const availableStatus = Object.keys(OrderStatus);
  if(!availableStatus.includes(status)) {
    console.error(`Status not valid`, { input: status });
    return addResponse({
      field, 
      text: `Lo stato dell'ordine presenta delle anomalie`,
      value: "errors"
    })
  }

  return addResponse({ field, text: "check", value: "passed" });
}

/* 
  Check support validity
*/
const validateSupport = (support, addResponse) => {
  const field = "support";
  const availableSupports = Object.keys(TRANSPORT_SUPPORTS);
  if(!support || !availableSupports.includes(support)) {
    console.error(`Support not valid`, { input: support });
    return addResponse({
      field, 
      text: `Il supporto scelto non è valido`,
      value: "errors"
    })
  }

  return addResponse({ field, text: "check", value: "passed" });
}

/* 
  Check size validity
*/
const validateSize = ({ size, support }, addResponse) => {
  const field = "size";
  const sizesBySupport = STANDARD_DIMENSIONS[support].map(el => el.text);

  if(!sizesBySupport || sizesBySupport?.length <= 0) {
    console.error(`Not existent standard dimensions for this support`, { input: size });
    return addResponse({
      field, 
      text: `Dimensione standard non valida per il supporto scelto`,
      value: "errors"
    })
  }

  if(!sizesBySupport.includes(size)) {
    console.error(`Not valid size`, { input: size });
    return addResponse({
      field, 
      text: `Dimensioni standard del supporto non valide: ${size}`,
      value: "errors"
    })
  }

  return addResponse({ field, text: "check", value: "passed" });
}