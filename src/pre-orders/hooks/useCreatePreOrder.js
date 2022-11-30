import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCreatePreOrderMutation } from "../api/pre-orders-api-slice";
import { toast } from "react-toastify";
import { selectCurrentCompany } from "../../company/slices/companySlice";
import { useAuth } from "../../globals/hooks/useAuth";
import { digestMessage } from "../../globals/libs/sha256";
import { generateUid } from "../../globals/libs/helpers";
import { savePreOrderFileToS3 } from "../api/pre-orders-thunks";
import { useDispatch } from "react-redux";

// Helpers ---------------------------------------------------------------------------------------------------
const validateCreatePreOrder = (data) => {
  let validation = [];
  const { preOrder } = data;

  if(!preOrder?.sender?.id) {
    toast.error("Devi selezionare un mittente");
    validation.push("sender");
  }
  if(!preOrder?.carrier?.id) {
    toast.error("Devi selezionare un vettore");
    validation.push("carrier");
  }

  if(!preOrder?.checkpoint?.location?.address) {
    toast.error("Devi selezionare un punto di ritiro");
    validation.push("checkpoint");
  }

  if(!preOrder?.pickupDateStart) {
    toast.error("Devi selezionare un range di date valido (da:...)");
    validation.push("pickupDateStart");
  }

  if(!preOrder?.pickupDateEnd) {
    toast.error("Devi selezionare un range di date valido (a:...)");
    validation.push("pickupDateEnd");
  }

  
  return validation;
}

// Hook ---------------------------------------------------------------------------------------------------
export default function useCreatePreOrder() {
  const { auth } = useAuth();
  const [ createPreOrder, { isLoading }] = useCreatePreOrderMutation();
  const [ internalLoading, setInternalLoading ] = useState(false);
  const [ validationError, setValidationError ] = useState([]);
  const company = useSelector(selectCurrentCompany);
  const { id } = company;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleCreatePreOrder = useCallback(async (preOrder) => {
    setInternalLoading(true);
    // Run fields validation
    const validation_results = validateCreatePreOrder({ preOrder });
    if(validation_results?.length > 0) {
      setValidationError(validation_results);
      console.groupCollapsed("Validation fails");
      for(const error of validation_results) console.error(error);
      console.groupEnd();
      setInternalLoading(false);
      throw new Error("Validation failure");
    } else {
      setValidationError([]);
      const uuid = generateUid(16);
      const stamp = `PRE-${uuid}`;
      const preOrderId_raw = `${uuid}-${preOrder.carrier.id}-${preOrder.sender.id}`;
      const preOrderId = await digestMessage(preOrderId_raw);
      
      try {
        const result = await createPreOrder({
          preOrder: {...preOrder, stamp },
          preOrderId,
          companyType: id === preOrder?.carrier?.id ? "CARRIER" : "SENDER",
          owner: `${auth.attributes.sub}`,
          isLinked: false
        });

        if (result && (preOrder?.files && preOrder?.files?.length !== 0)) {
          await dispatch(savePreOrderFileToS3(preOrder.files));
        }
  
        navigate('/pre-orders');
      } catch (err) {
        console.error("Errore:", err);
        toast.error("Errore durante la creazione del pre-ordine");
        setInternalLoading(false);
      }
    }

  }, []);

  return [
    handleCreatePreOrder,
    {
      isLoading: isLoading || internalLoading,
      validationError
    }
  ]
}