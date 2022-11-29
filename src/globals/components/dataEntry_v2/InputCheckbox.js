import { FiCheckSquare, FiSquare } from "react-icons/fi";
import { v4 } from "uuid";
import Button from "../buttons_v2/Button";

// Main components -------------------------------------------------------------------------------------------------------------------
export default function InputCheckbox({
  id = v4(),
  name = "checkbox-name",
  label = "Checkbox label",
  className = "",
  loading,
  inputClassName = "",
  disabled = false,
  value = false,
  checked = false,
  initialValues = [],
  hideInput = false,
  callback = (value) => console.log('Conferma testo <InputCheckbox />', value),
}){
  return (
    <div className={`${className}`}>
      <Button
        id={id}
        icon={!hideInput && (
          checked || initialValues.includes(value) 
            ? <FiCheckSquare className='mr-1 mt-1 opacity-100 text-primary-200 dark:text-primary-300' /> 
            : <FiSquare className='mr-1 mt-1 opacity-70 hover:opacity-100'/>
        )}
        text={<div className='flex items-start text-left'>{label}</div>}
        className={`items-start text-left text-lg flex p-0 transition-opacity duration-200 ${inputClassName}`}
        disabled={disabled || loading}
        onClick={() => callback({ value, name, type: "checkbox" })}
      />
    </div>
  )
}