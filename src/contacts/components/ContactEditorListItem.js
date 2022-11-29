import { Link } from "react-router-dom";
import { CONTACT_TYPES_SCOPE } from "../libs/helpers";
import { FiEdit } from "react-icons/fi";

const ContactEditorListItem = ({ contact, selected, customLink }) => {
  if(!contact) return null;
  const scope = CONTACT_TYPES_SCOPE[contact.type].toLowerCase();
  return (
    <li className='flex items-center border-b border-light-50 dark:border-dark-300 hover:bg-light-200 dark:hover:bg-dark-200'>
      {selected?.id === contact?.id && <FiEdit />}
      <Link
        to={customLink ? customLink : `/contacts/edit/${scope}?id=${contact.id}`}
        className={`
          block text-left py-2 px-1
          ${selected?.id === contact?.id ? 'font-bold' : ''}
        `}
      >
        {contact.name}
      </Link>
      {selected?.id === contact?.id && <span className='text-sm opacity-50 ml-2'>Stai modificando...</span> }
    </li>
  )
}

export default ContactEditorListItem;