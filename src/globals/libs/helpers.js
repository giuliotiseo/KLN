import awsConfig from '../../aws-exports';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import * as XLSX from 'xlsx';
import { addDays, format, formatDistance, getHours, getMinutes, isWithinInterval, parseISO } from 'date-fns'
import { it } from 'date-fns/locale'
// Helpers dependencies
import { generateContactsDataCell } from '../../contacts/libs/helpers';
import { generateWarehousesDataCell } from '../../warehouses/libs/helpers';
import { saveAs } from 'file-saver';
// Feedback
import { toast } from 'react-toastify';
import { v4 } from 'uuid';
import { days } from '../../contacts/libs/reducers';

// General models and constants -----------------------------------------------------------------------------------------------
export const limitsQueryOptions = [10, 20, 100, 300, 500, 800, 1000];
export const DAYS_ENG = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const ROLES = {
  ADMIN: 5150,
  WAREHOUSE: 2140,
  DRIVE: 1260,
  ACCOUNTING: 6590,
  LOGISTICS: 3920
}

export const ROLES_LIST = {
  5150: "ADMIN",
  2140: "WAREHOUSE",
  1260: "DRIVE",
  6590: "ACCOUNTING",
  3920: "LOGISTICS",
}

export const ROLES_DESCRIPTORS = {
  5150: "amministrazione",
  2140: "magazzini",
  1260: "trasporto",
  6590: "contabilità",
  3920: "logistica",
}

export const BILLING_TYPES_DESCRIPTION = {
  DIRETTO: "Forfettario viaggio",
  GROUPAGE: "Listino cliente",
  SPOLA_GROUPAGE: "Spola + groupage",
  DIRETTO_SCARICO_INTERMEDIO: "Diretto con scarico intermedio",
}

export const BILLING_TYPES_LONG_DESCRIPTION  =  {
  DIRETTO: "Fattura il trasporto richiedendo il pagamento di un forfettario a viaggio",
  GROUPAGE: "Fattura il trasporto sulla base di un listino cliente",
  SPOLA_GROUPAGE: "Fattura il viaggio di carico con un pagamento forfettario ed i seguenti scarichi sulla base di un listino cliente. Adatto alle richieste che richiedono l'impiego di uno o più bilici",
  DIRETTO_SCARICO_INTERMEDIO: "Fattura il viaggio fino alla sede del carico con un forfettario e poi applica una tariffa a scarico intermedio da quel punto fino all'ultimo destinatario",
}

export const BILLING_METHODS = {
  GROUPAGE: {
    GROUPAGE: BILLING_TYPES_DESCRIPTION.GROUPAGE,
    SPOLA_GROUPAGE: BILLING_TYPES_DESCRIPTION.SPOLA_GROUPAGE
  }, 
  DIRETTO: {
    DIRETTO: BILLING_TYPES_DESCRIPTION.DIRETTO,
    DIRETTO_SCARICO_INTERMEDIO: BILLING_TYPES_DESCRIPTION.DIRETTO_SCARICO_INTERMEDIO
  }
}

export const InputTypes = {
  "TEXT": "TEXT",
  "DATEPICKER": "DATEPICKER",
  "DATE": "DATE",
  "RANGEDATEPICKER": "RANGEDATEPICKER"
}

export const COMPANY_ROLES = {
  sender: "Mittente",
  carrier: "Vettore",
  receiver: "Destinatario"
}

export const globalStatusDescriptions = {
  PENDING: "In attesa",
  PICKEDUP: "Ritirato",
  STOCKED: "In giacenza",
  RECORDING: "Registrazione",
  DELIVERING: "In consegna",
  DELIVERED: "Consegnato",
}

