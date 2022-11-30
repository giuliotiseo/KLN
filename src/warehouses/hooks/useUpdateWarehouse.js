import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUpdateWarehouseMutation } from "../api/warehouses-api-slice";
import useLogParams from "../../globals/hooks/useLogParams";
import { selectWarehouseEditorToUpdate } from "../slices/warehouseEditorSlice";
import { selectCurrentCompany } from "../../company/slices/companySlice";
import { generateLogList } from "../../globals/libs/helpers";
import { WAREHOUSE_PROPS_GLOSSARY } from "../libs/constants";
import { toast } from "react-toastify";

// Helpers ---------------------------------------------------------------------------------------------------
const validateUpdateWarehouse = (data) => {
  let validation = [];
  const { warehouse } = data;

  if(!warehouse?.id) {
    toast.error("Attributo obbligatorio non trovato: ID. Riprovare o contattare il servizio di assistenza");
    validation.push("id");
  }

  return validation;
}

// Hook ---------------------------------------------------------------------------------------------------
export default function useUpdateWarehouse(inputWarehouse) {
  const [ updateWarehouse, { isLoading }] = useUpdateWarehouseMutation();
  const [ internalLoading, setInternalLoading ] = useState(false);
  const [ validationError, setValidationError ] = useState([]);
  const warehouseEditorForm = useSelector(selectWarehouseEditorToUpdate);
  const company = useSelector(selectCurrentCompany);
  const logParams = useLogParams({
    action: "Aggiornamento",
    data: warehouseEditorForm,
    previousLogs: inputWarehouse?.log,
    propsGlossary: WAREHOUSE_PROPS_GLOSSARY,
    limit: 20,
  });

  const navigate = useNavigate();

  const handleUpdateWarehouse = useCallback(async () => {
    setInternalLoading(true);
    let warehouseToSend = {
      // Base
      id: inputWarehouse.id,
      name: inputWarehouse.name,
      tenant: inputWarehouse.tenant,
      isLinked: inputWarehouse.isLinked,
      status: inputWarehouse.status,
      // Modifiche e rielaborazioni
      ...warehouseEditorForm,
      searchable: warehouseEditorForm?.name && warehouseEditorForm?.location
        ? `${warehouseEditorForm.name.toLowerCase()} ${warehouseEditorForm.location.address.toLowerCase()}`
        : inputWarehouse.searchable,
      isDeposit: warehouseEditorForm?.scope?.includes("DEPOSITO") ? 1 : 0 || inputWarehouse.isDeposit,
      isInter: warehouseEditorForm?.scope?.includes("INTERMEDIO") ? 1 : 0 || inputWarehouse.isInter,
      isHub: warehouseEditorForm?.scope?.includes("DISTRIBUZIONE") ? 1 : 0 || inputWarehouse.isHub,
      log: generateLogList({
        ...logParams,
        domain: company,
        excludedKeys: [
          "id",
          "tenant",
          "contactIds",
          "isDeposit",
          "isInter",
          "isHub",
          "log",
        ]
      })
    };

    if(Object.keys(warehouseEditorForm).includes("isLinked")) {
      if(warehouseEditorForm.isLinked === 0) {
        warehouseToSend.isLinked = "UNLINK";
        warehouseToSend.warehouseLinkId = inputWarehouse.warehouseLinkId;
      }
    }

    // Run fields validation
    const validation_results = validateUpdateWarehouse({ warehouse: warehouseToSend });
    if(validation_results?.length > 0) {
      setValidationError(validation_results);
      console.groupCollapsed("Validation fails");
      for(const error of validation_results) console.error(error);
      console.groupEnd();
      setInternalLoading(false);
      throw new Error("Validation failure");
    } else {
      setValidationError([]);      
      try {
        await updateWarehouse(warehouseToSend);
        navigate('/warehouses');
      } catch (err) {
        console.error("Errore:", err);
        toast.error("Errore durante l'aggiornamento del magazzino");
        setInternalLoading(false);
      }
    }

  }, [inputWarehouse]);

  return [
    handleUpdateWarehouse,
    {
      isLoading: isLoading || internalLoading,
      validationError
    }
  ]
}