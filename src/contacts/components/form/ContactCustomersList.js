import Button from '../../../globals/components/buttons_v2/Button'
import Spinner from '../../../globals/components/layout/Spinner'
import { FiCheckSquare, FiSquare } from 'react-icons/fi'

const ContactCustomersListItem = ({
  customer,
  onClick,
  isChecked,
  editable
}) => (
  <li className='border-b border-light-50 dark:border-dark-50 last:border-none'>
    { editable 
      ? <div>
          <Button
            icon={isChecked ? <FiCheckSquare className='mr-2 opacity-100 text-primary-200 dark:text-primary-300' /> : <FiSquare className='mr-2' />}
            text={<div className='flex items-center'>{customer.name}</div>}
            className="text-lg flex items-center pl-0 pb-0 opacity-70 hover:opacity-100 transition-opacity duration-200"
            onClick={() => onClick(customer)}
          />
          <p className='ml-8 mb-2 text-sm font-bold text-gray-400 dark:text-gray-500 tracking-wider'>{customer.company.location.city} ({customer.company.location.province})</p>
        </div>
        : <div className='py-2'>
          <p>{customer.name}</p>
          <p className='text-sm font-bold text-gray-400 dark:text-gray-500 tracking-wider'>{customer.company.location.city} ({customer.company.location.province})</p>
        </div>
      }
  </li>
)

const ContactCustomersList = ({
  customers,
  listType,
  isFetching,
  selectedJobId = null,
  editable = true,
  callback
}) => {
  const message = {
    ALL: "Nessuna azienda cliente presente in rubrica",
    SENDER: "Nessun mittente presente in rubrica",
    RECEIVER: "Nessun destinatario presente in rubrica",
    CARRIER: "Nessun cliente vettore presente in rubrica",
  }

  if(customers?.length <= 0) return (
    <div className='p-4 border rounded-md italic'>
      { message[listType] }
    </div>
  )

  return (
    <>
      { isFetching ? <Spinner className = "fixed right-8 bottom-8 h-5 w-5 text-primary-200 dark:text-primary-300" /> : null }
      <ul>
        { customers.map(customer => (
          <ContactCustomersListItem
            key={customer.id}
            customer={customer}
            onClick={callback}
            isChecked={selectedJobId === customer.id}
            editable={editable}
          />
        ))}
      </ul>
    </>
  )
}

export default ContactCustomersList;
