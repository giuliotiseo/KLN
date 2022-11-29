import { useDispatch } from "react-redux";
// Components
import Dropdown, { DropdownList, DropdownListItem } from "../../../globals/components/navigation/Dropdown";
import ActionButton from "../../../globals/components/buttons/ActionButton";
// Functions & constants
import { globalStatusColorsText, globalStatusDescriptions } from "../../../globals/libs/helpers";
import { CheckStatus } from "../../libs/helpers";
import { FiBox, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { changeCheckEditorStatus } from "../../slices/checkEditorSlice";

// Main component function ----------------------------------------------------------------------------------------------------------------------------------------
export default function CheckStatusDropdown({ check, className = '' }) {
  const dispatch = useDispatch();

  return (
    <div className={`${className}`}>
      {/* Status controls */}
      <Dropdown
        id="check-status-dropdown"
        position="left-0"
        className={`bg-inverse-300 border border-light-100 dark:border-dark-100 mt-1`}
        navItem={
          <div className="flex rounded-md px-2 items-center">
            <span className={`flex items-center justify-center w-8 h-8 rounded-full ${globalStatusColorsText[check.status]}`}>
              <FiBox />
            </span>
            <span>{globalStatusDescriptions[check.status]}</span>
            <span className="ml-2 text-lg"><FiChevronDown /></span>
          </div>
        }
        navItemOpen={
          <div className="flex rounded-md px-2 items-center">
            <span className={`flex items-center justify-center w-8 h-8 rounded-full ${globalStatusColorsText[check.status]}`}>
              <FiBox />
            </span>
            <span>{globalStatusDescriptions[check.status]}</span>
            <span className="ml-2 text-lg"><FiChevronUp /></span>
          </div>
        }
      >
        <DropdownList id="check-status-selector">
          { CheckStatus
            // .filter(or_status => or_status !== "PENDING")
            .filter(check_status => check.status !== "PENDING" ? check_status !== "REJECTED": true)
            .map(check_status => (
            <DropdownListItem key={check_status} className="flex items-center vehicle-status-selector-item-1 text-left text-danger-200 dark:text-danger-300">
              <ActionButton
                styles={`btn-dropdown-item ${check.status === check_status ? 'font-bold text-primary-200 dark:text-primary-300' : 'text-dark-50 dark:text-light-300'}`}
                onClick={() => dispatch(changeCheckEditorStatus(check_status))}
                text={globalStatusDescriptions[check_status]}
              />
            </DropdownListItem>
          ))}
        </DropdownList>
      </Dropdown>
    </div>
  )
}