// Helpers
import { format, isDate } from "date-fns";
import { DAYS } from "../../../../globals/libs/constants";

const WindowCheckpointDetails = ({
  windows,
  windowsToShow = ["CARICO", "SCARICO"],
  className = ""
}) => {
  // windows as object: windows: { CARICO: [{}], SCARICO: [{}]}
  /*
    Correct windows format: 
      windows: {
        CARICO: [{ ... }],
        SCARICO: [{ ... }]
      }
  */

  const loadingWindows = windows?.CARICO || [{}];
  const unLoadingWindows = windows?.SCARICO || [{}];
  
  return (
    <section className={className}>
      { windowsToShow.includes("CARICO") && (
        <>
          <h4 className="mb-2 title-4">Finestre di carico</h4>
          { loadingWindows?.length > 0 
            ? <ul className="list-none">
                { loadingWindows.map((window, index) => (
                  <li key={index} className="items-center mb-2">
                    { window.days?.length > 0 && <span className="inline-flex mr-2 font-bold text-secondary-100 dark:text-secondary-300">{index + 1}</span> }
                    <span>
                      { window.days?.length > 0
                        ? window.days.map(d => DAYS[d - 1]).join(', ')
                        : <span>Giorni della settimana non indicati (carico)</span>
                      }

                      {(window?.start && isDate(new Date(window?.start)) && (window?.end && isDate(new Date(window?.end))) && (
                        <span className="ml-3 text-sm block">dalle {format(new Date(`${window.start}`), "HH:mm")} alle {format(new Date(`${window.end}`), "HH:mm")}</span>
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            : <p className="text-gray-300 dark:text-gray-500">Nessuna finestra di operatività indicata per la fase di carico</p>
          }
        </>
      )}

      { windowsToShow.includes("SCARICO") && (
        <>
          <h4 className="title-4 mt-4 mb-2">Finestre di scarico</h4>
          { unLoadingWindows?.length > 0 
            ? <ul className="list-none">
                { unLoadingWindows.map((window, index) => 
                  <li key={index} className="items-center mb-2">
                    { window.days?.length > 0 && <span className="inline-flex mr-2 font-bold text-secondary-100 dark:text-secondary-300">{index + 1}</span> }
                    <span>
                      { window.days?.length > 0
                        ? window.days.map(d => DAYS[d - 1]).join(', ')
                        : <span>Giorni della settimana non indicati (scarico)</span>
                      }

                      {(window?.start && isDate(new Date(window?.start)) && (window?.end && isDate(new Date(window?.end))) && (
                        <span className="ml-3 text-sm block">dalle {format(new Date(`${window.start}`), "HH:mm")} alle {format(new Date(`${window.end}`), "HH:mm")}</span>
                      ))}
                    </span>
                  </li>
                )}
              </ul>
            : <p className="text-gray-300 dark:text-gray-500">Nessuna finestra di operatività indicata per la fase di scarico</p>
          }
        </>
      )}
    </section>
  )
}

export default WindowCheckpointDetails;