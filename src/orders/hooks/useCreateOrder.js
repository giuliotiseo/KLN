import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../api/orders-api-slice";
import { toast } from "react-toastify";
import { selectCurrentCompany } from "../../company/slices/companySlice";
import { useAuth } from "../../globals/hooks/useAuth";
import { digestMessage } from "../../globals/libs/sha256";
import { generateUid, isValidDate } from "../../globals/libs/helpers";
import { saveOrderFileToS3 } from "../api/orders-thunks";
import { useDispatch } from "react-redux";
import { resetOrderCreator } from "../slices/orderCreatorSlice";

// Helpers ---------------------------------------------------------------------------------------------------
const validateCreateOrder = (data) => {
  let validation = [];
  const _SHIPMENTTYPES = ["DIRETTO", "GROUPAGE"];
  const _BILLINGTYPES = ["DIRETTO", "GROUPAGE", "SPOLA_GROUPAGE", "DIRETTO_SCARICO_INTERMEDIO"];
  const { order } = data;

  // Companies ------------------------------------------------------------------------------------------
  if(!order?.sender?.id) {
    toast.error("Devi selezionare un mittente");
    validation.push("sender");
  }

  if(!order?.receiver?.id) {
    toast.error("Devi selezionare un destinatario");
    validation.push("receiver");
  }

  if(!order?.pickupCheckpoint?.location?.place_id) {
    toast.error("Indirizzo ritiro non valido");
    validation.push("pickupCheckpoint");
  }

  if(!order?.deliveryCheckpoint?.location?.place_id) {
    toast.error("Indirizzo consegna non valido");
    validation.push("pickupCheckpoint");
  }

  // Dates ------------------------------------------------------------------------------------------
  // ritiro
  if(order?.pickupDateStart) {
    if(!isValidDate(new Date(order.pickupDateStart))) {
      toast.error("Prima indicazione data e ora ritiro non valida");
      validation.push("pickupDateStart");
    }
  } else {
    toast.error("Prima indicazione data e ora ritiro mancante");
    validation.push("pickupDateStart");
  }

  if(order?.pickupDateEnd) {
    if(!isValidDate(new Date(order.pickupDateEnd))) {
      toast.error("Seconda indicazione data e ora ritiro non valida");
      validation.push("pickupDateEnd");
    }
  } else {
    toast.error("Seconda indicazione data e ora ritiro mancante");
    validation.push("pickupDateEnd");
  }

  // consegna
  if(order?.deliveryDateStart) {
    if(!isValidDate(new Date(order.deliveryDateStart))) {
      toast.error("Prima indicazione data e ora consegna non valida");
      validation.push("deliveryDateStart");
    }
  } else {
    toast.error("Prima indicazione data e ora consegna mancante");
    validation.push("deliveryDateStart");
  }

  if(order?.deliveryDateEnd) {
    if(!isValidDate(new Date(order.deliveryDateEnd))) {
      toast.error("Seconda indicazione data e ora consegna non valida");
      validation.push("deliveryDateEnd");
    }
  } else {
    toast.error("Seconda indicazione data e ora consegna mancante");
    validation.push("deliveryDateEnd");
  }

  // scarico vettore
  if(order?.depotDateStart) {
    if(!isValidDate(new Date(order.depotDateStart))) {
      toast.error("Prima indicazione data e ora scarico vettore non valida");
      validation.push("depotDateStart");
    }
  }

  if(order?.depotDateEnd) {
    if(!isValidDate(new Date(order.depotDateEnd))) {
      toast.error("Seconda indicazione data e ora scarico vettore non valida");
      validation.push("depotDateEnd");
    }
  }

  // Dettagli ------------------------------------------------------------------------------------------
  if(!_SHIPMENTTYPES.includes(order?.shipmentType)) {
    toast.error("Metodo di spedizione non valido");
    validation.push("shipmentType");
  }

  if(!_BILLINGTYPES.includes(order?.billingType)) {
    toast.error("Metodo di fatturazione non valido");
    validation.push("billingType");
  }

  if(parseInt(order.collectChecks) !== 1 && parseInt(order.collectChecks) !== 0) {
    toast.error("Specifica se desideri o meno che il vettore ritiri l'assegno");
    validation.push("collectChecks");
  }

  return validation;
}

// Hook ---------------------------------------------------------------------------------------------------
export default function useCreateOrder() {
  const { auth } = useAuth();
  const [ createOrder, { isLoading }] = useCreateOrderMutation();
  const [ internalLoading, setInternalLoading ] = useState(false);
  const [ validationError, setValidationError ] = useState([]);
  const { pathname } = useLocation();
  const company = useSelector(selectCurrentCompany);
  const { id } = company;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleCreateOrder = useCallback(async (order) => {
    setInternalLoading(true);
    // Run fields validation
    const validation_results = validateCreateOrder({ order });
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
      const stamp = `ORD-${uuid}`;
      const orderId_raw = `${uuid}-${order.sender.id}-${order.carrier.id}-${order.receiver.id}`;
      const orderId = await digestMessage(orderId_raw);
      
      try {
        const result = await createOrder({
          order: {...order, stamp },
          orderId,
          companyType: id === order?.carrier?.id ? "CARRIER" : "SENDER",
          owner: `${auth.attributes.sub}`,
        });

        if (result && (order?.docs && order?.docs?.length !== 0)) {
          for(let doc of order.docs) {
            if(doc?.files?.length > 0) {
              await dispatch(saveOrderFileToS3(doc.files));
            }
          }
        }
        
        if(!order?.selectedPreOrder) {
          navigate(`/orders?status=ALL&company=${pathname.split('/').at(-1).toUpperCase()}`)
        } else {
          setInternalLoading(false);
          dispatch(resetOrderCreator());
        }
      } catch (err) {
        console.error("Errore:", err);
        toast.error("Errore durante la creazione dell'ordine");
        setInternalLoading(false);
      }
    }

  }, []);

  return [
    handleCreateOrder,
    {
      isLoading: isLoading || internalLoading,
      validationError
    }
  ]
}