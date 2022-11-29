import { useEffect, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
// Helpers
import { InputTypes } from "../../libs/helpers";
import ActionButton from "../buttons/ActionButton";
import Dropdown, { DropdownList } from "../navigation/Dropdown";

export default function MultipleSearchTextFilter({ selectedOption = null, options, reset }) {
  const [ selectedType, setSelectedType ] = useState(selectedOption);
  const currentSelection =  options.filter(el => el.id === selectedType)?.[0];
  if(!options || !selectedOption || !currentSelection) {
    setSelectedType("id");
  }
  
  return (
    <div className="w-full">

      <Dropdown
        id="preOrders-search-text-filter"
        navItem={<p className="label flex items-center text-primary-200 dark:text-primary-300 opacity-100">{currentSelection.text} <FiChevronDown /></p>}
        navItemOpen={<p className="label flex items-center text-primary-200 dark:text-primary-300 opacity-100">Scegli un parametro <FiChevronUp /></p>}
        position="left-0"
        className="bg-inverse-300 top-1 border border-light-300 dark:border-dark-100"
      >
        <DropdownList
          id="preOrders-menu-dropdown-list"
          className="flex flex-row items-center left-0 top-3 m-1"
        >
          { options.map(({ id, icon, text }) => (
              <li key={id} id="preOrders-menu-dropdown-list-item-1"
                className={`
                  ${selectedType === id
                    ? `opacity-100 text-primary-200 dark:text-primary-300`
                    : `opacity-70 text-dark-300 dark:text-light-100` 
                }`}
              >
                <ActionButton
                  icon={icon}
                  text={text}
                  styles="hover:text-primary-200 dark:hover:text-primary-300"
                  onClick={() => setSelectedType(id)}
                />
              </li>
            ))}
        </DropdownList>
      </Dropdown>

      { options.map(({ id, input }) => (
        <div key={id}>
          { id === selectedType && (
            input.componentId === InputTypes.TEXT && (
              <input 
                type="text"
                value={input.value} 
                placeholder={input.placeholder}
                onChange={(e) => input.onChange(e.target.value)} 
                className="input w-full"
                onKeyPress={(e) => e.key === 'Enter' && input.onPressEnter()}
              />
            )
          )}

          { id === selectedType && (
            input.componentId === InputTypes.DATE && (
              <input
                type="date"
                placeholder={input.placeholder}
                value={input.value}
                className="input w-full"
                style={{ fontSize: 15 }}
                onChange={(e) => input.onChange(e.target.value)}
                onBlur={(e) => input.onBlur(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && input.onPressEnter(e.target.value)}
              />
            )
          )}
        </div>
      ))}
    </div>
  )
}