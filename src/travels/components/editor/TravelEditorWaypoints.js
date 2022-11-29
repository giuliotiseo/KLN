import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeContactsListLimit, resetContactsList } from "../../../contacts/slices/contactsListSlice";
import { SmallTitle } from "../../../globals/components/typography/titles";
import { changeVehiclesListLimit } from "../../../vehicles/slices/vehiclesListSlice";
import { changeWarehousesListLimit, changeWarehousesListStatus, resetWarehousesList } from "../../../warehouses/slices/warehousesListSlice";
import { selectSelectedWaypointId } from "../../slices/travelEditorSlice";
import TravelEditorWaypointEnd from "./TravelEditorWaypointEnd";
import TravelEditorWaypointItem from "./TravelEditorWaypointItem";
import TravelEditorWaypointNew from "./TravelEditorWaypointNew";
import TravelEditorWaypointStart from "./TravelEditorWaypointStart";

export default function TravelEditorWaypoints({
  waypoints,
  start,
  end,
}) {
  const selectedWaypointId = useSelector(selectSelectedWaypointId);
  const dispatch = useDispatch();
  
  // Initial list setup
  useEffect(() => {
    dispatch(changeWarehousesListStatus('ACTIVE'));
    dispatch(changeWarehousesListLimit(9999));
    dispatch(changeContactsListLimit(9999));
    dispatch(changeVehiclesListLimit(9999));
    return () => {
      dispatch(resetWarehousesList());
      dispatch(resetContactsList());
    }
  }, [])

  if(!waypoints || Object.keys(waypoints)?.length <= 0) return (
    <div>
      <SmallTitle styles="my-4">
        Attenzione
      </SmallTitle>
      <p className="text-sm inline-block mb-4">
        Fermate non trovate. Aggiungi almeno una fermata prima di confermare questo viaggio
      </p>
    </div>
  )

  return (
    <section className='relative mr-4'>
      <SmallTitle styles="my-4">
        Tabella di marcia
      </SmallTitle>
      <ul>
        <TravelEditorWaypointStart
          start={start}
          selectedWaypointId={selectedWaypointId}
        />

        { Object.keys(waypoints).map((wp_id, index) => {
          const orders = waypoints[wp_id];
          return (
            waypoints[wp_id][0].valid
              ? <TravelEditorWaypointItem
                  key={waypoints[wp_id][0].id + index}
                  title={`Fermata ${index + 1} - ${waypoints[wp_id][0].companyName}`}
                  address={waypoints[wp_id][0].checkpoint.location.address}
                  orders={orders}
                  selectedWaypointId={selectedWaypointId}
                  waypoints={waypoints}
                  waypointId={wp_id}
                  index={index}
                  end={end}
                />
              : <TravelEditorWaypointNew
                  key={waypoints[wp_id][0].id + index}
                  waypoints={waypoints}
                  index={index}
                  waypoint={waypoints[wp_id]}
                  selectedWaypointId={selectedWaypointId}
                />
            )}
          )
        }
        
        <TravelEditorWaypointEnd end={end} selectedWaypointId={selectedWaypointId} />
      </ul>
    </section>
  )
}