import { v4 } from "uuid";

// Main components -------------------------------------------------------------------------------------------------------------------
export default function InputNumber({
  id = v4(),
  label = null,
  placeholder = "",
  className = "",
  labelClassName="",
  loading,
  contentClassName = "",
  disabled = false,
  value,
  callback = (value) => console.log('Conferma testo <InputText />', value),
  isError = false,
}){
  return (
    <div className={`flex items-center ${className}`}>
      { label && <label htmlFor={id} className={`label ${labelClassName}`}>{label}</label> }
      <div className={`flex items-center ${contentClassName}`}>
        <div className={`flex items-center w-full`}>
          <input
            id={id}
            value={value}
            type="number"
            autoComplete="off"
            disabled={disabled}
            onChange={({ target: { value }}) => !loading && callback({ value, name: id, type: "number" })}
            className={`input w-full ${isError && 'input--error'} ${disabled && 'input--disabled'} block outline-none ${loading && 'pointer-events-none'}`}
            placeholder={placeholder}
          />
        </div>
      </div>
    </div>
  )
}