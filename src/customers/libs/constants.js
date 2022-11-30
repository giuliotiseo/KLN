import { reformattedWindows } from "./helpers"

/*
  * Constants
*/
 
export const customerInitialState = {
  name: "",
  relationships: [],
  companyId: "",
  customCheckpoints: [], // [{ warehouseId extId name location contacts windows maxLength tools note }]
  customContacts: [], // [{ contactId, name, email, phone, job }]
  city: "",
  address: "",
  location: {},
  vatNumber: "",
  fiscalCode: "",
  pec: "",
  uniqueCode: "",
  emails: [{ name: "", value: ""}],
  phones: [{ name: "", value: ""}],
  trades: [],
  info: [],
  note: "",
}

export const TRADES_SUGGESTIONS = [
  { id: "alimentari", text: "Alimentari" },
  { id: "grandimagazzini", text: "Grandi magazzini"}
]

export const CUSTOMER_PROPS_GLOSSARY = {
  name: "nome",
  vatNumber: "partita iva",
  email: "email",
  relationships: "relazione con il cliente",
  customCheckpoints: "punti di interesse personalizzati",
  customPec: "indirizzo pec personalizzato",
  customUniqueCode: "codice univoco personalizzato",
  customEmails: "indirizzi di posta (contatti)",
  customPhones: "indirizzi di posta (contatti)",
  customTrades: "settori di appartenenza",
  note: "note",
}

export const starterWindow = {
  start: null,
  end: null,
  days: [],
}

export const windowOppositeTypes = {
  CARICO: "SCARICO",
  SCARICO: "CARICO"
}

export const starterCheckpoint = {
  name:  "",
  location: {},
  contacts: [],
  thirdCompany: null,
  windows: reformattedWindows([{ ...starterWindow, type: "CARICO" }, { ...starterWindow, type: "SCARICO" }]),
  maxLength: 22,
  tools: [],
  trades: [],
  cargoBay: 0,
  containerUnloading: false,
  note: ""
}

export const starterWarehouseCheckpoint = {
  name:  "",
  location: {},
  contacts: [],
  windows: reformattedWindows([{ ...starterWindow, type: "CARICO" }, { ...starterWindow, type: "SCARICO" }]),
  note: ""
}