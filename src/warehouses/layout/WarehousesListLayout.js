import Spinner from '../../globals/components/layout/Spinner'
import WarehousesListOptions from '../components/list/WarehousesListOptions'
import WarehousesList from '../components/list/WarehousesList'
import SafeCol from '../../globals/components/layout/SafeCol'
import { useScrollFull } from '../../globals/hooks/useScrollFull'

const WarehousesListLayout = ({
  warehouses,
  listType,
  searchable,
  limit,
  pagination,
  refetch,
  isLoading,
  isFetching,
  selectedContact = null
}) => {
  const scrollableRef = useScrollFull();

  return (
    <SafeCol id="WarehousesListLayout" ref={scrollableRef}>
      <WarehousesListOptions
        inputSearchable={searchable}
        limit={limit}
        pagination={pagination}
        refetch={refetch}
      />
      
      { isLoading || isFetching
        ? <div className="flex h-full w-full items-center justify-center">
            <Spinner className="h-5 w-5 text-primary-200 dark:text-primary-300" />
          </div>
        : <WarehousesList
            isFetching={isFetching}
            warehouses={warehouses}
            listType={listType}
            selectedContact={selectedContact}
          />
      }
    </SafeCol>
  )
}

export default WarehousesListLayout;
