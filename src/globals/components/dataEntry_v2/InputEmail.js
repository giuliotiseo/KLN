import { v4 } from "uuid";

// Main component -------------------------------------------------------------------------------------------------------------------
export default function InputEmail({
  id = v4(),
  label = null,
  placeholder="es: mario.rossi@lts.it",
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
            value={value || ""}
            type="email"
            autoComplete="off"
            disabled={disabled}
            onChange={({ target: { value }}) => !loading && callback({ value, name: id, type: "email" })}
            className={`input w-full ${isError && 'input--error'} ${disabled && 'input--disabled'} outline-none ${loading && 'pointer-events-none'} ${inputClassName}`}
            placeholder={placeholder}
          />
        </div>
      </div>
    </div>
  )
}