// Components
import { Paragraph } from "../../globals/components/typography/paragraphs";
import { TinyTitle } from "../../globals/components/typography/titles";
// Helpers
import { format, isDate } from "date-fns";
import { days } from "../libs/reducers";

const WindowCheckpointDetails = ({ windows, styles = "" }) => {
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
    <section className={styles}>
      <TinyTitle styles="mb-2">Finestre di carico</TinyTitle>
      { loadingWindows?.length > 0 
        ? <ul className="pl-2 list-none">
            { loadingWindows.map((window, index) => 
              <li key={index} className="items-center mb-2">
                { window.days?.length > 0 && <span className="inline-flex mr-1 font-bold text-secondary-100 dark:text-secondary-300">{index + 1}</span> }
                <span>
                  { window.days?.length > 0
                    ? window.days.map(d => days[d - 1]).join(', ')
                    : <span>Giorni della settimana non indicati (carico)</span>
                  }

                  {(window?.start && isDate(new Date(window?.start)) && (window?.end && isDate(new Date(window?.end))) && (
                    <span className="ml-3 text-sm block">dalle {format(new Date(`${window.start}`), "HH:mm")} alle {format(new Date(`${window.end}`), "HH:mm")}</span>
                  ))}
                </span>
              </li>
            )}
          </ul>
        : <Paragraph styles="opacity-50">Nessuna finestra di operatività indicata per la fase di carico</Paragraph>
      }

      <TinyTitle styles="mt-4 mb-2">Finestre di scarico</TinyTitle>
      { unLoadingWindows?.length > 0 
        ? <ul className="pl-2 list-none">
            { unLoadingWindows.map((window, index) => 
              <li key={index} className="items-center mb-2">
                { window.days?.length > 0 && <span className="inline-flex mr-1 font-bold text-secondary-100 dark:text-secondary-300">{index + 1}</span> }
                <span>
                  { window.days?.length > 0
                    ? window.days.map(d => days[d - 1]).join(', ')
                    : <span>Giorni della settimana non indicati (scarico)</span>
                  }

                  {(window?.start && isDate(new Date(window?.start)) && (window?.end && isDate(new Date(window?.end))) && (
                    <span className="ml-3 text-sm block">dalle {format(new Date(`${window.start}`), "HH:mm")} alle {format(new Date(`${window.end}`), "HH:mm")}</span>
                  ))}
                </span>
              </li>
            )}
          </ul>
        : <Paragraph styles="opacity-50">Nessuna finestra di operatività indicata per la fase di scarico</Paragraph>
      }
    </section>
  )
}

export default WindowCheckpointDetails;