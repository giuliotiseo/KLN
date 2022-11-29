import SafeCol from "../../../globals/components/layout/SafeCol"
import LinkButton from "../../../globals/components/buttons_v2/LinkButton";
import { FiPlus } from "react-icons/fi";
import { TbAsterisk, TbTruckLoading, TbBuildingWarehouse, TbTruckDelivery } from "react-icons/tb";

// Constants --------------------------------------------------------------------------------------------------
const menu = [{
  text: "Tutti",
  selected: "ALL",
  icon: <TbAsterisk className='text-sm md:text-md' />
},{
  text: "Mittenti",
  selected: "SENDER",
  icon: <TbBuildingWarehouse className='text-lg md:text-xl' />
}, {
  text: "Destinatari",
  selected: "RECEIVER",
  icon: <TbTruckLoading className='text-lg md:text-xl' />
}, {
  text: "Vettori",
  selected: "CARRIER",
  icon: <TbTruckDelivery className='text-lg md:text-xl' />
}]

// Main component --------------------------------------------------------------------------------------------------
const CustomersListSideMenu = ({ listType, setSearchParams }) => {
  return (
    <SafeCol id="CustomersListSideMenu">
      <div className="max-w-full relative">
        <LinkButton
          text="Nuovo"
          className='btn-primary my-4 inline-flex pl-1'
          icon={<FiPlus className='text-lg' />}
          to='new'
        />

        <nav>
          <ul>
            { menu.map(item => (
              <li key={item.selected} className="block">
                <button
                  onClick={() => setSearchParams({ type: item.selected })}
                  className={`flex items-center w-full my-2 px-4 py-2 rounded-l-sm rounded-r-full 
                    ${ listType === item.selected
                      ? 'bg-base-100 text-secondary-200 dark:text-secondary-300 shadow-sm' 
                      : 'hover:bg-light-300 dark:hover:bg-dark-300'
                    }`
                  }
                >
                  <span className={`mr-1`}>{ item.icon }</span>
                  <span>{item.text}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </SafeCol>
  )
}

export default CustomersListSideMenu;