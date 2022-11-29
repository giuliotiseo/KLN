import Base64 from "../../globals/libs/base64";
import { generateUid } from "../../globals/libs/helpers";
import { digestMessage } from "../../globals/libs/sha256";

// Constants & Descriptors
export const REQUIRED_CHECK_FIELDS = [
  "id",
  "orderCreationDate",
  "stamp",
  "orderId",
  "carrierId",
  "senderId",
  "receiverId",
  "tenantReceiver",
  "tenantSender",
  "tenantCarrier",
  "receiverName",
  "senderName",
  "carrierName",
  "status"
];

export const CHECK_PROPS_TO_SKIP_FROM_LOG = [
  "id",
  "orderCreationDate",
  "carrierId",
  "senderId",
  "receiverId",
  "orderId",
  "tenantReceiver",
  "tenantSender",
  "tenantCarrier",
  "receiverName",
  "senderName",
  "carrierName",
]

export const CHECK_PROPS_GLOSSARY = {
  id: "ID assegno",
  orderCreationDate: "data di creazione ordine",
  keyDocNum: "numero documento principale",
  orderId: "ID ordine",
  orderStamp: "marca ordine",
  entryTravelId: "ID viaggio di ingresso",
  exitTravelId: "ID viaggio di uscita",
  docsRef: "documenti di riferimento",
  tenantReceiver: "tag destinatario",
  tenantSender: "tag mittente",
  tenantCarrier: "tag vettore",
  receiverName: "nome destinatario",
  senderName: "nome mittente",
  carrierName: "nome vettore",
  beneficiary: "nome beneficiario",
  issuingDate: "data di emissione",
  pickupDate: "data di ritiro presso la sede del destinatario ordine",
  checkInDate: "data di arrivo presso la sede amministrativa del vettore",
  checkOutDate: "data di uscita dalla sede amministrativa del vettore",
  deliveryDate: "data di consegna presso la sede mittente ordine",
  expiration: "data di scadenza",
  checkNum: "numero assegno",
  amount: "importo",
  iban: "IBAN",
  status: "status",
  image: "immagine in evidenza",
  files: "allegati",
  note: "note",
}

export const CheckStatus = ["PENDING", "PICKEDUP", "RECORDING", "DELIVERING", "DELIVERED", "ARCHIVED"];

// Query string url functions
export function getUrlDataParameters(search, callback) {
  const query = new URLSearchParams(search);
  callback(query.get("from"), query.get("status"));
}

// Processors -----------------------------------------------------------------------------------------------
export const encodeCheckId = async ({ prefix = "CHK", orderId, uuid, timestamp }) => {
  const legibleCheckId = `${prefix}_${uuid}_${orderId}_${timestamp}`;
  const cripted = await digestMessage(legibleCheckId)
  return cripted;
}

export const aggregateCheckFiles = (files = [], image = null) => {
  return image ? files.concat(image) : files;
}

// Legacy:
export const encodeCheckIdBase64 = (order_stamp) => {
  const legibleCheckId = `CHK_${generateUid()}_${order_stamp.split('-')[1]}_${Date.now()}`;
  return Base64.btoa(legibleCheckId);
}

export const decodeCheckIdBase64 = (id) => {
  return Base64.atob(id);
}