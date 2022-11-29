export const starterWindow = {
  start: null,
  end: null,
  days: [],
}

export const days = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"];

export const windowOppositeTypes = {
  CARICO: "SCARICO",
  SCARICO: "CARICO"
}

export const WAREHOUSE_PROPS_GLOSSARY = {
  name: "nome",
  status: "stato",
  location: "posizione",
  windows: "finestre di operatività",
  contacts: "referenti",
  specialization: "utilizzo del magazzino",
  scope: "tipologia di magazzino",
  maxLength: "massima metraggio transito",
  tools: "asset richiesti al vettore",
  automationLevel: "comparto tecnologico",
  type: "tipologia di struttura",
  warehouseLinkId: "relazione con magazzino di terze parti",
  note: "note"
}