export const globalStatusColorsBorder = {
  PENDING:  "border-amber-500 dark:border-amber-300",
  STATIONARY: "border-amber-500 dark:border-amber-300",
  PICKEDUP: "border-cyan-500 dark:border-cyan-300",
  PICKUP: "border-cyan-500 dark:border-cyan-300",
  STOCKED: "border-violet-500 dark:border-violet-300",
  DEPOT: "border-violet-500 dark:border-violet-300",
  RECORDING: "border-violet-500 dark:border-violet-300",
  DELIVERING: "border-fuchsia-500 dark:border-fuchsia-300",
  DELIVERY: "border-fuchsia-500 dark:border-fuchsia-300",
  DELIVERED: "border-emerald-500 dark:border-emerald-300",
  COMPLETED: "border-emerald-500 dark:border-emerald-300",
  ACCEPTED: "border-emerald-500 dark:border-emerald-300",
  COMPLIANT: "border-teal-500 dark:border-teal-300",
  DISPOSABLE: "border-amber-500 dark:border-amber-300",
  RETURN: "border-blue-500 dark:border-blue-300",
  REJECTED: "border-red-500 dark:border-red-300",
  ARCHIVED:  "border-gray-500 dark:border-gray-600",
  PARI: "border-cyan-500 dark:border-cyan-400",
  DEBT: "border-red-500 dark:border-red-300",
  CREDIT: "border-teal-500 dark:border-teal-300",
  REVERSAL: "border-violet-500 dark:border-violet-400",
  TRADE: "border-cyan-500 dark:border-cyan-400",
}

export const globalStatusColorsText = {
  STATIONARY: "text-amber-500 dark:text-amber-300",
  PICKUP: "text-cyan-500 dark:text-cyan-300",
  DEPOT: "text-violet-500 dark:text-violet-300",
  DELIVERY: "text-fuchsia-500 dark:text-fuchsia-300",
  RETURN: "text-blue-500 dark:text-blue-300",
  COMPLETED: "text-emerald-500 dark:text-emerald-300",
  ACCEPTED: "text-emerald-500 dark:text-emerald-300",
  PENDING:  "text-amber-500 dark:text-amber-300",
  PICKEDUP: "text-cyan-500 dark:text-cyan-300",
  STOCKED: "text-violet-500 dark:text-violet-300",
  RECORDING: "text-violet-500 dark:text-violet-300",
  DELIVERING: "text-yellow-500 dark:text-yellow-300",
  DELIVERED: "text-emerald-500 dark:text-emerald-300",
  LOAD: "text-teal-500 dark:text-teal-300",
  UNLOAD: "text-violet-500 dark:text-violet-300",
  VERIFIED: "text-lime-500 dark:text-lime-300",
  NOT_DECLARED: "text-sky-500 dark:text-sky-300",
  ERROR: "text-red-500 dark:text-red-300",
  REJECTED: "text-red-500 dark:text-red-300",
  ARCHIVED:  "text-gray-500 dark:text-gray-600",
  PARI: "text-cyan-500 dark:text-cyan-400",
  DEBT: "text-red-500 dark:text-red-300",
  CREDIT: "text-teal-500 dark:text-teal-300",
  REVERSAL: "text-violet-500 dark:text-violet-400",
  TRADE: "text-teal-500 dark:text-teal-400",
}

export const globalStatusBackground = {
  PENDING:  "bg-amber-500 dark:bg-amber-300",
  PICKEDUP: "bg-cyan-500 dark:bg-cyan-300",
  STOCKED: "bg-violet-500 dark:bg-violet-300",
  RECORDING: "bg-violet-500 dark:bg-violet-300",
  DELIVERING: "bg-yellow-500 dark:bg-yellow-300",
  DELIVERED: "bg-emerald-500 dark:bg-emerald-300",
  REVERSAL: "bg-violet-500 dark:bg-violet-400",
  TRADE: "bg-cyan-500 dark:bg-cyan-400",
}

export const toastBasicConfig = {
  isLoading: false,
  autoClose: 5000,
  draggable: true,
  closeOnClick: true,
}

// Checks
export function isPromise(promise) {  
  return !!promise && typeof promise.then === 'function'
}

// Formatters -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export const replaceSpaceWithDash = (inputString) => {
  return inputString.replace(/\s+/g, '-').toLowerCase()
}

export const removeSpacesFromString = (inputString) => {
  return inputString.replace(/\s/g,'')
}

export const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

export const capitalizeFullName = str => {
  return str.split(" ").map(seg => capitalize(seg)).join(" ")
}

export const forcedCapitalize = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const locales = { it }

