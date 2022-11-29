import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useListWarehouses } from '../hooks';
// Custom components
import WarehousesListSideMenu from '../components/list/WarehousesListSideMenu';
import WarehousesListLayout from '../layout/WarehousesListLayout';
import RoundedBg from '../../globals/components/layout/RoundedBg';
// Helpers
import { useSearchParams } from 'react-router-dom';
import { changeWarehousesList, selectWarehousesListLimit, selectWarehousesListSearchable } from '../slices/warehousesListSlice';

// Main component -----------------------------------------------------------------------------------------------
export default function WarehousesListContainer() {
  const [ searchParams, setSearchParams ] = useSearchParams();
  const listType = searchParams.get("type");
  const limit = useSelector(selectWarehousesListLimit);
  const searchable = useSelector(selectWarehousesListSearchable);
  const [{ items, isLoading, isFetching, refetch }, pagination ] = useListWarehouses(listType || "ALL");
  const dispatch = useDispatch();

  useEffect(() => {
    if(!listType) {
      setSearchParams({ type: "ALL" })
    } else {
      dispatch(changeWarehousesList({ key: "type", value: listType }))
    }
  }, [listType]);

  return (
    <>
      {/* Sidebar */}
      <aside className="relative mr-2 rounded-lg flex-1">
        <WarehousesListSideMenu
          listType={listType}
          setSearchParams={setSearchParams}
        />
      </aside>

      {/* Content */}
      <section className={`relative flex-6 ${items.length <= 0 ? 'rounded-tl-full' : ''}`}>
        <RoundedBg />
        <WarehousesListLayout
          warehouses={items}
          listType={listType}
          searchable={searchable}
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