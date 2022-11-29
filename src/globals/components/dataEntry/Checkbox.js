import { useEffect } from 'react';
import { useState } from 'react';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';

export default function Checkbox({
  id,
  name,
  label,
  value,
  onChange,
  initialStatus = false,
  controlled = false,
  labelStyle = "",
  styles = "",
  disabled = false,
}) {
  const [ status, setStatus ] = useState(initialStatus);
  const handleChange = (value) => {
    setStatus(prev => !prev);
    onChange(value);
  }

  useEffect(() => {
    if(controlled) {
      setStatus(initialStatus);
    }
  }, [controlled, initialStatus])
  
  return (
    <div className={`relative ${styles}`}>
      <input
        type="checkbox"
        className={`fixed -left-full ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        onChange={({ target: { value }}) => !disabled ? handleChange(value) : null}
        id={id}
        name={name}
        value={value}
        disabled={disabled}
      />

      <label className={`cursor-pointer ml-1 flex items-center ${labelStyle}`} htmlFor={id}>
        { 
          disabled 
            ? <span className="inline-block mr-2 text-gray-200 dark:text-gray-600"><ImCheckboxUnchecked /></span>
            : status 
              ? <span className="inline-block mr-2 text-primary-200 hover:text-primary-100 dark:text-primary-300 dark:hover:text-primary-200 cursor-pointer"><ImCheckboxChecked /></span>
              : <span className="inline-block mr-2 text-primary-200 hover:text-primary-100 dark:text-primary-300 dark:hover:text-primary-200 cursor-pointer"><ImCheckboxUnchecked /></span>
        }
        {label}
      </label>
    </div>
  )
}