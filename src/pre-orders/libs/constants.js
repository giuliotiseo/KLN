// Constants, models and types -----------------------------------------------------------------------------------------------
export const PREORDER_STATUS_DESCRIPTION = {
  "PENDING": "In attesa",
  "ACCEPTED": "Accettato",
  // "IN_PROGRESS": "In corso",
  // "COMPLETED": "Completato",
  "REJECTED": "Rifiutato"
}

export const convertQueryStatusToStatus = {
  "incoming": "PENDING",
  "processing": "ACCEPTED",
  "in_progress": "IN_PROGRESS",
  "completed": "COMPLETED",
  "rejected": "REJECTED",
}

export const TRANSPORT_TYPE_DESCRIPTION = {
  "DIRETTO": "Trasporto diretto o carico completo",
  "GROUPAGE": "Groupage"
}

export const TRANSPORT_TYPE_LONG_DESCRIPTION = {
  "DIRETTO": "Avrai a disposizione un mezzo completaimente dedicato a te, senza dover condividere itinerario o spazio di carico con altri clienti. Questa tipologia di spedizione ti permette di godere della massima flessibilità nella programmazione del trasporto e quindi di un'ottimizzazione dell'operazioni di consegna, con tempi più brevi e un maggiore controllo sulla disposizione delle merci nel mezzo. I costi per questa tipologia di spedizione tengono conto dei grandi vantaggi offerti al cliente.",
  "GROUPAGE": "Condividi lo spazio di carico con altri committenti. Rappresenta la scelta ideale per l'invio di piccoli quantitativi di merce. Il groupage implica che l'itinerario dovrà tenere conto di più mete e scendere a compromessi con esigenze orarie differenti. La disposizione delle merci, inoltre, non può essere decisa in autonomia ma posizionata secondo una logistica che non fa prefereze e segue semplicemente i criteri della razionalità operativa. I costi per questa tipologia di spedizione sono inferiori."
}

export const SHIPMENT_METHOD_DESCRIPTION = {
  "DIRETTO": "Carico completo",
  "GROUPAGE": "Groupage"
}


export const PREORDERS_LABELS = {
  "carrier": {
    headingAction: "Ricevuto da",
    counterpart: "sender",
    action: "Ricevuto",
    date: "Ricevuto in data: "
  }, 
  "sender": {
    headingAction: "Inviato a",
    counterpart: "carrier",
    action: "Inviato",
    date: "Inviato in data: "
  }
}

// https://www.leroymerlin.it/prodotti/utensileria/allestimento-officina-garage/carrelli-portapacchi-carrellini-e-ricambi/?p=1
export const VEHICLE_EQUIPS = {
  "FRIDGE": "frigorifero",
  "TAILIFT": "sponda idraulica",
  "BULKHEAD": "paratia",
  "TRANSPALLET": "transpallet manuale",
  "RAMP": "rampa",
  "LUGGAGE_TROLLEY": "carrello portapacchi",
  "CRATE_TROLLEY": "carrello portacasse",
  "ROTATING_BASE": "base rotante",
  "PLATFORM_TROLLEY": "carrello piattaforma",
  "C_ELEVATORE": "carrello elevatore",
  "C_RETRATTILE": "carrello retrattile",
  "C_COMMISSIONATORE": "carrello commissionatore",
  "C_TRILATERALE": "carrello trilaterale",
  "C_QUADRIDIREZIONALE": "carrello quadridirezionale",
  "C_LATERALE": "carrello laterale",
  "C_FUORISTRADA": "carrello fuoristrada",
  "C_SOLLEVATORE": "carrello sollevatore",
  "C_CONTAINER": "carrello per container",
  "C_CINGOLATO": "carrello cingolato",
  "M_TRANSPALLET": "transpallet manuale",
  "E_TRANSPALLET": "transpallet elettrico",
  "RIBALTA": "ribalta",
  "S_IDRAULICA": "sponda idraulica",
}


export const PREORDER_PROPS_GLOSSARY = {
  carrier: "azienda di trasporto",
  sender: "azienda mittente",
  shipmentType: "tipologia spedizione",
  pickupDateStart: "orario di disponibilità ritiro (da: )",
  pickupDateEnd: "orario di disponibilità ritiro (a: )",
  status: "stato del pre-ordine",
  vehicle: "veicolo selezionato",
  deliveryAreas: "zone di consegna",
  deliveryRegions: "regioni di consegna",
  slot: "quantità basi a terra",
  perishable: "presenza di prodotti deperibili",
  checkpoint: "punto di ritiro",
  trades: "tipologia merce da trasportare",
  files: "allegati al pre-ordine",
  note: "note",
  billingType: "tipo di fatturazione applicata al trasporto",
}