import DatePicker from "react-datepicker";
import InputCheckbox from "./InputCheckbox";
import { FiDelete } from "react-icons/fi";
import { endOfDay, startOfDay } from "date-fns";
import { DAYS } from "../../libs/constants";

const WindowCompiler = ({
  index,
  title = "Finestra",
  titleClassName = "title-4",
  days,
  window,
  dispatchWindows,
  removeWindow = null,
  className = "",
  showIndexInTitle = true,
  canDelete = true
}) => {  
  return (
    <div className={className}>
      <h3 className={titleClassName}>
        { index > 0 && canDelete && (
          <button
            className="inline-block text-danger-200 dark:text-danger-300 mr-2"
            onClick={() => removeWindow
              ? removeWindow({ index, windowType: window.type })
              : dispatchWindows({ type: "remove_window", index, windowType: window.type, })}
          >
            <FiDelete className="rotate-180" />
          </button>
        )}

        <span className="inline-block">{title} { showIndexInTitle && index + 1}</span>
      </h3>
      
      <div className="grid grid-cols-3 text-center">
        { DAYS.map((day, day_idx) => (
          <div key={`${window.type}-${index}-${day_idx}`} className="col-span-1">
            <InputCheckbox
              id={`${window.type}-${index}-${day_idx}-${day}`}
              name={day}
              label={day}
              value={day_idx + 1}
              initialValues={days}
              className="p-1"
              // inputClassName="absolute opacity-0"
              callback={value => dispatchWindows({ type: "toggle_day", value: day_idx + 1, windowType: window.type, index })}
            />
          </div>
        ))}
      </div>

      <p className="mt-4 mb-2 label">Orario di operatività</p>
      <div className="flex">
        <DatePicker
          selected={window?.start ? new Date(window.start) : null}
          onChange={value =>  dispatchWindows({ type: "windows_time", name: "start", value: value ? value.toISOString() : null, windowType: window.type, index })}
          showTimeSelect
          showTimeSelectOnly
          minTime={startOfDay(new Date())}
          maxTime={window?.end ? new Date(window.end) : endOfDay(new Date())}
          timeIntervals={15}
          timeCaption="Inizio"
          placeholderText="Da:"
          dateFormat="HH:mm"
          className="input mr-1 w-full flex-1"
        />

        <DatePicker
          selected={window?.end ? new Date(window.end) : null}
          onChange={value =>  {
            console.log("Value", value);
            dispatchWindows({ type: "windows_time", name: "end", value: value ? value.toISOString() : null, windowType: window.type, index })
          }}
          showTimeSelect
          showTimeSelectOnly
          minTime={window?.start ? new Date(window.start) : startOfDay(new Date())}
          maxTime={endOfDay(new Date())}
          timeIntervals={15}
          placeholderText="A:"
          timeCaption="Fine"
          dateFormat="HH:mm"
          className="input ml-1 w-full flex-1"
        />
      </div>
    </div>
  )
}


export default WindowCompiler;