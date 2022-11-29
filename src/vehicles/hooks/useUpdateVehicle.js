import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useLogParams from "../../globals/hooks/useLogParams";
import { useUpdateVehicleMutation } from "../api/vehicles-api-slice";
import { selectCurrentCompany } from "../../company/slices/companySlice";
import { selectVehicleEditorToUpdate } from "../slices/vehicleEditorSlice";
import { toast } from "react-toastify";
import { generateLogList } from "../../globals/libs/helpers";
import { VEHICLE_PROPS_GLOSSARY } from "../libs/constants";

// Helpers ---------------------------------------------------------------------------------------------------
const validateUpdateVehicle = (data) => {
  let validation = [];
  const { vehicle } = data;

  if(!vehicle?.id) {
    toast.error("Attributo obbligatorio non trovato: ID. Riprovare o contattare il servizio di assistenza");
    validation.push("id");
  }

  if(!vehicle?.companyId) {
    toast.error("Attributo obbligatorio non trovato: companyId. Riprovare o contattare il servizio di assistenza");
    validation.push("companyId");
  }

  return validation;
}

// Hook ---------------------------------------------------------------------------------------------------
export default function useUpdateVehicle(inputVehicle) {
  const [ updateVehicle, { isLoading }] = useUpdateVehicleMutation();
  const [ internalLoading, setInternalLoading ] = useState(false);
  const [ validationError, setValidationError ] = useState([]);
  const vehicleEditorForm = useSelector(selectVehicleEditorToUpdate);
  const company = useSelector(selectCurrentCompany);
  const logParams = useLogParams({
    action: "Aggiornamento",
    data: vehicleEditorForm,
    previousLogs: inputVehicle?.log,
    propsGlossary: VEHICLE_PROPS_GLOSSARY,
    limit: 20,
  });

  const navigate = useNavigate();

  const handleUpdateVehicle = useCallback(async () => {
    setInternalLoading(true);
    let vehicleToSend = {
      // Base
      id: inputVehicle.id,
      companyId: inputVehicle.companyId,
      licensePlate: inputVehicle.licensePlate,
      type: vehicleEditorForm?.type || inputVehicle.type,
      status: vehicleEditorForm?.status || inputVehicle.status,
      ...vehicleEditorForm,
      log: generateLogList({
        ...logParams,
        domain: company,
        excludedKeys: [
          "id",
          "companyId",
          "log",
        ]
      })
    };


    // Run fields validation
    const validation_results = validateUpdateVehicle({ vehicle: vehicleToSend });
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
        await updateVehicle(vehicleToSend);
        navigate('/vehicles');
      } catch (err) {
        console.error("Errore:", err);
        toast.error("Errore durante l'aggiornamento del veicolo");
        setInternalLoading(false);
      }
    }

  }, [inputVehicle]);

  return [
    handleUpdateVehicle,
    {
      isLoading: isLoading || internalLoading,
      validationError
    }
  ]
}