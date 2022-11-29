// Components
import ActionButton from "../../globals/components/buttons/ActionButton";
import ActionButtonLink from "../../globals/components/buttons/ActionButtonLink";
import Dropdown, { DropdownList, DropdownListItem } from "../../globals/components/navigation/Dropdown";
// Icons
import { FiMoreVertical, FiPlus, FiRefreshCw, FiX } from "react-icons/fi";

const cta_list = {
  to: "/vehicles/create",
  text: "Nuovo",
  icon: () => <FiPlus />
}

export default function VehiclesMenuDropdown({ refresh }) {
  return (
    <Dropdown
      id="vehicle-menu-container"
      navItem={<div className="ml-2"><FiMoreVertical className="text-3xl" /></div>}
      navItemOpen={<div className="ml-2"><FiX className="text-3xl" /></div>}
      position="right-0"
      className="bg-inverse-300 ml-4 border border-light-100 dark:border-dark-100"
    >
      <DropdownList id="vehicle-menu-list">
        <DropdownListItem id="vehicle-menu-list-item-1" className='md:hidden'>
          <ActionButtonLink
            styles="hover:text-primary-200 dark:hover:text-primary-300"
            {...cta_list} 
          />
        </DropdownListItem>
        <DropdownListItem id="vehicle-menu-list-item-1 text-left">
          <ActionButton
            icon={() => <FiRefreshCw />}
            text="Aggiorna lista"
            styles="btn-dropdown-item"
            onClick={refresh}
          />
        </DropdownListItem>
      </DropdownList>
    </Dropdown>
  )
}