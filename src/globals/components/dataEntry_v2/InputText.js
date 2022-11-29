import { v4 } from "uuid";
// Main components -------------------------------------------------------------------------------------------------------------------
export default function InputText({
  id = v4(),
  label = null,
  placeholder = "",
  className = "",
  labelClassName="",
  forceUpperCase = false,
  loading,
  contentClassName = "",
  inputClassName = "",
  disabled = false,
  value,
  onFocus,
  onPressEnter = () => console.log("Default onPressEnter callback in <InputText />"),
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
            value={value || ""}
            type="text"
            autoComplete="off"
            disabled={disabled}
            className={`block w-full outline-none ${loading && 'pointer-events-none'} input ${isError && 'input--error'} ${disabled && 'input--disabled'} ${inputClassName}`}
            placeholder={placeholder}
            onKeyPress={(e) => e.key === 'Enter' && !loading && onPressEnter({ value, name: id, type: "text" })}
            onFocus={() => onFocus ? onFocus() : null}
            onChange={({ target: { value }}) => !loading && callback({
              value: forceUpperCase ? value.toUpperCase() : value,
              name: id,
              type: "text"
            })}
          />
        </div>
      </div>
    </div>
  )
}