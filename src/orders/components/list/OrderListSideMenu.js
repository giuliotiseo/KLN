import SafeCol from "../../../globals/components/layout/SafeCol"
import LinkButton from "../../../globals/components/buttons_v2/LinkButton";
import { FiPlus, FiX } from "react-icons/fi";
import { TbAsterisk, TbDots, TbUpload, TbBuildingWarehouse, TbTruckDelivery, TbChecklist, TbFolders } from "react-icons/tb";
import Dropdown, { DropdownList, DropdownListItem } from "../../../globals/components/navigation/Dropdown";

// Constants --------------------------------------------------------------------------------------------------
const menu = [{
  text: "Tutti",
  selected: "ALL",
  icon: <TbAsterisk className='text-sm md:text-md' />
},{
  text: "In attesa",
  selected: "PENDING",
  icon: <TbDots className='text-lg md:text-xl' />
}, {
  text: "Ritirati",
  selected: "PICKEDUP",
  icon: <TbUpload className='text-lg md:text-xl' />
}, {
  text: "In giacenza",
  selected: "STOCKED",
  icon: <TbBuildingWarehouse className='text-lg md:text-xl' />
}, {
  text: "In consegna",
  selected: "DELIVERING",
  icon: <TbTruckDelivery className='text-lg md:text-xl' />
}, {
  text: "Consegnati",
  selected: "DELIVERED",
  icon: <TbChecklist className='text-lg md:text-xl' />
},{
  text: "Archiviati",
  selected: "ARCHIVED",
  icon: <TbFolders className='text-lg md:text-xl' />
}]

// Main component --------------------------------------------------------------------------------------------------
const OrdersListSideMenu = ({ listType, setSearchParams }) => {
  const { status, companyType } = listType;
  const isAddAllowed = !companyType.includes("STORAGE") && companyType !== "RECEIVER";

  return (
    <SafeCol id="OrdersListSideMenu">
      <div className="my-4 max-w-full relative">
        { isAddAllowed && (
          <Dropdown
            id="orders-menu-list-dropdown"
            navItem={<div className="btn btn-primary flex items-center"><FiPlus className="text-lg mr-1" /> Aggiungi</div>}
            navItemOpen={<div className="btn btn-primary flex items-center"><FiX className="text-lg mr-1" /> Chiudi</div>}
            position="left-0"
            className={`bg-inverse-300 border border-light-100 dark:border-dark-100`}
          >
            <DropdownList id="orders-menu-dropdown-list">
              <DropdownListItem className="flex items-center contact-menu-dropdown-list-item-1 hover:bg-base-200">
                <LinkButton
                  text="Registra come vettore"
                  className=''
                  icon={<FiPlus className='text-lg' />}
                  to='new/carrier'
                /> 
              </DropdownListItem>
              <DropdownListItem className="flex items-center contact-menu-dropdown-list-item-1 hover:bg-base-200">
                <LinkButton
                  text="Invia come mittente"
                  className=''
                  icon={<FiPlus className='text-lg' />}
                  to='new/sender'
                /> 
              </DropdownListItem>
            </DropdownList>
          </Dropdown>
        )}
        
        <nav className="mt-6">
          <ul>
            { menu.map(item => (
              <li key={item.selected} className="block">
                <button
                  onClick={() => setSearchParams({ status: item.selected, company: companyType })}
                  className={`flex items-center w-full my-2 px-4 py-2 rounded-l-sm rounded-r-full 
                    ${ status === item.selected
                      ? 'bg-base-100 text-secondary-200 dark:text-secondary-300 shadow-sm' 
                      : 'hover:bg-light-100 dark:hover:bg-dark-100'
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

export default OrdersListSideMenu;