export function intNuberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function floatNumberWithSpaces(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return parts.join(".");
}

// by providing a default string of 'PP' or any of its variants for `formatStr`
// it will format dates in whichever way is appropriate to the locale
export function formatDate (date, formatStr = 'PP') {
  return format(date, formatStr, {
    locale: locales[window.__localeId__] // or global.__localeId__
  })
}

export function formatDistanceDate (date_1, date_2, addSuffix = true) {
  return formatDistance(date_1, date_2, {
    addSuffix,
    locale: locales[window.__localeId__] // or global.__localeId__
  })
}

// Create our number formatter.
export const priceFormatter = (value = 0, currency = "EUR") => {
  return value.toLocaleString(locales[window.__localeId__], {
    style: 'currency',
    currency,
  })
};

// Get data and display readable string
export const dataReader = (field) => {
  const values = {
    "name": "nome",
    "email": "email",
    "phone": "telefono",
    "tag": "tag",
    "vat": "partita IVA",
  }

  return values[field] || 'dato sconosciuto';
}

export const getStandardCoordinatesByCheckpoint = (checkpoint) => {
  if(checkpoint?.location?.coordinate) {
    return {
      lat: checkpoint?.location?.coordinate?.lat || checkpoint?.location?.coordinate?.[0],
      lng: checkpoint?.location?.coordinate?.lng || checkpoint?.location?.coordinate?.[1]
    }
  } else {
    return {
      lat: null,
      lng: null
    }
  }
}

// Remap windows payload from db with checkpoints
export function normalizeWindows(windows) {
  // Need to add ?.type || "CARICO" for compatibility with previous versions
  return windows?.length > 0
    ? windows.reduce((acc, val) => ({
      ...acc,
      [val?.type || "CARICO"]: [
        ...acc[val?.type || "CARICO"],
        {...val, type: val?.type || "CARICO"}
      ]
    }), { CARICO: [], SCARICO: []})
    : { CARICO: [], SCARICO: []}
}

// Windows and checkpoints starter
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


// Remap windows payload from checkpoints with db
export function formatWindowsToDynamoDb(windows) {
  if(!windows) return [];

  return Array.isArray(windows) 
    ? [...windows]
    : Object.keys(windows).reduce((acc,val) => ([...acc, ...windows[val]]), []);
}

// Remap windows payload from db to app
export const formatWindowsToApp = (windows) => windows.length > 0
  ? windows.reduce((acc, val) => {
    return ({ 
      ...acc, 
      [val?.type || "CARICO"]: acc[val?.type || "CARICO"] 
        ? [...acc[val?.type || "CARICO"], val] 
        : [val]
    })
  }, {})
  : {};

export const formatFilesToApp = (files) => files?.length > 0
  ? files.map(file => ({
    db_format: file,
    raw_format: {
      ...file,
      object: file,
    },
    online: true,
  }))
  : []

export const formatPayloadWithCheckpoint = (payload, target = "multiple") => {
  if(target !== "multiple" && target !== "single") {
    return console.error(`Wrong target in formatPayloadWithCheckpoint`, { target });
  }

  if(target === "single") {
    return ({
      ...payload,
      checkpoint: {
        ...payload.checkpoint,
        windows: normalizeWindows(payload.checkpoint.windows)
      }
    })
  }
  
  if(target === "multiple") {
    return ({
      ...payload,
      checkpoints: payload?.checkpoints?.length > 0
        ? payload.checkpoints.map(checkpoint => ({
          ...checkpoint,
          windows: normalizeWindows(checkpoint.windows)
        }))
        : []
    })
  }
}

// Maps and coordinates
export const formatLocationCoords = (coordinates) => {
  if(coordinates?.lat && coordinates?.lng) {
    return [coordinates.lat, coordinates.lng];
  }

  if(coordinates?.[0] && coordinates?.[1]) {
    return [...coordinates];
  }

  return [];
}

// Process data functions -----------------------------------------------------------------------------------------------
export const normalizeRemoteData = (remoteInput) => {
  return remoteInput?.length > 0
    ? remoteInput.reduce((acc, val) => {
      return ({
        ...acc,
        [val.id]: { ...val } 
      })
    }, {})
    : []
}

