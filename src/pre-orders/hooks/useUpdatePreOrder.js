import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useLogParams from "../../globals/hooks/useLogParams";
import { useUpdatePreOrderMutation } from "../api/pre-orders-api-slice";
import { toast } from "react-toastify";
import { generateLogList } from "../../globals/libs/helpers";
import { selectPreOrderBeforeUpdate } from "../slices/preOrderEditorSlice";
import { selectCurrentCompany } from "../../company/slices/companySlice";
import { PREORDER_PROPS_GLOSSARY } from "../libs/constants";
import { saveAndDeletePreOrderFileToS3 } from "../api/pre-orders-thunks";
import { useDispatch } from "react-redux";

// Helpers ---------------------------------------------------------------------------------------------------
const validateUpdatePreOrder = (data) => {
  let validation = [];
  const { preOrder } = data;

  if(!preOrder?.id) {
    toast.error("Attributo obbligatorio non trovato: ID. Riprovare o contattare il servizio di assistenza");
    validation.push("id");
  }

  return validation;
}

// Hook ---------------------------------------------------------------------------------------------------
export default function useUpdatePreOrder(inputPreOrder) {
  const [ updatePreOrder, { isLoading }] = useUpdatePreOrderMutation();
  const [ internalLoading, setInternalLoading ] = useState(false);
  const [ validationError, setValidationError ] = useState([]);
  const preOrderEditor = useSelector(selectPreOrderBeforeUpdate);
  const company = useSelector(selectCurrentCompany);
  const dispatch = useDispatch();
  const logParams = useLogParams({
    action: "Aggiornamento",
    data: preOrderEditor,
    previousLogs: inputPreOrder?.log,
    propsGlossary: PREORDER_PROPS_GLOSSARY,
    limit: 20,
  });

  const navigate = useNavigate();

  const handleUpdatePreOrder = useCallback(async () => {
    setInternalLoading(true);
    let preOrderToSend = {
      id: inputPreOrder.id,
      stamp: inputPreOrder.stamp,
      name: inputPreOrder.name,
      shipmentType: inputPreOrder.shipmentType,
      pickupDateStart: inputPreOrder.pickupDateStart,
      pickupDateEnd: inputPreOrder.pickupDateEnd,
      status: inputPreOrder.status,
      createdAt: inputPreOrder.createdAt,
      ...preOrderEditor,
      log: generateLogList({
        ...logParams,
        domain: company,
        excludedKeys: [
          "id",
          "stamp",
          "address",
          "log",
          "completedAt",
        ]
      })
    };

    if(Object.keys(preOrderToSend).includes("carrier")) {
      preOrderToSend.carrierId = preOrderToSend.carrier.company.id;
      preOrderToSend.carrierName = preOrderToSend.carrier.name;
      preOrderToSend.carrierVat = preOrderToSend.carrier.vatNumber;
      preOrderToSend.tenantCarrier = preOrderToSend.carrier.company.owner;
      delete preOrderToSend.carrier;
    }

    if(Object.keys(preOrderToSend).includes("sender")) {
      preOrderToSend.senderId = preOrderToSend.sender.company.id;
      preOrderToSend.senderName = preOrderToSend.sender.name;
      preOrderToSend.senderVat = preOrderToSend.sender.vatNumber;
      preOrderToSend.tenantSender = preOrderToSend.sender.company.owner;
      if(Object.keys(preOrderToSend).includes("checkpoint")) {
        if(preOrderToSend?.checkpoint?.thirdCompanyId !== preOrderToSend.sender.company.id) {
          preOrderToSend.storageId = preOrderToSend?.checkpoint?.thirdCompanyId || "";
          preOrderToSend.tenantStorage = preOrderToSend?.checkpoint?.thirdCompanyOwner || "";
          preOrderToSend.storageName = preOrderToSend?.checkpoint?.thirdCompanyName || "";
          preOrderToSend.storageVat = preOrderToSend?.checkpoint?.thirdCompanyVat || "";
        } else {
          preOrderToSend.storageId = preOrderToSend.sender.company.id;
          preOrderToSend.tenantStorage = preOrderToSend.sender.company.owner;
          preOrderToSend.storageName = preOrderToSend.sender.name;
          preOrderToSend.storageVat = preOrderToSend.sender.vatNumber;
        }
      }

      delete preOrderToSend.sender;
    }

    // Run fields validation
    const validation_results = validateUpdatePreOrder({ preOrder: preOrderToSend });
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
        console.log("PreOrderToSend", preOrderToSend);
        const result = await updatePreOrder(preOrderToSend);
        if (result && (preOrderToSend?.files && preOrderToSend?.files?.length !== 0)) {
          await dispatch(saveAndDeletePreOrderFileToS3(preOrderToSend.files));
        }

        navigate('/pre-orders');
      } catch (err) {
        console.error("Errore:", err);
        toast.error("Errore durante l'aggiornamento del pre-ordine");
        setInternalLoading(false);
      }
    }

  }, [inputPreOrder]);

  return [
    handleUpdatePreOrder,
    {
      isLoading: isLoading || internalLoading,
      validationError
    }
  ]
}