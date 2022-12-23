export default function Select ({
  children,
  id,
  disabled = false,
  label,
  icon,
  description,
  value,
  callback = (payload) => console.log("Default callback for <Select />", payload), 
  className = "",
  labelClassName = "",
  selectClassName = "",
  selectRef
}) {
  return (
    <div className={className}>
      { label && (
        <label htmlFor={id} className={`label ${labelClassName}`}>
          { icon && icon() }
          { typeof(label) === 'function' ? label() : label  }
        </label>
      )}

      { description && (
        <p className="mb-2"> { description } </p>
      )}

      <select
        disabled={disabled}
        ref={selectRef || null}
        id={id}
        className={`input cursor-pointer p-[10px] ${selectClassName}`}
        // defaultValue={value}
        value={(value || value === 0) ? value : ""}
        onChange={({ target: { value }}) => callback ? callback({ name: id, value, type: "select" }) : null}
      >
        { children }
      </select>
    </div>
  )
}