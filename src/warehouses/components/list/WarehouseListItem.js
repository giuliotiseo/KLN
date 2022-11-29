import { TbLink, TbMapPin } from "react-icons/tb";
import { Link } from "react-router-dom";
import ListItem from '../../../globals/components/layout/ListItem'
import { WAREHOUSE_SCOPE } from "../../libs/helpers";
import WarehousesListItemDropdown from "./WarehouseListItemDropdown";

const WarehouseListItem = ({
  warehouse,
  isSelected = false
}) => {
  return (
    <ListItem className={`
      justify-between p-4 border-l-4
      ${ isSelected ? 'opacity-50 pointer-events-none shadow-none bg-transparent'  : ''}
      ${ warehouse?.status === "ACTIVE" ? 'border-emerald-500'  : ''}
      ${ warehouse?.status === "DISABLED" ? 'border-red-500'  : ''}
    `}>
      <div className="relative flex items-center text-left">

        <div className="ml-2">
          <h3 className='text-left flex items-start text-lg md:text-xl uppercase'>
            { warehouse?.remote 
              ? <div data-tip="Magazzino di terze parti">
                  <TbLink
                    className="text-xl mr-2 text-secondary-200 dark:text-secondary-300"
                  />
                </div>
              : <div data-tip="Magazzino proprietario">
                  <TbMapPin
                    className="text-xl mr-2 text-primary-200 dark:text-primary-300"
                  />
                </div>
            }

            <Link to={`/warehouses/view?id=${warehouse.id}`} className={`
              mr-2 flex-1 transition-colors
              ${warehouse?.remote
                ? 'hover:text-secondary-200 dark:text-secondary-300 '
                : 'hover:text-primary-200 dark:text-primary-300 '
              }
            `}>
              <span>{ warehouse.name }</span>
            </Link>
          </h3>

          <p className="text-gray-400 dark:text-gray-500 mb-2">
            {warehouse.location.address}
          </p>


          { warehouse.scope.map(s => (
            <span key={s} className="chip-neutral inline-block">{WAREHOUSE_SCOPE[s]}</span>
          ))}
        </div>
      </div>
      
      <WarehousesListItemDropdown id={warehouse.id} />
    </ListItem>
  )
}

export default WarehouseListItem;
