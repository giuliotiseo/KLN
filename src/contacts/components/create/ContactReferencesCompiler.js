import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Checkbox from "../../../globals/components/dataEntry/Checkbox";
import ControlledSelector from "../../../globals/components/dataEntry/ControlledSelector";
import { SmallTitle } from "../../../globals/components/typography/titles";
// Helpers
import { removeDuplicates } from "../../../globals/libs/helpers";
import { CONTACT_TYPES } from "../../libs/helpers";
import { selectAllContacts } from "../../slices/allContactsSlice";

// Constants
const companyTypes = Object.keys(CONTACT_TYPES.companies);

export default function ContactReferencesCompiler({ contact, companyName, contactForm, updateForm, fromPath }) {
  const [ manualInsert, setManualInsert ] = useState(false);
  const allContacts = useSelector(selectAllContacts);
  const companyContactsName = removeDuplicates([companyName]
    .concat(Object.keys(allContacts)
      .map(c_id => allContacts[c_id])
      .filter(({ type }) => companyTypes.includes(type))
      .map(contact => contact.name)
    ));

  const handleManualInsert = () => {
    if(manualInsert === false) {
      updateForm({ target: { name: "job", type: "text", value: "" }});
      updateForm({ target: { name: "employee", type: "select", value: 0 }});
    } else {
      updateForm({ target: { name: "job", type: "text", value: companyContactsName?.[0] }});
      updateForm({ target: { name: "employee", type: "select", value: 1 }});
    }

    setManualInsert(prev => !prev);
  }
  

  return (
    <div className="bg-base-100 rounded-md">
      <SmallTitle styles="flex items-center mb-2">
        <span>Riferimenti contatto</span>
      </SmallTitle>
      <div className="mt-4">
        <label className="label" htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          value={contact.email}
          onChange={updateForm}
          className="input w-full"
        />
      </div>

      <div className="mt-4">
        <label className="label" htmlFor="phone">Telefono</label>
        <input
          type="text"
          name="phone"
          id="phone"
          value={contact.phone}
          onChange={updateForm}
          className="input w-full"
        />
      </div>

      { contactForm === "USER" && (
        <>
          <div className="mt-4">
            <ControlledSelector
              id="isEmployee"
              label="Luogo di lavoro"
              value={contact.employee}
              onChange={value => updateForm({ target: { name: "employee", type: "select", value }})}
              styles="input w-full"
              disabled={fromPath ? true : false}
            >
              <option value={0}>Lavora presso altra azienda</option>
              <option value={1}>Lavora presso {companyName}</option>
            </ControlledSelector>
          </div>

          { parseInt(contact.employee) === 0 && !fromPath && (
            <div className="mt-4">
              <Checkbox
                id="manual-instert"
                name={`manual-insert`}
                label="Inserisci posto di lavoro"
                value={manualInsert}
                initialStatus={manualInsert}
                onChange={handleManualInsert}
                styles="mb-4"
              />

              { !manualInsert
                ? <ControlledSelector
                    id="job"
                    label="Seleziona posto di lavoro"
                    value={contact.job}
                    onChange={value => updateForm({ target: { name: "job", type: "text", value }})}
                    styles="input w-full"
                  >
                    <option value="" disabled> - Seleziona dalla rubrica - </option>
                    { companyContactsName.map(el => (
                      <option key={el} value={el}>{el}</option>
                    ))}
                  </ControlledSelector>
                : <div>
                    <label htmlFor="job" className="label">Ragione sociale dell'azienda</label>
                    <input
                      type="text"
                      id="job"
                      name="job"
                      placeholder="Es. LTS SRL"
                      onChange={updateForm}
                      value={contact.job.toUpperCase()}
                      className="input w-full"
                    />
                  </div>
              }

            </div>
          )}
        </>
      )}
    </div>
  )
}