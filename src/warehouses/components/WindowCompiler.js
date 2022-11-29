import DatePicker from "react-datepicker";
// Custom components
import Checkbox from "../../globals/components/dataEntry/Checkbox";
import { TinyTitle } from "../../globals/components/typography/titles";
import { FiDelete } from "react-icons/fi";
import { endOfDay, startOfDay } from "date-fns";
import { days } from "../../contacts/libs/reducers";

const WindowCompiler = ({ index, title = "Finestra", window, dispatchWindows, styles = "" }) => {
  return (
    <div className={styles}>
      <TinyTitle>
        { index > 0 && (
          <button
            className="inline-block text-danger-200 dark:text-danger-300 mr-2"
            onClick={() => dispatchWindows({ type: "remove_window", index, windowType: window.type, })}
          >
            <FiDelete className="rotate-180" />
          </button>
        )}

        <span className="inline-block">{title} {index + 1}</span>
      </TinyTitle>
      
      <div className="flex flex-wrap">
        { days.map((day, day_idx) => (
          <div key={`${window.type}-${index}-${day_idx}`} className="mr-2">
            <Checkbox
              id={`${window.type}-${index}-${day_idx}-${day}`}
              name={day}
              label={day}
              value={day_idx + 1}
              initialStatus={window.days.includes(day_idx + 1)}
              controlled={true}
              onChange={value => dispatchWindows({ type: "toggle_day", value, windowType: window.type, index })}
              labelStyle="mt-2 text-lg "
            />
          </div>
        ))}
      </div>

      <p className="mt-4 mb-2 label">Orario di operatività</p>
      <div className="flex">
        <DatePicker
          selected={window?.start ? new Date(window.start) : null}
          onChange={value =>  dispatchWindows({ type: "windows_time", name: "start", value, windowType: window.type, index })}
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
            dispatchWindows({ type: "windows_time", name: "end", value, windowType: window.type, index })
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