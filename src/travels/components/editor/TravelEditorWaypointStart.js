import { FiPlusCircle } from "react-icons/fi";
import { useDispatch } from "react-redux"
import { addEmptyWaypointAfterStart } from "../../slices/travelEditorSlice";
import TravelEditorDriver from "./TravelEditorDriver"
import TravelEditorStartCheckpoint from "./TravelEditorStartCheckpoint"
import TravelEditorVehicle from "./TravelEditorVehicle"

export default function TravelEditorWaypointStart({
  start,
  selectedWaypointId
}) {
  const dispatch = useDispatch();
  return (
    <li className={selectedWaypointId ? 'opacity-30 pointer-events-none' : 'opacity-100 pointer-events-auto'}>
      <div className={`bg-base-100 rounded-md py-2 px-4 mb-4`}>
        <TravelEditorStartCheckpoint
          checkpoint={start?.checkpoint}
        />

        { start?.driver && (
          <TravelEditorDriver
            driver={start.driver}
          /> 
        )}
        
        <TravelEditorVehicle
          towing={start.towing}
          towed={start.towed}
        />
      </div>

      <div className="my-2 text-center flex items-center juystify-center">
        <button
          onClick={() => dispatch(addEmptyWaypointAfterStart())}
          className="inline-block mx-auto text-3xl text-gray-500 hover:text-primary-200 dark:hover:text-primary-300"
        >
          <FiPlusCircle />
        </button>
      </div>
    </li>
  )
}