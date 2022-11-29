import { FiDelete, FiEdit, FiMoreVertical, FiX, FiZoomIn } from "react-icons/fi";
import ActionButton from "../../globals/components/buttons/ActionButton";
import ActionButtonLink from "../../globals/components/buttons/ActionButtonLink";
import Dropdown, { DropdownList, DropdownListItem } from "../../globals/components/navigation/Dropdown";
// Helpers
import { addDays } from "date-fns";

const allowedEditingStatusesBySender = ["PENDING", "PICKEDUP"];
export default function OrderListItemDropdown({
  id,
  createdAt,
  showDeleteModal,
  tenant,
  queryFrom,
  queryStatus,
  styles = ""
}) {
  const isEditingEnabled = queryFrom === "sender"
    ? new Date() < addDays(new Date(createdAt), 14) 
      ? true
      : false
    : true;

  return (
    <Dropdown
      id="contact-menu-dropdown-container"
      navItem={<div className="ml-2"><FiMoreVertical className="text-2xl" /></div>}
      navItemOpen={<div className="ml-2"><FiX className="text-2xl" /></div>}
      position="right-0"
      className={`bg-inverse-300 border border-light-100 dark:border-dark-100 ${styles}`}
    >
      <DropdownList id="contact-menu-dropdown-list">
        <DropdownListItem className="flex items-center contact-menu-dropdown-list-item-1">
          <ActionButtonLink 
            icon={() => <FiZoomIn />}
            text="Dettagli"
            to={`/orders/details?from=${queryFrom}&id=${id}`}
            styles="btn-dropdown-item"
          />
        </DropdownListItem>

        { queryFrom === "carrier" && (
          <DropdownListItem className="flex items-center contact-menu-dropdown-list-item-1 text-left">
            <ActionButtonLink 
              icon={() => <FiEdit />}
              text="Modifica"
              to={`/orders/edit?from=${queryFrom}&id=${id}`}
              styles="btn-dropdown-item"
            />
          </DropdownListItem>
        )}

        { queryFrom === "sender" && allowedEditingStatusesBySender.includes(queryStatus.toUpperCase()) && (
          <DropdownListItem className="flex items-center contact-menu-dropdown-list-item-1 text-left">
            <ActionButtonLink 
              icon={() => <FiEdit />}
              text="Modifica"
              to={`/orders/${tenant}/edit?from=${queryFrom}&id=${id}`}
              styles="btn-dropdown-item"
            />
          </DropdownListItem>
        )}

        { isEditingEnabled && queryFrom === "sender" && (
          <DropdownListItem className="flex items-center contact-menu-dropdown-list-item-1 text-left text-danger-200 dark:text-danger-300">
            <ActionButton
              styles="text-danger-200 dark:text-danger-300 btn-dropdown-item"
              onClick={showDeleteModal}
              text="Elimina"
              icon={() => <FiDelete />}
            />
          </DropdownListItem>
        )}
      </DropdownList>
    </Dropdown>
  )
}