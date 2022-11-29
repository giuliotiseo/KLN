import { useState } from "react";
import { toast } from "react-toastify";

// Helpers -----------------------------------------------------------------------------------------------------------------------------
const ERROR_DESCRIPTOR = {
  name: "nome",
  location: "indirizzo"
};

const runCompanyValidation = (company) => {
  let error = [];
  console.log("...company...", company);

  if(!company?.name) error.push("name");
  if(!company?.vatNumber) error.push("vatNumber");
  if(!company?.location?.place_id || !company?.location?.city || !company?.location?.address) error.push("location");

  if(error?.length > 0) {
    if(error.includes("name")) toast.error(`Devi indicare il nome dell'azienda`);
    if(error.includes("vatNumber")) toast.error(`Devi indicare la partita IVA dell'azienda`);
    if(error.includes("location")) toast.error(`Devi cercare l'indirizzo principale dell'azienda o della filiale`);

    return error;
  }

  return error;
}

const runWarehousesValidation = (warehouses) => {
  let error = [];

  for(let whIndex in warehouses) {
    const warehouse = warehouses[whIndex];
    if(!warehouse.name) error.push({ name: `DEP ${whIndex + 1}`, error: "name"});
    if(!warehouse.location.place_id) error.push({ name: `DEP ${whIndex + 1}`, error: "location"});
  }
  
  if(error?.length > 0) {
    for(let err of error) {
      toast.error(`Il deposito ${err.name} è privo di ${ERROR_DESCRIPTOR[err.error]}`);
    }

    return error;
  }

  return error;
}


// Hook -----------------------------------------------------------------------------------------------------------------------------
export default function useSubscribeValidation(companyInput = {}, warehousesInput = {}) {
  const [ companyValidation, setCompanyValidation ] = useState(null);
  const [ warehousesValidation, setWarehousesValidation ] = useState(null);
  
  // Controlla i valori di company
  let company = { ...companyInput };
  let warehouses = [ ...warehousesInput ];

  function handleCheckSubscribeFields() {
    // Validazione azienda
    try {
      const validationCompanyResult = runCompanyValidation(company, setCompanyValidation);
      if(validationCompanyResult?.length <= 0) {
        setCompanyValidation(null);
      } else {
        setCompanyValidation(validationCompanyResult);
      }
    } catch(error) {
      console.error("Errore: ", error);
      toast.error("Errore nel corso della validazione dell'azienda. Ritentare o contattare l'assistenza tecnica");
      throw new Error({ error });
    }
  
    // Validazione magazzini
    try {
      const validationWarehousesResult = runWarehousesValidation(warehouses, setWarehousesValidation);
      if(validationWarehousesResult?.length <= 0) {
        setWarehousesValidation(null);
      } else {
        setWarehousesValidation(validationWarehousesResult);
      }
    } catch(error) {
      console.error("Errore: ", error);
      toast.error("Errore nel corso della validazione dei magazzini. Ritentare o contattare l'assistenza tecnica");
      throw new Error({ error });
    }
  }

  return {
    companyErrors: companyValidation,
    warehousesErrors: warehousesValidation,
    verifyFields: handleCheckSubscribeFields
  }
}