export const handleChangeFile = (file, callback) => {
  if(!file?.name) return null;
  
  const filename = removeSpacesFromString(file.name.toLowerCase());
  const key = v4();
  const fileType = file.name.split(".").pop();
  const newFile = {
    fileUrl: URL.createObjectURL(file),
    file: JSON.stringify(file),
    filename,
    key: `${filename.split(".")[0]}-${key}`,
    fileType,
    long_fileType: file.type,
    messageType: file.type.substr(0, file.type.indexOf('/')).toUpperCase()
  }
  
  if(newFile) {
    if(callback) {
      callback(newFile)
    } else {
      return newFile;
    } 
  } else {
    console.error("Impossibile registrare quest'immagine", newFile);
  }
}


export const dataNormalizer = (remoteInput, key = "id") => {
  if(!remoteInput) return null;
  return {
    entities: remoteInput?.length > 0
      ? remoteInput.reduce((acc, val) => {
        return ({
          ...acc,
          [val[key]]: { ...val } 
        })
      }, {})
      : [],
    ids: remoteInput.map(el => el[key])
  }
}

export const apiDataNormalizer = (remoteInput, nextToken, key = "id") => {
  if(!remoteInput) return {
    entities: {},
    ids: [],
    nextToken
  };

  return {
    entities: remoteInput?.length > 0
      ? remoteInput.reduce((acc, val) => {
        return ({
          ...acc,
          [val[key]]: { ...val } 
        })
      }, {})
      : [],
    ids: remoteInput.map(el => el[key]),
    nextToken
  }
}

// Loggers -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export const consoleSuccess = (text, data = '') => {
  console.log(`%c${text}`, 'color:green', data)
}

export const consoleInfo = (text, data = '') => {
  console.log(`%c${text}`, 'color:blue', data)
}

export const consoleNeutral = (text, data = '') => {
  console.log(`%c${text}`, 'color:darkgray', data)
}

export const consoleFetch = (text, data = '') => {
  console.log(`%c${text}`, 'color:purple', data)
}

// Utilities -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key].includes(value));
}

export const removeDuplicates = array => {
  var prims = {"boolean":{}, "number":{}, "string":{}}, objs = [];

  return array.filter(function(item) {
    var type = typeof item;
    if(type in prims)
      return prims[type].hasOwnProperty(item) ? false : (prims[type][item] = true);
    else
      return objs.indexOf(item) >= 0 ? false : objs.push(item);
  });
}

export const removeDuplicatesFromArrayOfObj = arr => {
  var result = arr.reduce((unique, o) => {
      if(!unique.some(obj => obj.label === o.label && obj.value === o.value)) {
        unique.push(o);
      }
      return unique;
  },[]);

  return result;
}

// Function that determines if input is json or not
export function isJSON(str) {
  try {
    JSON.parse(str);
    return true;
  } catch (err) {
    return false;
  }
}

// Utilities for maps and coordinates'
export async function getGeocodingDataFromCoordinates(coordinate) {
  // This is making the Geocode request
  var geocoder = new window.google.maps.Geocoder();
  let result = null;

  // Geocoder
  const geocode = await geocoder.geocode({ location: coordinate });
  if (geocode?.results?.[0]) {
    const { results } = geocode;
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

    result = {
      place_id: geocode.results[0].place_id,
      region,
      province,
      city,
      address: formatted_address,
      coordinate
    }

    return result;
  } else {
    console.log("No  results find with current place_id", coordinate);
  }
}

// Utilities for checkboxes
export function toggleValues({value, values, onChange, type = "default", compareParameter = null, additionalData = null}) { 
let newList = type === "default" && values?.length >= 0 
    ? values.includes(value)
      ? values.filter(v => v !== value)
      : values.concat(value)
    : [value];

  if(type === "object_array") {
    const allTargetValues = values.map(val => val[compareParameter]);
    if(allTargetValues.includes(value)) {
      newList = values?.length >= 0 && values.filter(el => el[compareParameter] !== value);    
    } else {
      newList = values?.length >= 0 && additionalData && values.concat(additionalData[value]);
    }
  }  

  onChange(newList);
}

