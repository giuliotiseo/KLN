import { AiOutlineColumnWidth } from "react-icons/ai";
import { CongelatoIcon, FrescoIcon, SeccoIcon } from "../../../../globals/assets/icons";
import { forcedCapitalize } from "../../../../globals/libs/helpers";

const icons = {
  CONGELATO: <CongelatoIcon className="w-4 mr-2 h-auto fill-current" />,
  FRESCO: <FrescoIcon className="w-4 mr-2 h-auto fill-current" />,
  SECCO: <SeccoIcon className="w-4 mr-2 h-auto fill-current" />,
}

const CheckpointAssets = ({ checkpoint, className = "" }) => (
  <section className={className}>
    <h4 className="title-4">Proprietà di accesso</h4>
    <div className="mt-2">
      <p className="flex items-center text-lg">
        <AiOutlineColumnWidth className="mr-2" /> Massimale metraggio transito: <br />
      </p>

      {checkpoint.maxLength 
        ? <p className="chip-neutral px-2 inline-block">{parseFloat(checkpoint.maxLength).toFixed(1)} metri</p>
        : <p className="opacity-50">Massimale transito non indicato</p>
      }
    </div>

    <div className="mt-2">
      <h4 className="title-4">
        Ambito di utilizzo
      </h4>
      { checkpoint?.trades?.length > 0
        ? <ul>
            { checkpoint.trades.map(trade => (
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
      <p>{checkpoint.cargoBay || 0} Baie di carico</p>
    </div>

    <div className="mt-4">
      <h4 className="title-4">
        Scarico container
      </h4>
      { checkpoint.containerUnloading
        ? <p className=" text-cyan-600">Scarico container disponibile</p>
        : <p className=" text-gray-500">Scarico container <b>non</b> disponibile</p>
      }
    </div>
  </section>
)

export default CheckpointAssets;