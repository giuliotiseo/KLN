import { useState } from "react";
import SearchPlaces from "../../../../globals/components/dataEntry_v2/SearchPlaces";
import SimpleMap from "../../../../globals/components/layout/SimpleMap";
import Button from "../../../../globals/components/buttons_v2/Button";
import { FiDelete, FiMapPin } from "react-icons/fi";
import { getStandardCoordinatesByCheckpoint } from "../../../../globals/libs/helpers";

const CheckpoinBasicInfo = ({ checkpoint, dispatch }) => {
  const [ mapVisibility, setMapVisibility ] = useState(false);
  const standard_coordinate = getStandardCoordinatesByCheckpoint(checkpoint);
  return (
    <section>
      <div className="flex flex-col mt-2">
        { checkpoint?.location?.address
          ? <div className="text-base mt-2 chip-neutral">
              <h4 className="title-4 m-2 mb-0  block">Indirizzo selezionato:</h4>
              <div className="flex items-start ">
              <button
                className="rotate-180 mx-1 mt-1 text-primary-200 dark:text-primary-300 hover:text-danger-200 dark:hover:text-danger-300 text-base" 
                onClick={() => dispatch({ type: "reset", name: "location" })}
              >
                <FiDelete />
              </button>
              { checkpoint.location.address}
              </div>
            </div>
          : <SearchPlaces
              label={"Cerca l'indirizzo"}
              onClick={value => dispatch({ type: "change_checkpoint", name: "location", value })}
              clearAfterClick={true}
              className="mt-2 w-full text-base"
            />
        }
      </div>

      <Button
        icon={<FiMapPin />}
        text={mapVisibility ? 'Nascondi mappa' : 'Mostra mappa'}
        className="btn-ghost mt-2"
        onClick={() => setMapVisibility(prev => !prev)}
      />

      { mapVisibility && <div className="h-[400px] mt-2 drounded-md overflow-hidden">
        <SimpleMap
          lat={standard_coordinate.lat}
          lng={standard_coordinate.lng}
          onClick={value => dispatch({ type: "change_checkpoint", name: "location", value })}
        />
      </div> }
    </section>
  )
}

export default CheckpoinBasicInfo;