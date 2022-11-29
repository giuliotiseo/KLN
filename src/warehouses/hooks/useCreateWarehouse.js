import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCreateWarehouseMutation } from "../api/warehouses-api-slice";
import { toast } from "react-toastify";
import { selectCurrentCompany } from "../../company/slices/companySlice";
import { useAuth } from "../../globals/hooks/useAuth";
import { digestMessage } from "../../globals/libs/sha256";
import { removeSpacesFromString } from "../../globals/libs/helpers";
import { v4 } from "uuid";

// Helpers ---------------------------------------------------------------------------------------------------
const validateCreateWarehouse = (data) => {
  let validation = [];
  const { warehouse } = data;

  if(!warehouse?.name && !warehouse?.linkedWarehouse?.name) {
    toast.error("Devi indicare il nome del magazzino");
    validation.push("name");
  }

  if(!warehouse?.location?.place_id && !warehouse?.linkedWarehouse?.location?.place_id) {
    toast.error("Devi selezionare l'indirizzo del magazzino");
    validation.push("location");
  }

  if(!warehouse?.scope && !warehouse?.scope) {
    toast.error("Devi indicare la funzione che avrà questo magazzino");
    validation.push("scope");
  }

  return validation;
}

// Hook ---------------------------------------------------------------------------------------------------
export default function useCreateWarehouse() {
  const { auth } = useAuth();
  const [ createWarehouse, { isLoading }] = useCreateWarehouseMutation();
  const [ internalLoading, setInternalLoading ] = useState(false);
  const [ validationError, setValidationError ] = useState([]);
  const company = useSelector(selectCurrentCompany);
  const { id: companyId } = company;
  const navigate = useNavigate();
  
  const handleCreateWarehouse = useCallback(async (warehouse) => {
    setInternalLoading(true);
    // Run fields validation
    const validation_results = validateCreateWarehouse({ warehouse });
    if(validation_results?.length > 0) {
      setValidationError(validation_results);
      console.groupCollapsed("Validation fails");
      for(const error of validation_results) console.error(error);
      console.groupEnd();
      setInternalLoading(false);
      throw new Error("Validation failure");
    } else {      
      setValidationError([]);
      const extId = v4();
      const warehouseId_raw = `${removeSpacesFromString(company.vatNumber.toUpperCase())}-${warehouse.location.place_id}-${extId}`;
      const warehouseId = await digestMessage(warehouseId_raw);

      let warehouseLinkId_raw, warehouseLinkId; 
      
      if(warehouse?.isLinked === 1) {
        warehouseLinkId_raw = `${warehouse.id}-${warehouse.linkedCompany.id}-${company.id}`;
        warehouseLinkId = await digestMessage(warehouseLinkId_raw);
      }

      try {
        await createWarehouse({
          warehouse,
          warehouseId,
          warehouseLinkId,
          owner: `${auth.attributes.sub}::${auth.username}`,
          tenant: `${auth.attributes.sub}::${auth.username}`,
          companyId,
          isLinked: false
        });
  
        navigate('/warehouses');
      } catch (err) {
        console.error("Errore:", err);
        toast.error("Errore durante la creazione del magazzino");
        setInternalLoading(false);
      }
    }

  }, []);

  return [
    handleCreateWarehouse,
    {
      isLoading: isLoading || internalLoading,
      validationError
    }
  ]
}