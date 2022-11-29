import { toast } from "react-toastify";
import { formatDate } from "../../globals/libs/helpers";
import { isValidIBANNumber } from "../../globals/libs/iban_validation";

// Run validations --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------=
export function checkIbanValidity({ id, value }) {
  if(!value) {
    return {
      id,
      description: `Campo vuoto`,
      response: "EMPTY"
    }
  }

  if(isValidIBANNumber(value) === 1) {
    return {
      id,
      value,
      description: "IBAN valido",
      response: "SUCCESS"
    };
  } else {
    console.error("Not valid IBAN", value);
    toast.error(`IBAN non valido`);
    return {
      id,
      value,
      description: "Iban non valido",
      response: "ERROR"
    };
  }
}

// Date validations --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export const checkValidityDate = ({ id, value, minDate, maxDate }) => {
  if(value === null) {
    return {
      id,
      description: `Campo vuoto`,
      response: "EMPTY"
    }
  }

  // In case of range data
  if(value?.length === 2) {
    // let responseArray = [];
    for(let i = 0; i < value.length; i++) {
      let result = checkMaxMin({ id, date: value[i], minDate, maxDate });
      return result;
    }

    return;
  } else {
    let result = checkMaxMin({id, value, minDate, maxDate });
    return result;
  }
}

function checkMaxMin({id, value, minDate, maxDate }) {
  if(minDate && (new Date(minDate) > new Date(value))) {
    console.error("Min data maggiore di data selezionata", minDate, value);
    toast.error(`Non puoi inserire una data precedente al ${formatDate(new Date(minDate), "PPp")}`);
    return { 
      id,
      value,
      description: `Non puoi inserire una data precedente al ${formatDate(new Date(minDate), "PPp")}`,
      response: "ERROR"
    }
  }

  if(maxDate && (new Date(maxDate) < new Date(value))) {
    console.error("Max data minore di data selezionata", maxDate, value);
    toast.error(`Non puoi inserire una data successiva al ${formatDate(new Date(maxDate), "PPp")}`);
    return {
      id,
      value,
      description: `Non puoi inserire una data successiva al ${formatDate(new Date(maxDate), "PPp")}`,
      response: "ERROR"
    };
  }

  return { 
    id,
    value,
    description: `Data valida ${value}`,
    response: "SUCCESS"
  }
}

