import { ImageComponent } from "../components/dataDisplay/ImageComponent"
import sud_image from '../assets/sud-regions.svg';
import nordOvest_image from '../assets/nord-ovest-regions.svg';
import nordEst_image from '../assets/nord-est-regions.svg';
import centro_image from '../assets/centro-regions.svg';
import isole_image from '../assets/isole-regions.svg';

// Global models, constants -----------------------------------------------------------------------------------------------
export const OrderTrades = {
  "CONGELATO": "CONGELATO",
  "FRESCO": "FRESCO",
  "SECCO": "SECCO",
}

export const ShipmentType = {
  "DIRETTO": "DIRETTO",
  "GROUPAGE": "GROUPAGE"
}


// Descriptors -----------------------------------------------------------------------------------------------
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

export const SystemInterchange = {
  PARI: "Scambio alla pari",
  CAUZIONE: "Sistema cauzionale",
  FATTURAZIONE: "Fatturazione pallet",
  NOLEGGIO: "Noleggio pallet",
  PERDERE: "Quantità a perdere"
}

export const DELIVERY_AREAS_DESCRIPTION = {
  "NORD-OVEST": {
    description: "Nord-Ovest",
    image: () => <ImageComponent src={nordOvest_image} />
  },
  "NORD-EST": {
    description: "Nord-Est",
    image: () => <ImageComponent src={nordEst_image} />
  },
  "CENTRO": {
    description: "Centro Italia",
    image: () => <ImageComponent src={centro_image} />
  },
  "SUD": {
    description: "Sud Italia",
    image: () => <ImageComponent src={sud_image} />
  },
  "ISOLE": {
    description: "Isole",
    image: () => <ImageComponent src={isole_image} />
  },
}

export const TRAVEL_TYPE_DESCRIPTION = {
  PICKUP: "Ritiro",
  DELIVERY: "Consegna",
  MIXED: "Misto",
}
