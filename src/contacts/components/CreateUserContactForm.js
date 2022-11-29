import { useSelector } from "react-redux";
// Components
import FormDatalist from "../../globals/components/dataEntry/FormDatalist";
import TextEditor from "../../globals/components/dataEntry/TextEditor";
import FormText from "../../globals/components/dataEntry/FormText";
import FormPhone from "../../globals/components/dataEntry/FormPhone";
import ControlledSelector from "../../globals/components/dataEntry/ControlledSelector";
// Selectors
import { selectAllContacts } from "../slices/allContactsSlice";
// Helpers
import { removeDuplicates } from "../../globals/libs/helpers";
import { CONTACT_TYPES } from "../libs/helpers";
// Constants
const companyTypes = Object.keys(CONTACT_TYPES.companies);

// Main component
export default function CreateUserContactForm({
  nameState, surnameState, emailState, 
  phoneState, prefixState, jobState, companyName, 
  employeeState, noteState, isFromPath
}) {
  const [ name, setName ] = nameState;
  const [ surname, setSurname ] = surnameState;
  const [ email, setEmail ] = emailState;
  const [ phone, setPhone ] = phoneState;
  const [ prefix, setPrefix ] = prefixState;
  const [ job, setJob ] = jobState;
  const [ employee, setEmployee ] = employeeState;
  const [ note, setNote ] = noteState;
  const allContacts = useSelector(selectAllContacts);

  const companyContactsName = removeDuplicates([companyName]
    .concat(Object.keys(allContacts)
      .map(c_id => allContacts[c_id])
      .filter(({ type }) => companyTypes.includes(type))
      .map(contact => contact.name)
    ));

  return (
    <>
      {/* Name */}
      <div className="grid grid-cols-2 gap-x-2">
        <div className="col-span-1">              
          <FormText
            name="name"
            label="Inserisci nome"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="es: Mario"
          />
        </div>
        <div className="col-span-1">              
          <FormText
            name="surname"
            label="Inserisci cognome"
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            placeholder="es: Rossi"
          />
        </div>
        {/* Email */}
        <div className="col-span-1">
          <FormText
            name="email"
            label="Inserisci email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="es: mario.rossi@lts.it"
          />
        </div>

        {/* Phone */}
        <div className="col-span-1">
          <FormPhone 
            name="phone"
            label="Inserisci telefono"
            type="phone"
            onChangePrefix={(val) => setPrefix(val)}
            onChange={(e) => setPhone(e.target.value)}
            prefix={prefix}
            value={phone}
            placeholder="es: 3331234567"
          />
        </div>

        <div className="col-span-1">
          <div className="mt-2">
            <ControlledSelector
              id="isEmployee"
              label="Luogo di lavoro"
              value={employee}
              onChange={(val) => setEmployee(val)}
              styles="bg-light-300 w-full border border-light-100 dark:border-dark-100"
              disabled={isFromPath}
            >
              <option value={0}>Lavora presso altra azienda</option>
              <option value={1}>Lavora presso {companyName}</option>
            </ControlledSelector>
          </div>

          { parseInt(employee) === 0 && !isFromPath && (
            <FormDatalist
              label="Inserisci azienda per cui lavora"
              placeholder={`es: ${companyName}`}
              name="job"
              val={job}
              onChange={val => setJob(val)}
              options={companyContactsName}
            />
          )}
        </div>

        {/* Notes */}
        {/* <div className="col-span-1 mt-2">
          <TextEditor 
            content={note || null}
            onSaveTextEditor={(content) => setNote(content)} 
            label="Note contatto"
            actionButtonPosition="INTERNAL"
          />
        </div> */}
      </div>
    </>
  )
}
