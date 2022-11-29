import { API, graphqlOperation } from 'aws-amplify';
// Helpers
import { toast } from "react-toastify";
import { formatLocationCoords, processXlsWarehousesFields, WarehouseAutomationLevel, WarehouseBuildingModel, WarehouseScope, WarehouseSpecialization, WarehouseTools, WAREHOUSE_AUTOMATION_LEVEL, WAREHOUSE_BUILDING_TYPE, WAREHOUSE_SCOPE, WAREHOUSE_SPECIALIZATION, WAREHOUSE_TOOLS } from "../libs/helpers";
// Graphql
import { CREATE_WAREHOUSE } from './graphql/mutations';
// Store manager
import { formatWindowsToDynamoDb, generateLegacyLogList } from '../../globals/libs/helpers';
import { validateEmail } from '../../auth/libs/helpers';
import { isValid } from 'date-fns';
import { ComplexVehicleType } from '../../vehicles/libs/helpers';
import { v4 } from 'uuid';

export async function createWarehouse(inputWarehouse, displayToast = true, validityCheck = true) {
  const { 
    tenant, name, type, specialization, scope, maxLength, windows,
    automationLevel, tools, location, note, contactIds, contacts
  } = inputWarehouse;

  // Validate all data fields
  if(validityCheck) {
    try {
      validateWarehouseCreation(inputWarehouse);
    } catch(err) {
      console.error(err);
      throw new Error("Validation failed (create.js): revoke warehouse creation");
    }
  }

  console.log('I contatti...', contacts);

  // Todo: Controlli e validazione
  const id = v4();
  let dataToSend = {
    id,
    extId: id,
    name: name ? name : location.address,
    searchable: name ? name.toLowerCase() : location.address.toLowerCase(),
    tenant,
    type,
    location: {
      ...location,
      coordinate: location?.coordinate ? formatLocationCoords(location.coordinate) : null
    },
    windows: formatWindowsToDynamoDb(windows),
    status: "ACTIVE",
    maxLength,
    contactIds,
    contacts,
    specialization,
    scope,
    tools,
    automationLevel,
    note
  }

  // Generate logs stack
  dataToSend.log = await generateLegacyLogList({
    list: [],
    action: `Creazione`, 
    subject: `nuovo magazzino: ${name} (${location.address})`,
  }); 

  // Save warehouse entry inside ddb
  try {
    const res = await API.graphql(graphqlOperation(CREATE_WAREHOUSE, { input: dataToSend }));
    (displayToast && res?.data?.createWarehouse) && toast.success(`${res?.data?.createWarehouse.name} aggiunto alla lista magazzini`);
    return res?.data?.createWarehouse;
  } catch (err) {
    toast.error('Non è stato possibile creare il magazzino');
    console.error('[E] Error creating warehouse:', err);
    throw new Error("Mutation failed (create.js): revoke warehouse creation");
  }
}

export async function importWarehouses(warehouses, contacts, tenant) {
  try {
    validateWarehousesImport(warehouses);
  } catch(err) {
    console.error(err);
    throw new Error("Validation failed (create.js): revoke warehouses import");
  }

  let xlsWarehouses = [];

  const dataToSendFromXls = await processXlsWarehousesFields(warehouses, tenant, contacts);
  for(let i = 0; i < dataToSendFromXls.length; i++) {
    if(xlsWarehouses !== null) {
      try {
        const xlsWarehouse = await createWarehouse(dataToSendFromXls[i], false, false);
        xlsWarehouses.push(xlsWarehouse);
      } catch(err) {
        console.error(err);
        throw new Error("Error during import creation");
      }
    }
  }

  return xlsWarehouses.reduce((acc, val) => ({ ...acc, [val.id]: { ...val }}), {});  
}


