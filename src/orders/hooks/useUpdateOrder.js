import { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useLogParams from "../../globals/hooks/useLogParams";
import { useUpdateOrderMutation } from "../api/orders-api-slice";
import { toast } from "react-toastify";
import { generateLogList, mergeArrays } from "../../globals/libs/helpers";
import { selectOrderBeforeUpdate } from "../slices/orderEditorSlice";
import { selectCurrentCompany } from "../../company/slices/companySlice";
import { ORDER_PROPS_GLOSSARY } from "../libs/constants";
import { saveAndDeleteOrderFileToS3 } from "../api/orders-thunks";

// Helpers ---------------------------------------------------------------------------------------------------
const validateUpdateOrder = (data) => {
  let validation = [];
  const { order } = data;

  if(!order?.id) {
    toast.error("Attributo obbligatorio non trovato: ID. Riprovare o contattare il servizio di assistenza");
    validation.push("id");
  }

  if(!order?.stamp) {
    toast.error("Attributo obbligatorio non trovato: stamp. Riprovare o contattare il servizio di assistenza");
    validation.push("stamp");
  }

  if(!order?.name) {
    toast.error("Attributo obbligatorio non trovato: nome ordine. Riprovare o contattare il servizio di assistenza");
    validation.push("name");
  }

  if(!order?.createdAt) {
    toast.error("Attributo obbligatorio non trovato: createdAt. Riprovare o contattare il servizio di assistenza");
    validation.push("createdAt");
  }

  if(!order.hasOwnProperty('completedAt')) {
    toast.error("Attributo obbligatorio non trovato: completedAt. Riprovare o contattare il servizio di assistenza");
    validation.push("completedAt");
  }

  if(!order.hasOwnProperty('collectChecks')) {
    toast.error("Attributo obbligatorio non trovato: collectChecks. Riprovare o contattare il servizio di assistenza");
    validation.push("collectChecks");
  }

  return validation;
}

// Hook ---------------------------------------------------------------------------------------------------
export default function useUpdateOrder(inputOrder) {
  const [ updateOrder, { isLoading }] = useUpdateOrderMutation();
  const [ internalLoading, setInternalLoading ] = useState(false);
  const [ validationError, setValidationError ] = useState([]);
  const orderEditor = useSelector(selectOrderBeforeUpdate);
  const company = useSelector(selectCurrentCompany);
  const dispatch = useDispatch();
  const logParams = useLogParams({
    action: "Aggiornamento",
    data: orderEditor,
    previousLogs: inputOrder?.log,
    propsGlossary: ORDER_PROPS_GLOSSARY,
    limit: 20,
  });

  const navigate = useNavigate();

  const handleUpdateOrder = useCallback(async () => {
    setInternalLoading(true);
    let orderToSend = {
      id: inputOrder.id,
      stamp: inputOrder.stamp,
      name: inputOrder.name,
      createdAt: inputOrder.createdAt,
      completedAt: inputOrder.completedAt,
      collectChecks: inputOrder.collectChecks,
      senderVat: inputOrder.senderVat,
      // Ids
      carrierId: inputOrder.carrierId,
      senderId: inputOrder.senderId,
      receiverId: inputOrder.receiverId,
      pickupStorageId: inputOrder.pickupStorageId,
      deliveryStorageId: inputOrder.deliveryStorageId,
      status: inputOrder.status,
      ...orderEditor,
      log: generateLogList({
        ...logParams,
        domain: company,
        excludedKeys: ["id"]
      })
    };

    if(Object.keys(orderToSend).includes("status")) {
      if(orderToSend.status === "DELIVERED") {
        console.log("Ao e iamm... ad entrare entro...", orderToSend);
        orderToSend.completedAt = new Date().toISOString();
      }
    }

    if(Object.keys(orderToSend).includes("carrier")) {
      orderToSend.carrierId = orderToSend.carrier.company.id;
      orderToSend.carrierName = orderToSend.carrier.name;
      orderToSend.carrierVat = orderToSend.carrier.vatNumber;
      orderToSend.tenantCarrier = orderToSend.carrier.company.owner;
      delete orderToSend.carrier;
    }

    if(Object.keys(orderToSend).includes("sender")) {
      orderToSend.senderId = orderToSend.sender.company.id;
      orderToSend.senderName = orderToSend.sender.name;
      orderToSend.senderVat = orderToSend.sender.vatNumber;
      orderToSend.tenantSender = orderToSend.sender.company.owner;
      if(Object.keys(orderToSend).includes("pickupCheckpoint")) {
        if(orderToSend?.pickupCheckpoint?.thirdCompanyId && (orderToSend?.pickupCheckpoint?.thirdCompanyId !== orderToSend.sender.company.id)) {
          orderToSend.pickupStorageId = orderToSend?.pickupCheckpoint?.thirdCompanyId || "";
          orderToSend.tenantPickupStorage = orderToSend?.pickupCheckpoint?.thirdCompanyOwner || "";
          orderToSend.pickupStorageName = orderToSend?.pickupCheckpoint?.thirdCompanyName || "";
          orderToSend.pickupStorageVat = orderToSend?.pickupCheckpoint?.thirdCompanyVat || "";
        } else {
          orderToSend.pickupStorageId = orderToSend.sender.company.id;
          orderToSend.tenantPickupStorage = orderToSend.sender.company.owner;
          orderToSend.pickupStorageName = orderToSend.sender.name;
          orderToSend.pickupStorageVat = orderToSend.sender.vatNumber;
        }
      }

      delete orderToSend.sender;
    }

    if(Object.keys(orderToSend).includes("receiver")) {
      orderToSend.receiverId = orderToSend.receiver.company.id;
      orderToSend.receiverName = orderToSend.receiver.name;
      orderToSend.receiverVat = orderToSend.receiver.vatNumber;
      orderToSend.tenantSender = orderToSend.receiver.company.owner;
      if(Object.keys(orderToSend).includes("deliveryCheckpoint")) {
        if(orderToSend?.deliveryCheckpoint?.thirdCompanyId && (orderToSend?.deliveryCheckpoint?.thirdCompanyId !== orderToSend.receiver.company.id)) {
          orderToSend.deliveryStorageId = orderToSend?.deliveryCheckpoint?.thirdCompanyId || "";
          orderToSend.tenantDeliveryStorage = orderToSend?.deliveryCheckpoint?.thirdCompanyOwner || "";
          orderToSend.deliveryStorageName = orderToSend?.deliveryCheckpoint?.thirdCompanyName || "";
          orderToSend.deliveryStorageVat = orderToSend?.deliveryCheckpoint?.thirdCompanyVat || "";
        } else {
          orderToSend.deliveryStorageId = orderToSend.receiver.company.id;
          orderToSend.tenantDeliveryStorage = orderToSend.receiver.company.owner;
          orderToSend.deliveryStorageName = orderToSend.receiver.name;
          orderToSend.deliveryStorageVat = orderToSend.receiver.vatNumber;
        }
      }

      delete orderToSend.sender;
    }

    if(Object.keys(orderToSend).includes("palletInfo")) {
      let palletInfo = {
        ...inputOrder.palletInfo,
        ...orderToSend.palletInfo
      }

      orderToSend.palletInfo = [].concat.apply([], Object.keys(palletInfo).map(p => palletInfo[p])).map(plt => ({
        value: plt.value,
        type: plt.type,
        size: plt.size,
        system: plt.system
      }));
    }
    
    // Run fields validation
    const validation_results = validateUpdateOrder({ order: orderToSend });
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
        console.log("OrderToSend", orderToSend);
        const result = await updateOrder(orderToSend);
        if (result && (orderToSend?.docs && orderToSend?.docs?.length !== 0)) {
          const allFiles = mergeArrays(orderToSend.docs.filter(doc => doc?.files?.length > 0).map(doc => doc.files));
          await dispatch(saveAndDeleteOrderFileToS3(allFiles));
        }

        navigate('/orders');
      } catch (err) {
        console.error("Errore:", err);
        toast.error("Errore durante l'aggiornamento dell'ordine");
        setInternalLoading(false);
      }
    }

  }, [inputOrder]);

  return [
    handleUpdateOrder,
    {
      isLoading: isLoading || internalLoading,
      validationError
    }
  ]
}