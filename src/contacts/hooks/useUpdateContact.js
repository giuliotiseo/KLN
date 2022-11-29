import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUpdateContactMutation } from "../api/contacts-api-slice";
import useLogParams from "../../globals/hooks/useLogParams";
import { toast } from "react-toastify";
import { generateLogList } from "../../globals/libs/helpers";
import { CONTACT_PROPS_GLOSSARY } from "../libs/helpers";
import { selectContactEditor } from "../slices/contactEditorSlice";
import { selectCurrentCompany } from "../../company/slices/companySlice";

// Helpers ---------------------------------------------------------------------------------------------------
const validateUpdateContact = (data) => {
  let validation = [];
  const { contact } = data;

  if(!contact?.id) {
    toast.error("Attributo obbligatorio non trovato: ID. Riprovare o contattare il servizio di assistenza");
    validation.push("id");
  }

  if(!contact?.tenant) {
    toast.error("Attributo obbligatorio non trovato: tenant. Riprovare o contattare il servizio di assistenza");
    validation.push("tenant");
  }

  if(!contact?.name) {
    toast.error("Il contatto deve avere un nome");
    validation.push("name");
  }

  if(!contact?.surname) {
    toast.error("Il contatto deve avere un cognome");
    validation.push("surname");
  }

  if(!contact?.searchable) {
    toast.error("Attributo obbligatorio non trovato: searchable. Riprovare o contattare il servizio di assistenza");
    validation.push("searchable");
  }
  
  if(!contact?.email) {
    toast.error("Devi inserire un'email valida per questo contatto");
    validation.push("email");
  }

  return validation;
}

// Hook ---------------------------------------------------------------------------------------------------
export default function useUpdateContact(inputContact) {
  const [ updateContact, { isLoading }] = useUpdateContactMutation();
  const [ internalLoading, setInternalLoading ] = useState(false);
  const [ validationError, setValidationError ] = useState([]);
  const contactEditorForm = useSelector(selectContactEditor);
  const company = useSelector(selectCurrentCompany);
  const logParams = useLogParams({
    action: "Aggiornamento",
    data: contactEditorForm,
    previousLogs: inputContact?.log,
    propsGlossary: CONTACT_PROPS_GLOSSARY,
    limit: 20,
  });

  const navigate = useNavigate();

  const handleUpdateContact = useCallback(async (contact) => {
    setInternalLoading(true);
    let contactToSend = {
      id: inputContact.id,
      tenant: inputContact.tenant,
      name: inputContact.name,
      surname: inputContact.surname,
      ...contact,
      searchable: `${contact?.name?.toLowerCase() || inputContact.name.toLowerCase()} ${contact?.surname?.toLowerCase() || inputContact.surname.toLowerCase() }`,
      email: contact?.email || inputContact?.email,
      jobId: contact?.job?.id || inputContact?.jobId,
      jobName: contact?.job?.name || inputContact?.jobName,
      log: generateLogList({
        ...logParams,
        domain: company,
        excludedKeys: [
          "id",
          "name",
          "tenant",
          "surname",
          "searchable",
          "email",
          "log",
          "job",
          "jobName"
        ]
      })
    };

    if(Object.keys(contactToSend).includes("job")) {
      delete contactToSend.job;
    }

    // Run fields validation
    const validation_results = validateUpdateContact({ contact: contactToSend });
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
        console.log("Contacttosend", contactToSend);
        await updateContact(contactToSend);
        navigate('/contacts');
      } catch (err) {
        console.error("Errore:", err);
        toast.error("Errore durante l'aggiornamento del contatto");
        setInternalLoading(false);
      }
    }

  }, [inputContact]);

  return [
    handleUpdateContact,
    {
      isLoading: isLoading || internalLoading,
      validationError
    }
  ]
}