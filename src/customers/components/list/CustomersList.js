import LinkButton from '../../../globals/components/buttons_v2/LinkButton'
import EmptyResultPage from '../../../globals/components/layout/EmptyResultPage'
import Spinner from '../../../globals/components/layout/Spinner'
import CustomersListItem from './CustomersListItem'

const CustomersList = ({
  customers,
  listType,
  isFetching,
}) => {
  const message = {
    ALL: "Nessuna azienda cliente presente in rubrica",
    SENDER: "Nessun mittente presente in rubrica",
    RECEIVER: "Nessun destinatario presente in rubrica",
    CARRIER: "Nessun cliente vettore presente in rubrica",
  }

  if(customers?.length <= 0) return ( 
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
        { customers.map(customer => (
          <CustomersListItem key={customer.id} customer={customer} />
        ))}
      </ul>
    </>
  )
}

export default CustomersList
