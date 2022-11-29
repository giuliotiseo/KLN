import { endOfMonth, startOfMonth } from "date-fns";
import DatePicker from "react-datepicker";

const MonthPicker = ({
  date,
  className,
  label = "Periodo",
  updateMonthDateRange = (value) => console.log("Update month date range in <MonthPicker />", value)
}) => {
  const parsedDate  = date ? new Date(date) : date;

  return (
    <div className={`py-2 px-6 ${className}`}>
      <p className='text-sm font-bold'>{label}</p>
      <div className="flex">
        <div className="flex">
          <span className="block mr-1">Mese: </span>
          <DatePicker
            selected={parsedDate}
            onChange={(dateResult) => updateMonthDateRange(startOfMonth(dateResult).toISOString())}
            selectsStart
            startDate={parsedDate}
            endDate={endOfMonth(parsedDate)}
            dateFormat="MMM"
            showMonthYearPicker
            closeOnScroll={(e) => e.target === document}
            className="relative block flex-1 mx-auto w-full bg-transparent outline-none text-base"
            locale="it"
            openToDate={new Date()}
            isClearable={false}
          />
        </div>
      </div>
    </div>
  )
}

export default MonthPicker;