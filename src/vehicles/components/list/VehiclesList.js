import { useSelector } from 'react-redux'
import { selectCurrentCompany } from '../../../company/slices/companySlice'
import LinkButton from '../../../globals/components/buttons_v2/LinkButton'
import EmptyResultPage from '../../../globals/components/layout/EmptyResultPage'
import SafeCol from '../../../globals/components/layout/SafeCol'
import Spinner from '../../../globals/components/layout/Spinner'
import VehiclesListItem from './VehiclesListItem'


const VehiclesList = ({
  vehicles,
  listType,
  isFetching,
}) => {
  const { id } = useSelector(selectCurrentCompany);

  const message = {
    ALL: "Nessun veicolo registrato",
    TRATTORE: "Nessun trattore stradale registrato",
    FURGONE: "Nessun furgone registrato",
    MOTRICE: "Nessuna motrice registrata",
    RIMORCHIO: "Nessun rimorchio registrata",
    SEMIRIMORCHIO: "Nessun semirimorchio registrato",
  }

  if(vehicles?.length <= 0) return ( 
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
        { vehicles.map(vehicle => (
          <VehiclesListItem
            key={vehicle.id}
            vehicle={vehicle}
            currentCompanyId={id}
          />
        ))}
      </ul>
    </>
  )
}

export default VehiclesList
