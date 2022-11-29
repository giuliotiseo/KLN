import { endOfMonth } from "date-fns";
import DatePicker from "react-datepicker";

const RangeMonthsPicker = ({
  dateFrom,
  dateTo,
  className,
  label = "Periodo",
  updateMonthDateRange = (value) => console.log("Update month date range in <RangeMonthsPicker />", value)
}) => {
  return (
    <div className={`py-2 px-6 ${className}`}>
      <p className='text-sm font-bold'>{label}</p>
      <div className="flex">
        <div className="flex">
          <span className="block mr-1">Da: </span>
          <DatePicker
            selected={dateFrom}
            onChange={(date) => updateMonthDateRange([date.toISOString(), dateTo.toISOString()])}
            selectsStart
            startDate={dateFrom}
            endDate={dateTo}
            dateFormat="MMM"
            showMonthYearPicker
            closeOnScroll={(e) => e.target === document}
            className="relative block flex-1 mx-auto w-full bg-transparent outline-none text-base"
            locale="it"
            maxDate={dateTo}
            openToDate={new Date()}
            isClearable={false}
          />
        </div>
        
        <div className="flex">
          <span className="block mr-1">A: </span>
          <DatePicker
            selected={dateTo}
            onChange={(date) => updateMonthDateRange([dateFrom.toISOString(), endOfMonth(date).toISOString()])}
            selectsEnd
            startDate={dateFrom}
            endDate={dateTo}
            dateFormat="MMM"
            showMonthYearPicker
            closeOnScroll={(e) => e.target === document}
            className="relative block flex-1 mx-auto w-full bg-transparent outline-none text-base"
            locale="it"
            minDate={dateFrom}
            openToDate={new Date()}
            isClearable={false}
          />
        </div>
      </div>
    </div>
  )
}

export default RangeMonthsPicker;