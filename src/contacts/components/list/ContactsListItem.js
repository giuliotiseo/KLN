import { Link } from "react-router-dom";
import Avatar from "../../../globals/components/layout/Avatar";
import ListItem from '../../../globals/components/layout/ListItem'
import { CONTACT_TYPE_DESCRIPTION } from "../../libs/helpers";
import ContactsListItemDropdown from "./ContactsListItemDropdown";

const ContactsListItem = ({
  contact,
  currentCompanyId,
  isSelected = false
}) => {
  return (
    <ListItem className={`
      justify-between p-4
      ${ isSelected ? 'opacity-50 pointer-events-none shadow-none bg-transparent'  : ''}
    `}>
      <div className="flex items-center">
        <Avatar
          name={`${contact.searchable }`}
          size={50}
          stepColor={100}
          src={contact?.avatar}
        />

        <div className="ml-2">
          <h3 className='inline-flex items-center text-lg md:text-xl uppercase'>
            <Link to={`/contacts/view?id=${contact.id}`} className="mr-2 flex-1 hover:text-primary-200 dark:text-primary-300 transition-colors">
              <span>{ contact.searchable }</span>
            </Link>

            { currentCompanyId === contact?.jobId
              ? <span className="chip-neutral text-sm my-0">
                  {contact.jobName}
                </span>
              : <Link to={`/customers/view?id=${contact.jobId}`}>
                  <span className="chip-neutral text-sm my-0">
                    {contact.jobName}
                  </span>
                </Link>
            }
          </h3>
          <p className="ml-1 text-sm text-secondary-200 dark:text-secondary-300">
            {CONTACT_TYPE_DESCRIPTION[contact.type]}
          </p>
        </div>
      </div>
      
      <ContactsListItemDropdown id={contact.id} />
    </ListItem>
  )
}

export default ContactsListItem;
