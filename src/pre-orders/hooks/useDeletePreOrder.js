import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeletePreOrderMutation } from "../api/pre-orders-api-slice";
import { toast } from "react-toastify";
import { deletePreOrderFileFromS3 } from "../api/pre-orders-thunks";
import { useDispatch } from "react-redux";

// Helpers ---------------------------------------------------------------------------------------------------
const validateDeletePreOrder = (data) => {
  let validation = [];
  const { preOrder } = data;

  if(!preOrder?.id) {
    toast.error("Attributo obbligatorio non trovato: ID. Riprovare o contattare il servizio di assistenza");
    validation.push("id");
  }

  return validation;
}

// Hook ---------------------------------------------------------------------------------------------------
export default function useDeletePreOrder() {
  const [ deletePreOrder, { isLoading }] = useDeletePreOrderMutation();
  const [ internalLoading, setInternalLoading ] = useState(false);
  const [ validationError, setValidationError ] = useState([]);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleDeletePreOrder = useCallback(async (preOrder) => {
    setInternalLoading(true);
    // Run fields validation
    const validation_results = validateDeletePreOrder({ preOrder });
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
        console.log("PreOrderToDelete", preOrder);
        const result = await deletePreOrder(preOrder.id);
        if (result && (preOrder?.files && preOrder?.files?.length !== 0)) {
          await dispatch(deletePreOrderFileFromS3(preOrder.files));
        }

        toast.success("Pre-ordine eliminato con successo");
        navigate('/pre-orders');
      } catch (err) {
        console.error("Errore:", err);
        toast.error("Errore durante l'eliminazione del pre-ordine");
        setInternalLoading(false);
      }
    }

  }, []);

  return [
    handleDeletePreOrder,
    {
      isLoading: isLoading || internalLoading,
      validationError
    }
  ]
}