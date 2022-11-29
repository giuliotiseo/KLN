import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SmallTitle } from '../../../globals/components/typography/titles';
import TravelWaypointStart from '../waypoints/TravelWaypointStart';
import TravelWaypointEnd from '../waypoints/TravelWaypointEnd';
import TravelCreatorWaypointItem from './TravelCreatorWaypointItem';
// Api
import { changeTravelCreatorDriver, changeTravelCreatorEnd, changeTravelCreatorStart, changeTravelCreatorTowedVehicle, changeTravelCreatorTowingVehicle, selectTravelCreatorDriver, selectTravelCreatorEnd, selectTravelCreatorStart, selectTravelCreatorTowedVehicle, selectTravelCreatorTowingVehicle, selectTravelCreatorWaypoints } from '../../slices/travelCreatorSlice';
import { changeWarehousesListLimit, changeWarehousesListStatus, resetWarehousesList } from '../../../warehouses/slices/warehousesListSlice';
import { changeContactsListLimit, resetContactsList } from '../../../contacts/slices/contactsListSlice';
import { changeVehiclesListLimit } from '../../../vehicles/slices/vehiclesListSlice';

// Main component ------------------------------------------------------------------------------------------------------------
export default function TravelCreatorWaypoints() {
  // Selectors
  const start = useSelector(selectTravelCreatorStart);
  const end = useSelector(selectTravelCreatorEnd);
  const driver = useSelector(selectTravelCreatorDriver);
  const towingVehicle = useSelector(selectTravelCreatorTowingVehicle)
  const towedVehicle = useSelector(selectTravelCreatorTowedVehicle)
  const waypoints = useSelector(selectTravelCreatorWaypoints);

  // Utilities
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

  return (
    <section className='relative ml-4'>
      <SmallTitle styles="my-4">
        Tabella di marcia
      </SmallTitle>
      <ul className='h-full mb-4 relative'>
        <TravelWaypointStart
          key="start"
          title={`Punto di partenza`}
          start={start}
          driver={driver}
          towingVehicle={towingVehicle}
          towedVehicle={towedVehicle}
          onChangeWarehouse={(value) => dispatch(changeTravelCreatorStart(value))}
          clearWarehouse={() => dispatch(changeTravelCreatorStart(null))}
          onChangeDriver={(value) => dispatch(changeTravelCreatorDriver(value))}
          clearDriver={() => dispatch(changeTravelCreatorDriver(null))}
          onChangeTowingVehicle={(value) => dispatch(changeTravelCreatorTowingVehicle(value))}
          clearTowingVehicle={() => dispatch(changeTravelCreatorTowingVehicle(null))}
          onChangeTowedVehicle={(value) => dispatch(changeTravelCreatorTowedVehicle(value))}
          clearTowedVehicle={() => dispatch(changeTravelCreatorTowedVehicle(null))}
        />

        {(Object.keys(waypoints)?.length > 0) && Object.keys(waypoints).map((w_id, index) => (
          <TravelCreatorWaypointItem
            key={w_id}
            id={w_id}
            title={`Fermata ${index + 1} - ${waypoints[w_id][0].companyName}`}
            address={waypoints[w_id][0].address}
            orders={waypoints[w_id]}
          />
        ))}

        <TravelWaypointEnd
          key="end"
          title={`Punto di ritorno`}
          end={end}
          onChange={(value) => dispatch(changeTravelCreatorEnd(value))}
          clear={() => dispatch(changeTravelCreatorEnd(null))}
        />
      </ul>
    </section>
  )
}