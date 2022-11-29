// Constants, models and types -----------------------------------------------------------------------------------------------
export const VehicleType = {
  "FURGONE": "FURGONE",
  "TRATTORE": "TRATTORE",
  "MOTRICE": "MOTRICE",
  "RIMORCHIO": "RIMORCHIO",
  "SEMIRIMORCHIO": "SEMIRIMORCHIO",
}

export const ComplexVehicleType = {
  "AUTOARTICOLATO": "AUTOARTICOLATO",
  "AUTOTRENO": "AUTOTRENO",
  "MOTRICE": "MOTRICE",
  "FURGONE": "FURGONE"
}

export const FuelType = {
  "BENZINA": "BENZINA" ,
  "DIESEL": "DIESEL", 
  "GASOLIO": "GASOLIO", 
  "GPL": "GPL", 
  "NESSUNO": "NESSUNO", 
}

export const BulkheadType = {
  "NESSUNA": "NESSUNA" ,
  "MOBILE": "MOBILE", 
  "FISSA": "FISSA" 
}

export const VehicleAvailability = {
  "DISPONIBILE": "DISPONIBILE",
  "NON_DISPONIBILE": "NON_DISPONIBILE",
  "IN_MARCIA": "IN_MARCIA",
}

export const VehicleStatus = {
  "DISPONIBILE" : "DISPONIBILE",
  "NON_DISPONIBILE": "NON_DISPONIBILE",
  "IN_MARCIA": "IN_MARCIA"
}

export const VEHICLE_TYPE_DESCRIPTION = {
  "TRATTORE": "Trattore stradale",
  "FURGONE": "Furgone",
  "MOTRICE": "Motrice",
  "RIMORCHIO": "Rimorchio",
  "SEMIRIMORCHIO": "Semirimorchio",
}

export const COMPLEX_VEHICLE_TYPE_DESCRIPTION = {
  "FURGONE": "Furgone",
  "MOTRICE": "Motrice",
  "AUTOARTICOLATO": "Bilico",
  "AUTOTRENO": "Autotreno",
  "NONE": "Veicolo generico"
}

export const VEHICLE_STATUS_DESCRIPTION = {
  "DISPONIBILE": "Disponibile",
  "NON_DISPONIBILE": "Non disponibile",
  "IN_MARCIA": "In marcia",
}

export const BULKHEAD_DESCRIPTION = {
  "NESSUNA": "Nessuna paratia" ,
  "MOBILE": "Paratia mobile", 
  "FISSA": "Paratia fissa" 
}

export const VEHICLES_FUELS = {
  "DIESEL": "Diesel",
  "GPL": "Gpl",
  "BENZINA": "Benzina",
  "GASOLIO": "Gasolio",
  "NESSUNO": "Nessuno (veicolo trainato)",
}

export const COMPLEX_VEHICLE_LIMIT = {
  "FURGONE": 10,
  "MOTRICE": 23,
  "AUTOARTICOLATO": 33,
  "AUTOTRENO": 36,
  "NONE": 99,
}

export const COMPLEX_VEHICLE_LONG_DESCRIPTION = {
  "NONE": "Il vettore determinerà il veicolo da inviare sulla base della quantità di basi a terra e sulla tipologia della merce indicata.",
  "FURGONE": "Veicolo leggero motorizzato per trasporto merci che può essere isolato. Per maggiori dettagli sulla normativa, si veda il Codice della Strada (D.Lgs. 30 aprile 1992, n. 285 e successive modifiche) o il sito dell'Albo degli autotrasportatori.",
  "MOTRICE": "Veicolo motorizzato per trasporto merci che può essere isolato (e quindi detto anche motrice). Nel linguaggio corrente americano si dice truck, mentre per gli inglesi è un lorry o motor-lorry. Per maggiori dettagli sulla normativa, si veda il Codice della Strada (D.Lgs. 30 aprile 1992, n. 285 e successive modifiche) o il sito dell'Albo degli autotrasportatori.",
  "AUTOARTICOLATO": "Veicolo commerciale composto da trattore e semirimorchio, collegati fra loro dalla ralla, che ne permette lo snodo. In Italia (e molti paesi europei) le dimensioni massime consentite sono: lunghezza 16,50 m; larghezza 2,55 m (2,60 se frigorifero o comunque a temperatura controllata; 2.50 con la vecchia normativa); altezza 4 m; peso 40 t se a 4 assi o 44 t se a 5 i più assi. Il carico più tipico è 33 pallet da 80x120 cm ovvero circa 83 metri cubi. Per mezzi destinati specificamente alla merce voluminosa può arrivare a 100 mc. Per maggiori dettagli sulla normativa, si veda il Codice della Strada (D.Lgs. 30 aprile 1992, n. 285 e successive modifiche) o il sito dell'Albo degli autotrasportatori.",
  "AUTOTRENO": "Autocarro con rimorchio destinato al trasporto di merci. In Italia (e molti paesi europei) le dimensioni massime consentite sono: lunghezza 18,75 m; larghezza 2,55 m (2,60 se frigorifero o comunque a temperatura controllata; 2.50 con la vecchia normativa); altezza totale 4 m; peso 40 t se a 4 assi o 44 t se a 5 o più assi. Il carico più tipico è 36 pallet da 80x120 cm ovvero 90 metri cubi. Per mezzi destinati specificamente alla merce voluminosa può arrivare a 120 mc e addirittura a 140 se dotato di timone variabile. Per maggiori dettagli sulla normativa, si veda il Codice della Strada (D.Lgs. 30 aprile 1992, n. 285 e successive modifiche) o sito dell'Albo degli autotrasportatori."
}

