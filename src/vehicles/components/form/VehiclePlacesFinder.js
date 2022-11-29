import React from 'react'
import { useCallback } from 'react';
import { useState } from 'react';
import { TbAddressBook, TbMap } from 'react-icons/tb';
import Button from '../../../globals/components/buttons_v2/Button';
import SearchPlaces from '../../../globals/components/dataEntry_v2/SearchPlaces';
import WarehousePicker from '../../../globals/components/pickers/WarehousePicker';
import useListWarehouses from '../../../warehouses/hooks/useListWarehouses';

function VehiclePlacesFinder({
  updateLocation,
  label = "Indica la posizione attuale del veicolo", 
}) {
  const [ selectedWarehouse, setSelectedWarehouse ] = useState(null);
  const [ method, setMethod ] = useState("ADDRESS");
  const [{
    items: warehouses,
    isLoading,
    isFetching,
    refetch
  }, pagination ] = useListWarehouses("ALL");
  
  const handleChangeMethod = useCallback((method) => {
    setSelectedWarehouse(null);
    if(method === "ADDRESS") setMethod("WAREHOUSE");
    if(method === "WAREHOUSE") setMethod("ADDRESS");
  }, []);

  const handleSelectWarehouse = useCallback((warehouse) => {
    setSelectedWarehouse(warehouse);
    updateLocation(warehouse.location);
  }, [selectedWarehouse]);

  return (
  <div>
    <header className='flex items-center justify-between gap-4  border-b py-2 mb-2'>
      <h2 className='title-4'>Individua veicolo</h2>
      <Button
        icon={ method === "ADDRESS" ? <TbAddressBook /> : <TbMap />}
        text={ method === "ADDRESS" ? 'Vedi magazzini' : 'Cerca indirizzo'}
        onClick={() => handleChangeMethod(method)}
        className="btn-ghost"
      />
    </header>

    { method === "ADDRESS" && (
      <SearchPlaces
        label={label}
        showIcon={true}
        onClick={updateLocation}
        className="w-full text-base"
        inputClassName="input"
      />
    )}

    { method === "WAREHOUSE" && (
      <WarehousePicker
        warehouses={warehouses}
        loading={isLoading || isFetching}
        pagination={pagination}
        selectedWarehouse={selectedWarehouse}
        callback={handleSelectWarehouse}
        refetch={refetch}
        editable={true}
      />
    )}
  </div>
  )
}

export default VehiclePlacesFinder
