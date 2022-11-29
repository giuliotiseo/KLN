import { useDispatch } from "react-redux";
// Components
import { HugeParagraph, LargeParagraph } from "../../globals/components/typography/paragraphs";
import Dropdown, { DropdownList, DropdownListItem } from "../../globals/components/navigation/Dropdown";
import ActionButton from "../../globals/components/buttons/ActionButton";
// Thunk
import { updateVehicleStatusThunk } from "../../app/thunks/vehiclesThunks";
// Helpers
import { colorsBackground, VEHICLE_STATUS_DESCRIPTION, VEHICLE_TYPE_DESCRIPTION } from "../libs/helpers";
import { VehicleStatus } from "../libs/helpers";
// Icons
import { FiTruck } from "react-icons/fi";

export default function VehicleStatusDropdown({ vehicle }) {
  const dispatch = useDispatch();

  async function runUpdateStatus(status) {
    await dispatch(updateVehicleStatusThunk({
      vehicle,
      status
    }));
  }

  return (
    <div className="mt-2 flex items-start z-50 text-d">
      <div className="relative z-50">
        <Dropdown
          id="vehicle-status-selector-dropdown"
          position="left-0"
          className={`bg-inverse-300 border border-light-100 dark:border-dark-100`}
          navItem={<span className={`text-base md:text-lg mr-2 w-8 h-8 text-center flex items-center ${colorsBackground[vehicle.status]} rounded-full p-2`}>
              <FiTruck />
            </span>
          }
        >
          <DropdownList id="vehicle-status-selector">
            { Object.keys(VehicleStatus).map(v_status => (
              <DropdownListItem key={v_status} className="flex items-center vehicle-status-selector-item-1 text-left text-danger-200 dark:text-danger-300">
                <ActionButton
                  styles={`btn-dropdown-item ${vehicle.status === v_status ? 'font-bold text-primary-200 dark:text-primary-300' : 'text-dark-50 dark:text-light-300'}`}
                  onClick={() => runUpdateStatus(v_status)}
                  text={VEHICLE_STATUS_DESCRIPTION[v_status]}
                />
              </DropdownListItem>
            ))}
          </DropdownList>
        </Dropdown>
      </div>

      <div>
        <HugeParagraph>
          {VEHICLE_TYPE_DESCRIPTION[vehicle.type]}
        </HugeParagraph>
        <LargeParagraph>{VEHICLE_STATUS_DESCRIPTION[vehicle.status]}</LargeParagraph>
      </div>
      {/* <div className="mt-2">
        <VehicleStatusDropdown vehicle={vehicle} />
      </div> */}
    </div>
  )
}