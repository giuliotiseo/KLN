import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { toast } from "react-toastify";
import { v4 } from "uuid";

function handleClickCostrictNumber ({ operation, onChange, inputValue, min, max }) {
  if( operation === "ADD") {
    if(Number(inputValue) + 1 > Number(max)) {
      toast.error(`${Number(inputValue) + 1} non è un valore consentito per questo campo`)
    } else {
      onChange(Number(inputValue) + 1);
    }
  }

  if( operation === "SUB") {
    if(Number(inputValue) - 1 < Number(min)) {
      toast.error(`${Number(inputValue) - 1} non è un valore consentito per questo campo`)
    } else {
      onChange(Number(inputValue) - 1);
    }
  }
}

export default function InputBoundNumber({
  id = v4(),
  label, 
  error,
  placeholder = "",
  inputValue, 
  min = 2,
  max = 10,
  onChange,
  className = "",
  inputClassName = "",
  showZero = false,
}) {
  return (
  <div className={`relative my-2 ${className}`}>
    <div className="flex flex-col justify-start">
      { label && <label htmlFor={id} className="label">{ label }</label> }
      <div className="flex">
        <input
          id={id}
          type="number"
          value={showZero ? inputValue || 0 : inputValue || ""}
          style={{ caretColor: 'transparent'}}
          className={`input text-center text-base mr-1 ${inputClassName}`}
          min={min}
          max={max}
          placeholder={placeholder}
          onFocus={(e) => e.target.select()}
          onKeyDownCapture={(e) => {
            const key = e.key;
            key === 'ArrowUp' && handleClickCostrictNumber({ operation: "ADD", onChange, inputValue, min, max });
            key === 'ArrowDown' && handleClickCostrictNumber({ operation: "SUB", onChange, inputValue, min, max });
          }}
          onChange={({ target: { value }}) => value > max || value < min 
            ? toast.error(`${error} ${value}`) 
            : onChange(value)
          }
        />

        <div className="flex text-transparent flex-col text-xl h-full justify-center items-center bg-light-200 dark:bg-dark-200 rounded-md border border-light-50 dark:border-dark-100">
          <button
            tabIndex="-1"
            onClick={() => handleClickCostrictNumber({ operation: "ADD", onChange, inputValue, min, max })}
            className="text-dark-50 dark:text-light-100 hover:text-primary-200 dark:hover:text-primary-300"
            
          >
            <FiChevronUp />
          </button>
          <button
            tabIndex="-1"
            onClick={() => handleClickCostrictNumber({ operation: "SUB", onChange, inputValue, min, max }) }
            className="text-dark-50 dark:text-light-100 hover:text-primary-200 dark:hover:text-primary-300"
          >
            <FiChevronDown />
          </button>
        </div>
      </div>
    </div>
  </div>
)}