import Button from '../../../globals/components/buttons_v2/Button'
import Spinner from '../../../globals/components/layout/Spinner'
import { FiCheckSquare, FiRefreshCcw, FiSquare, FiX, FiXCircle } from 'react-icons/fi'
import Pagination from '../../../globals/components/lists_v2/Pagination'
import InputText from '../../../globals/components/dataEntry_v2/InputText'
import { useState } from 'react'

const SenderCheckpointListItem = ({
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
            className="text-lg flex items-center pl-0 pb-0 opacity-70 hover:opacity-100 transition-opacity duration-200"
            onClick={() => onClick(customer)}
          />
          <p className='ml-8 text-sm font-bold text-gray-400 dark:text-gray-500 tracking-wider'>{customer.company.location.city} ({customer.company.location.province})</p>
        </div>
        : <div className='py-2'>
          <p>{customer.name}</p>
          <p className='text-sm font-bold text-gray-400 dark:text-gray-500 tracking-wider'>{customer.company.location.city} ({customer.company.location.province})</p>
        </div>
      }
  </li>
)

const PreOrderSenderPicker = ({
  customers,
  listType,
  loading,
  editable = true,
  refetch,
  pagination,
  searchCompany,
  selectedCustomer,
  callback
}) => {
  const [ searchCompanyName, setSearchCompanyName ] = useState("");
  const { goBack, goNext, page, nextToken, previousTokens } = pagination;

  const message = {
    ALL: "Nessuna azienda cliente presente in rubrica",
    SENDER: "Nessun mittente presente in rubrica",
    RECEIVER: "Nessun destinatario presente in rubrica",
    CARRIER: "Nessun cliente vettore presente in rubrica",
  }

  if(selectedCustomer?.id) return (
    <div className='w-full'>
      <header className='flex'>
        <h3 className="title-3 mb-1 w-full">Mittente selezionato</h3>
      </header>

      <div className="items-center top-0 bg-base-100 flex gap-1 py-2 border-b border-light-100 dark:border-dark-100 rounded-md mb-1">
        { editable && <Button
          icon={<FiXCircle className='text-xl' />}
          className="btn-ghost items-center mr-1"
          onClick={() => callback(null)}
        /> }
        <p className='text-xl'>{ selectedCustomer.name }</p>
      </div>

      <p className='text-base pt-2'>
        P.IVA: <span className='tracking-wider'>{ selectedCustomer.vatNumber }</span></p>
    </div>
  )

  return (
    <div className='w-full'>
      <h3 className="title-3 mb-2">Seleziona il mittente</h3>
      <div className="top-0 bg-base-100 flex gap-2 justify-between p-2 border-b border-light-100 dark:border-dark-100 rounded-md mb-1">
        <Button
          icon={<FiRefreshCcw />}
          onClick={refetch}
          className="btn-ghost"
        />

        <InputText
          id="name"
          className="flex-col w-full"
          placeholder='Cerca nome esatto mittente'
          contentClassName="w-full text-lg"
          labelClassName="block"
          value={searchCompanyName}
          forceUpperCase={true}
          callback={({ value }) => setSearchCompanyName(value)}
          onPressEnter={() => searchCompany(searchCompanyName)}
          disabled={loading}
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
        : !loading && customers?.length <= 0
          ? <p className='text-gray-400 dark:text-gray-500'>{ message[listType] }</p>
          : <ul>
              { customers.map(customer => (
                <SenderCheckpointListItem
                  key={customer.id}
                  customer={customer}
                  onClick={callback}
                  editable={editable}
                  isChecked={selectedCustomer?.id === customer.id}
                />
              ))}
            </ul>
      }

    </div>
  )
}

export default PreOrderSenderPicker;
