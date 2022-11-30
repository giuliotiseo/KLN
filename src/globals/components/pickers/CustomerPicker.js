import Button from "../buttons_v2/Button";
import Spinner from "../layout/Spinner";
import Pagination from "../lists_v2/Pagination";
import { FiCheckSquare, FiRefreshCcw, FiSquare } from 'react-icons/fi'

const CustomerPickerItem = ({
  customer,
  onClick,
  isChecked,
  editable
}) => (
  <li className='bg-base-100 rounded-md p-2 dark:border-dark-50 last:border-none'>
    { editable 
      ? <div>
          <Button
            icon={isChecked ? <FiCheckSquare className='mr-2 opacity-100 text-primary-200 dark:text-primary-300' /> : <FiSquare className='mr-2' />}
            text={<div className='flex items-center text-left'>{customer.name}</div>}
            className={`
              text-lg flex items-center pl-0 py-0
              ${ isChecked ? 'opacity-100' : 'opacity-70 hover:opacity-100 transition-opacity duration-200'}
            `}
            onClick={() => onClick(customer)}
          />
          { customer?.company?.location?.city && customer?.company?.location?.province && ( 
            <p className='ml-8 text-sm font-bold text-gray-400 dark:text-gray-500 tracking-wider'>
            {customer.company.location.city} ({customer.company.location.province})
            </p>
          )}

          { customer?.label && (
            <p className='ml-8 text-sm font-bold text-gray-400 dark:text-gray-500 tracking-wider'>
              {customer.label}
            </p>
          )}
          
        </div>
        : <div>
          <p>{customer.name}</p>
          <p className='text-sm font-bold text-gray-400 dark:text-gray-500 tracking-wider'>{customer.company.location.city} ({customer.company.location.province})</p>
        </div>
      }
  </li>
)

const CustomerPicker = ({
  customers,
  listType,
  loading,
  editable = true,
  refetch,
  pagination,
  title = "Seleziona un cliente dalla rubrica",
  selectedCustomer,
  callback
}) => {
  const { goBack, goNext, page, nextToken, previousTokens } = pagination;

  const message = {
    ALL: "Nessuna azienda cliente presente in rubrica",
    SENDER: "Nessun mittente presente in rubrica",
    RECEIVER: "Nessun destinatario presente in rubrica",
    CARRIER: "Nessun cliente vettore presente in rubrica",
  }

  return (
    <div className='w-full'>
      { title && <h3 className="title-3 mb-2">{title}</h3> }
      <div className="sticky top-0 bg-base-100 flex flex-wrap gap-2 justify-between p-2 border-b border-light-300 dark:border-dark-100 rounded-md mb-1">
        <Button
          icon={<FiRefreshCcw />}
          text="Aggiorna elenco"
          onClick={refetch}
          className="btn-ghost"
        />

        <Pagination
          goBack={goBack}
          goNext={goNext}
          page={page}
          nextToken={nextToken}
          previousTokens={previousTokens}
          className="bg-base-100 border bg-base-100 rounded-full"
        />
      </div>

      { loading 
        ? <Spinner className = "h-5 w-5 text-primary-200 dark:text-primary-300" />
        : customers?.length > 0
          ? <ul>
            { customers.map(customer => (
              <CustomerPickerItem
                key={customer.company.id}
                customer={customer}
                onClick={callback}
                editable={editable}
                isChecked={selectedCustomer?.company?.id === customer.company?.id}
              />
            ))}
          </ul>
          : <div className='p-4 border rounded-md italic'>
            { message[listType] }
          </div>
      }

    </div>
  )
}

export default CustomerPicker;
