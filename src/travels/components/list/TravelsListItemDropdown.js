import { FiEdit, FiMoreVertical, FiX, FiZoomIn } from "react-icons/fi";
import ActionButtonLink from "../../../globals/components/buttons/ActionButtonLink";
import Dropdown, { DropdownList, DropdownListItem } from "../../../globals/components/navigation/Dropdown";

export default function TravelsListItemDropdown({
  id,
  className = ""
}) {
  return (
    <Dropdown
      id="travels-menu-dropdown-container"
      navItem={<div className="ml-2"><FiMoreVertical className="text-2xl" /></div>}
      navItemOpen={<div className="ml-2"><FiX className="text-2xl" /></div>}
      position="right-0"
      className={`bg-inverse-300 border border-light-100 dark:border-dark-100 ${className}`}
    >
      <DropdownList id="travels-menu-dropdown-list">
        <DropdownListItem className="flex items-center travels-menu-dropdown-list-item-1">
          <ActionButtonLink 
            icon={() => <FiZoomIn />}
            text="Dettagli"
            to={`/travels/view?id=${id}`}
            styles="btn-dropdown-item"
          />
        </DropdownListItem>

        <DropdownListItem className="flex items-center travels-menu-dropdown-list-item-1 text-left">
          <ActionButtonLink 
            icon={() => <FiEdit />}
            text="Modifica"
            to={`/travels/edit?id=${id}`}
            styles="btn-dropdown-item"
          />
        </DropdownListItem>

      </DropdownList>
    </Dropdown>
  )
}