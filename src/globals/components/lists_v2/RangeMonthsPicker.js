import { endOfMonth } from "date-fns";
import DatePicker from "react-datepicker";

const RangeMonthsPicker = ({
  dateFrom,
  dateTo,
  className,
  label = "Periodo",
  updateMonthDateRange = (value) => console.log("Update month date range in <RangeMonthsPicker />", value)
}) => {
  const from  = dateFrom ? new Date(dateFrom) : dateFrom;
  const to = dateTo ? new Date(dateTo) : dateTo;

  return (
    <div className={`py-2 px-6 ${className}`}>
      <p className='text-sm font-bold'>{label}</p>
      <div className="flex">
        <div className="flex">
          <span className="block mr-1">Da: </span>
          <DatePicker
            selected={from}
            onChange={(date) => updateMonthDateRange([date.toISOString(), to.toISOString()])}
            selectsStart
            startDate={from}
            endDate={to}
            dateFormat="MMM"
            showMonthYearPicker
            closeOnScroll={(e) => e.target === document}
            className="relative block flex-1 mx-auto w-full bg-transparent outline-none text-base"
            locale="it"
            maxDate={to}
            openToDate={new Date()}
            isClearable={false}
          />
        </div>
        
        <div className="flex">
          <span className="block mr-1">A: </span>
          <DatePicker
            selected={to}
            onChange={(date) => updateMonthDateRange([from.toISOString(), endOfMonth(date).toISOString()])}
            selectsEnd
            startDate={from}
            endDate={to}
            dateFormat="MMM"
            showMonthYearPicker
            closeOnScroll={(e) => e.target === document}
            className="relative block flex-1 mx-auto w-full bg-transparent outline-none text-base"
            locale="it"
            minDate={from}
            openToDate={new Date()}
            isClearable={false}
          />
        </div>
      </div>
    </div>
  )
}

export default RangeMonthsPicker;