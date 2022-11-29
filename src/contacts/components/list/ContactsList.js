import { useSelector } from 'react-redux'
import { selectCurrentCompany } from '../../../company/slices/companySlice'
import LinkButton from '../../../globals/components/buttons_v2/LinkButton'
import EmptyResultPage from '../../../globals/components/layout/EmptyResultPage'
import Spinner from '../../../globals/components/layout/Spinner'
import ContactsListItem from './ContactsListItem'

const ContactsList = ({
  contacts,
  listType,
  isFetching,
  selectedContact
}) => {
  const { id } = useSelector(selectCurrentCompany);

  const message = {
    ALL: "Nessun membro del personale presente in rubrica",
    WAREHOUSE: "Nessun magazziniere presente in rubrica",
    DRIVE: "Nessun autista presente in rubrica",
    ADMIN: "Nessun impiegato presente in rubrica",
  }

  if(contacts?.length <= 0) return ( 
    <EmptyResultPage message={message[listType]}>
      <LinkButton
        text="Aggiungi ora"
        className='btn-primary'
        to='new'
      />
    </EmptyResultPage>
  )

  return (
    <>
      { isFetching ? <Spinner className = "fixed right-8 bottom-8 h-5 w-5 text-primary-200 dark:text-primary-300" /> : null }
      <ul className="mt-4 mr-2">
        { contacts.map(contact => (
          <ContactsListItem
            key={contact.id}
            contact={contact}
            currentCompanyId={id}
            isSelected={selectedContact && selectedContact === contact.id}
          />
        ))}
      </ul>
    </>
  )
}

export default ContactsList
