export default function FormText({
  label,
  placeholder,
  value = '',
  name,
  type,
  onChange,
  onBlur,
  onFocus,
  onKeyPress,
  disabled,
  styles,
  readOnly = false,
  inline = false,
  uom, // unity of measurement
  min,
  max
}) {

  return (
    <div className={`${inline && 'flex items-center'} relative my-2 w-full ${styles}`}>
      { label && <label htmlFor={name} className={`${inline ? 'label-inline' : 'label'}`}>{label}</label> }
      <div className="flex justify-between flex-1">
        <input
          className={`${!readOnly ? 'input' : ' bg-transparent border-transparent outline-none italic'} w-full flex-1`}
          // id={name}
          // name={name}
          disabled={disabled}
          type={type || 'text'}
          placeholder={placeholder || ''}
          value={value || ''}
          onChange={e => onChange ? onChange(e) : null}
          onBlur={e => onBlur ? onBlur(e) : null}
          onFocus={e => onFocus ? onFocus(e) : null}
          onKeyPress={onKeyPress}
          autoComplete="new-password"
          autoCorrect="off"
          spellCheck="off"
          readOnly={readOnly}
          min={min}
          max={max}
        />
        { uom && <span className="absolute w-4 right-3 top-9">{uom}</span>}
      </div>
    </div>
  )
}