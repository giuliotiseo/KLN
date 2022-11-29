import { v4 } from "uuid"
import { consoleInfo, generateLegacyLogList, isJSON } from "../../globals/libs/helpers"
import store from '../../app/store';
import { findContactTypeIdsByEmail } from "../../contacts/libs/helpers";
import { validateEmail } from "../../auth/libs/helpers";
import { toast } from "react-toastify";
import { ComplexVehicleType } from "../../vehicles/libs/helpers";
import { days } from "../../contacts/libs/reducers";
import { format } from "date-fns";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { starterWindow } from "./constants";

// Constants, models and types -----------------------------------------------------------------------------------------------
export const WarehouseBuildingModel = {
  "APERTO": "APERTO",
  "CAPANNONE": "CAPANNONE",
  "SEMINTERRATO": "SEMINTERRATO",
  "SILO": "SILO",
  "FRIGO": "FRIGO",
  "AUTOPORTANTE": "AUTOPORTANTE"
}

export const WarehouseSpecialization = {
  "BOBINE": "BOBINE",
  "INFIAMMABILI": "INFIAMMABILI",
  "PROFILATI": "PROFILATI",
  "DEPERIBILI": "DEPERIBILI",
  "PICCOLI": "PICCOLI",
  "GENERALE": "GENERALE",
}

export const WarehouseScope = {
  "DEPOSITO": "DEPOSITO",
  "INTERMEDIO": "INTERMEDIO",
  "DISTRIBUZIONE": "DISTRIBUZIONE",
}

export const WarehouseAutomationLevel = {
  "LOW": "LOW",
  "MEDIUM": "MEDIUM",
  "COMPLETE": "COMPLETE",
}

export const VehicleSize = {
  "LOW12T": "LOW12T",
  "GRT12T": "GRT12T",
}

export const WarehouseStatus = {
  "ACTIVE": "ACTIVE",
  "DISABLED": "DISABLED"
}

export const WindowType = {
  "CARICO": "CARICO",
  "SCARICO": "SCARICO",
  "GENERICO": "GENERICO",
}

export const WarehouseTools = {
  "RIBALTA": "RIBALTA",
  "S_IDRAULICA": "S_IDRAULICA",
  "C_ELEVATORE": "C_ELEVATORE",
  "C_RETRATTILE": "C_RETRATTILE",
  "C_COMMISSIONATORE": "C_COMMISSIONATORE",
  "C_TRILATERALE": "C_TRILATERALE",
  "C_QUADRIDIREZIONALE": "C_QUADRIDIREZIONALE",
  "C_LATERALE": "C_LATERALE",
  "C_FUORISTRADA": "C_FUORISTRADA",
  "C_SOLLEVATORE": "C_SOLLEVATORE",
  "C_CONTAINER": "C_CONTAINER",
  "C_CINGOLATO": "C_CINGOLATO",
  "M_TRANSPALLET": "M_TRANSPALLET",
  "E_TRANSPALLET": "E_TRANSPALLET",
}

export const WAREHOUSE_BUILDING_TYPE = {
  "APERTO": "Magazzino all'aperto",
  "CAPANNONE": "Capannone",
  "SEMINTERRATO": "Seminterrato",
  "SILO": "Silo",
  "FRIGO": "Cella frigorifera",
  "AUTOPORTANTE": "Magazzino autoportante"
}

export const WAREHOUSE_STATUS = {
  ACTIVE: "disponibile",
  DISABLED: "non disponibile"
}

export const WAREHOUSE_SPECIALIZATION = {
  "GENERALE": "Magazzino ad utilizzo generale",
  "DEPERIBILI": "Magazzino per prodotti deperibili",
  "PICCOLI": "Magazzino per prodotti di piccole dimensioni",
  "INFIAMMABILI": "Magazzino per prodotti infiammabili",
  "PROFILATI": "Magazzino per prodotti profilati",
  "BOBINE": "Magazzino bobine",
}

