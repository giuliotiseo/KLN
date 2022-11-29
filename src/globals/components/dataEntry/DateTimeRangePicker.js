import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { it } from 'date-fns/locale';
registerLocale('it', it);

export default function DateTimeRangePicker({
  label,
  labelIcon = null,
  start,
  end,
  setStart,
  setEnd,
  timeMargin,
  minimumStart = null,
  maximumStart = null,
  styles = "",
  withPortal = false,
  showTimeSelect = true
}) {
  const filterPassedTimeStart = (time) => {
    if(!minimumStart) {
      if(end) {
        const selectedDate = new Date(time);
        return end.getTime() > selectedDate.getTime();
      } else {
        const currentDate = new Date().addHours(timeMargin);
        const selectedDate = new Date(time);
        return currentDate.getTime() < selectedDate.getTime();
      }
    } else {
      const selectedDate = new Date(time);
      return new Date(minimumStart).getTime() < selectedDate.getTime();
    }
  };

  const filterPassedTimeEnd= (time) => {
    if(start) {
      const selectedDate = new Date(time);
      return start.getTime() < selectedDate.getTime();
    } else {
      const currentDate = new Date().addHours(timeMargin);
      const selectedDate = new Date(time);
      return currentDate.getTime() < selectedDate.getTime();
    }
  };

  return (
    <div className="w-full">
      <p className="label flex items-center whitespace-normal">{labelIcon && labelIcon() } {label}</p>
      <div className={styles}>
        <DatePicker
          selected={start}
          onChange={(date) => setStart(date)}
          selectsStart
          startDate={start}
          endDate={end}
          locale="it"
          minDate={minimumStart ? new Date(minimumStart) : null}
          maxDate={maximumStart ? new Date(maximumStart) : null}
          showTimeSelect={showTimeSelect}
          dateFormat="Pp"
          placeholderText="Da:"
          closeOnScroll={(e) => e.target === document}
          withPortal={withPortal}
          openToDate={new Date()}
          className="relative input my-1 w-full block flex-1"
          filterTime={filterPassedTimeStart}
        />
        <DatePicker
          selected={end}
          onChange={(date) => setEnd(date)}
          selectsEnd
          startDate={start}
          endDate={end}
          minDate={start}
          locale="it"
          showTimeSelect={showTimeSelect}
          dateFormat="Pp"
          placeholderText="A:"
          closeOnScroll={(e) => e.target === document}
          withPortal={withPortal}
          openToDate={new Date()}
          className="relative input my-1 w-full flex-1"
          filterTime={filterPassedTimeEnd}
        />
      </div>
    </div>
  );
}