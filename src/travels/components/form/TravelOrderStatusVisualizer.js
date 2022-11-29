import { FiBox } from "react-icons/fi"
import { globalStatusBackground } from "../../../globals/libs/helpers";
import { ORDER_STATUS_DESCRIPTION } from "../../../orders/libs/constants";

export default ({ status }) => {
  if(!status) return null;
  return (
    <div className="flex rounded-md px-2 items-center">
      <span className={`flex items-center justify-center w-8 h-8 rounded-full mr-2 text-light-300 ${globalStatusBackground[status]}`}>
        <FiBox />
      </span>
      <span>{ORDER_STATUS_DESCRIPTION[status]}</span>
    </div>
  )
}