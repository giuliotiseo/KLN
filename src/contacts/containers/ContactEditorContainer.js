import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useContactToEdit, useUpdateContact } from "../hooks";
import { selectCurrentCompany } from "../../company/slices/companySlice";
// Components
import Button from "../../globals/components/buttons_v2/Button";
import ContactFormSidebar from "../components/form/ContactFormSidebar";
import ContactDetailsFields from "../components/form/ContactDetailsFields";
import Spinner from "../../globals/components/layout/Spinner";
// Icons
import { BiReset } from "react-icons/bi";
import { FiCheck, FiTerminal } from "react-icons/fi";
import { changeContactEditorEmployee, changeContactEditorForm, changeContactEditorJob, changeContactEditorWindows } from "../slices/contactEditorSlice";

export default function ContactEditorContainer() {
  const [ searchParams ] = useSearchParams();
  const id = searchParams.get('id');
  const { contact, isLoading: isFetchingContact } = useContactToEdit(id);
  const [ updateContact, { isLoading, validationError }] = useUpdateContact(contact);
  const company = useSelector(selectCurrentCompany);
  const dispatch = useDispatch();

  /* 
    * Callbacks 
  */
  // To show data if it has not been loaded yet
  const updateWindows = useCallback((payload) => {
    dispatch(changeContactEditorWindows({
      value: payload.value instanceof Date
        ? payload.value.toISOString()
        : payload.value,
      windows: contact.windows,
      windowType: payload.windowType,
      index: payload.index,
      name: payload.type === "toggle_day"
        ? "days"
        : payload.name
    }))
  }, [contact.windows]);

  const updateJob = useCallback((payload) => {
    dispatch(changeContactEditorJob({
      id: payload.id,
      name: payload.name
    }));
  }, [contact.job]);

  const updateEmployee = useCallback(() => {
    if(!contact.employee) {
      dispatch(changeContactEditorEmployee({
        employee: 1,
        job: { id: company.id, name: company.name }
      }));
    } else {
      dispatch(changeContactEditorEmployee({
        employee: 0,
        job: {}
      }));
    }
  }, [contact.employee, contact.job, company]);

  if(isFetchingContact) return <div>
    <Spinner />
  </div>
  
  return (
    <div className="flex flex-col h-full w-full">      
      {/* Sidebar */}
      <div className="flex flex-col md:flex-row h-full">
        <aside className="relative pr-2 rounded-lg flex-1">
          <ContactFormSidebar
            contact={contact}
            updateForm={(payload) => dispatch(changeContactEditorForm(payload))}
            validationError={validationError}
          />
        </aside>

        {/* Content */}
        <section className="relative flex-3 bg-base-200">
          <ContactDetailsFields
            contact={contact}
            updateForm={(payload) => dispatch(changeContactEditorForm(payload))}
            updateWindows={updateWindows}
            updateJob={updateJob}
            updateEmployee={updateEmployee}
            validationError={validationError}
          />
        </section>
      </div>

      <footer className="footer">
        <h5 className="title-5 uppercase opacity-50 flex items-center">
          <FiTerminal className="mr-1" />
          <span className="text-sm">Modifica contatto</span>
        </h5>

        <div className="flex items-center gap-2">
          <Button
            className="btn-primary-outline  ml-auto"
            icon={<BiReset />}
            text="Reset"
            onClick={() => console.log("Resetta")}
          />

          <Button
            className="btn-primary ml-auto"
            icon={<FiCheck />}
            text="Aggiorna il contatto"
            loading={isLoading}
            onClick={() => updateContact(contact)}
          />
        </div>
      </footer>
    </div>
  )
}