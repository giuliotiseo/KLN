import { useState, useEffect } from 'react';

const ControlledSelector = ({
  children,
  id,
  label,
  value,
  onChange,
  styles,
  labelStyle = "",
  selectRef,
  disabled
}) => {
  const [ selectValue, setSelectValue ] = useState(value);

  useEffect(() => {
    setSelectValue(value)
  }, [value])

  return (
    <>
      { label && (
        <label htmlFor={id} className={`label ${labelStyle}`}>
          { typeof(label) === 'function' ? label() : label  }
        </label>
      )}

      <select
        disabled={disabled || false}
        ref={selectRef || null}
        id={id}
        className={`input cursor-pointer ${styles}`}
        value={selectValue || ''}
        onChange={({ target: { value }}) => onChange(value)}
      >
        { children }
      </select>
    </>
  )
}

export default ControlledSelector;