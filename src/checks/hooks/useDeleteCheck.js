import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteCheckFileFromS3 } from "../api/check-thunks";
import { useDeleteCheckMutation } from "../api/checks-api-slice";


// Helpers ---------------------------------------------------------------------------------------------------
const validateDeleteCheck = (data) => {
  let validation = [];
  const { check } = data;

  if(!check?.id) {
    toast.error("Attributo obbligatorio non trovato: ID. Riprovare o contattare il servizio di assistenza");
    validation.push("id");
  }

  return validation;
}

// Hook ---------------------------------------------------------------------------------------------------
export default function useDeleteCheck() {
  const [ deleteCheck, { isLoading }] = useDeleteCheckMutation();
  const [ internalLoading, setInternalLoading ] = useState(false);
  const [ validationError, setValidationError ] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteCheck = useCallback(async (check) => {
    setInternalLoading(true);
    // Run fields validation
    const validation_results = validateDeleteCheck({ check });
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
        console.log("CheckToDelete", check);
        const result = await deleteCheck(check.id);
        
        if (result) {
          if(check?.files?.length > 0 || check?.image) {
            const files_array = [].concat(...check.files).concat(check.image)
            console.log("Processo di eliminazione files contenuti nell'assegno", { files_array });
            if(files_array?.length > 0) {
              await dispatch(deleteCheckFileFromS3(files_array)); 
            }
          }
        }

        navigate('/checks');
      } catch (err) {
        console.error("Errore:", err);
        toast.error("Errore durante l'eliminazione dell'assegno");
        setInternalLoading(false);
      }
    }

  }, []);

  return [
    handleDeleteCheck,
    {
      isLoading: isLoading || internalLoading,
      validationError
    }
  ]
}