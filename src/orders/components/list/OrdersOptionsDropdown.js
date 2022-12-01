import Button from "../../../globals/components/buttons_v2/Button";
import Dropdown, { DropdownList, DropdownListItem } from "../../../globals/components/navigation/Dropdown";
import { generateOrdersForPTVExport } from "../../libs/ptv-integration";
import { FiMoreVertical, FiRefreshCw, FiX } from "react-icons/fi";

export default function PrdersOptionsDropdown({ orders }) {
  return (
    <Dropdown
      id="orders-menu-dropdown-container"
      navItem={<div className="ml-2"><FiMoreVertical className="text-2xl pr-2" /></div>}
      navItemOpen={<div className="ml-2"><FiX className="text-2xl pr-2" /></div>}
      position="right-0"
      className="bg-inverse-300 ml-4 border border-light-100 dark:border-dark-100"
    >
      <DropdownList id="orders-menu-dropdown-list">
        <DropdownListItem id="orders-menu-dropdown-list-item-1 text-left">
          <Button
            icon={<FiRefreshCw />}
            text="Esporta per ROST"
            className="btn-dropdown-item"
            onClick={() => generateOrdersForPTVExport(orders)}
          />
        </DropdownListItem>
      </DropdownList>
    </Dropdown>
  )
}