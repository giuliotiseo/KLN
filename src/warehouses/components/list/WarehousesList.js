import LinkButton from '../../../globals/components/buttons_v2/LinkButton'
import EmptyResultPage from '../../../globals/components/layout/EmptyResultPage'
import Spinner from '../../../globals/components/layout/Spinner'
import WarehouseListItem from './WarehouseListItem'

const WarehousesList = ({
  warehouses,
  listType,
  isFetching,
}) => {
  const message = {
    ALL: "Nessun magazzino registrato",
    DEPOSITO: "Nessun deposito registrato",
    INTERMEDIO: "Nessun magazzino intermedio registrato",
    DISTRIBUZIONE: "Nessun hub distributivo registrato",
  }

  if(warehouses?.length <= 0) return ( 
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
        { warehouses.map(warehouse => (
          <WarehouseListItem
            key={warehouse.id}
            warehouse={warehouse}
          />
        ))}
      </ul>
    </>
  )
}

export default WarehousesList;