const validateWarehouseCreation = warehouse => {
  // 1. Address fields
  // 2. Name length (lunghezza max 30)
  // 3. Allowed building type
  // 4. Allowed specialization
  // 5. Cargo bay values: (Max length, Enabled Vehicles)
  // 6. Allowed warehouse scopes
  // 7. Allowed automation level
  // 8. Allowed tools
  // 9. Allowed days and times

  console.groupCollapsed('Validity check');
  console.log('Analisi:', warehouse);


  // 1. Address fields
  if(!warehouse?.location?.address) {
    toast.error(`Errore: checkpoint non presente`);
    throw new Error("Invalid address");
  }

  if(!warehouse.location.address) {
    toast.error(`Errore: indirizzo non presente`);
    throw new Error("Invalid address");
  }
  
  // if(!warehouse.location.city) {
  //   toast.error(`Errore: città non presente`);
  //   console.error('Città non valida - controlla i dati', warehouse.location);
  //   throw new Error("Invalid city");
  // }

  
  // if(!warehouse.location.region) {
  //   toast.error(`Errore: Regione non presente`);
  //   console.error('Regione non valida - controlla i dati', warehouse.location);
  //   throw new Error('Invalid regione');
  // }
  
  // if(!warehouse.location.province) {
  //   toast.error(`Errore: Provincia non presente`);
  //   console.error('Provincia non valida - controlla i dati', warehouse.location);
  //   throw new Error('Invalid province');
  // }


  // 2. Name length (lunghezza max 30)
  if(warehouse.name.length > 30) {
    toast.error(`Errore: nome magazzino troppo lungo ${warehouse.name.length}/30`);
    console.error(`Lunghezza massima nome raggiunta ${warehouse.name.length}`, warehouse.name);
    throw new Error(`Max length name exceeded: ${warehouse.name.length}/30`); 
  }

  // 3. Allowed building type
  if(warehouse.type) {
    if(!Object.keys(WAREHOUSE_BUILDING_TYPE).includes(warehouse.type)) {
      toast.error(`Errore: tipologia struttura non ammessa`);
      console.error(`Tipologia struttura non valida`, warehouse.type);
      throw new Error(`Invalid building type`); 
    }
  }

  // 4. Allowed specialization
  if(warehouse.specialization) {
    if(!Object.keys(WAREHOUSE_SPECIALIZATION).includes(warehouse.specialization)) {
      toast.error(`Errore: specializzazione magazzino non ammessa`);
      console.error(`Specializzazione non valida`, warehouse.specialization);
      throw new Error(`Invalid specialization`); 
    }
  }

  // 5. Max length
  if(typeof warehouse.maxLength !== "number" && parseFloat(warehouse.maxLength) < 0) {
    toast.error(`Errore: valore specificato per il massimale metraggio transito non valido: ${warehouse.maxLength}`);
    throw new Error(`Invalid maxLength value ${warehouse.maxLength}`); 
  }

  // 5. Enabled Vehicles
  // for(let i = 0; i < warehouse.enabledVehicles.length; i++) {
  //   if(warehouse.enabledVehicles[i] !== "NONE" && !Object.keys(ComplexVehicleType).includes(warehouse.enabledVehicles[i])) {
  //     toast.error(`Errore: veicolo non valido ${warehouse.enabledVehicles[i]}`);
  //     throw new Error(`Invalid enabledVehicles value ${warehouse.enabledVehicles[i]}`); 
  //   }
  // }

  // 6. Allowed warehouse scopes
  if(warehouse.scope?.length > 0) {
    warehouse.scope.forEach(s => {
      if(!Object.keys(WAREHOUSE_SCOPE).includes(s)) {
        toast.error(`Errore: funzione del magazzino non ammessa (${s})`);
        console.error(`Scope non valido`, s);
        throw new Error(`Invalid scope (${s})`); 
      }
    })
  }

  // 7. Allowed automation level
  if(warehouse.automationLevel) {
    if(!Object.keys(WAREHOUSE_AUTOMATION_LEVEL).includes(warehouse.automationLevel)) {
      toast.error(`Errore: livello di automazione del magazzino non ammesso`);
      console.error(`Liv. automazione non valido`, warehouse.automationLevel);
      throw new Error(`Invalid automation level`); 
    }
  }

  // 8. Allowed tools
  if(warehouse.tools?.length > 0) {
    warehouse.tools.forEach(tool => {
      if(!Object.keys(WAREHOUSE_TOOLS).includes(tool)) {
        toast.error(`Errore: il mezzo operativo ${tool} che stai cercando di registrare non è valido`);
        console.error(`Tools non validi`, tool);
        throw new Error(`Invalid tools: ${tool}`); 
      }
    })
  }

  // 9. Allowed days and times
  if(Object.keys(warehouse?.windows)?.length > 0) {
    const mergedWindows = Object.keys(warehouse.windows).reduce((acc,val) => ([...acc, ...warehouse.windows[val]]), []);
    for(let i = 0; i < mergedWindows.length; i++) {
      const windows_days = mergedWindows[i].days;
      if(windows_days.length > 0) {
        for(let j = 0; j < windows_days.length; j++) {
          if((!Number(windows_days[j]) 
            || typeof Number(windows_days[j]) !== "number"
            || (Number(windows_days[j]) < 1 || Number(windows_days[j]) > 7)
          )) {
            toast.error(`Errore: i giorni indicati non sono validi`);
            console.error(`Giorni non validi`,windows_days);
            throw new Error(`Invalid days: ${windows_days}`); 
          }
        }
      }

      if(mergedWindows?.[i]?.start) {
        if(!isValid(mergedWindows[i].start)) {
          toast.error(`Errore: l'orario di inizio della finestra ${i + 1} non è valido`);
          console.error(`Orario non valido`, mergedWindows[i].start);
          throw new Error(`Invalid start: ${mergedWindows[i].start}`); 
        }
      }

      if(mergedWindows?.[i]?.end) {
        if(!isValid(mergedWindows[i].end)) {
          toast.error(`Errore: l'orario di fine della finestra ${i + 1} non è valido`);
          console.error(`Orario non valido`, mergedWindows[i].end);
          throw new Error(`Invalid end: ${mergedWindows[i].end}`); 
        }
      }
    }
  }

  console.groupEnd();
}

