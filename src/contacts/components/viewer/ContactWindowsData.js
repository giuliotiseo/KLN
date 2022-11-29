// Helpers
import { format, isDate } from "date-fns";
import { DAYS } from "../../../globals/libs/constants";

const ContactWindowsData = ({
  windows,
  className = "",
  title = ""
}) => {
  // windows as object: windows: { CARICO: [{}], SCARICO: [{}]}
  /*
    Correct windows format: 
      windows: {
        GENERICO: [{ ... }],
      }
  */

  console.log("ma dai...", windows);

  return (
    <section className={className}>
      { title && <h4 className="mb-2 title-3 mx-2">{title}</h4> }
      { windows && windows?.length > 0 
        ? <ul className="p-2 list-none">
            { windows.map((window, index) => (
              window.days?.length > 0
                ? <li key={index} className="items-center mb-2 bg-base-100 rounded-md p-2">
                    <span className="text-lg">
                      { window.days.map(d => DAYS[d - 1]).join(', ')}
                    </span>
                    {(window?.start && isDate(new Date(window?.start)) && (window?.end && isDate(new Date(window?.end))) && (
                      <span className="text-base block text-gray-400 dark:text-gray-600">
                        dalle {format(new Date(`${window.start}`), "HH:mm")} alle {format(new Date(`${window.end}`), "HH:mm")}
                      </span>
                    ))}
                  </li>
                : null
            ))}
          </ul>
        : <p className="text-gray-400 dark:text-gray-600 mx-2">Nessun turno impostato</p>
      }
    </section>
  )
}

export default ContactWindowsData;