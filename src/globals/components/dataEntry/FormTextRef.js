export default function FormTextRef({
  label,
  placeholder,
  name,
  type,
  textRef,
  value,
  disabled = false,
  readOnly = false,
}) {

  return (
    <div className="relative my-2 w-full">
      <label htmlFor={name} className="label">{label}</label>
      <input
        autoComplete="new-password"
        autoCorrect="off"
        spellCheck="off"
        ref={textRef}
        className="input w-full"
        id={name}
        name={name}
        defaultValue={value}
        type={type || 'text'}
        placeholder={placeholder || ''}
        disabled={disabled}
        readOnly={readOnly}
      />
    </div>
  )
}