export const AXLES = [ "1 asse","2 assi","3 assi", "4 assi", "5 assi"];

export const colorsBackground = {
  "DISPONIBILE":  "bg-emerald-500 dark:bg-emerald-100 text-light-300 dark:text-dark-300",
  "NON_DISPONIBILE": "bg-danger-200 dark:bg-danger-300 text-light-300 dark:text-dark-300",
  "IN_MARCIA": "bg-amber-400 dark:bg-amber-200 text-light-300 dark:text-dark-300",
}

// Process data functions -----------------------------------------------------------------------------------------------
// https://www.carpedia.it/scheda-legale/classificazione-internazionale-dei-veicoli-5879/
// export const VEHICLES_CATEGORIES = {
//   "N": {
//     description: "Veicoli a motore progettati e costruiti per il trasporto di merci ed aventi almeno quattro ruote",
//     additionalInfo: "Nel caso di un veicolo destinato a trainare un semirimorchio o un rimorchio ad asse centrale, la massa da considerare ai fini della classificazione del veicolo è quella del veicolo trattore in ordine di marcia, cui va aggiunta la massa corrispondente al carico verticale statico massimo trasferito dal semirimorchio o dal rimorchio ad asse centrale al veicolo trattore e, se del caso, la massa massima del carico del veicolo trattore stesso.",
//     types: {
//       "Caregoria N1": { 
//         id: "N1",
//         text: "Veicoli progettati e costruiti per il trasporto di merci, aventi massa massima non superiore a 3,5 t." 
//       },
//       "Categoria N2": { 
//         id: "N2",
//         text: "Veicoli progettati e costruiti per il trasporto di merci, aventi massa massima superiore a 3,5 t ma non superiore a 12 t." 
//       },
//       "Categoria N3": {
//         id: "N3",
//         text: "Veicoli progettati e costruiti per il trasporto di merci, aventi massa massima superiore a 12 t." 
//       }
//     } 
//   },
//   "O": {
//     description: "Rimorchi (compresi i semirimorchi)",
//     additionalInfo: "Nel caso di un semirimorchio o di un rimorchio ad asse centrale, la massa massima da considerare ai fini della classificazione del rimorchio corrisponde al carico verticale statico e trasmesso al suolo dall’asse o dagli assi del semirimorchio o del rimorchio ad asse centrale agganciati, con carico massimo, al veicolo trattore.",
//     types: {
//       "Categoria O1": {
//         id: "O1",
//         text: "Rimorchi con una massa massima non superiore a 0,75 t."
//       },
//       "Categoria O2": {
//         id: "O2",
//         text: "Rimorchi con una massa massima superiore a 0,75 t ma non superiore a 3,5 t."
//       },
//       "Categoria O3": {
//         id: "O3",
//         text: "Rimorchi con una massa massima superiore a 3,5 t ma non superiore a 10 t."
//       },
//       "Categoria O4": {
//         id: "O4",
//         text: "Rimorchi con una massa massima superiore a 10 t."
//       },
//     }
//   },
//   "T": {
//     description: "Trattori a ruote",
//     additionalInfo: "Nel caso di un semirimorchio o di un rimorchio ad asse centrale, la massa massima da considerare ai fini della classificazione del rimorchio corrisponde al carico verticale statico e trasmesso al suolo dall’asse o dagli assi del semirimorchio o del rimorchio ad asse centrale agganciati, con carico massimo, al veicolo trattore.",
//     types: {
//       "Leggeri": {
//         id: "LOW",
//         text: "Massa inferiore o uguale alle 3,5 tonnellate,"
//       },
//       "Pesanti": {
//         id: "HIGH",
//         text: "Massa superiore alle 3,5 tonnellate"
//       }
//     }
//   },
// }

// export const ALLOWED_VEHICLE = {
//   2: {
//     title: 'Veicolo classe B',
//     description: "Motocarri, motofurgoni, autocarri a 2 assi con altezza > 1,30m in corrispondenza del primo asse"
//   },
//   3: {
//     title: 'Veicolo classe 3',
//     description: "Autovetture con carrello ad un asse oppure autocarri e autoarticolati a 3 assi."
//   },
//   4: {
//     title: 'Veicolo classe 4',
//     description: "Autovetture con carrello a due assi oppure autocarri, autoarticolati e autotreni a 4 assi"
//   },
//   5: {
//     title: 'Veicolo classe 5',
//     description: "Autovetture con carrello a due assi oppure autocarri, autoarticolati e autotreni a 4 assi"
//   }
// }