// Merge arrays of array
export const mergeArrays = (arrays) => [].concat.apply([], arrays);

// Performing sort elements in map object
export const sortMapOfSearchableElements = (elements, sortDirection = "ASC") => {
  var startingPointDirection = sortDirection === "ASC" ? -1 : 1;
  if(!elements || elements.length <= 0) return null;
  if(elements.length === 1) return elements.reduce((acc, val) => ({
    ...acc,
    [val]: { ...elements[val] } 
  }), {});

  return Object.keys(elements)
    .sort((id_a, id_b) => {
      if(elements[id_a].searchable > elements[id_b].searchable) { return -startingPointDirection; }
      if(elements[id_a].searchable < elements[id_b].searchable) { return startingPointDirection; }
      return 1;
    })
    .reduce((acc, val) => ({
      ...acc,
      [val]: { ...elements[val] } 
    }), {});
}

// Utilities for dates
function getSelectedDays(startDate, stopDate) {
  var dateArray = [];
  var currentDate = startDate;
  while (new Date(currentDate) <= new Date(stopDate)) {
    const day = format(new Date(currentDate), "eeee");
    const intDay = DAYS_ENG.indexOf(day) + 1;
    dateArray.push(intDay);
    currentDate = addDays(new Date(currentDate) , 1);
  }

  return dateArray;
}

function validityTimeCheck(days, modelDate) {
  let result = null;
  days.forEach((time) => {
    if(result) return;
    if(!time?.start  || !time?.end) return;

    const start = [getHours(parseISO(time.start)), getMinutes(parseISO(time.start))];
    const end = [getHours(parseISO(time.end)), getMinutes(parseISO(time.end))];
    const modelDateStart = new Date(modelDate).setHours(...start)
    const modelDateEnd = new Date(modelDate).setHours(...end)
    
    if(!isWithinInterval(new Date(modelDate), {
      start: new Date(modelDateStart),
      end: new Date(modelDateEnd),
    })) {
      if(result === null) {
        result = false;
        return;
      }
    } else {
      if(!result) result = true
      return;
    }
  });

  return result;
}

export function runDateTimeVerifications(windows, dateStart, dateEnd, callback) {
  let error = false; 
  const selectedDays = getSelectedDays(dateStart, dateEnd);

  // Format data from contact's windows
  const windowsDaysTimes = windows.reduce((acc, window) => {
    const days = window.days.reduce((daysAcc, day) => ({
      ...daysAcc,
      [day]: acc?.[day]?.length > 0
        ? acc[day].concat({ start: window?.start, end: window?.end })
        : [{ start: window?.start, end: window?.end }]
    }), {});

    return ({ ...acc, ...days })
  }, {});

  // Exit if there isn't data in contact's windows
  if(Object.keys(windowsDaysTimes)?.length <= 0) return;

  selectedDays.forEach((day, index) => {
    if(error) return;

    // Controllo se è presente nei giorni di disponibilità
    const dayString = day.toString();

    if(!Object.keys(windowsDaysTimes).includes(dayString)) {
      error = true;
      callback(`${days[day - 1]} non presente fra le disponibilità associate al punto di interesse`);
      return;
    }

    // Controllo la corrispondenza con gli orari presenti in windows (solo sul primo e l'ultimo giorno selezionato)
    if(!error && index === 0) {
      if(!validityTimeCheck(windowsDaysTimes[day], dateStart )) {
        error = true;
        callback(`L'orario di inizio operazione non combacia con l'indicazione registrata nel punto di interesse`);
        return;
      }
    }

    if(!error && (index === selectedDays.length - 1)) {
      if(!validityTimeCheck(windowsDaysTimes[day], dateEnd )) {
        error = true;
        callback(`L'orario di fine operazione non combacia con l'indicazione registrata nel punto di interesse`);
        return;
      }
    }
  });
}

// Compose a correct format for phone number -----------------------------------------------------------------------------------------------
export function composePhoneNumber(dial_code, phone_line_number) {
  return `${dial_code || '+39'}${phone_line_number.replace(/[-()]/g, '')}`;
}

