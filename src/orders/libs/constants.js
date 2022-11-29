import icon_fragile from '../../globals/assets/icon_fragile.png';
import icon_nocalore from '../../globals/assets/icon_nocalore.png';
import icon_noganci from '../../globals/assets/icon_noganci.png';
import icon_temeumidita from '../../globals/assets/icon_temeumidita.png';
import icon_alto from '../../globals/assets/icon_alto.png';

export const SHIPMENT_METHOD_DESCRIPTION = {
  "DIRETTO": "Carico completo",
  "GROUPAGE": "Groupage"
}

export const ORDER_STATUS_DESCRIPTION = {
  "PENDING": "Da ritirare",
  "PICKEDUP": "Ritirato",
  "STOCKED": "In giacenza",
  "DELIVERING": "In consegna",
  "DELIVERED": "Consegnato",
  "ARCHIVED": "Archiviato",
}


export const STANDARD_DIMENSIONS = {
  "PALLET": [
    { text: "CP2 - 80x120", values: [80, 120]},
    { text: "CP1 - 100x120", values: [100, 120]},
    { text: "CP3 - 114x114", values: [114, 114]},
    { text: "CP4 - 110x130", values: [110, 130]},
    { text: "CP5 - 76x114", values: [76, 114]},
    { text: "CP6 - 120x100", values: [120, 100]},
    { text: "CP7 - 130x110", values: [130, 110]},
    { text: "CP8 - 114x114", values: [114, 114]},
    { text: "CP9 - 114x114", values: [114, 114]},
   ],
   "ROLL": [
     { text: "80x120", values: [ 80, 120 ]},
     { text: "100x120", values: [ 100, 120 ]},
     { text: "72x70", values: [ 72, 80 ]},
     { text: "200x80", values: [ 200, 80 ]},
     { text: "60x74", values: [ 60, 74 ]},
     { text: "60x80", values: [ 60, 80 ]},
     { text: "137x67", values: [ 137, 67 ]},
     { text: "72x81", values: [ 72, 81 ]},
   ],
   "CASSA": [
     { text: "80x120", values: [ 80, 120 ]},
     { text: "100x120", values: [ 100, 120 ]},
     { text: "102x123", values: [ 102, 123 ]},
     { text: "82x123", values: [ 82, 123 ]},
     { text: "103x121", values: [ 103, 121 ]},
     { text: "100x100", values: [ 100, 100 ]},
     { text: "102x120", values: [ 102, 120 ]},
     { text: "105x125", values: [ 105, 125 ]},
     { text: "113x145", values: [ 113, 145 ]},
     { text: "120x165", values: [ 120, 165 ]},
   ],
   "SACCO": [
     { text: "80x120", values: [ 80, 120 ]},
     { text: "100x120", values: [ 100, 120 ]},
     { text: "102x123", values: [ 102, 123 ]},
     { text: "82x123", values: [ 82, 123 ]},
     { text: "103x121", values: [ 103, 121 ]},
     { text: "100x100", values: [ 100, 100 ]},
     { text: "102x120", values: [ 102, 120 ]},
     { text: "105x125", values: [ 105, 125 ]},
     { text: "113x145", values: [ 113, 145 ]},
     { text: "120x165", values: [ 120, 165 ]},
   ],
   "CONTAINER": [
     { text: "80x120", values: [ 80, 120 ]},
     { text: "100x120", values: [ 100, 120 ]},
     { text: "102x123", values: [ 102, 123 ]},
     { text: "82x123", values: [ 82, 123 ]},
     { text: "103x121", values: [ 103, 121 ]},
     { text: "100x100", values: [ 100, 100 ]},
     { text: "102x120", values: [ 102, 120 ]},
     { text: "105x125", values: [ 105, 125 ]},
     { text: "113x145", values: [ 113, 145 ]},
     { text: "120x165", values: [ 120, 165 ]},
   ],
   "CUSTOM": [
     { text: "Imposta valore manuale", value: [null, null ]}
   ]
 }

 export const PALLET_TYPES = {
  "EPAL": "EPAL",
  "EUR": "EUR",
}
 
 export const TRANSPORT_SUPPORTS = {
  PALLET: "Pallet",
  ROLL: "Roll container",
  CASSA: "Cassa / Barile",
  SACCO: "Sacco",
  CONTAINER: "Container",
}

