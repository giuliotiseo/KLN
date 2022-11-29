import { FiAlertTriangle, FiMapPin } from "react-icons/fi";
import SimpleMap from "../../../../globals/components/layout/SimpleMap";
import { getStandardCoordinatesByCheckpoint } from "../../../../globals/libs/helpers";

const CheckpointLocation =  ({
  checkpoint,
  setModalAddress,
  editEnabled,
  index,
  className = "",
  hideMap
}) => {
  if(Object.keys(checkpoint?.location).length <= 0) return null; 
  const standard_coordinate = getStandardCoordinatesByCheckpoint(checkpoint);

  return (
    <section className={className}>
      <div className="flex text-base">
        {(Object.keys(checkpoint?.location?.coordinate).length === 2 && checkpoint?.location?.coordinate?.lat && checkpoint?.location?.coordinate?.lng)
          || (checkpoint.location.coordinate?.length === 2)
          ? <span className="inline-block text-base mr-1" data-tip="Checkpoint tracciato">
            <span className={`w-[20px] h-[20px] text-center flex items-center justify-center bg-emerald-500 dark:bg-emerald-300 p-1 rounded-full`}>
              <FiMapPin className="text-light-100 dark:text-dark-100" />
            </span>
          </span>
          : <button
              onClick={() => editEnabled ? setModalAddress({ address: checkpoint.location.address, index }) : null} 
              data-tip={`${editEnabled ? "Click per sincronizzare coordinate" : "Coordinate non presenti"}`} className={`rounded-full w-6 h-6 text-center inline-block ${editEnabled ? "cursor-pointer" : "cursor-default"}`}>                    
              <span className={`w-[20px] h-[20px] text-center flex items-center justify-center bg-amber-500 dark:bg-amber-300 p-1 rounded-full`}>
                <FiAlertTriangle className="mx-auto text-light-100 dark:text-dark-100" />
              </span>
          </button>
        }
        {checkpoint.location.address}
      </div>

      { !hideMap && <div className="h-[300px] mt-2 rounded-md overflow-hidden">
        <SimpleMap
          lat={standard_coordinate.lat}
          lng={standard_coordinate.lng}
        />
      </div> }
    </section>
  )
}

export default CheckpointLocation;