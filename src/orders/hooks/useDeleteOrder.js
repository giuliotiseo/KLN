import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDeleteOrderMutation } from "../api/orders-api-slice";
import { toast } from "react-toastify";
import { mergeArrays } from "../../globals/libs/helpers";
import { deleteOrderFileFromS3 } from "../api/orders-thunks";

// Helpers ---------------------------------------------------------------------------------------------------
const validateDeleteOrder = (data) => {
  let validation = [];
  const { order } = data;

  if(!order?.id) {
    toast.error("Attributo obbligatorio non trovato: ID. Riprovare o contattare il servizio di assistenza");
    validation.push("id");
  }

  return validation;
}

// Hook ---------------------------------------------------------------------------------------------------
export default function useDeleteOrder() {
  const [ deleteOrder, { isLoading }] = useDeleteOrderMutation();
  const [ internalLoading, setInternalLoading ] = useState(false);
  const [ validationError, setValidationError ] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteOrder = useCallback(async (order) => {
    setInternalLoading(true);
    // Run fields validation
    const validation_results = validateDeleteOrder({ order });
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
        console.log("OrderToDelete", order);
        const result = await deleteOrder(order.id);
        
        if (result) {
          if(order?.docs?.length > 0) {
            let files_array = mergeArrays(order.docs.map(doc => doc?.files?.length > 0 ? doc.files.length : []));
            console.log("Processo di eliminazione files contenuti nell'ordine", { files_array });
            if(files_array?.length > 0) {
              await dispatch(deleteOrderFileFromS3(files_array)); 
            }
          }
        }

        navigate('/orders');
      } catch (err) {
        console.error("Errore:", err);
        toast.error("Errore durante l'eliminazione dell'ordine");
        setInternalLoading(false);
      }
    }

  }, []);

  return [
    handleDeleteOrder,
    {
      isLoading: isLoading || internalLoading,
      validationError
    }
  ]
}