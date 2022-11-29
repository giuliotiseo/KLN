import { useRef, useState } from 'react';
import { useClickOutside } from '../../libs/hooks';

// Sub components -----------------------------------------------------------------------------------------------
export const DropdownListItem = ({ children, className = "" }) => {
  return (
    <li className={`whitespace-nowrap text-left ${className}`}>
      { children }
    </li>
  )
}

export const DropdownList = ({ children , className = ""}) => {
  return (
    <ul className={`custom-dropdown-list overflow-hidden ${className}`}>
      { children }
    </ul>
  )
}

// Main component -----------------------------------------------------------------------------------------------
export default function Dropdown({ id, position = 'left-0', navItem, navItemOpen, index = 0, children, className = '' }) {
  const [ open, setOpen ] = useState(false);
  const ref = useRef();

  useClickOutside(ref, () => {
    setOpen(false)
  });

  const toggle = () => setOpen(!open);

  if(!navItem) return null;

  return (
    <div 
      id={id}
      tabIndex={index} 
      role="button" 
      onKeyPress={() => toggle(!open)} 
      onClick={() => toggle(!open)}
      ref={ref}
      className="relative"
    >
      <div className="flex items-center">
        { !open ? navItem : navItemOpen ? navItemOpen : navItem}
      </div>

      <div className={
        `dropdown-list shadow-md absolute z-10 text-left rounded-md mt-2 overflow-hidden 
        ${position}
        transition-all 
        ${ open ? 'translate-x-0 opacity-100 pointer-events-auto' : 'translate-x-4 opacity-0 pointer-events-none'}
        ${className}
      `}>
        { children }
      </div>
    </div>
  )
}