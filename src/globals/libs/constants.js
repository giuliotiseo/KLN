/*
  * Constants
*/
export const DAYS = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"];

export const COMPLEX_VEHICLE_TYPE_DESCRIPTION = {
  "FURGONE": "Furgone",
  "MOTRICE": "Motrice",
  "AUTOARTICOLATO": "Bilico",
  "AUTOTRENO": "Autotreno",
  "GENERICO": "Veicolo generico"
}

export const CUSTOMER_TYPE_DESCRIPTION = {
  "SENDER": "Mittente",
  "CARRIER": "Vettore",
  "RECEIVER": "Destinatario",
}

export const WAREHOUSE_SCOPE = {
  "DEPOSITO": "Deposito",
  "INTERMEDIO": "Magazzino intermedio",
  "DISTRIBUZIONE": "Hub distributivo",
}

export const WAREHOUSE_TOOLS = {
  // "RIBALTA": "Ribalta",
  "S_IDRAULICA": "Sponda idraulica",
  // "C_ELEVATORE": "Carrello elevatore controbilanciato",
  // "C_RETRATTILE": "Carrello retrattile",
  // "C_COMMISSIONATORE": "Carrello commissionatore",
  // "C_TRILATERALE": "Carrello trilaterale",
  // "C_QUADRIDIREZIONALE": "Carrello quadridirezionale",
  // "C_LATERALE": "Carrello laterale",
  // "C_FUORISTRADA": "Carrello fuoristrada",
  // "C_SOLLEVATORE": "Carrello sollevatore",
  // "C_CONTAINER": "Carrello per container",
  // "C_CINGOLATO": "Carrello cingolato",
  "M_TRANSPALLET": "Transpallet manuale",
  "E_TRANSPALLET": "Transpallet elettrico",
}

export const LIMITS_OPTIONS = [10, 20, 100, 300, 500, 800, 1000];

export const windowOppositeTypes = {
  CARICO: "SCARICO",
  SCARICO: "CARICO"
}

export const starterWindow = {
  start: null,
  end: null,
  days: [],
}