import { FiBox } from "react-icons/fi"
import {globalStatusColorsText, globalStatusDescriptions } from "../../libs/helpers"

export default ({
  status,
  icon = <FiBox />
}) => {
  if(!status) return null;
  return (
    <div className="flex rounded-md px-2 items-center">
      <span className={`flex items-center justify-center w-8 h-8 rounded-full ${globalStatusColorsText[status]}`}>
        { icon }
      </span>
      <span>{globalStatusDescriptions[status]}</span>
    </div>
  )
}