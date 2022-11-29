import { TravelStatus, TRAVEL_DESCRIPTOR } from "../../libs/helpers";
import ActionButton from "../../../globals/components/buttons/ActionButton";
import Dropdown, { DropdownList, DropdownListItem } from "../../../globals/components/navigation/Dropdown";
// Helpers
import { globalStatusColorsText } from "../../../globals/libs/helpers";
import { FiBox, FiChevronDown, FiChevronUp, FiEdit } from "react-icons/fi";
import { MdOutbox, MdOutlineCheck, MdOutlinePausePresentation, MdOutlinePinEnd, MdOutlinePinInvoke, MdTrendingFlat } from "react-icons/md";
import { useUpdateTravelStatusMutation } from "../../api/travels-api-slice";
import InlineSpinner from "../../../globals/components/spinners/InlineSpinner";


// Icons
let travelsIcons = {
  STATIONARY: <MdOutlinePausePresentation className="text-xl" />,
  PICKUP: <MdOutlinePinEnd className="text-xl" />,
  DEPOT: <MdOutlinePinInvoke className="text-xl" />,
  DELIVERY: <MdTrendingFlat className="text-xl" />,
  RETURN: <MdOutbox className="text-xl" />,
  COMPLETED: <MdOutlineCheck className="text-xl" />
}

export default function TravelStatusDropdown({
  travel,
  status
}) {
  const [ updateTravelStatus, { data, isLoading, isSuccess, isError }] = useUpdateTravelStatusMutation();
  
  if(isLoading) return <InlineSpinner />;
  return (
    <Dropdown
      id="travel-status-dropdown"
      position="left-0"
      className={`bg-inverse-300 border border-light-100 dark:border-dark-100 mt-1`}
      navItem={<div className="flex rounded-md px-2 items-center">
          <span className={`flex items-center justify-center w-8 h-8 rounded-full ${globalStatusColorsText[status]} ${globalStatusColorsText[status]}`}>
            {travelsIcons[status]}
          </span>
          <span>Aggiorna</span>
          <span className="ml-2 text-lg"><FiChevronDown /></span>
        </div>
      }
      navItemOpen={
        <div className="flex rounded-md px-2 items-center">
          <span className={`flex items-center justify-center w-8 h-8 rounded-full ${globalStatusColorsText[status]}`}>
            <FiEdit />
          </span>
          <span>Chiudi</span>
          <span className="ml-2 text-lg"><FiChevronUp /></span>
        </div>
      }
    >
      <DropdownList id="check-status-selector">
        { TravelStatus
          // .filter(travel_status => status !== "PENDING" ? travel_status !== "REJECTED": true)
          .map(travel_status => (
          <DropdownListItem key={travel_status} className="flex items-center vehicle-status-selector-item-1 text-left text-danger-200 dark:text-danger-300">
            <ActionButton
              styles={`btn-dropdown-item ${status === travel_status ? 'font-bold text-primary-200 dark:text-primary-300' : 'text-dark-50 dark:text-light-300'}`}
              onClick={() => updateTravelStatus({...travel, status: travel_status})}
              text={TRAVEL_DESCRIPTOR[travel_status]}
            />
          </DropdownListItem>
        ))}
      </DropdownList>
    </Dropdown>
  )
}