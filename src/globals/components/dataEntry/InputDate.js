import DatePicker, { registerLocale } from "react-datepicker";
import ActionButton from "../buttons/ActionButton";
import InputStatusLabel from "./InputStatusLabel";
import { it } from 'date-fns/locale';
import v4 from "uuid";
registerLocale('it', it);

/*
Positions:
'auto', 'auto-left', 
'auto-right', 'bottom', 'bottom-end', 'bottom-start', 
'left', 'left-end', 'left-start', 'right', 
'right-end', 'right-start', 'top', 'top-end', 'top-start'
*/

// Main component ------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function InputDate ({
  id = v4(),
  label,
  selected,
  showTimeInput = false,
  dateFormat="dd/MM/yyyy",
  timeInputLabel="",
  placeholder="",
  className="",
  labelClassName= "",
  nowButtonClassName = "",
  nowButtonText = "Adesso",
  statusLabel = true,
  nowButton = false,
  minDate = null,
  maxDate = null,
  selectsRange = false,
  isError = false,
  callback = (value) => console.log('Default text result <InputDate />', value),
  withPortal = false,
  position = "bottom-start"
}) {
  const isConfirmed = selected !== "" && selected !== null && new Date(selected);
  const isEmpty = selected === "" || selected === null;

  return (
    <div className={`flex items-center ${className}`}>
      <p className={`label ${labelClassName}`}>{label}</p>
      <div className={`input w-full flex items-center ${isError && 'input--error'}`}>
        { statusLabel && (
          <InputStatusLabel
            id={id}
            isEdit={null}
            isEmpty={isEmpty}
            isError={isError}
            isConfirmed={isConfirmed}
            className="mr-2"
          />
        )}
        
        <DatePicker
          selected={selected ? new Date(selected) : null}
          locale="it"
          placeholderText={placeholder}
          isClearable={true}
          dateFormat={dateFormat}
          showTimeInput={showTimeInput}
          timeInputLabel={timeInputLabel}
          closeOnScroll={(e) => e.target === document}
          className="bg-transparent block w-full outline-none"
          minDate={minDate ? new Date(minDate) : null}
          maxDate={maxDate ? new Date(maxDate) : null}
          selectsRange={selectsRange}
          withPortal={withPortal}
          popperPlacement={position}
          onChange={date => callback({
            id,
            value: date ? date.toISOString() : null,
            minDate,
            maxDate
          })}
        />
      </div>
      
      { nowButton && !selectsRange && (
        <ActionButton
          text={nowButtonText}
          styles={`btn-primary ml-2 ${nowButtonClassName}`}
          onClick={() => callback({id, value: new Date().toISOString(), minDate, maxDate, })}
        />
      )}
    </div>
  )
}