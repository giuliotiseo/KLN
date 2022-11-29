import Select from "../../../globals/components/dataEntry_v2/Select";
import { CONTACT_TYPES } from "../../libs/helpers";

export default function ContactFormTypeSelector({ contact, updateForm }) {
  return <>
    <div className="my-4">
      <Select
        id="type"
        label="Scegli reparto"
        value={contact.type}
        selectClassName="block w-full bg-light-300 dark:bg-dark-300"
        callback={updateForm}
      >
        { Object.keys(CONTACT_TYPES.users).map(opt_id => (
          <option key={opt_id} value={opt_id}>{CONTACT_TYPES.users[opt_id]}</option>
        ))}
      </Select>
    </div>
  </>
}