export const WAREHOUSE_AUTOMATION_LEVEL = {
  "LOW": { 
    shortDesc: "Basso livello di automazione",
    longDesc: "Gli operatori stabiliscono le procedure di deposito e prelievo. I sistemi di stoccaggio sono composti da scaffali tradizionali."
  },
  "MEDIUM": { 
    shortDesc: "Livello di automazione medio",
    longDesc: "Presenza di WMS. Alcuni dei sistemi di stoccaggio possono essere automatici ed è possibile vi siano dispositivi a supporto delle attività di picking (picking vocale o pick to light)"
  },
  "COMPLETE": { 
    shortDesc: "Livello di automazione totale",
    longDesc: "Le operazioni sono completamente delegate a sistemi automatici. Lavoro combinato con transloelevatori, trasportatori a nastro o a rulli, miniload, navatte pallet shuttle."
  },
}

export const ALLOWED_VEHICLE = {
  "LOW12T": {
    title: 'Veicoli inferiori alle 12t',
    description: "lunghezza: ~7m;larghezza: ~2,40m;altezza: ~2,35m;carico utile: 2400-5500 kg"
  },
  "GRT12T": {
    title: 'Veicoli superiori alle 12t',
    description: "lunghezza: ~13,60m;larghezza: ~2,40m;altezza: ~2,65m;frigoriferi; con rimorchio;fino a 34 europallet"
  },
}

