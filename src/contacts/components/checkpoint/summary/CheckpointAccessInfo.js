import { TinyTitle } from "../../../../globals/components/typography/titles";
import { COMPLEX_VEHICLE_TYPE_DESCRIPTION } from "../../../../vehicles/libs/helpers";
import { AiOutlineColumnWidth } from "react-icons/ai";
import { MdOutlineEventAvailable } from "react-icons/md";

const CheckpointAccessInfo = ({ checkpoint, styles = "" }) => (
  <section className={styles}>
    <TinyTitle>Proprietà di accesso</TinyTitle>
    {/* <div className="mt-2">
      <p className="flex items-center text-lg">
        <MdOutlineEventAvailable className="mr-2" />
        Mezzi consentiti:
      </p>

      { checkpoint.enabledVehicles?.length > 0
        ? <ul className="list-disc list-inside mt-2">
            { checkpoint.enabledVehicles.map(v => (
              <li key={v} className="chip-neutral list-none px-2 inline-block">{COMPLEX_VEHICLE_TYPE_DESCRIPTION[v]}</li>
            ))}
          </ul>
        : <p className="opacity-50">Nessun mezzo indicato</p>
      }
    </div> */}

    <div className="mt-4">
      <p className="flex items-center text-lg">
        <AiOutlineColumnWidth className="mr-2" /> Massimale metraggio transito: <br />
      </p>

      {checkpoint.maxLength 
        ? <p className="chip-neutral px-2 inline-block">{parseFloat(checkpoint.maxLength).toFixed(1)} metri</p>
        : <p className="opacity-50">Massimale transito non indicato</p>
      }
    </div>
  </section>
)

export default CheckpointAccessInfo;