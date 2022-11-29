import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUpdateCustomerMutation } from "../api/customers-api-slice";
import { toast } from "react-toastify";
import { generateLogList } from "../../globals/libs/helpers";
import useLogParams from "../../globals/hooks/useLogParams";
import { selectCustomerEditedAttributes } from "../slices/customerEditorSlice";
import { CUSTOMER_PROPS_GLOSSARY } from "../libs/constants";
import { selectCurrentCompany } from "../../company/slices/companySlice";

// Helpers ---------------------------------------------------------------------------------------------------
const validateUpdateCustomer = (data) => {
  let validation = [];
  const { customer } = data;

  console.log("Vedo la validazione", data);

  if(!customer?.id) {
    toast.error("Attributo obbligatorio non trovato: ID. Riprovare o contattare il servizio di assistenza");
    validation.push("id");
  }

  if(!customer?.companyId) {
    toast.error("Attributo obbligatorio non trovato: companyId. Riprovare o contattare il servizio di assistenza");
    validation.push("companyId");
  }

  if(!customer?.name) {
    toast.error("Il cliente deve avere una ragione sociale");
    validation.push("name");
  }

  if(!customer?.vatNumber) {
    toast.error("Il cliente deve avere una partita IVA");
    validation.push("vatNumber");
  }

  if(!customer?.searchable) {
    toast.error("Attributo obbligatorio non trovato: searchable. Riprovare o contattare il servizio di assistenza");
    validation.push("searchable");
  }

  return validation;
}

// Hook ---------------------------------------------------------------------------------------------------
export default function useUpdateCustomer(inputCustomer) {
  const [ updateCustomer, { isLoading }] = useUpdateCustomerMutation();
  const [ internalLoading, setInternalLoading ] = useState(false);
  const [ validationError, setValidationError ] = useState([]);
  const editedCustomerFields = useSelector(selectCustomerEditedAttributes);
  const company = useSelector(selectCurrentCompany);
  const logParams = useLogParams({
    action: "Aggiornamento",
    data: editedCustomerFields,
    previousLogs: inputCustomer?.log,
    propsGlossary: CUSTOMER_PROPS_GLOSSARY,
    limit: 20,
  });

  const navigate = useNavigate();

  const handleUpdateCustomer = useCallback(async () => {
    setInternalLoading(true);
    let customerToSend = {
      // campi obbligaori non modificabili
      id: inputCustomer.id,
      name: inputCustomer.name,
      vatNumber: inputCustomer.vatNumber,
      searchable: inputCustomer.searchable,
      companyCode: inputCustomer.companyCode,
      tenant: inputCustomer.tenant,
      companyId: inputCustomer.companyId,
      // fine campi obbligatori non modificabili
      // campi obbligatori modificabili
      isSender: inputCustomer.isSender,
      isCarrier: inputCustomer.isCarrier,
      isReceiver: inputCustomer.isReceiver,
      // fine campi obbligatori modificabili
      ...editedCustomerFields,
      log: generateLogList({
        ...logParams,
        domain: company,
        excludedKeys: [
          "id",
          "tenant",
          "companyCode",
          "isSender",
          "isCarrier",
          "isReceiver",
          "log",
        ]
      })
    };

    // Run fields validation
    const validation_results = validateUpdateCustomer({ customer: customerToSend });
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
        await updateCustomer(customerToSend);
        setInternalLoading(false);
        // navigate('/customers');
      } catch (err) {
        console.error("Errore:", err);
        toast.error("Errore durante l'aggiornamento del contatto");
        setInternalLoading(false);
      }
    }

  }, [inputCustomer]);

  return [
    handleUpdateCustomer,
    {
      isLoading: isLoading || internalLoading,
      validationError
    }
  ]
}