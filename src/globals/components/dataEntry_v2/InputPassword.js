import { v4 } from "uuid";

// Main components -------------------------------------------------------------------------------------------------------------------
export default function InputPassword({
  id = v4(),
  label = null,
  placeholder = "",
  className = "",
  labelClassName="",
  loading,
  contentClassName = "",
  inputClassName = "",
  disabled = false,
  value,
  callback = (payload) => console.log('Conferma testo <InputPassword />', payload),
  onPressEnter = (payload) => console.log('Press enter <InputPassword />', payload),
  isError = false,
}){
  return (
    <div className={`flex items-center ${className}`}>
      { label && <label htmlFor={id} className={`label ${labelClassName}`}>{label}</label> }
      <div className={`flex items-center ${contentClassName}`}>
        <div className={`flex items-center w-full`}>
          <input
            id={id}
            type="password"
            autoComplete="new-password"
            disabled={disabled}
            value={value}
            className={`input w-full ${inputClassName} ${isError && 'input--error'} outline-none ${loading && 'pointer-events-none'}`}
            placeholder={placeholder}
            onChange={({ target: { value }}) => !loading && callback({ value, name: id, type: "password" })}
            onKeyPress={(e) => e.key === 'Enter' && !loading && onPressEnter({ value, name: id, type: "password" })}
          />
        </div>
      </div>
    </div>
  )
}