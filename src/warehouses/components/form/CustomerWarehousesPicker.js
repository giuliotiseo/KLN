import Button from '../../../globals/components/buttons_v2/Button'
import Spinner from '../../../globals/components/layout/Spinner'
import Pagination from '../../../globals/components/lists_v2/Pagination'
import { FiCheckSquare, FiRefreshCcw, FiSquare } from 'react-icons/fi'

const CustomerWarehousesListItem = ({
  warehouse,
  onClick,
  isChecked,
  editable
}) => (
  <li className='bg-base-100 rounded-md p-2 mb-2 dark:border-dark-50 last:border-none'>
    { editable 
      ? <div>
          <Button
            icon={isChecked ? <FiCheckSquare className='mr-2 opacity-100 text-primary-200 dark:text-primary-300' /> : <FiSquare className='mr-2' />}
            text={<div className='flex items-center'>{warehouse.name}</div>}
            className="uppercase text-lg flex items-center pl-0 pb-0 opacity-70 hover:opacity-100 transition-opacity duration-200"
            onClick={() => onClick(warehouse)}
          />
          <p className='ml-8 mb-2 text-sm text-gray-400 dark:text-gray-500'>{ warehouse.location.address }</p>
        </div>
        : <div className='py-2 opacity-50'>
          <p className='uppercase'>{warehouse.name}</p>
          <p className='text-sm text-gray-400 dark:text-gray-500'>
            { warehouse.location.address }
          </p>
        </div>
      }
  </li>
)

const CustomerWarehousesPicker = ({
  warehouses,
  loading,
  refetch,
  pagination,
  selectedWarehouse,
  callback,
  editable,
  title
}) => {
  const { goBack, goNext, page, nextToken, previousTokens } = pagination;
  return (
    <div className='w-full'>
      <h3 className="title-3 mb-2">{title}</h3>
      <div className="sticky top-0 bg-base-100 flex flex-wrap gap-2 justify-between p-2 border-b border-light-100 dark:border-dark-100 rounded-md mb-1">
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
        : warehouses?.length <= 0
          ? <p className='text-gray-400 dark:text-gray-500 m-2'>Nessun magazzino presente</p>
          : <ul>
            { warehouses.map(warehouse => (
              <CustomerWarehousesListItem
                key={warehouse.id}
                warehouse={warehouse}
                onClick={callback}
                editable={editable && !warehouse?.isLinked}
                isChecked={selectedWarehouse?.id === warehouse.id}
              />
            ))}
          </ul>
      }
    </div>
  )
}

export default CustomerWarehousesPicker;
