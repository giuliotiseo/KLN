import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { selectCurrentCompany } from "../../company/slices/companySlice";
import { useAuth } from "../../globals/hooks/useAuth";
import { generateCompanyCode, generateCompanyId } from "../../globals/libs/generators";
import { digestMessage } from "../../globals/libs/sha256";
import { useCreateCustomerMutation } from "../api/customers-api-slice";
import { selectCustomerCreatorSelectedCustomer } from "../slices/customerCreatorSlice";

// Helpers ---------------------------------------------------------------------------------------------------
const validateCreateCustomer = (data) => {
  let validation = [];
  const { customer, selectedCustomer, companyId, companyCode } = data;

  console.log({customer, selectedCustomer})
  console.log(customer?.vatNumber ? true : false)

  if(!customer?.name && !selectedCustomer?.name) {
    toast.error("Devi indicare la ragione sociale del cliente");
    validation.push("name");
  }

  if(!customer?.vatNumber && !selectedCustomer?.vatNumber) {
    toast.error("Partita IVA non trovata");
    validation.push("vatNumber");
  }
  
  if(!customer?.fiscalCode && !selectedCustomer?.fiscalCode) {
    toast.error("Codice fiscale azienda non trovato");
    validation.push("fiscalCode");
  }

  if(!customer?.city && !selectedCustomer?.city) {
    toast.error("Città sede principale non trovata");
    validation.push("city");
  }

  if(!customer?.address && !selectedCustomer?.address) {
    toast.error("Indirizzo sede principale non trovato");
    validation.push("address");
  }

  if(!companyId) {
    toast.error("ID Azienda non valido");
    validation.push("companyId");
  }

  if(!companyCode) {
    toast.error("Codice cliente non valido");
    validation.push("companyCode");
  }

  return validation;
}

// Hook ---------------------------------------------------------------------------------------------------
export default function useCreateCustomer() {
  const { auth } = useAuth();
  const [ createCustomer, { isLoading }] = useCreateCustomerMutation();
  const [ internalLoading, setInternalLoading ] = useState(false);
  const [ validationError, setValidationError ] = useState([]);
  const selectedCustomer = useSelector(selectCustomerCreatorSelectedCustomer);
  const { id: currentCompanyId, name: currentCompanyName } = useSelector(selectCurrentCompany);
  const navigate = useNavigate();
  
  const handleCreateCustomer = useCallback(async (customer) => {
    let companyId, companyCode, customerId = null;
    setInternalLoading(true);

    if(!selectedCustomer) {
      companyId = await generateCompanyId(customer.vatNumber, customer.city, customer.address);
      companyCode = generateCompanyCode(customer.name);
    }

    customerId = selectedCustomer?.id
      ? await digestMessage(`${selectedCustomer.id}-${auth.attributes.sub}`)
      : await digestMessage(`${companyId}-${auth.attributes.sub}`)

    // Run fields validation
    const validation_results = validateCreateCustomer({
      customer,
      selectedCustomer,
      companyId: companyId || selectedCustomer?.id,
      companyCode: companyCode || selectedCustomer?.companyCode
    });

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
        await createCustomer({
          customer,
          customerId,
          selectedCustomer,
          owner: `${auth.attributes.sub}`,
          tenant: `${auth.attributes.sub}`,
          ownerCompanyId: currentCompanyId,
          // nel caso in cui creo azienda + contatto mi occorrono queste informazioni
          currentCompanyName,
          generatedCustomer: { id: companyId, companyCode },
        });
  
        navigate('/customers');
      } catch (err) {
        console.error("Errore:", err);
        toast.error("Errore durante la creazione del contatto");
        setInternalLoading(false);
      }
    }

  }, [selectedCustomer]);

  return [
    handleCreateCustomer,
    {
      isLoading: isLoading || internalLoading,
      validationError
    }
  ]
}