// Rot13 encryption for query strings -----------------------------------------------------------------------------------------------
export function queryStringEncoder(query) {
  var input     = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  var output    = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm';
  var index     = x => input.indexOf(x);
  var translate = x => index(x) > -1 ? output[index(x)] : x;
  return query.split('').map(translate).join('');
}

export function queryStringDecoder(query) {
  var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var b = "nopqrstuvwxyzabcdefghijklmNOPQRSTUVWXYZABCDEFGHIJKLM";
  return query.replace(/[a-z]/gi, (c) => b[a.indexOf(c)]);
}

// Math utilities -----------------------------------------------------------------------------------------------
// Docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor#decimal_adjustment
function decimalAdjust(type, value, exp) {
  // If the exp is undefined or zero...
  if (typeof exp === 'undefined' || +exp === 0) {
    return Math[type](value);
  }
  value = +value;
  exp = +exp;
  // If the value is not a number or the exp is not an integer...
  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
    return NaN;
  }
  // Shift
  value = value.toString().split('e');
  value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
  // Shift back
  value = value.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
}

// Decimal round
export function round(value, precision) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

// Base64 encoder for VAT Numbers -----------------------------------------------------------------------------------------------
export const Base64 = (function () {
  const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  const Base64 = function () {};

  const _encode = function (value) {
    if (typeof(value) !== 'number') {
      throw new Error('Value is not number!');
    }

    let result = '';
    let mod;

    do {
      mod = value % 64;
      result = ALPHA.charAt(mod) + result;
      value = Math.floor(value / 64);
    } while(value > 0);

    return result;
  };

  const _decode = function (value) {
    let result = 0;
    for (let i = 0, len = value.length; i < len; i++) {
      result *= 64;
      result += ALPHA.indexOf(value[i]);
    }

    return result;
  };

  Base64.prototype = {
    constructor: Base64,
    encode: _encode,
    decode: _decode
  };

  return Base64;
})();


export const decodeBase64 = (id) => {
  return Base64.atob(id);
}

// Force strings or return an empty one (common case in empty ref inputs) -----------------------------------------------------------------------------------------------
export function forceString(val) {
  if(typeof val === 'string') {
    return val;
  } else {
    return '';
  }
}

// Edit date prototype to add hours globally
Date.prototype.addHours = function(h) {
  this.setTime(this.getTime() + (h*60*60*1000));
  return this;
};

export function checkValidityDayAfterToday(compareDate) {
  console.log('Risultato comparazione date', 
  new Date(),
  new Date(compareDate),
  new Date() > compareDate);

  return new Date() > compareDate;
}

export function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

//  Tag & ID Generators -----------------------------------------------------------------------------------------------
export function generateTag(name) { return (name.replace(/ /g, '') + '@' + Math.floor(1000 + Math.random() * 9000)).toUpperCase()};

export function exposeTenantRecord (tenant) {
  return tenant.includes("local:")
    ? tenant.split("-c-")[1]
    : tenant
}

export function tagVatMixer (tag, vat) {
  const tenant = exposeTenantRecord(tag);
  return vat + "+" + tenant;
}

export function hasWhiteSpace(s) {
  return /\s/g.test(s);
}

// uid & ids ops
export function generateUid (uid_length = 8) {
  // Setup length and template string
  const LEN_UID = uid_length;
  const template = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  // Build a uid string with desired length
  let uid = '';
  for (let i = 0; i < LEN_UID; i++) {
    // Get a random digit
    uid += template[Math.floor(Math.random() * template.length)];
  }

  // Return newly created uid
  return uid;
}


// Get descriptive and legible values -----------------------------------------------------------------------------------------------
export const roleFinder = (role) => {
  const models = {
    "ADMIN": "Amministrazione",
    "DRIVE": "Trasporto mezzi",
    "WAREHOUSE": "Magazzini",
    "ACCOUNTING": "Contabilità",
    "LOGISTICS": "Logistica",
    "TRANSPORT": "Azienda trasporto merce",
    "CLIENT": "Azienda cliente"
  }

  function isProfile(input) {
    try {
      return models[input.split('@')[1]];
    } catch (err) {
      return false;
    }
  }  

  return isProfile(role) ? models[role.split('@')[1]] : models[role]
}

