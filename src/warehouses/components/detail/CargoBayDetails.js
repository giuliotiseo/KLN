import { CongelatoIcon, FrescoIcon, SeccoIcon } from "../../../globals/assets/icons";
import { forcedCapitalize } from "../../../globals/libs/helpers";

const icons = {
  CONGELATO: <CongelatoIcon className="w-4 mr-2 h-auto fill-current" />,
  FRESCO: <FrescoIcon className="w-4 mr-2 h-auto fill-current" />,
  SECCO: <SeccoIcon className="w-4 mr-2 h-auto fill-current" />,
}

export default function CargoBayDetails({ warehouse }) {
  return (
    <div className="flex flex-col">
      <h4 className="title-4">Accesso al magazzino</h4>
      { warehouse.maxLength && <p>Massimale metraggio transito: <b>{parseFloat(warehouse.maxLength).toFixed(1)}m</b></p> }

      <div className="mt-2">
        <h4 className="title-4">
          Ambito di utilizzo
        </h4>
        { warehouse?.trades?.length > 0
          ? <ul>
              { warehouse.trades.map(trade => (
                <li key={trade} className="flex items-center">
                  { icons[trade] }
                  {forcedCapitalize(trade)}
                </li>
              ))}
            </ul>
          : <p>Dati non indicati</p>
        }
      </div>

      <div className="mt-4">
        <h4 className="title-4">
          Baie di carico
        </h4>
        <p>{warehouse.cargoBay || 0} Baie di carico</p>
      </div>

      <div className="mt-4">
        <h4 className="title-4">
          Scarico container
        </h4>
        { warehouse.containerUnloading
          ? <p className=" text-cyan-600">Scarico container disponibile</p>
          : <p className=" text-gray-500">Scarico container <b>non</b> disponibile</p>
        }
      </div>

    </div>
  )
}