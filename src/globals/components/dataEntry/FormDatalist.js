import { useState, useEffect, useRef } from 'react';
import { useClickOutside } from '../../libs/hooks';
import Scrollbar from '../layout/Scrollbar';

function DatalistItem({ text, index, onClick, focusIndex }) {
  return (
    <li
      className={`p-2 text-xs cursor-pointer hover:bg-light-200 dark:hover:bg-dark-200 border border-transparent rounded-md ${index === focusIndex ? 'border border-secondary-200 dark:border-secondary-200 border-opacity-50 dark:border-opacity-50 bg-light-200 dark:bg-dark-200' : ''}`}
      onClick={() => onClick(text)}
      key={index}
    >
      { text }
    </li>
  )
}


function Datalist({ options, onSelect, focusIndex }) {
  return (
    <div className="absolute bg-light-100 dark:bg-dark-300 text-dark-300 dark:text-light-100 h-32 top-full  w-full shadow-lg p-2 rounded-md z-10">
      <Scrollbar styles={{ maxHeight: 120 }}>
          <ul>
            { options.map((el, index) => (
              <DatalistItem 
                key={index}
                onClick={onSelect}
                text={el}
                index={index}
                focusIndex={focusIndex}
              />
            ))}
          </ul>
      </Scrollbar>
    </div>
  )
}


export default function FormDatalist({ label, val, placeholder, onChange, name, datalistRef, disabled = false, options }) {
  const [ value, setValue ] = useState(val);
  const [ visibility, setVisibility ] = useState(false);
  const [ focusItem, setFocusItem ] = useState(null);
  const containerRef = useRef();

  useEffect(() => {
    setVisibility(false);
    onChange(value);
  }, [value, onChange])

  useClickOutside(containerRef, () => {
    setVisibility(false)
  });

  if(!options || options.length === 0) return null;

  function handleKeyDown(key) {
    if(key === 'ArrowDown' && visibility) {
      setFocusItem(prev => prev === null ? 0 : prev + 1);
    }
  
    if(key === 'ArrowUp' && visibility) {
      setFocusItem(prev => prev <= 0 ? null : prev - 1);
    }
  }

  return (
    <div ref={containerRef} className="relative my-2 w-full">
      <label htmlFor={name} className="label">{label}</label>
      <input
        className="input w-full"
        type="text"
        list="data"
        autoComplete="new-password"
        autoCorrect="off"
        spellCheck="off"
        id={name}
        name={name}
        value={value || ''}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder || ''}
        ref={datalistRef}
        disabled={disabled}
        onKeyDown={(e) => handleKeyDown(e.key)}
        onFocus={() => setVisibility(true)}
      />

      {visibility && (
        <Datalist 
          options={options}
          onSelect={(item) => setValue(item)}
          focusIndex={focusItem}
        />
      )}
    </div>
  )
}