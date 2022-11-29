import { useDispatch } from "react-redux";
// Components
import ActionButton from "../../globals/components/buttons/ActionButton";
import Dropdown, { DropdownList, DropdownListItem } from "../../globals/components/navigation/Dropdown";
import { FiBox, FiChevronDown, FiChevronUp } from "react-icons/fi";
// Functions & constants
import { updateOrderStatusThunk } from "../../app/thunks/ordersThunks";
import { OrderStatus, orderStatusBackgrounds, ORDER_STATUS_DESCRIPTION } from "../libs/helpers";

export default function DropdownStatusEditor({ styles = "", order, storedOrder, origin }) {
  const dispatch = useDispatch();
  async function runUpdateStatus(status) {
    dispatch(updateOrderStatusThunk({
      order,
      logs: storedOrder.log,
      status,
      origin
    }));
  }

  return (
    <div className={`${styles}`}>
      {/* Status controls */}
      <Dropdown
        id="order-status-selector-dropdown"
        position="left-0"
        className={`bg-inverse-300 border border-light-100 dark:border-dark-100 mt-1`}
        navItem={ <div className="flex rounded-md px-2 items-center">
            <span className={`flex items-center justify-center w-8 h-8 rounded-full mr-2 text-light-300 ${orderStatusBackgrounds[order.status]}`}>
              <FiBox />
            </span>
            <span>{ORDER_STATUS_DESCRIPTION[order.status]}</span>
            <span className="ml-2 text-lg"><FiChevronDown /></span>
          </div>
        }
        navItemOpen={
          <div className="flex rounded-md px-2 items-center">
            <span className={`flex items-center justify-center w-8 h-8 rounded-full mr-2 text-light-300 ${orderStatusBackgrounds[order.status]}`}>
              <FiBox />
            </span>
            <span>{ORDER_STATUS_DESCRIPTION[order.status]}</span>
            <span className="ml-2 text-lg"><FiChevronUp /></span>
          </div>
        }
      >
        <DropdownList id="order-status-selector">
          { Object.keys(OrderStatus)
            // .filter(or_status => or_status !== "PENDING")
            .filter(or_status => order.status !== "PENDING" ? or_status !== "REJECTED": true)
            .map(or_status => (
            <DropdownListItem key={or_status} className="flex items-center vehicle-status-selector-item-1 text-left text-danger-200 dark:text-danger-300">
              <ActionButton
                styles={`btn-dropdown-item ${storedOrder.status === or_status ? 'font-bold text-primary-200 dark:text-primary-300' : 'text-dark-50 dark:text-light-300'}`}
                onClick={() => runUpdateStatus(or_status)}
                text={ORDER_STATUS_DESCRIPTION[or_status]}
              />
            </DropdownListItem>
          ))}
        </DropdownList>
      </Dropdown>
    </div>
  )
}