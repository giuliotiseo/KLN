import { FiBox } from "react-icons/fi"
import { orderStatusBackgrounds, ORDER_STATUS_DESCRIPTION } from "../../libs/helpers"

export default ({ status }) => {
  if(!status) return null;
  return (
    <div className="flex rounded-md px-2 items-center">
      <span className={`flex items-center justify-center w-8 h-8 rounded-full mr-2 text-light-300 ${orderStatusBackgrounds[status]}`}>
        <FiBox />
      </span>
      <span>{ORDER_STATUS_DESCRIPTION[status]}</span>
    </div>
  )
}