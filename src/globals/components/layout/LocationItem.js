import { FiX } from "react-icons/fi";
import { MdGpsFixed } from "react-icons/md";
import { toast } from "react-toastify";
import ActionButton from "../buttons/ActionButton";
import Button from "../buttons_v2/Button";

const LocationItem = ({ location, styles, clearLocation }) => {
  if(!location?.place_id && clearLocation) {
    toast.error(`${location.address} presenta delle anomalie. Controlla che il punto di interesse abbia tutte le informazioni e le coordinate sincronizzate`);
    clearLocation();
  }

  return (
    <div className={`flex items-start ${styles}`}>
      <MdGpsFixed className="text-lg text-primary-200 dark:text-primary-300 mr-1 top-1 relative" />
      <div>
        <div className="flex">
          <p>{location.address}</p>

          { clearLocation && (
            <Button
              icon={<FiX className="text-sm" />}
              onClick={clearLocation}
              className="btn-ghost ml-2 text-sm p-0 rounded-full w-6 h-6 flex justify-center hover:bg-light-300 dark:hover:bg-dark-300"
            />
          )}
        </div>

        {/* For compatibility with new version of Location */}
        { !location?.place_id && <p className="alert-danger px-2 text-sm mt-2">Questo magazzino presenta dati mancanti: coordinate e place_id</p>}

        {/* For compatibility with new version of Location */}
        <div className="flex">
          { !location?.place_id && clearLocation && (
            <ActionButton
              styles="btn-danger my-0 py-0 text-sm mt-2 mr-2"
              onClick={clearLocation}
              text="Rilevata anomalia"
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default LocationItem;