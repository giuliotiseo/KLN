import { FiInbox, FiEdit3, FiCheckCircle } from "react-icons/fi";
import { BiErrorCircle } from "react-icons/bi";

const InputStatusLabel = ({
  id,
  isEdit,
  isError,
  isEmpty,
  className,
  isConfirmed
}) => {
  return (
  <label htmlFor={id} className={`min-w-4 ${className}`}>
    { isError && <BiErrorCircle className="text-red-500 dark:text-red-400" />}
    { !isError && !isEdit && isEmpty && <FiInbox className="text-zinc-400" />}
    { !isError && isEdit && <FiEdit3 className="text-amber-500 dark:text-amber-300" />}
    { !isError && isConfirmed && <FiCheckCircle className="text-emerald-500 dark:text-emerald-300" />}
  </label>
)}

export default InputStatusLabel;