export const WAREHOUSE_SCOPE = {
  "DEPOSITO": "Deposito",
  "INTERMEDIO": "Magazzino intermedio",
  "DISTRIBUZIONE": "Hub distributivo",
  "SCONOSCIUTO": "Terze parti"
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

export const WINDOW_TYPE_DESCRIPTORS = {
  "CARICO": "Finestra di carico",
  "SCARICO": "Finestra di scarico",
  "GENERICO": "Finestra generica" 
}

// Process data functions -----------------------------------------------------------------------------------------------
export const formatLocationCoords = (coordinates) => {
  if(coordinates?.lat && coordinates?.lng) {
    return [coordinates.lat, coordinates.lng];
  }

  if(coordinates?.[0] && coordinates?.[1]) {
    return [...coordinates];
  }

  return [];
}

export const formatLocationsToWarehouses = (locations) => {
  return locations.reduce((acc, val) => ({
    ...acc,
    [`local_warehouse:${v4()}`]: {
      name: val.address,
      location: {
        ...val,
      }
    }
  }), {});
}

export const reformattedWindows = (windows) => windows.length > 0
  ? windows.reduce((acc, val) => {
    return ({ 
      ...acc, 
      [val?.type || "CARICO"]: acc[val?.type || "CARICO"] 
        ? [...acc[val?.type || "CARICO"], val] 
        : [val]
    })
  }, {})
  : {};

export const starterCheckpoint = {
  name:  "",
  location: {},
  contacts: [],
  windows: reformattedWindows([{ ...starterWindow, type: "CARICO" }, { ...starterWindow, type: "SCARICO" }]),
  maxLength: 1,
  tools: [],
  note: ""
}
  

export const processWarehouseBeforeMutation = async (inputWarehouse) => {
  const { 
    id, tenant, name, type, specialization, scope, maxLength, windows,
    automationLevel, tools, location, note, contactIds, contacts, status
  } = inputWarehouse;

  // Generate logs stack
  const log = await generateLegacyLogList({
    list: inputWarehouse.log,
    action: `Aggiornamento`, 
    subject: `magazzino: ${name} (${location.address})`,
  });

  return ({
    id,
    name: name ? name : location.address,
    searchable: name ? name.toLowerCase() : location.address.toLowerCase(),
    tenant,
    type,
    location: {
      ...location,
      coordinate: formatLocationCoords(location.coordinate)
    },
    status: status,
    windows: Object.keys(windows).reduce((acc,val) => ([...acc, ...windows[val]]), []),
    maxLength,
    contactIds,
    contacts,
    log,
    specialization,
    scope,
    tools,
    automationLevel,
    note
  })
}

// Tracking places -----------------------------------------------------------------------------------------------
export const getTrackingLocation = async (address) => {
  try {
    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    let city = '', region = '', province = '', route = '', street_number = '', postal_code = '', country = '';
    const length = results[0].address_components.length;

    for(let i = 0; i < length; i++) {
      const target = results[0].address_components[i].types[0];
      if(target === 'administrative_area_level_1') region = results[0].address_components[i].long_name;
      if(target === 'administrative_area_level_2') province = results[0].address_components[i].short_name;
      if(target === 'administrative_area_level_3') city = results[0].address_components[i].long_name;
      if(target === 'country') country = results[0].address_components[i].long_name;
      if(target === 'postal_code') postal_code = results[0].address_components[i].long_name;
      if(target === 'route') route = results[0].address_components[i].long_name;
      if(target === 'street_number') street_number = results[0].address_components[i].long_name;
    }

    const formatted_address = [route, street_number, city, province, postal_code, region, country].filter(item => item !== '').join(', ')

    return {
      city,
      region,
      province,
      address: formatted_address,
      place_id:  results[0].place_id,
      coordinate: { lat, lng }
    };
  } catch(error) {
    console.error('Errore!', error);
    return null;
  }
}

// XLS Features -----------------------------------------------------------------------------------------------
// export async function storeXlsDataWarehouses(warehouses, callback) {
//   const checkResult = await checkXlsWarehouseFields(warehouses)
//   if(checkResult) {
//     const dataToSendFromXls = await processXlsWarehousesFields(warehouses);
//     for(let i = 0; i < dataToSendFromXls.length; i++) {
//       await createWarehouse(dataToSendFromXls[i], false);
//     }
//   }

//   callback();
// }

export async function checkXlsWarehouseFields(warehouses) {
  // 0. Check presence of name
  // 1. Check address, civic, city, province, cap, region, state
  // 2. Compare type with allowed types
  // 3. Compare specialization with allowed specialization
  // 4. Compare scope with allowed scope
  // 5. Check if cargobay 1 and 2 are numbers
  // 6. Compare tools with allowed tools
  // 7. Compare automationLevel with allowed automationLevel
  // 8. Check if storekeepers email are in correct email format
  let globalCheck = true;
  console.groupCollapsed('Validity check');

  // 0. Check presence of name
  if(globalCheck) {
    for (let i = 0; i < warehouses.length; i++) {
      if (!warehouses[i].nome) {
        console.error(`Riga ${i + 2} non passa il test: nome magazzino non presente o non valido`);
        globalCheck = false;
        toast.error(`Riga ${i + 2}: nome del magazzino non presente o non valido`);
        break;
      } else {
        globalCheck = true;
        continue;
      }
    }
  
    consoleInfo('Risultato validazione nome magazzino', globalCheck);
  }

  // 1. Check address, civic, city, province, cap, region, state
  if(globalCheck) {
    for (let i = 0; i < warehouses.length; i++) {
      if (!warehouses[i].via || !warehouses[i].civico || !warehouses[i].citta || !warehouses[i].provincia ||  !warehouses[i].cap || !warehouses[i].regione || !warehouses[i].stato) {
        console.error(`Riga ${i + 2} non passa il test: info location non presenti`);
        globalCheck = false;
        toast.error(`Riga ${i + 2}: indirizzo non completo. Controlla le informazioni per via, civico, città, provincia, regione e stato`);
        break;
      } else {
        globalCheck = true;
        continue;
      }
    }
  
    consoleInfo('Risultato validazione indirizzo', globalCheck);
  }

  // 2. Compare type with allowed types
  if(globalCheck) {
    for (let i = 0; i < warehouses.length; i++) {
      if (!Object.keys(WarehouseBuildingModel).includes(warehouses[i].tipo)) {
        console.error(`Riga ${i + 2} non passa il test: formato building type non conforme`);
        globalCheck = false;
        toast.error(`Riga ${i + 2}: formato tipologia struttura non conforme`);
        break;
      } else {
        globalCheck = true;
        continue;
      }
    }
    consoleInfo('Risultato validazione tipologia struttura', globalCheck);
  }

  // 3. Compare specialization with allowed specialization
  if(globalCheck) {
    for (let i = 0; i < warehouses.length; i++) {
      if (!Object.keys(WarehouseSpecialization).includes(warehouses[i].specializzazione)) {
        console.error(`Riga ${i + 2} non passa il test: formato specialization non conforme`);
        globalCheck = false;
        toast.error(`Riga ${i + 2}: specializzazione magazzino non accettata dal sistema`);
        break;
      } else {
        globalCheck = true;
        continue;
      }
    }
    consoleInfo('Risultato validazione specializzazione', globalCheck);
  }

  // 4. Compare scope with allowed scope
  if(globalCheck) {
    for (let i = 0; i < warehouses.length; i++) {
      if (!Object.keys(WarehouseScope).includes(warehouses[i].tipo_utilizzo)) {
        console.error(`Riga ${i + 2} non passa il test: formato tipo_utilizzo non conforme`);
        globalCheck = false;
        toast.error(`Riga ${i + 2}: tipologia di utilizzo del magazzino non accettato dal sistema`);
        break;
      } else {
        globalCheck = true;
        continue;
      }
    }

    consoleInfo('Risultato validazione tipo_utilizzo', globalCheck);
  }

  // 5. Check cargobay values
  if(globalCheck) {
    for (let i = 0; i < warehouses.length; i++) {
      if(warehouses[i].veicoli_abilitati && !warehouses[i].veicoli_abilitati.includes(Object.keys(ComplexVehicleType))) {
        console.error(`Riga ${i + 2} non passa il test: uno o più veicoli non presentano valori conformi alla piattaforma`, Number(warehouses[i].baia_inf_12t));
        globalCheck = false;
        toast.error(`Riga ${i + 2}: uno o più veicoli non presentano valori conformi alla piattaforma.`);
        break;
      } else {
        globalCheck = true;
        if (warehouses[i].massimale_metraggio_transito && isNaN(warehouses[i].baia_inf_12t)) {
          console.error(`Riga ${i + 2} non passa il test: formato massimale_metraggio_transito non conforme`, Number(warehouses[i].baia_inf_12t));
          globalCheck = false;
          toast.error(`Riga ${i + 2}: formato massimale metraggio transito non conforme. Controlla che il valore inserito sia di tipo numerico`);
          break;
        } else {
          globalCheck = true;
          continue;
        }
      }
    }

    consoleInfo('Risultato validazione cargoBay', globalCheck);
  }

  // 6. Compare tools with allowed tools
  if(globalCheck) {
    for(let i = 0; i < warehouses.length; i++) {
      if(warehouses[i]?.mezzi_operativi) {
        const toolsArray = warehouses[i].mezzi_operativi.split(', ');
        for(let j = 0; j < toolsArray.length; j++) {
          if (!Object.keys(WarehouseTools).includes(toolsArray[j])) {
            console.error(`Riga ${i + 2} non passa il test: formato mezzo operativo non conforme`);
            globalCheck = false;
            toast.error(`Riga ${i + 2}: mezzo operativo non accettato dal sistema`);
            break;
          } else {
            globalCheck = true;
            continue;
          }
        }
      } else {
        break;
      }
    }
  }

  // 7. Compare automationLevel with allowed automationLevel
  if(globalCheck) {
    for (let i = 0; i < warehouses.length; i++) {
      if (!Object.keys(WarehouseAutomationLevel).includes(warehouses[i].livello_automazione)) {
        console.error(`Riga ${i + 2} non passa il test: formato livello_automazione non conforme`);
        globalCheck = false;
        toast.error(`Riga ${i + 2}: livello di automazione non accettato dal sistema`);
        break;
      } else {
        globalCheck = true;
        continue;
      }
    }

    consoleInfo('Risultato validazione livello_automazione', globalCheck);
  }

  // 8. Check if storekeepers email are in correct email format
  if(globalCheck) {
    for(let i = 0; i < warehouses.length; i++) {
      if(warehouses[i]?.email_magazzinieri?.length > 0) {
        const emailArray = warehouses[i].email_magazzinieri.split(', ');
        for(let j = 0; j < emailArray.length; j++) {
          if (!validateEmail(emailArray[j])) {
            console.error(`Riga ${i + 2} non passa il test: formato email non conforme`);
            globalCheck = false;
            toast.error(`Riga ${i + 2}: email ${emailArray[j]} non valida`);
            break;
          } else {
            globalCheck = true;
            continue;
          }
        }
      } else {
        break;
      }
    }
  }

  console.groupEnd();

  return globalCheck;
}

export async function processXlsWarehousesFields(warehouses, tenant, inputContacts) {
  const completeWarehouses = warehouses.reduce((acc, val) => {
    let windows = [];
    if(val.finestra_carico_1_giorni_settimana && val.finestra_carico_1_orari) windows.push({
      days: String(val.finestra_carico_1_giorni_settimana).split(',').map(d => parseInt(d)),
      start: new Date(`01/01/1970 ${val.finestra_carico_1_orari.split("-")[0]}`),
      end: new Date(`01/01/1970 ${val.finestra_carico_1_orari.split("-")[1]}`),
      type: "CARICO"
    });

    if(val.finestra_carico_2_giorni_settimana && val.finestra_carico_2_orari) windows.push({
      days: String(val.finestra_carico_2_giorni_settimana).split(',').map(d => parseInt(d)),
      start: new Date(`01/01/1970 ${val.finestra_carico_2_orari.split("-")[0]}`),
      end: new Date(`01/01/1970 ${val.finestra_carico_2_orari.split("-")[1]}`),
      type: "CARICO"
    });

    if(val.finestra_scarico_1_giorni_settimana && val.finestra_scarico_1_orari) windows.push({
      days: String(val.finestra_scarico_1_giorni_settimana).split(',').map(d => parseInt(d)),
      start: new Date(`01/01/1970 ${val.finestra_scarico_1_orari.split("-")[0]}`),
      end: new Date(`01/01/1970 ${val.finestra_scarico_1_orari.split("-")[1]}`),
      type: "SCARICO"
    });
    
    if(val.finestra_scarico_2_giorni_settimana && val.finestra_scarico_2_orari) windows.push({
      days: String(val.finestra_scarico_2_giorni_settimana).split(',').map(d => parseInt(d)),
      start: new Date(`01/01/1970 ${val.finestra_scarico_2_orari.split("-")[0]}`),
      end: new Date(`01/01/1970 ${val.finestra_scarico_2_orari.split("-")[1]}`),
      type: "SCARICO"
    });

    const contactIds = val.email_magazzinieri  
      ? val.email_magazzinieri.includes(',')
        ? findContactTypeIdsByEmail(val.email_magazzinieri.split(',').map(item => item.trim()), inputContacts, "WAREHOUSE")
        : findContactTypeIdsByEmail([val.email_magazzinieri], inputContacts, "WAREHOUSE")
      : [];

    const contacts = contactIds.length > 0 ? contactIds.map(c_id => ({
      contactId: c_id,
      name: inputContacts[c_id]?.name,
      email: inputContacts[c_id]?.email,
      phone: inputContacts[c_id]?.phone
    })) : [];


    return [
      ...acc,
      {
        id: v4(),
        tenant,
        name: val.nome,
        searchable: val.nome.toLowerCase(),
        type: val.tipo,
        status: 'APERTO',
        specialization: val.specializzazione,
        scope: val.tipo_utilizzo,
        maxLength: val.massimale_metraggio_transito.toString(),
        location: {
          region: val.regione,
          province: val.provincia,
          city: val.citta,
          address: `${val.via}, ${val.civico}, ${val.citta}, ${val.provincia}, ${val.cap}, ${val.regione}, ${val.stato}`,
          coordinate: (val.latitudine && val.longitudine) ? [parseFloat(val.latitudine), parseFloat(val.longitudine)] : []
        },
        windows,
        contactIds,
        contacts,
        tools: val.mezzi_operativi 
          ? val.mezzi_operativi.includes(',') 
            ? val.mezzi_operativi.split(", ") 
            : [val.mezzi_operativi] 
          : [], // elenco multiplo
        automationLevel: val.livello_automazione,
        note: val.note,
      }
    ]
  }, []);

  for(let i = 0; i < completeWarehouses.length; i++ ) {    
    completeWarehouses[i].log = await generateLegacyLogList({
      list: [],
      action: `Creazione`, 
      subject: `nuovo magazzino via .xls: ${completeWarehouses[i].name} (${completeWarehouses[i].location.address})`,
    })
  }
  
  return completeWarehouses;
}


export function generateWarehousesDataCell(data) {
  /* const tableHeadings = [
      1 "Nome",
      2 "Indirizzo",
      3 "Tipo struttura",
      4 "Specializzazione",
      5 "Tipo di uso",
      6 "Veicoli abilitati",
      7 "Massimale metraggio transito",
      8 "Mezzi operativi",
      9 "Livello di automazione",
      10 "Magazzinieri", 
      11 "Prima finestra di carico",
      12 "Seconda finestra di carico",
      13 "Prima finestra di scarico",
      14 "Seconda finestra di scarico",
      15 "Note"
    ];
  */
  const state = store.getState();
  const contacts = state.contacts.allContacts.entities;
  
  const formattedData = Object.keys(data).map(data_key => data[data_key]).reduce((acc, val) => {
    let storekeepersString = val.contactIds
      .map(c_id => contacts[c_id])
      .reduce((acc_string, val_string, index) => {
        return (acc_string + `${val_string.name} (${val_string.email})`) + (((index + 1) < val.contactIds.length) ? " | " : "")
      }, "");

    let loadingWindows = val.windows.filter(wind => wind.type === "CARICO");
    let unLoadingWindows = val.windows.filter(wind => wind.type === "SCARICO");

    return [
      ...acc,
      [
        val.name || "",
        val.location?.address || "",
        val.type ? WAREHOUSE_BUILDING_TYPE[val.type] : "",
        val.specialization ? WAREHOUSE_SPECIALIZATION[val.specialization] : "",
        val.scope?.length > 0 ? (val.scope.map(s => WAREHOUSE_SCOPE[s])).join(', ') : "",
        val?.enabledVehicles?.length > 0 ? (val?.enabledVehicles.filter(enabled => Object.keys(ComplexVehicleType).includes(enabled)).join(', ')) : "",
        val?.maxLength || '',
        val.tools?.length > 0 ? (val.tools.map(t => WAREHOUSE_TOOLS[t]).join(', ')) : "",
        val.automationLevel ? WAREHOUSE_AUTOMATION_LEVEL[val.automationLevel].shortDesc : "",
        storekeepersString,
        loadingWindows?.[0] 
          ? `Giorni di apertura: ${loadingWindows[0].days.filter(d => days[parseInt(d) - 1]).map(d => days[parseInt(d) - 1]).join(", ")} dalle ${format(new Date(loadingWindows[0].start), "HH:mm")} alle ${format(new Date(loadingWindows[0].end), "HH:mm")}`
          : "",
        loadingWindows?.[1]
          ? `Giorni di apertura: ${loadingWindows[1].days.filter(d => days[parseInt(d) - 1]).map(d => days[parseInt(d) - 1]).join(", ")} dalle ${format(new Date(loadingWindows[1].start), "HH:mm")} alle ${format(new Date(loadingWindows[1].end), "HH:mm")}`
          : "",
        unLoadingWindows?.[0] 
          ? `Giorni di apertura: ${unLoadingWindows[0].days.filter(d => days[parseInt(d) - 1]).map(d => days[parseInt(d) - 1]).join(", ")} dalle ${format(new Date(unLoadingWindows[0].start), "HH:mm")} alle ${format(new Date(unLoadingWindows[0].end), "HH:mm")}`
          : "",
        unLoadingWindows?.[1]
          ? `Giorni di apertura: ${unLoadingWindows[1].days.filter(d => days[parseInt(d) - 1]).map(d => days[parseInt(d) - 1]).join(", ")} dalle ${format(new Date(unLoadingWindows[1].start), "HH:mm")} alle ${format(new Date(unLoadingWindows[1].end), "HH:mm")}`
          : "",
        val.note ?  isJSON(val.note) ? JSON.parse(val.note).blocks[0].text : val.note : ""
      ]
    ]
  }, []);

  return formattedData;
}