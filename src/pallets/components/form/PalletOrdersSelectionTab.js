import { useSelector } from "react-redux"
import { OPERATION_DESCRIPTION } from "../../../travels/libs/helpers";
import {
  selectPalletCreatorOrdersSelection,
  selectPalletCreatorOrdersSelectionTab,
} from "../../slices/palletCreatorSlice";

const tabs = ["PICKUP", "DELIVERY"];

export default function PalletOrdersSelectionTab({ onChange }) {
  const current_tab = useSelector(selectPalletCreatorOrdersSelection);
  const tab_values = useSelector(selectPalletCreatorOrdersSelectionTab);

  return (
    <div>
      <ul>
        { tabs.map(tab => {
          return (
          <li key={tab} className="inline-block mr-2 mb-2">
            <button
              onClick={() => onChange(tab)}
              className={`
                uppercase bg-light-300 dark:bg-dark-50 px-4 py-2 rounded-md
                ${current_tab === tab 
                  ? 'font-bold text-primary-200 dark:text-primary-300'
                  : 'font-normal text-dark-50 dark:text-light-300'
                }
                ${!tab_values[tab] && ' pointer-events-none opacity-30'}
                `
              }
            >
              {OPERATION_DESCRIPTION[tab]} { tab_values[tab] && `(${tab_values[tab]})` }
            </button>
          </li>
        )})}
      </ul>
    </div>
  )
}