export const companyTypeDescriptor = (companyType) => {
  const models = {
    "TRANSPORT": "Azienda di trasporti",
    "CLIENT": "Azienda cliente"
  }

  return models?.[companyType] || 'Tipo sconosciuto';
}

//  Log Generator -----------------------------------------------------------------------------------------------
// This is a new version of logs that works very well with the redux store and avoid async/await
export const generateLogList = ({
  action = "Operazione non specificata",
  subject = null,
  domain = null,
  cognitoUser = null,
  data = null,
  previousLogs = [],
  propsGlossary = {},
  excludedKeys = ["validation", "log"],
  limit = 10,
  roleIds,
}) => {
  console.log("data in logs", data);

  if(!cognitoUser) {
    console.error("You can't generate logs without pass cognitoUser as param of generateLogList function");
    return;
  }

  let generatedLogs = null;
  const author = {
    authorId: cognitoUser.attributes.email,
    author: JSON.stringify({
      name: cognitoUser.attributes.name,
      email: cognitoUser.attributes.email,
      companyId: domain?.id || "",
      companyName: domain?.name || "",
      role: roleIds && roleIds?.length > 0 ? roleIds.join(',') : "",
    }),
  }

  // In case of editing ops
  if(previousLogs?.length > 0) {
    if(!data || Object.keys(data)?.length <= 0) {
      console.error("You can't generate logs without pass data as param of generateLogList function");
      return;
    }

    const changes_ids = Object.keys(data).filter(key => !excludedKeys.includes(key));
    generatedLogs = [...previousLogs];

    for(let i = 0; i < changes_ids.length; i++) {
      const result = {
        ...author,
        description: `${action} ${propsGlossary[changes_ids[i]]}${domain ? `. Effettuato dal dominio di ${domain?.name}` : ""} - Utente: ${cognitoUser.attributes.name}`,
        timestamp: Date.now()
      }

      // Remove oldest log and concat last one
      generatedLogs = generatedLogs.length >= limit 
        ? generatedLogs.slice(1,limit).concat(result)
        : generatedLogs.concat(result);
    }
  } else { // in case of creation op
    generatedLogs = [{
      ...author,
      description: `${action} ${ subject && subject}${domain && `. Effettuato dal dominio di ${domain}`} - Utente: ${cognitoUser.attributes.name}`,
      timestamp: Date.now()
    }]
  }

  console.log("GeneratedLogs result: ", generatedLogs);
  return generatedLogs;
}

// This is a the legacy version of generate logs, currently used on all the old sections
export const generateLegacyPublicLogList = async ({ list, action, subject }) => {
  // args: user / list / action / subject
  const author = {
    authorId: "GUEST_USER",
    author: JSON.stringify({ name: "GUEST_USER" }),
    description: `${action} ${subject} - Utente: GUEST_USER`,
    timestamp: Date.now()
  }

  return list.length >= 10
    ? list.slice(1,10).concat(author)
    : list.concat(author)
}

export const generateLegacyLogList = async ({ list, action, subject }) => {
  const user = await Auth.currentAuthenticatedUser();

  // args: user / list / action / subject
  const author = {
    authorId: user.attributes.email,
    author: JSON.stringify({
      name: user.attributes.name,
      email: user.attributes.email,
      phone: user.attributes['custom:phone'],
      companyId: user.attributes["custom:companyId"],
      companyName: user.attributes["custom:companyName"],
      role: user.attributes["custom:role"],
    }),
    description: `${action} ${subject} - Utente: ${user.attributes.name}`,
    timestamp: Date.now()
  }

  return list.length >= 10
    ? list.slice(1,10).concat(author)
    : list.concat(author)
}

export const backupLogsIntoOthers = async ({ from, to, action, subject }) => {
  // Generate logs stack
  const backupLog = await generateLegacyLogList({
    list: to?.log || [],
    action, 
    subject
  });

  return to
    .concat(from)
    .concat(backupLog)
    .sort(( log_a, log_b) => log_a.timestamp - log_b.timestamp );
} 

export const getAuthorFromLastLog = log => {
  console.log(log);
  return JSON.parse(log[log.length - 1].author).name
};

