import { FiDelete, FiEdit, FiMoreVertical, FiX, FiZoomIn } from "react-icons/fi";
import ActionButton from "../../../globals/components/buttons/ActionButton";
import ActionButtonLink from "../../../globals/components/buttons/ActionButtonLink";
import Dropdown, { DropdownList, DropdownListItem } from "../../../globals/components/navigation/Dropdown";

export default function CheckListItemDropdown({
  id,
  queryFrom,
  className = ""
}) {
  return (
    <Dropdown
      id="checks-menu-dropdown-container"
      navItem={<div className="ml-2"><FiMoreVertical className="text-2xl" /></div>}
      navItemOpen={<div className="ml-2"><FiX className="text-2xl" /></div>}
      position="right-0"
      className={`bg-inverse-300 border border-light-100 dark:border-dark-100 ${className}`}
    >
      <DropdownList id="checks-menu-dropdown-list">
        <DropdownListItem className="flex items-center checks-menu-dropdown-list-item-1">
          <ActionButtonLink 
            icon={() => <FiZoomIn />}
            text="Dettagli"
            to={`/checks/view?from=${queryFrom}&id=${id}`}
            styles="btn-dropdown-item"
          />
        </DropdownListItem>

        {((queryFrom === "CARRIER") || (queryFrom === "RECEIVER")) && (
          <DropdownListItem className="flex items-center checks-menu-dropdown-list-item-1 text-left">
            <ActionButtonLink 
              icon={() => <FiEdit />}
              text="Modifica"
              to={`/checks/edit?from=${queryFrom}&id=${id}`}
              styles="btn-dropdown-item"
            />
          </DropdownListItem>
        )}

        {/* {((queryFrom === "carrier") || (queryFrom === "receiver")) && (
          <DropdownListItem className="flex items-center contact-menu-dropdown-list-item-1 text-left text-danger-200 dark:text-danger-300">
            <ActionButton
              styles="text-danger-200 dark:text-danger-300 btn-dropdown-item"
              onClick={showDeleteModal}
              text="Elimina"
              icon={() => <FiDelete />}
            />
          </DropdownListItem>
        )} */}
      </DropdownList>
    </Dropdown>
  )
}