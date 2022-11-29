import CardDetails from "../../../globals/components/dataDisplay/CardDetails";
// Helpers
import { DANGER_LABELS, TRANSPORT_SUPPORTS } from "../../libs/constants";
// Icons
import { FiBox, FiAlertTriangle, FiCheckSquare, FiSquare } from "react-icons/fi";

const UdcVisualizerHeader = () => (
  <div className="flex items-center">
    <FiBox className="text-lg mr-1" />
    <h3 className="title-3">Info unità di carico</h3>
  </div>
)

// Main component ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function UdcVisualizer ({ order }) {
  return (
    <CardDetails
      header={<UdcVisualizerHeader />}
    >
      <section>
        <div className="flex justify-between py-2 my-1 border-b border-light-50 dark:border-dark-200">
          <p>Numero ordine</p>
          <p>{order.orderNumber}</p>
        </div>

        <div className="flex justify-between py-2 my-1 border-b border-light-50 dark:border-dark-200">
          <p>Supporto di carico</p>
          <p>{TRANSPORT_SUPPORTS[order.support]}</p>
        </div>

        <div className="flex justify-between py-2 my-1 border-b border-light-50 dark:border-dark-200">
          <p>Dimensione supporto</p>
          <p>{order.size}</p>
        </div>

        <div className="flex justify-between py-2 my-1 border-b border-light-50 dark:border-dark-200">
          <p>Quantità {TRANSPORT_SUPPORTS[order.support].toLowerCase()}</p>
          <p>{order.quantity}</p>
        </div>

        
        <div className="flex justify-between py-2 my-1 border-b border-light-50 dark:border-dark-200">
          <p>Avvertenze</p>
          <ul>
            { order?.warnings?.length > 0
              ? order.warnings.map(warn => (
                <li key={warn} className="flex items-center mb-2">
                  <img src={DANGER_LABELS[warn].img} alt={DANGER_LABELS[warn].text} className="mr-2 w-[25px] rounded-full overflow-hidden border-2 border-transparent dark:border-transparent group-hover:border-light-50 dark:group-hover:border-dark-50" />
                  <span>{ DANGER_LABELS[warn].text }</span>
                </li>
              ))
              : <p className="text-sm text-gray-400 dark:text-gray-500">Nessun etichetta di avvertenza segnalata</p>
            }
          </ul>
        </div>

        <div className="flex justify-between py-2 my-1">
          <p>Caratteristiche del trasporto</p>
        </div>
        <div className="flex justify-between py-2 my-1 bg-light-200 dark:bg-dark-200 mt-2 rounded-md">
          <div className="grid grid-cols-4 gap-2 w-full text-center">
            <div className="col-span-1">
              <p className="text-sm font-bold">Peso lordo</p>
              <p>{order?.grossWeight || 'NO DATA'}</p>
            </div>
            <div className="col-span-1">
              <p className="text-sm font-bold">Peso netto</p>
              <p>{order?.netWeight || 'NO DATA'}</p>
            </div>
            <div className="col-span-1">
              <p className="text-sm font-bold">Temperatura</p>
              <p>{order?.temperature}</p>
            </div>
            <div className="col-span-1">
              <p className="text-sm font-bold">Numero colli</p>
              <p>{order.packages}</p>
            </div>
          </div>
        </div>

        <div className="mt-4">
          { order.perishable && <div className="flex items-center"><FiAlertTriangle className="mr-2 text-amber-500" /> L'ordine contiene merce deperibile</div>}
          { order.stackable 
            ? <div className="flex items-center"><FiCheckSquare className="mr-2 text-primary-200 dark:text-primary-300" />Unità di carico sovrapponibile</div>
            : <div className="flex items-center"><FiSquare className="mr-2 text-zinc-500" />Unità di carico non sovrapponibile</div>
          }
        </div>
      </section>
    </CardDetails>
  )
}