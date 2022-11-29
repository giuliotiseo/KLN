const BasicSelector = ({
  children,
  id,
  disabled = false,
  label,
  icon,
  description,
  value,
  onChange, 
  styles,
  selectRef
}) => {
  return (
    <>
      { label && (
        <label htmlFor={id} className="label">
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
        className={`input cursor-pointer ${styles}`}
        defaultValue={value}
        onChange={({ target: { value }}) => onChange ? onChange(value) : null}
      >
        { children }
      </select>
    </>
  )
}

export default BasicSelector;