const validateWarehousesImport = warehouses => {
  // 0. Check presence of name
  // 1. Check address, civic, city, province, cap, region, state
  // 2. Compare type with allowed types
  // 3. Compare specialization with allowed specialization
  // 4. Compare scope with allowed scope
  // 5. Check if cargobay 1 and 2 are numbers
  // 6. Compare tools with allowed tools
  // 7. Compare automationLevel with allowed automationLevel
  // 8. Check if storekeepers email are in correct email format
  // 9. Check if windows values (days) are in correct format
  // 10. Check if windows values (times) are in correct format

  console.groupCollapsed('Validity check');
  console.log('Analisi:', warehouses);

  // 0. Check presence of name
  for (let i = 0; i < warehouses.length; i++) {
    if (!warehouses[i].nome) {
      console.error(`Riga ${i + 2} non passa il test: nome magazzino non presente o non valido`);
      toast.error(`Riga ${i + 2}: nome del magazzino non presente o non valido`);
      throw new Error("Invalid warehouse name");
    } else continue; // ->
  }

  // 1. Check address, civic, city, province, cap, region, state
  for (let i = 0; i < warehouses.length; i++) {
    if (!warehouses[i].via || !warehouses[i].civico || !warehouses[i].citta || !warehouses[i].provincia ||  !warehouses[i].cap || !warehouses[i].regione || !warehouses[i].stato) {
      console.error(`Riga ${i + 2} non passa il test: info location non presenti`);
      toast.error(`Riga ${i + 2}: indirizzo non completo. Controlla le informazioni per via, civico, città, provincia, regione e stato`);
      throw new Error("Incomplete location info");
    } else continue; // ->
  }

  // 2. Compare type with allowed types
  for (let i = 0; i < warehouses.length; i++) {
    if (!Object.keys(WarehouseBuildingModel).includes(warehouses[i].tipo)) {
      console.error(`Riga ${i + 2} non passa il test: formato building type non conforme`);
      toast.error(`Riga ${i + 2}: formato tipologia struttura non conforme`);
      throw new Error("Invalid building type value");
    } else continue; // ->
  }

  // 3. Compare specialization with allowed specialization
  for (let i = 0; i < warehouses.length; i++) {
    if (!Object.keys(WarehouseSpecialization).includes(warehouses[i].specializzazione)) {
      console.error(`Riga ${i + 2} non passa il test: formato specialization non conforme`);
      toast.error(`Riga ${i + 2}: specializzazione magazzino non accettata dal sistema`);
      throw new Error("Invalid specialization");
    } else continue; // ->
  }

  // 4. Compare scope with allowed scope
  for (let i = 0; i < warehouses.length; i++) {
    if (!Object.keys(WarehouseScope).includes(warehouses[i].tipo_utilizzo)) {
      console.error(`Riga ${i + 2} non passa il test: formato tipo_utilizzo non conforme`);
      toast.error(`Riga ${i + 2}: tipologia di utilizzo del magazzino non accettato dal sistema`);
      throw new Error("Invalid scope");
    } else continue; // ->
  }

  // 5. Check if cargobay values are correct
  for (let i = 0; i < warehouses.length; i++) {
    let vehicles = warehouses[i].veicoli_abilitati ? warehouses[i].veicoli_abilitati.split(", ") : [];
    if(vehicles?.length > 0) {
      for(let j = 0; j < vehicles.length; j++) {
        if(!Object.keys(ComplexVehicleType).includes(vehicles[i])) {
          console.error(`Riga ${i + 2} non passa il test: uno o più veicoli non presentano valori conformi alla piattaforma`, warehouses[i].veicoli_abilitati && !warehouses[i].veicoli_abilitati);
          toast.error(`Riga ${i + 2}: uno o più veicoli non presentano valori conformi alla piattaforma.`);
          throw new Error("Invalid value for veicoli_abilitati");
        } else continue; // ->
      }
    } else {
      if (warehouses[i].massimale_metraggio_transito && isNaN(warehouses[i].massimale_metraggio_transito)) {
        console.error(`Riga ${i + 2} non passa il test: formato massimale_metraggio_transito non conforme`, Number(warehouses[i].massimale_metraggio_transito));
        toast.error(`Riga ${i + 2}: formato massimale metraggio transito non conforme. Controlla che il valore inserito sia di tipo numerico`);
        throw new Error("Invalid value for massimale_metraggio_transito");;
      } else continue; // ->
    }
  }

  // 6. Compare tools with allowed tools
  for(let i = 0; i < warehouses.length; i++) {
    if(warehouses[i]?.mezzi_operativi) {
      const toolsArray = warehouses[i].mezzi_operativi.split(', ');
      for(let j = 0; j < toolsArray.length; j++) {
        if (!Object.keys(WarehouseTools).includes(toolsArray[j])) {
          console.error(`Riga ${i + 2} non passa il test: formato mezzo operativo non conforme`);
          toast.error(`Riga ${i + 2}: mezzo operativo non accettato dal sistema`);
          throw new Error("Invalid tool format");
        } else continue; // ->
      }
    }
  }

  // 7. Compare automationLevel with allowed automationLevel
  for (let i = 0; i < warehouses.length; i++) {
    if (!Object.keys(WarehouseAutomationLevel).includes(warehouses[i].livello_automazione)) {
      console.error(`Riga ${i + 2} non passa il test: formato livello_automazione non conforme`);
      toast.error(`Riga ${i + 2}: livello di automazione non accettato dal sistema`);
      throw new Error("Invalid automation level");
    } else continue; // ->
  }

  // 8. Check if storekeepers email are in correct email format
  for(let i = 0; i < warehouses.length; i++) {
    if(warehouses[i]?.email_magazzinieri?.length > 0) {
      const emailArray = warehouses[i].email_magazzinieri.split(', ');
      for(let j = 0; j < emailArray.length; j++) {
        if (!validateEmail(emailArray[j])) {
          console.error(`Riga ${i + 2} non passa il test: formato email non conforme`);
          toast.error(`Riga ${i + 2}: email ${emailArray[j]} non valida`);
          throw new Error("Invalid email format");
        } else continue; // ->
      }
    }
  }

  // 9. Check if windows are in correct format (days)
  /*
    finestra_carico_1_giorni_settimana
    finestra_carico_2_giorni_settimana
    finestra_scarico_1_giorni_settimana
    finestra_scarico_2_giorni_settimana
  */

  for(let i = 0; i < warehouses.length; i++) {
    const finestra_carico_1_giorni_settimana = warehouses[i].finestra_carico_1_giorni_settimana
      ? warehouses[i].finestra_carico_1_giorni_settimana.includes(",")
        ? warehouses[i].finestra_carico_1_giorni_settimana.split(",")
        : [warehouses[i].finestra_carico_1_giorni_settimana]
      : [];

    const finestra_carico_2_giorni_settimana = warehouses[i].finestra_carico_2_giorni_settimana
      ? warehouses[i].finestra_carico_2_giorni_settimana.includes(",")
        ? warehouses[i].finestra_carico_2_giorni_settimana.split(",")
        : [warehouses[i].finestra_carico_2_giorni_settimana]
      : [];

    const finestra_scarico_1_giorni_settimana = warehouses[i].finestra_scarico_1_giorni_settimana
      ? warehouses[i].finestra_scarico_1_giorni_settimana.includes(",")
        ? warehouses[i].finestra_scarico_1_giorni_settimana.split(",")
        : [warehouses[i].finestra_scarico_1_giorni_settimana]
      : [];

    const finestra_scarico_2_giorni_settimana = warehouses[i].finestra_scarico_2_giorni_settimana
      ? warehouses[i].finestra_scarico_2_giorni_settimana.includes(",")
        ? warehouses[i].finestra_scarico_2_giorni_settimana.split(",")
        : [warehouses[i].finestra_scarico_2_giorni_settimana]
      : [];


    // Loop validations
    for(let j = 0; j < finestra_carico_1_giorni_settimana.length; j++) {
      if (!Number(finestra_carico_1_giorni_settimana[j]) || isNaN(Number(finestra_carico_1_giorni_settimana[j]))) {
        console.error(`Riga ${i + 2} non passa il test: finestra_carico_1_giorni_settimana non conforme`);
        toast.error(`Riga ${i + 2}: finestra di carico 1 presenta giorni scritti in un formato non valido. Accertati di scrivere i giorni in formato numerico, dove il Lunedì corrisponde al valore 1 e la Domenica al valore 7`);
        throw new Error("Invalid finestra_carico_1_giorni_settimana format");
      }
    }

    for(let j = 0; j < finestra_carico_2_giorni_settimana.length; j++) {
      if (!Number(finestra_carico_2_giorni_settimana[j]) || isNaN(Number(finestra_carico_2_giorni_settimana[j]))) {
        console.error(`Riga ${i + 2} non passa il test: finestra_carico_2_giorni_settimana non conforme`);
        toast.error(`Riga ${i + 2}: finestra di carico 2 presenta giorni scritti in un formato non valido. Accertati di scrivere i giorni in formato numerico, dove il Lunedì corrisponde al valore 1 e la Domenica al valore 7`);
        throw new Error("Invalid finestra_carico_2_giorni_settimana format");
      }
    }

    for(let j = 0; j < finestra_scarico_1_giorni_settimana.length; j++) {
      if (!Number(finestra_scarico_1_giorni_settimana[j]) || isNaN(Number(finestra_scarico_1_giorni_settimana[j]))) {
        console.error(`Riga ${i + 2} non passa il test: finestra_scarico_1_giorni_settimana non conforme`);
        toast.error(`Riga ${i + 2}: finestra di scarico 1 presenta giorni scritti in un formato non valido. Accertati di scrivere i giorni in formato numerico, dove il Lunedì corrisponde al valore 1 e la Domenica al valore 7`);
        throw new Error("Invalid finestra_scarico_1_giorni_settimana format");
      }
    }

    for(let j = 0; j < finestra_scarico_2_giorni_settimana.length; j++) {
      if (!Number(finestra_scarico_2_giorni_settimana[j]) || isNaN(Number(finestra_scarico_2_giorni_settimana[j]))) {
        console.error(`Riga ${i + 2} non passa il test: finestra_scarico_2_giorni_settimana non conforme`);
        toast.error(`Riga ${i + 2}: finestra di scarico 2 presenta giorni scritti in un formato non valido. Accertati di scrivere i giorni in formato numerico, dove il Lunedì corrisponde al valore 1 e la Domenica al valore 7`);
        throw new Error("Invalid finestra_scarico_2_giorni_settimana format");
      }
    }
  }

  // 10. Check if windows are in correct format (times)
  /*
    finestra_carico_1_orari
    finestra_carico_2_orari
    finestra_scarico_1_orari
    finestra_scarico_2_orari
  */

  for(let i = 0; i < warehouses.length; i++) {
    const timeRegEx = /^[0-9]{2}\:[0-9]{2}\-[0-9]{2}\:[0-9]{2}?$/;
    
    if(warehouses[i].finestra_carico_1_orari) {
      if(!timeRegEx.test(warehouses[i].finestra_carico_1_orari)) {
        console.error(`Riga ${i + 2} non passa il test: finestra_carico_1_orari non conforme`, warehouses[i].finestra_carico_1_orari);
        toast.error(`Riga ${i + 2}: finestra di carico 1 presenta un orario non conforme. Accertati di scrivere il periodo temporale di apertura del magazzino nel formato hh:mm-hh:mm.`);
        throw new Error("Invalid finestra_carico_1_orari format");
      }
    }
    
    if(warehouses[i].finestra_carico_2_orari) {
      if(!timeRegEx.test(warehouses[i].finestra_carico_2_orari)) {
        console.error(`Riga ${i + 2} non passa il test: finestra_carico_2_orari non conforme`, warehouses[i].finestra_carico_2_orari);
        toast.error(`Riga ${i + 2}: finestra di carico 2 presenta un orario non conforme. Accertati di scrivere il periodo temporale di apertura del magazzino nel formato hh:mm-hh:mm.`);
        throw new Error("Invalid finestra_carico_2_orari format");
      }
    }
    
    if(warehouses[i].finestra_scarico_1_orari) {
      if(!timeRegEx.test(warehouses[i].finestra_scarico_1_orari)) {
        console.error(`Riga ${i + 2} non passa il test: finestra_scarico_1_orari non conforme`, warehouses[i].finestra_scarico_1_orari);
        toast.error(`Riga ${i + 2}: finestra di scarico 1 presenta un orario non conforme. Accertati di scrivere il periodo temporale di apertura del magazzino nel formato hh:mm-hh:mm.`);
        throw new Error("Invalid finestra_scarico_1_orari format");
      }
    }

    if(warehouses[i].finestra_scarico_2_orari) {
      if(!timeRegEx.test(warehouses[i].finestra_scarico_2_orari)) {
        console.error(`Riga ${i + 2} non passa il test: finestra_scarico_2_orari non conforme`, warehouses[i].finestra_scarico_2_orari);
        toast.error(`Riga ${i + 2}: finestra di scarico 2 presenta un orario non conforme. Accertati di scrivere il periodo temporale di apertura del magazzino nel formato hh:mm-hh:mm.`);
        throw new Error("Invalid finestra_scarico_2_orari format");
      }
    }
  }

  console.groupEnd();
}