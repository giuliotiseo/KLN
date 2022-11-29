import { FiEdit, FiMoreVertical, FiX, FiZoomIn } from "react-icons/fi";
import LinkButton from "../../../globals/components/buttons_v2/LinkButton";
import Dropdown, { DropdownList, DropdownListItem } from "../../../globals/components/navigation/Dropdown";

export default function PreOrdersListItemDropdown({
  id,
  className = ""
}) {
  return (
    <Dropdown
      id="preorder-list-menu-dropdown-container"
      navItem={<div className="ml-2"><FiMoreVertical className="text-2xl" /></div>}
      navItemOpen={<div className="ml-2"><FiX className="text-2xl" /></div>}
      position="right-0"
      className={`bg-inverse-300 border border-light-100 dark:border-dark-100 ${className}`}
    >
      <DropdownList id="preorder-menu-dropdown-list">
        <DropdownListItem className="flex items-center preorder-menu-dropdown-list-item-1">
          <LinkButton
            icon={<FiZoomIn />}
            text="Dettagli"
            to={`view?id=${id}`}
            className="btn-dropdown-item"
          />
        </DropdownListItem>

        <DropdownListItem className="flex items-center preorder-menu-dropdown-list-item-1 text-left">
          <LinkButton 
            icon={<FiEdit />}
            text="Modifica"
            to={`edit?id=${id}`}
            className="btn-dropdown-item"
          />
        </DropdownListItem>
      </DropdownList>
    </Dropdown>
  )
}