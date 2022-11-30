import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCreateContactMutation } from "../api/contacts-api-slice";
import { toast } from "react-toastify";
import { selectCurrentCompany } from "../../company/slices/companySlice";
import { useAuth } from "../../globals/hooks/useAuth";
import { digestMessage } from "../../globals/libs/sha256";

// Helpers ---------------------------------------------------------------------------------------------------
const validateCreateContact = (data) => {
  let validation = [];
  const { contact } = data;

  if(!contact?.name) {
    toast.error("Devi indicare il nome del contatto");
    validation.push("name");
  }

  if(!contact?.surname) {
    toast.error("Devi indicare il cognome del contatto");
    validation.push("surname");
  }
  
  if(!contact?.email) {
    toast.error("Devi inserire un'email valida per questo contatto");
    validation.push("email");
  }

  return validation;
}

// Hook ---------------------------------------------------------------------------------------------------
export default function useCreateContact() {
  const { auth } = useAuth();
  const [ createContact, { isLoading }] = useCreateContactMutation();
  const [ internalLoading, setInternalLoading ] = useState(false);
  const [ validationError, setValidationError ] = useState([]);
  const { id: companyId } = useSelector(selectCurrentCompany);
  const navigate = useNavigate();
  
  const handleCreateContact = useCallback(async (contact) => {
    setInternalLoading(true);
    // Run fields validation
    const validation_results = validateCreateContact({ contact });
    if(validation_results?.length > 0) {
      setValidationError(validation_results);
      console.groupCollapsed("Validation fails");
      for(const error of validation_results) console.error(error);
      console.groupEnd();
      setInternalLoading(false);
      throw new Error("Validation failure");
    } else {      
      setValidationError([]);
      const contactId = await digestMessage(`${contact?.email}-${contact.name}-${contact.surname}`);
      try {
        await createContact({
          contact,
          contactId,
          companyId,
          tenant: `${auth.attributes.sub}`,
        });
  
        navigate('/contacts');
      } catch (err) {
        console.error("Errore:", err);
        toast.error("Errore durante la creazione del contatto");
        setInternalLoading(false);
      }
    }

  }, []);

  return [
    handleCreateContact,
    {
      isLoading: isLoading || internalLoading,
      validationError
    }
  ]
}