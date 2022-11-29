import { digestMessage } from "../../globals/libs/sha256";
import {
  ImArrowDown2,
  ImArrowUp2,
} from "react-icons/im";
import { FaEquals } from "react-icons/fa";
import Spinner from "../../globals/components/layout/Spinner";
import { globalStatusColorsText } from "../../globals/libs/helpers";


// Constants ------------------------------------------------------------------------------------------------------------------------
export const statusOptions = ["NOT_DECLARED", "VERIFIED", "ERROR"];
export const STATUS_DESCRIPTIONS = {
  NOT_DECLARED: "Nessuna dichiarazione",
  VERIFIED: "Operazione verificata",
  ERROR: "Errore"
}


export const systemCompliance = {
  PARI: "COMPLIANT",
  CAUZIONE: "DISPOSABLE",
  FATTURAZIONE: "DISPOSABLE",
  NOLEGGIO: "DISPOSABLE",
  PERDERE: "DISPOSABLE"
}

export const COMPLIANCE_DESCRIPTION = {
  COMPLIANT: "Conformi",
  DISPOSABLE: "Non conformi"
}

export const REQUIRED_PALLET_FIELDS = [
  "id",
  "stamp",
  "carrierId",
  "reversalId",
  "carrierName",
  "customerId",
  "tenantCustomer",
  "customerName",
  "reversalName",
  "createdAt",
  "operationDate",
  "travelId",
  "travelStamp",
  "type",
  "status",
];

export const PALLET_PROPS_TO_SKIP_FROM_LOG = [
  "id",
  "vehicleOperator",
  "carrierOperator",
  "carrierValidator",
  "customerValidator",
  "carrierId",
  "tenantCarrier",
  "customerId",
  "tenantCustomer",
  'carrierValidatorName',
  'customerValidatorName',
  "reversalId",
  "tenantReversal",
]


export const PALLET_PROPS_GLOSSARY = {
  id: "ID movimentazione",
  stamp: "codice movimentazione",
  carrierName: "nome vettore",
  customerName: "nome cliente",
  reversalName: "nome cliente",
  operationDate: "data di esecuzione",
  loadQuantity: "quantità conforme caricata",
  loadNote: "note sulla quantità conforme caricata",
  disposableLoad: "quantità non conforme caricata",
  disposableLoadNote: "note sulla quantità non conforme caricata",
  unloadQuantity: "quantità conforme scaricata",
  unloadNote: "note sulla quantita conforme scaricata",
  disposableUnload: "quantità non conforme scaricata",
  disposableUnloadNote: "note sulla quantità non conforme scaricata",
  reversalQuantity: "quantità stornata",
  reversalNote: "nota allo storno",
  carrierOperatorName: "operatore vettore",
  vehicleLicensePlate: "targa veicolo",
  carrierValidation: "validazione amministrativa vettore",
  carrierValidationMessage: "nota alla validazione amministrativa vettore",
  customerValidation: "validazione amministrativa cliente",
  customerValidatorName: "validatore cliente",
  customerValidationMessage: "nota alla validazione amministrativa cliente",
  voucherImage: "immagine buono pallet",
  files: "allegati alla movimentazione pallet",
}

// Shared components manager ------------------------------------------------------------------------------------------
export const renderPalletResult = {
  wait: {
    long_text: () => `Calcolo in corso`,
    text: () => `Attendi`,
    icon: () => <Spinner className="h-5 w-5 mr-2" />,
    className: "text-gray-500 dark:text-gray-300"
  },
  under: {
    long_text: (result) => `Debito ${Math.abs(result)} EPAL`,
    text: (result) => `${Math.abs(result)} EPAL`,
    icon: () => <ImArrowDown2 className="mr-1" />,
    className: "text-red-500 dark:text-red-300",
  },
  over: {
    long_text: (result) => `Credito ${Math.abs(result)} EPAL`,
    text: (result) => `${Math.abs(result)} EPAL`,
    icon: () => <ImArrowUp2 className="mr-1" />,
    className: "text-teal-500 dark:text-teal-300",
  },
  equal: {
    long_text: (_, totalReversal) => totalReversal === 0 ? `Parità` : `Parità con storno`,
    text: (result, totalReversal) => totalReversal === 0 ? `${Math.abs(result)} EPAL` : `${Math.abs(result)} EPAL (Storno)`,
    icon: () => <FaEquals className="mr-1" />,
    className: "text-cyan-500 dark:text-cyan-400",
  },
}

// Re-shape functions ------------------------------------------------------------------------------------------
const getCompliantAndDisposableValues = (plts = []) => {
  if(!plts || plts?.length <= 0) return {};
  const compliantOrDisposableObject = plts.reduce((acc, val) => {
    const keyObject = systemCompliance[val.system];
    return ({
      ...acc,
      [keyObject]: acc?.[keyObject] 
        ? acc[keyObject] + val.value
        : val.value
    })
  }, {});
  
  return compliantOrDisposableObject;
}

const getCompliantAndDisposableFeatures = (plts = []) => {
  if(!plts || plts?.length <= 0) return {};
  const compliantOrDisposableObject = plts.reduce((acc, val) => {
    const keyObject = systemCompliance[val.system];
    return ({
      ...acc,
      [keyObject]: acc?.[keyObject] 
        ? [...acc[keyObject], val]
        : [val]
    })
  }, {});
  
  return compliantOrDisposableObject;
}