export const DANGER_LABELS = {
  FRAGILE: { img: icon_fragile, text: "Maneggiare con cura"},
  NOHUMIDITY: { img: icon_temeumidita, text: "Teme l'umidità"},
  NOHEAT: { img: icon_nocalore, text: "Teme il calore"},
  NOHOOKS: { img: icon_noganci, text: "Non sollevare con argani"},
  POSITION: { img: icon_alto, text: "Verso di trasporto"},
}

export const PAYMENT_CONDITION_DESCRIPTION = {
  "SCONOSCIUTO": { 
    short: "Da definire",
    long: "Le condizioni di pagamento per quest'ordine devono essere ancora stabilite."
  },
  "FRANCO": { 
    short: "Porto franco",
    long: "Il pagamento del trasporto è a carico del mittente."
  },
  "ASSEGNATO": { 
    short: "Porto assegnato",
    long: "Il pagamento del trasporto è a carico del destinatario."
  }
}

export const PAYMENT_CONDITION = {
  "FRANCO": "FRANCO",
  "ASSEGNATO": "ASSEGNATO",
  "SCONOSCIUTO": "SCONOSCIUTO",
}


export const ORDER_PROPS_GLOSSARY = {
  carrier: "azienda di trasporto",
  sender: "azienda mittente",
  receiver: "azienda destinataria",
  shipmentType: "tipologia spedizione",
  pickupDateStart: "orario di disponibilità ritiro (da: )",
  pickupDateEnd: "orario di disponibilità ritiro (a: )",
  deliveryDateStart: "orario di disponibilità consegna (da: )",
  deliveryDateEnd: "orario di disponibilità consegna (a: )",
  depotDateStart: "orario di disponibilità scarico vettore (da: )",
  depotDateEnd: "orario di disponibilità scarico vettore (a: )",
  status: "stato dell'ordine",
  pickupCheckpoint: "punto di ritiro",
  deliveryCheckpoint: "punto di consegna",
  depotCheckpoint: "punto di scarico vettore",
  completedAt: "completamento ordine",
  paymentCondition: "condizioni di pagamento",
  orderNumber: "numero ordine",
  trades: "tipologia merce da trasportare",
  docs: "documenti allegati",
  support: "supporto di trasporto",
  warnings: "avvertenze ordine",
  quantity: "quantità basi a terra trasportate",
  size: "base di riferimento support",
  temperature: "temperatura trasporto",
  grossWeight: "peso lordo",
  netWeight: "peso netto",
  packages: "numero colli",
  perishable: "presenza di prodotti deperibili",
  stackable: "indicazione sovrapposizione unità",
  palletInfo: "informazioni interscambio legni",
  customer: "azienda intestataria della fattura",
  lastPosition: "ultimo rilevamento ordine",
  collectChecks: "istruzione ritiro assegni",
  checksAmount: "ammontare assegni",
  billingType: "tipo di fatturazione applicata al trasporto",
  note: "note",
}

export const SystemInterchange = {
  PARI: "Scambio alla pari",
  CAUZIONE: "Sistema cauzionale",
  FATTURAZIONE: "Fatturazione pallet",
  NOLEGGIO: "Noleggio pallet",
  PERDERE: "Quantità a perdere"
}

export const ORDERS_LABELS = {
  "carrier": {
    headingAction: "Ricevuto da",
    counterpart: "sender",
    action: "Registrato",
    date: "Ricevuto in data: "
  }, 
  "sender": {
    headingAction: "Inviato a",
    counterpart: "carrier",
    action: "Inviato",
    date: "Inviato in data: "
  },
  "receiver": {
    headingAction: "In consegna da",
    counterpart: "carrier",
    action: "Ricevuto",
    date: "Registrato in data: "
  },
}