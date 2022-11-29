import { useState, useRef } from 'react';
import DropdownComboBox from './DropdownComboBox';
import { useClickOutside } from '../../libs/hooks';
import Modal from '../layout/Modal';

export default function ComboBox({
  id,
  label,
  dropdownLabel,
  descriptionKey,
  onChange,
  data,
  styles = "",
  onKeyPress,
  disabled,
  placeholder,
  withPortal = false,
  isLoading,
  pagination,
  refetch
}) {
  const [ input, setInput ] = useState('');
  const [ dropdown, showDropdown ] = useState(false);
  const [ portal, showPortal ] = useState(false);
  const [ dropdownList, setDropdownList ] = useState([]);
  const [ focusItem, setFocusItem ] = useState(null);
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
    if(withPortal) {
      showPortal(true);
    } else {
      showDropdown(true);
    }

    setDropdownList(list);
  }

  function getList(val) {
    const ddlist =  data.filter(d => {
      return d[descriptionKey].toLowerCase().includes(val.toLowerCase())
    });

    return ddlist.map(ddListItem => ({ text: ddListItem[descriptionKey], value: ddListItem }));
  }

  function handleKeyDown(key) {
    if(key === 'ArrowDown') {
      setFocusItem(prev => prev === null ? 0 : prev + 1 < dropdownList.length ? prev + 1 : prev);
    }
  
    if(key === 'ArrowUp') {
      setFocusItem(prev => prev <= 0 ? null : prev - 1);
    }

    if(key === 'Enter') {
      onChange(dropdownList[focusItem].value);
    }
  }

  async function handleRefresh() {
    if(refetch) {
      await refetch();
      setInput("");
      const list = getList("");
      showDropdown(true);
      setDropdownList(list);
    }
  }

  return (
    <div ref={ref} className={`relative mt-2 mb-1 w-full ${styles} ${portal ? 'z-20' : ''}`}>
      { label && <label
          htmlFor={`combobox-${id}`}
          className="block mb-2 w-full text-sm opacity-70 bold text-dark-100 dark:text-light-300"
        >
          { label }
        </label>
      }

      <input
        id={`combobox-${id}`}
        className="input w-full"
        type="text"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        onKeyPress={onKeyPress}
        disabled={disabled}
        onFocus={() => handleFocus()}
        placeholder={placeholder}
        autoComplete="off"
        onKeyDown={(e) => handleKeyDown(e.key)}
      />

      { !withPortal && dropdown && (
        <DropdownComboBox
          data={dropdownList} 
          onClick={onChange} 
          dropdownLabel={dropdownLabel}
          isFetching={isLoading}
          pagination={pagination}
          refetch={handleRefresh}
          focusIndex={focusItem}
        /> 
      )}

      <Modal
        title={dropdownLabel}
        closeModal={() => showPortal(false)}
        showModal={portal}
        size={540}
      >
        <div>
          <ul>
            { dropdownList.map((elem, index) => {
              return (
                <li
                  key={index} 
                  className={`cursor-pointer text-center py-2 border-b border-b-light-300 dark:border-b-dark-200 last:border-b-0 hover:text-primary-200 dark:hover:text-primary-300`}
                  onClick={() => onChange(elem.value)}>
                  {elem.text}
                </li>
              )
            })}
          </ul>
        </div>
      </Modal>
    </div>
  )
}