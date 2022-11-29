import {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import useListVehicles from '../hooks/useListVehicles';
import RoundedBg from '../../globals/components/layout/RoundedBg';
import VehiclesListSideMenu from '../components/list/VehiclesListSideMenu';
import VehiclesListLayout from '../layout/VehiclesListLayout';
// Actions
import { changeVehiclesList, selectVehiclesListLicensePlate, selectVehiclesListLimit } from '../slices/vehiclesListSlice';

// Main component -----------------------------------------------------------------------------------------------
export default function VehiclesListContainer() {
  const [ searchParams, setSearchParams ] = useSearchParams();
  const listType = searchParams.get("type");
  const limit = useSelector(selectVehiclesListLimit);
  const licensePlate = useSelector(selectVehiclesListLicensePlate);
  const [{ items, isLoading, isFetching, refetch }, pagination ] = useListVehicles(listType || "ALL");

  const dispatch = useDispatch();

  useEffect(() => {
    if(!listType) {
      setSearchParams({ type: "ALL" })
    } else {
      dispatch(changeVehiclesList({ key: "type", value: listType }))
    }
  }, [listType]);

  return (
    <>      
    {/* Sidebar */}
    <aside className="relative mr-2 rounded-lg flex-1">
      <VehiclesListSideMenu listType={listType} setSearchParams={setSearchParams} />
    </aside>

    {/* Content */}
    <section className={`relative flex-6 mb-4 ${items.length <= 0 ? 'rounded-tl-full' : ''}`}>
      <RoundedBg />
      <VehiclesListLayout
        vehicles={items}
        listType={listType}
        licensePlate={licensePlate}
        limit={limit}
        pagination={pagination}
        refetch={refetch}
        isLoading={!listType || isLoading}
        isFetching={isFetching}
      />
    </section>
  </>
  )
}