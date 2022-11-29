import { useCallback } from "react";
import { useSelector } from "react-redux";
import useFormReducer from "../../globals/hooks/useFormReducer";
import useCreateContact from "../hooks/useCreateContact";
import { selectCurrentCompany } from "../../company/slices/companySlice";
// Components
import Button from "../../globals/components/buttons_v2/Button";
import ContactFormSidebar from "../components/form/ContactFormSidebar";
import ContactDetailsFields from "../components/form/ContactDetailsFields";
// Reducer
import { initialState, customContactFormLogic } from "../libs/reducers";
// Icons
import { FiCheck, FiTerminal } from "react-icons/fi";
import { BiReset } from "react-icons/bi";

export default function ContactCreatorContainer() {
  const [ contact, updateForm ] = useFormReducer(initialState, customContactFormLogic);
  const [ createContact, { isLoading, validationError }] = useCreateContact();
  const company = useSelector(selectCurrentCompany);

  /* 
    * Callbacks 
  */
  // To show data if it has not been loaded yet
  const updateWindows = useCallback((payload) => {
    updateForm({
      type: "custom",
      name: payload.type,
      value: {
        value: payload.value,
        windowType: payload.windowType,
        index: payload.index,
        windows: contact.windows,
        name: payload.type === "toggle_day"
          ? "day"
          : payload.name
      }
    });
  }, [contact.windows]);

  const updateJob = useCallback((payload) => {
    updateForm({
      type: "custom",
      name: "job",
      value: payload.id === contact?.job?.id 
        ? null
        : { id: payload.id, name: payload.name }
    });
  }, [contact.job]);

  const updateEmployee = useCallback((payload) => {
    updateForm({
      type: "custom",
      name: "employee",
      value: {
        employee: payload,
        job: { id: company.id, name: company.name }
      }
    });
  }, [contact.employee, contact.job, company.name]);
  
  return (
    <div className="flex flex-col h-full w-full">      
      {/* Sidebar */}
      <div className="flex flex-col md:flex-row h-full">
        <aside className="relative pr-2 rounded-lg flex-1">
          <ContactFormSidebar
            contact={contact}
            updateForm={updateForm}
            validationError={validationError}
          />
        </aside>

        {/* Content */}
        <section className="relative flex-3 bg-base-200">
          <ContactDetailsFields
            contact={contact}
            updateForm={updateForm}
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
          <span className="text-sm">Creazione contatto</span>
        </h5>

        <div className="flex items-center gap-2">
          <Button
            className="btn-primary-outline  ml-auto"
            icon={<BiReset />}
            text="Reset"
            onClick={() => console.log("resetta")}
            // onClick={() => updateForm({ type: "reset", name: "reset", value: null })}
          />

          <Button
            className="btn-primary ml-auto"
            icon={<FiCheck />}
            text="Salva il contatto"
            loading={isLoading}
            onClick={() => createContact({
              ...contact,
              windows: Object.keys(contact.windows).reduce((acc, val) => ({
                ...acc,
                [val]: contact.windows[val].map(window => ({
                  ...window,
                  start: window?.start ? new Date(window.start).toISOString() : null,
                  end: window?.end ? new Date(window.end).toISOString() : null,
                }))
              }), {})
            })}
          />
        </div>
      </footer>
    </div>
  )
}