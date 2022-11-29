import { RiCheckFill, RiCheckDoubleFill, RiCloseCircleLine } from "react-icons/ri";
import { formatDate } from "../../../../globals/libs/helpers";

const renderPalletValidation = {
  NOT_DECLARED: {
    icon: () => <RiCheckFill className="text-lg text-zinc-400" />,
  },
  VERIFIED: {
    icon: () => <RiCheckDoubleFill className="text-lg text-sky-500" />,
  },
  HALF_VERIFIED: {
    icon: () => <RiCheckFill className="text-lg text-lime-400" />,
  },
  ERROR: {
    icon: () => <RiCloseCircleLine className="text-lg text-red-500" />,
  },
}


const PalletListItemValidation = ({ customerValidation, carrierValidation, operationDate }) => {
  let response = null;
  if((!carrierValidation || carrierValidation === "NOT_DECLARED") && (!customerValidation || customerValidation === "NOT_DECLARED")) response = "NOT_DECLARED"; 
  if(carrierValidation === "VERIFIED" && customerValidation === "VERIFIED") response = "VERIFIED"; 
  if(
    ((!carrierValidation || carrierValidation === "NOT_DECLARED") && customerValidation === "VERIFIED") ||
    (carrierValidation === "VERIFIED" && (!customerValidation || customerValidation === "NOT_DECLARED"))
  ) response = "HALF_VERIFIED"; 

  if((carrierValidation === "ERROR" || customerValidation === "ERROR")) response = "ERROR"; 

  if(!response) return null;
  return (
    <div className="flex items-center">
      <p>{renderPalletValidation[response].icon()}</p>
      <p className="text-xs">{formatDate(new Date(operationDate), "Pp")}</p>
    </div>
  )
}

export default PalletListItemValidation;