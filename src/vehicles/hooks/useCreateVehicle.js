import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../globals/hooks/useAuth";
import { useCreateVehicleMutation } from "../api/vehicles-api-slice";
import { toast } from "react-toastify";
import { selectCurrentCompany } from "../../company/slices/companySlice";
import { digestMessage } from "../../globals/libs/sha256";
import { VEHICLE_TYPE_DESCRIPTION } from "../libs/helpers";

// Helpers ---------------------------------------------------------------------------------------------------
const validateCreateVehicle = (data) => {
  let validation = [];
  const vehicleTypes = Object.keys(VEHICLE_TYPE_DESCRIPTION);
  const { vehicle } = data;

  if(!vehicle?.licensePlate) {
    toast.error("Devi indicare la targa del veicolo");
    validation.push("licensePlate");
  }

  if(!vehicle?.brand) {
    toast.error("Devi indicare il brand del veicolo");
    validation.push("brand");
  }
  
  if(!vehicle?.model) {
    toast.error("Devi inserire il modello dei veicolo");
    validation.push("model");
  }
  
  if(!vehicle.type || !vehicleTypes.includes(vehicle.type)) {
    toast.error("Tipologia veicolo non trovata");
    validation.push("type");
  }

  return validation;
}

// Hook ---------------------------------------------------------------------------------------------------
export default function useCreateVehicle() {
  const { auth } = useAuth();
  const [ createVehicle, { isLoading }] = useCreateVehicleMutation();
  const [ internalLoading, setInternalLoading ] = useState(false);
  const [ validationError, setValidationError ] = useState([]);
  const { id: companyId } = useSelector(selectCurrentCompany);
  const navigate = useNavigate();
  
  const handleCreateVehicle = useCallback(async (vehicle) => {
    setInternalLoading(true);
    // Run fields validation
    const validation_results = validateCreateVehicle({ vehicle });
    if(validation_results?.length > 0) {
      setValidationError(validation_results);
      console.groupCollapsed("Validation fails");
      for(const error of validation_results) console.error(error);
      console.groupEnd();
      setInternalLoading(false);
      throw new Error("Validation failure");
    } else {      
      setValidationError([]);
      const vehicleId = await digestMessage(`${vehicle.licensePlate}-${companyId}`);
      try {
        await createVehicle({
          vehicle,
          vehicleId,
          owner: `${auth.attributes.sub}::${auth.username}`,
          companyId,
        });
  
        navigate('/vehicles');
      } catch (err) {
        console.error("Errore:", err);
        toast.error("Errore durante la creazione del veicolo");
        setInternalLoading(false);
      }
    }

  }, []);

  return [
    handleCreateVehicle,
    {
      isLoading: isLoading || internalLoading,
      validationError
    }
  ]
}