export const getAllLoadData = (loadOperations) => {
  const loadedValues = getCompliantAndDisposableValues(loadOperations);
  const loadedFeatures = getCompliantAndDisposableFeatures(loadOperations);
  return {
    quantity: loadedValues?.COMPLIANT || 0,
    features: loadedFeatures?.COMPLIANT?.length > 0 ? loadedFeatures.COMPLIANT : [],
    disposableQuantity: loadedValues?.DISPOSABLE || 0,
    disposableFeat: loadedFeatures?.DISPOSABLE?.length > 0 ? loadedFeatures.DISPOSABLE : []
  }
}

export const getAllUnloadData = (unloadOperations) => {
  const unloadedValues = getCompliantAndDisposableValues(unloadOperations);
  const unloadedFeatures = getCompliantAndDisposableFeatures(unloadOperations);
  return {
    quantity: unloadedValues?.COMPLIANT || 0,
    features: unloadedFeatures?.COMPLIANT?.length > 0 ? unloadedFeatures?.COMPLIANT : [],
    disposableQuantity: unloadedValues?.DISPOSABLE || 0,
    disposableFeat: unloadedFeatures?.DISPOSABLE?.length > 0 ? unloadedFeatures.DISPOSABLE : [],
  }
}

// Processors -----------------------------------------------------------------------------------------------
export const encodePalletHandlingId = async ({ prefix = "PLT", waypointId, uuid, timestamp }) => {
  const palletHandlingId = `${prefix}_${uuid}_${waypointId}_${timestamp}`;
  const cripted = await digestMessage(palletHandlingId)
  return cripted;
}

export const calculatePalletInfoByCompanies = ({ waypoint, orders }) => {
  const orderDeliveriesIds = waypoint.orders
    .filter(order => order.operation === "DELIVERY")
    .map(order => order.orderId);

  return orderDeliveriesIds.reduce((acc, val) => {
    const keyCompany = orders[val].order.pickupStorageId;
    return ({
      ...acc,
      [keyCompany]: {
        id: orders[val].order.pickupStorageId,
        name: orders[val].order.pickupStorageName,
        tenant: orders[val].order.tenantPickupStorage,
        value: orders[val].order.palletInfo
          .filter(info => info.system === "PARI")
          .reduce((acc, val) => acc + val.value, acc?.[keyCompany]?.value || 0)
      }
    })
  }, {});
}

export const calculateReversal = ({
  companiesPalletInfo,
  unloadQuantity,
  loadQuantity,
}) => {
  // Formula storno cliente: (Pedane scaricate per mittente / totale pedane scaricate) * storno
  const totalReversal = unloadQuantity - loadQuantity;
  let reversal = Object.keys(companiesPalletInfo)
    .map(companyId => ({
      name: companiesPalletInfo[companyId].name,
      id: companyId,
      tenant: companiesPalletInfo[companyId].tenant,
      value: Math.floor((companiesPalletInfo[companyId].value / unloadQuantity) * totalReversal),
      company: {
        name: companiesPalletInfo[companyId].name,
        id: companyId,
        owner: companiesPalletInfo[companyId].tenant,
      }
    }))
    .sort((a,b) => b.value - a.value)

  const surplus = reversal.reduce((acc, val) => acc - val.value, totalReversal);
  if(surplus) {
    let i = 0;
    while (i < surplus) {
      for(let j = 0; j < reversal.length; j++) {
        if(companiesPalletInfo[reversal[j].id].value < reversal[j].value + 1) {
          continue;
        } else {
          reversal[j].value += 1;
          break;
        }
      }

      i++;
    }
  };

  // Formula storno cliente: (Pedane scaricate per mittente / totale pedane scaricate) * storno
  return reversal;
}

// API result normalizer --------------------------------------------------------------------------------------------------------
export const apiPalletCompanyReversalNormalizer = (remoteInput, key = "id") => {
  if(!remoteInput) return {
    entities: {},
    ids: [],
  };

  // I reversal che sono all'interno di remoteInput.company devono essere compressi all'interno di un unico elemento
  const customerObject = remoteInput.company.reduce((acc, val) => ({ ...acc, [val.id]: val }), {});
  const customerReversalIds = remoteInput.company.filter(el => el.id.includes("REV")).map(el => el.id);
  const customerEntitiesIds = remoteInput.company.filter(el => !el.id.includes("REV")).map(el => el.id);
  const reversalObject = remoteInput.reversal.reduce((acc, val) => ({ ...acc, [val.id]: val }), {});
  const reversalIds = remoteInput.reversal.map(el => el.id);

  let entities = customerEntitiesIds?.length > 0
    ? customerEntitiesIds.reduce((acc, val) => ({
      ...acc,
      [val]: {
        ...customerObject[val],
        reversal: customerReversalIds.filter(id => id.includes(val)).map(id => customerObject[id])
      }
    }), {})
    : {}

  entities = { ...entities , ...reversalObject }

  return {
    entities,
    ids: customerEntitiesIds.concat(reversalIds).sort((a,b) => new Date(entities[a].operationDate) - new Date(entities[b].operationDate))
  }
}

// Processors -----------------------------------------------------------------------------------------------
export const aggregatePalletFiles = (files = [], image = null) => {
  return image ? files.concat(image) : files;
}
