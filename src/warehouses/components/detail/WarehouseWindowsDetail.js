import { Paragraph } from "../../../globals/components/typography/paragraphs";
import { SmallTitle } from "../../../globals/components/typography/titles";
import format from "date-fns/format";
import { FiClock } from "react-icons/fi";
import { days } from "../../../contacts/libs/reducers";
import { isDate } from "date-fns/esm";

const WarehouseWindowsDetail = ({ windows = [] }) => {
  // windows as array: windows = [{...}]
  const loadingWindows = windows.filter(wind => wind?.type === "CARICO");
  const unLoadingWindows = windows.filter(wind => wind?.type === "SCARICO");

  console.log("Vedi windows", windows);

  return (
    <div className="flex flex-col">
      <SmallTitle>Finestre di carico</SmallTitle>

      { loadingWindows?.length > 0 
        ? <ul className="list-none">
            { loadingWindows.map((window, index) => (
              <li key={index} className="items-center mb-2 chip-neutral">
                <span className="inline-flex mr-1 font-bold text-secondary-100 dark:text-secondary-300">{index + 1}</span>
                <span>
                  { window?.days?.length > 0
                    ? window.days.map(d => days[d - 1]).join(', ')
                    : 'Giorni di apertura non disponibili'
                  }
                  <br />
                  { window?.start && window?.end 
                    ? isDate(new Date(window?.start)) && isDate(new Date(window?.end)) && <span className="ml-4 text-sm">dalle {format(new Date(`${window.start}`), "HH:mm")} alle {format(new Date(`${window.end}`), "HH:mm")}</span>
                    : 'Orari non disponibili'
                  }
                </span>
              </li>
            ))}
          </ul>
        : <Paragraph styles="opacity-50">Nessuna finestra di operatività indicata per la fase di carico</Paragraph>
      }

      <SmallTitle>Finestre di scarico</SmallTitle>
      { unLoadingWindows?.length > 0 
        ? <ul className="list-none">
            { unLoadingWindows.map((window, index) => (
              <li key={index} className="items-center mb-2 chip-neutral">
                <span className="inline-flex mr-1 font-bold text-secondary-100 dark:text-secondary-300">{index + 1}</span>
                <span>
                  { window?.days?.length > 0 
                    ? window.days.map(d => days[d - 1]).join(', ')
                    : 'Giorni di apertura non disponibili'
                  }
                  <br />
                    { window?.start && window?.end 
                    ? isDate(new Date(window?.start)) && isDate(new Date(window?.end)) && <span className="ml-4 text-sm">dalle {format(new Date(`${window.start}`), "HH:mm")} alle {format(new Date(`${window.end}`), "HH:mm")}</span>
                    : 'Orari non disponibili'
                  }
                </span>
              </li>
            ))}
          </ul>
        : <Paragraph styles="opacity-50">Nessuna finestra di operatività indicata per la fase di scarico</Paragraph>
      }
    </div>
)}

export default WarehouseWindowsDetail;