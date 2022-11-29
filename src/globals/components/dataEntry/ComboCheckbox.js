import { useState, useRef } from 'react';
import Checkbox from './Checkbox';
import SimpleBar from "simplebar-react";
import { v4 } from 'uuid';
import { useClickOutside } from '../../libs/hooks';

export function DropdownComboCheckbox({ values, data, onChange, dropdownLabel, clickOutsideRef }) {
  if(!data) return <div />

  return (
    <div className="fixed inset-0 bg-dark-300 bg-opacity-50 z-50 top-0 right-0 bottom-0 left-0">
      <div ref={clickOutsideRef} className={`absolute w-full sm:w-3/4 lg:w-2/3 h-full max-w-full max-h-[320px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md overflow-hidden z-50 bg-light-100 dark:bg-dark-100`}>
        <SimpleBar style={{ height: '100%', maxHeight: '80vh', position: 'relative'}}>
          <h5 className="sticky text-xs font-bold text-dark-100 dark:text-light-300 opacity-40 uppercase my-2 mx-2">
            { dropdownLabel }
          </h5>

          <ul className="list-none">
            { data.map((elem, index) => {
              return (
                <li
                  key={index} 
                  className={`p-2 text-base cursor-pointer hover:bg-light-100 dark:hover:bg-dark-100`}
                >
                  <Checkbox
                    id={`checkbox-${v4()}`}
                    label={elem.text}
                    value={values.includes(elem.value.id)}
                    initialStatus={values.includes(elem.value.id)}
                    onChange={() => onChange(elem.value.id)}
                  />
                </li>
              )
            })}
          </ul>
        </SimpleBar>
      </div>
    </div>
  )
}

export default function ComboCheckbox({
  id, 
  label,
  dropdownLabel,
  descriptionKey,
  onChange,
  data,
  values,
  styles = "",
  disabled,
  placeholder
}) {
  const [ input, setInput ] = useState('');
  const [ dropdown, showDropdown ] = useState(false);
  const [ dropdownList, setDropdownList ] = useState([]);
  const ref = useRef();

  useClickOutside(ref, () => {
    showDropdown(false)
  });

  function handleChange(val) {
    setInput(val);
    const list = getList(val);
    showDropdown(true);
    setDropdownList(list);
  }

  function handleFocus() {
    const list = getList(input);
    showDropdown(true);
    setDropdownList(list);
  }

  function getList(val) {
    const ddlist =  data.filter(d => {
      return d[descriptionKey].toLowerCase().includes(val.toLowerCase())
    });

    return ddlist.map(ddListItem => ({ text: ddListItem[descriptionKey], value: ddListItem }));
  }

  return (
    <div className={`relative mt-2 mb-1 w-full ${styles}`}>
      { label && <label
          htmlFor={`combocheckbox-${id}`}
          className="block mb-2 w-full text-sm opacity-70 bold text-dark-100 dark:text-light-300"
        >
          { label }
        </label>
      }

      { values.length === 0 
        ? <input
            id={`combocheckbox-${id}`}
            className="input w-full"
            type="text"
            value={input}
            onChange={(e) => handleChange(e.target.value)}
            disabled={disabled}
            onFocus={() => handleFocus()}
            placeholder={placeholder}
            autoComplete="off"
          />
        : <div className="input max-w-full whitespace-nowrap overflow-x-hidden" onClick={() => handleFocus()}>
            {values.join(', ')}
          </div>
      }

      { dropdown && (
        <DropdownComboCheckbox
          values={values}
          data={dropdownList}
          onChange={onChange}
          dropdownLabel={dropdownLabel}
          clickOutsideRef={ref}
        /> 
      )}
    </div>
  )
}