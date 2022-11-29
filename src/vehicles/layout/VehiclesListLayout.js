import VehiclesListOptions from '../components/list/VehiclesListOptions'
import Spinner from '../../globals/components/layout/Spinner'
import VehiclesList from '../components/list/VehiclesList'
import SafeCol from '../../globals/components/layout/SafeCol'
import { useScrollFull } from '../../globals/hooks/useScrollFull'

const VehiclesListLayout = ({
  vehicles,
  listType,
  licensePlate,
  limit,
  pagination,
  refetch,
  isLoading,
  isFetching,
}) => {
const scrollableRef = useScrollFull();

  return (
    <SafeCol id="VehiclesListLayout" ref={scrollableRef}>
      { !isLoading && (
        <VehiclesListOptions
          inputLicensePlate={licensePlate}
          limit={limit}
          pagination={pagination}
          refetch={refetch}
        />
      )}
      
      { isLoading || isFetching
        ? <div className="flex h-full w-full items-center justify-center">
            <Spinner className="h-5 w-5 text-primary-200 dark:text-primary-300" />
          </div>
        : <VehiclesList
            isFetching={isFetching}
            vehicles={vehicles}
            listType={listType}
          />
      }
    </SafeCol>
  )
}

export default VehiclesListLayout
