import { v4 } from "uuid";

// Main component -------------------------------------------------------------------------------------------------------------------
export default function InputPhone({
  id = v4(),
  label = null,
  placeholder="es: 0776311963",
  className = "",
  labelClassName="",
  loading,
  contentClassName = "",
  inputClassName = "",
  disabled = false,
  value,
  callback = (value) => console.log('Conferma testo <InputEmail />', value),
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
            type="tel"
            autoComplete="off"
            disabled={disabled}
            onChange={({ target: { value }}) => !loading && callback({ value, name: id, type: "phone" })}
            className={`input w-full ${isError && 'input--error'} ${disabled && 'input--disabled'} outline-none ${loading && 'pointer-events-none'} ${inputClassName}`}
            placeholder={placeholder}
          />
        </div>
      </div>
    </div>
  )
}