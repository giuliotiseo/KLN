import { Link } from "react-router-dom";
import ListItem from '../../../globals/components/layout/ListItem'
import VehiclesListItemDropdown from "./VehicleListItemDropdown";
import { VEHICLE_TYPE_DESCRIPTION } from "../../libs/helpers";

const borderColors = {
  "DISPONIBILE":  "border-emerald-500 dark:border-emerald-400",
  "NON_DISPONIBILE": "border-red-500 dark:border-red-400",
  "IN_MARCIA": "border-amber-500 dark:border-amber-400",
}

const VehiclesListItem = ({
  vehicle,
  isSelected = false
}) => {
  return (
    <ListItem className={`
      justify-between p-4
      border-l-4 ${borderColors[vehicle.status]}
      ${ isSelected ? 'opacity-50 pointer-events-none shadow-none bg-transparent'  : ''}
    `}>
      <div className="flex items-center">

        <div className="ml-2">
          <h3 className='flex items-center gap-1 text-lg md:text-xl uppercase'>
            <span className="hidden md:inline-flex tracking-widest text-sm p-1 rounded-md border text-secondary-200 dark:text-secondary-300">
              {vehicle.licensePlate}
            </span>
            <Link to={`/vehicles/view?id=${vehicle.id}`} className="mr-2 flex-1 hover:text-primary-200 dark:text-primary-300 transition-colors">
              <span>{ vehicle.brand } {vehicle.model}</span>
            </Link>
          </h3>

          { vehicle?.lastPosition?.address && <p className="text-gray-400 dark:text-gray-500 mt-2">
            Ultimo rilevamento: { vehicle.lastPosition.address }
          </p> }

          <p className='chip-neutral text-dark-50 dark:text-light-300 inline-flex mt-4'>
            {VEHICLE_TYPE_DESCRIPTION[vehicle.type]}
          </p>
        </div>
      </div>
      
      <VehiclesListItemDropdown id={vehicle.id} />
    </ListItem>
  )
}

export default VehiclesListItem;
