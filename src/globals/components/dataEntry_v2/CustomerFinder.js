import { useCallback } from "react";
import { useState, useEffect, useRef } from "react";
import { useClickOutside } from "../../libs/hooks";
import { useDispatch } from "react-redux";
import useListCustomers from "../../../customers/hooks/useListCustomers";
import InputText from "../dataEntry_v2/InputText";
import Button from "../buttons_v2/Button";
import DropdownComboBox from "../dataEntry/DropdownComboBox";
import { FiDelete, FiSearch } from "react-icons/fi";
import { changeCustomersListSearchable, resetCustomersList } from "../../../customers/slices/customersListSlice";


/* - Components -------------------------------------------------------------------------------- */
export default function CustomerFinder ({
  id = 'customer',
  label = null,
  labelClassName = '',
  selectedCustomer,
  className = '',
  callback,
  clear,
}) {
  // Query string
  const [ comboxBox, showComboBox ] = useState(false);
  const [ textInput, setTextInput ] = useState('');
  const [{ items: customers, isFetching, isLoading }, pagination] = useListCustomers('ALL');
  const ref = useRef();
  const dispatch = useDispatch();

  useClickOutside(ref, () => {
    showComboBox(false);
  });


  const handleSearch = useCallback(() => {
    dispatch(changeCustomersListSearchable(textInput ? textInput.toLowerCase() : ''))
  }, [textInput]);

  const handleClear = useCallback(() => {
    clear();
    setTextInput("");
    dispatch(changeCustomersListSearchable(null))
  }, [clear, selectedCustomer, textInput]);

  useEffect(() => {
    return () => dispatch(resetCustomersList);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div className="w-full flex">
        <InputText
          id={id}
          label={label}
          labelClassName={labelClassName}
          placeholder="Filtra risultati"
          className="flex-col w-full mx-1"
          contentClassName="w-full text-base"
          value={selectedCustomer?.name || textInput}
          forceUpperCase={true}
          callback={({ value }) => setTextInput(value)}
          onPressEnter={handleSearch}
          onFocus={() => showComboBox(true)}
          disabled={isLoading || selectedCustomer}
        />

        { selectedCustomer
          ? <Button
              icon={<FiDelete className="text-sm" />}
              className="btn-primary"
              onClick={handleClear}
            />
          : <Button
            icon={<FiSearch className="text-sm" />}
            className="btn-primary"
            onClick={handleSearch}
          />
        }
      </div>

      { customers?.length !== 0 && (!isFetching || !isLoading) && !selectedCustomer && comboxBox && (
        <DropdownComboBox
          data={customers.map(customer => ({ text: customer.name, value: customer }))} 
          onClick={({ value }) => callback(value)} 
          dropdownLabel="Rubrica clienti"
          isFetching={isFetching || isLoading}
          pagination={pagination}
          focusIndex={null}
          clickOutsideRef={ref}
        /> 
      )}
    </div>
  );
}