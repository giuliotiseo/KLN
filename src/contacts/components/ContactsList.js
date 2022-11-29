import { useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';
// Components
import ContactListItem from "./ContactListItem";
import InlineSpinner from '../../globals/components/spinners/InlineSpinner';
import ActionButton from '../../globals/components/buttons/ActionButton';
import { Paragraph } from "../../globals/components/typography/paragraphs";
// Store
import { selectContactListIds, selectContactsFiltersNextToken } from '../slices/listContactsSlice';
import { FiArrowDownCircle } from 'react-icons/fi';

export default function ContactsList({
  next, 
  contacts = [],
  inputContacts = null,
  inputNextToken,
  origin = "local",
  loading = false,
  controls = true,
  showLastText = true,
  listItemRender = null
}) {
  let contactsIds = useSelector(selectContactListIds);
  let nextToken = useSelector(selectContactsFiltersNextToken);
  let contactsToRender = [];

  if(inputContacts) {
    contactsIds = Object.keys(inputContacts);
    contactsToRender = inputContacts;
    nextToken = inputNextToken || null;
  } else {
    contactsToRender = contacts;
  }

  if(loading) {
    return (
      <div className="h-full m-4">
        <InlineSpinner color="#158084" loading={loading} />
      </div>
    )
  }

  // Dynamic item component render
  const itemComponent = listItemRender 
    ? (c_id) => listItemRender(c_id, contactsToRender[c_id], !controls)
    : (c_id) => (
        <ContactListItem
          key={c_id} 
          contact={contactsToRender[c_id]} 
          origin={origin}
          disabledOptions={!controls}
        />
      )

  return (
    <div id="contacts-list" className="h-full">
      { !contactsToRender || contactsToRender.length === 0 
        ? <Paragraph styles="mx-4 mt-6 opacity-50">Nessun contatto presente</Paragraph>
        : <ul className='last:border-b-transparent'>
            { contactsIds.map(c_id => itemComponent(c_id))}
          </ul>
        }

        {(contactsToRender?.length > 0 || Object.keys(contactsToRender)?.length > 0) && nextToken 
          ? <ActionButton
            text="Mostra altri"
            loading={nextToken === "loading"}
            icon={() => <FiArrowDownCircle />}
            styles="btn-ghost ml-4"
            onClick={next}
          /> 
          : showLastText && contactsToRender && contactsToRender > 0
            ? <Paragraph styles="opacity-50 px-4 my-4">Non ci sono altri contatti da mostrare</Paragraph> 
            : <div />
        }
      <ReactTooltip />
    </div>
  )
}