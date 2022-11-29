import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import useListCustomers from "../../../customers/hooks/useListCustomers";
import DropdownComboBox from "./DropdownComboBox";
import { FiDelete, FiSearch } from "react-icons/fi";
import { useClickOutside } from "../../libs/hooks";
import { changeCustomersListLimit, resetCustomersList } from "../../../customers/slices/customersListSlice";
import Button from "../buttons_v2/Button";
import { useCustomerByIdQuery } from "../../../customers/api/customers-api-slice";
import { useCallback } from "react";

// Handlers ------------------------------------------------------------------------------------------------------------------------------------------------------------------
const handleFocus = (inputText, searchable, showResults) => {
  if(inputText && searchable && (inputText === searchable)) {
    showResults(true);
  }
}

const handleClear = ({
  reset,
  setInputText,
  setSearchable
}) => {
  setInputText("");
  setSearchable("");
  reset();
}

// Sub components ------------------------------------------------------------------------------------------------------------------------------------------------------------------
const CompanyContactButton = ({
  onClick,
  icon
}) => (
  <button
    onClick={onClick}
    className="btn btn-primary w-[35px] h-[35px] text-center flex items-center justify-center"
  >
    { icon && icon }
  </button>
)

// Main component ------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function CompanyContactFinder({
  className = "",
  inputClassName="",
  company = null,
  placeholder = "Es. LTS SRL",
  labelClassName = "",
  label = "",
  callback = (value) => console.log("Default callback for <CompanyContactFinder />", value),
  reset = () => console.log("Default reset for <CompanyContactFinder />")
}) {
  const [ selectedCustomerId, setSelectedCustomerId ] = useState('');
  const [ inputText, setInputText ] = useState("");
  const [ searchable, setSearchable ] = useState(company?.name ? company.name : "");
  const [ visibilityResults, showResults ] = useState(false);
  const [{ items: contacts, isFetching, isLoading, refetch }, pagination] = useListCustomers("ALL", searchable);
  const { data: selectedCustomer, isFetching: isFetchingSelectedCustomer, isLoading: isLoadingSelectedCustomer } = useCustomerByIdQuery( selectedCustomerId ? { id: selectedCustomerId } : null);
  
  const dispatch = useDispatch();
  const ref = useRef();

  const runCallback = useCallback(() => {
    callback(selectedCustomer)
  }, [selectedCustomer])

  // Init list
  useEffect(() => {
    dispatch(changeCustomersListLimit(9999));
    return () => dispatch(resetCustomersList);
  }, []);

  useEffect(() => {
    if(inputText && searchable && (inputText === searchable)) {
      showResults(true)
    } else {
      showResults(false);
    }
  }, [inputText, searchable])

  useEffect(() => {
    showResults(false);
  }, [inputText])

  useEffect(() => {
    if(selectedCustomer) {
      runCallback()
    }
  }, [selectedCustomer])

  useClickOutside(ref, () => {
    showResults(false);
  });

  return (
    <div className={`relative ${className}`}>
      { label && <label className={`label ${labelClassName}`}>{label}</label> }
      <div className="flex items-center w-full">
        { company?.name 
          ? <p className="input w-full mr-2 text-opacity-50">{company.name}</p>
          : <input
              type="text"
              value={inputText}
              className={`input w-full mr-2 ${inputClassName}`}
              onChange={({ target: { value }}) => setInputText(value)}
              placeholder={placeholder}
              onFocus={() => handleFocus(inputText, searchable, showResults)}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  setSearchable(inputText.toLowerCase());
                }
              }}
            />
        }

        { company?.name
          ? <Button
              icon={<FiDelete />}
              className="btn-primary"
              onClick={() => handleClear({ reset, setInputText, setSearchable })}
            />
          : <Button
              icon={<FiSearch />}
              className="btn-primary"
              onClick={() => setSearchable(inputText.toLowerCase())}
            />
        }
      </div>

      { !company?.name && visibilityResults && (
        <DropdownComboBox
          data={contacts?.length > 0 && contacts.map(contact => ({ text: contact.name, value: contact }))}
          isFetching={isFetching || isLoading || isFetchingSelectedCustomer || isLoadingSelectedCustomer }
          onClick={({ value }) => setSelectedCustomerId(value.id)} 
          dropdownLabel="Aziende trovate"
          focusIndex={null}
          clickOutsideRef={ref}
          pagination={pagination}
          refetch={refetch}
        />
      )}
    </div>
  )
}