// Format a Object File for DynamoDB -----------------------------------------------------------------------------------------------
export async function generateFileObj(filename, key, fileType) {
  const currentCred = await Auth.currentCredentials();
  const _identityId = currentCred.identityId;

  return {
    identityId: _identityId,
    bucket: awsConfig.aws_user_files_s3_bucket,
    region: awsConfig.aws_user_files_s3_bucket_region,
    key,
    filename,
    extension: fileType,
    timestamp: (Date.now()).toString()
  }
}


// Visualize string in a row -----------------------------------------------------------------------------------------------
export const truncateString = (string, length) => {
  return string.length > length ? `${string.substring(0, length)}...` : string;
}

// Uploading helpers -----------------------------------------------------------------------------------------------
export const readExcel = (file, callback) => {
  const promise = new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = (e) => {
      const bufferArray = e.target.result;
      const wb = XLSX.read(bufferArray, { type: 'buffer' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, {
        header: 0,
        defval: ""
      });
      resolve(data);
    };

    fileReader.onerror = (error) => {
      reject(error);
    }
  });

  promise.then((d) => {
    callback(d);
  });
}

// Global xls features -----------------------------------------------------------------------------------------------
const dataTypesPreprocess = {
  "contacts": (data) => generateContactsDataCell(data),
  "warehouses": (data) => generateWarehousesDataCell(data),
  // "orders-gulliver": async (data) => await generateOrdersForGulliverDataCell(data),
}

export const downloadExcel = async ({
  title,
  subject,
  author,
  headings = [],
  data,
  dataType,
  sheetNames = ["download-excel"],
  customColFormatSetup = null // AL MOMENTO NON FUNZIONA... { col: [1,2,3,...n], format: "dd/mm/yyyy hh:mm:ss"}
}) => {
  if(!dataType) {
    toast.error('Esportazione impossibile: tipo di dato sconosciuto');
    return null;
  }

  let wb = XLSX.utils.book_new();
  wb.Props = {
    Title: title,
    Subject: subject,
    Author: author,
    CreatedDate: new Date()
  };

  // Generate data cell
  let ws_data = await dataTypesPreprocess[dataType](data);
  
  // Add headings on top of the table
  ws_data.unshift(headings);

  // If there is some custom format passed has arguments of the function, run setup of the sheet
  if(customColFormatSetup?.format) {
    const worksheet = XLSX.utils.aoa_to_sheet(ws_data);
    function formatColumn(worksheet, col, fmt) {
      const range = XLSX.utils.decode_range(worksheet['!ref'])
      // note: range.s.r + 1 skips the header row
      for (let row = range.s.r + 1; row <= range.e.r; ++row) {
        const ref = XLSX.utils.encode_cell({ r: row, c: col })
        if (worksheet[ref] && worksheet[ref].t === customColFormatSetup.param || 's') {
          worksheet[ref].z = fmt
        }
      }
    }

    for (let col of customColFormatSetup.col) {
      console.log("Vedi col oh", col);
      formatColumn(worksheet, col, customColFormatSetup.format)
    }

    XLSX.utils.book_append_sheet(wb, worksheet, sheetNames[0])
  } else {
    // Build xls file as it is
    wb.SheetNames.push(...sheetNames);
    const ws = XLSX.utils.aoa_to_sheet(ws_data);
    wb.Sheets[sheetNames[0]] = ws;
  }

  const wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
  function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  }

  // Save file
  saveAs(new Blob([s2ab(wbout)], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}), `${title}.xlsx`);
}

// Subscription machina -----------------------------------------------------------------------------------------------
export const subscribeTo = ({ subscription, variables, trigger }) => {
  const subscribed = API.graphql(
    graphqlOperation(subscription, { ...variables })
    ).subscribe({ next: (subData) => {
      consoleNeutral('- Rilevato aggiornamento -', subData.value.data);
      trigger(subData.value.data);
  }});

  return subscribed;
}

// Redux features
export const getThunkStatus = (type) => type.split('/').pop();

export function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function validatePhone(tel) {
  // var re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
  var re = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;
  return re.test(tel);
}