import DatePicker from "react-datepicker";
import ActionButton from "../buttons/ActionButton";
import { FiSearch } from "react-icons/fi";

export default function InputSearchDate({
  label,
  startDate,
  endDate,
  dateFormat="dd/MM/yyyy",
  placeholder="",
  className="",
  labelClassName="",
  contentClassName="",
  minDate = null,
  maxDate = null,
  selectsRange = false,
  loading,
  callback,
}) {
  return (
    <div className={`flex items-center ${className}`}>
      <p className={`label ${labelClassName}`}>{label}</p>
      <div className={`flex items-center w-full ${contentClassName}`}>
        <div className="flex items-center input w-full">
          <DatePicker
            selectsRange={selectsRange}
            className="bg-transparent block w-full outline-none"
            startDate={startDate}
            endDate={endDate}
            closeOnScroll={(e) => e.target === document}
            dateFormat={dateFormat}
            label={label}
            locale="it"
            openToDate={new Date()}
            placeholderText={placeholder}
            onChange={(output) => callback(output)}
            minDate={minDate ? new Date(minDate) : null}
            maxDate={maxDate ? new Date(maxDate) : null}
            isClearable
          />
        </div>
        <ActionButton
          icon={() => <FiSearch />}
          styles={`btn-primary ml-2`}
          loading={loading}
          onClick={() => callback([startDate, endDate])}
        />
      </div>
    </div>
  )
}