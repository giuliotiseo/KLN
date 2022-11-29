import { useState } from "react";
import useListContacts from "../../../contacts/hooks/useListContacts";
import HighlightedButtonOnSelect from "../../../globals/components/buttons/HighlightedButtonOnSelect";
import EmployeeFinder from "../../../globals/components/dataEntry/EmployeeFinder";
import PositionLocalizer from "../../../globals/components/dataEntry/PositionLocalizer";
import VehicleFinder from "../../../globals/components/dataEntry/VehicleFinder";
import { TinyTitle } from "../../../globals/components/typography/titles"
import useListVehicles from "../../../vehicles/hooks/useListVehicles";
import useListWarehouses from "../../../warehouses/hooks/useListWarehouses";

// Sub components ------------------------------------------------------------------------------------------------------------
const WarehouseStartingPoint = ({
  accordion,
  setAccordion,
  start,
  onChange,
  clear
}) => {
  // Fetch data
  const [{
      items: inputWarehouses, 
      isLoading,
      isFetching, 
    }, pagination
  ] = useListWarehouses("ALL");

  console.log('Editor', { inputWarehouses})

  return <>
    <HighlightedButtonOnSelect
      onClick={() => setAccordion("WAREHOUSE")}
      text="Seleziona magazzino"
      isSelected={accordion === "WAREHOUSE"}
      showIcon={true}
    />

    { accordion === "WAREHOUSE" && (
      <PositionLocalizer
        location={start?.location}
        label={null}
        styles="mb-2 ml-4"
        clearLocation={clear}
        setCheckpoint={onChange}
        inputWarehouses={inputWarehouses}
        isLoading={isLoading || isFetching}
        pagination={pagination}
      />
    )}
  </>
}

const DriverStartingPoint = ({
  accordion,
  setAccordion,
  driver,
  onChange,
  clear
}) => {
  const [{
    items: drivers,
    isLoading: isLoadingDrivers,
    isFetching: isFetchingDrivers,
    refetch
  }, driversPaginations ] = useListContacts("DRIVE");

  return <>
    <HighlightedButtonOnSelect
      onClick={() => setAccordion("DRIVER")}
      text="Seleziona autista"
      isSelected={accordion === "DRIVER"}
      showIcon={true}
    />

    { accordion === "DRIVER" && (
      <EmployeeFinder
        label={null}
        dropdownLabel={"Autisti dipendenti"}
        className={"mb-2 ml-4"}
        employees={drivers}
        employee={driver}
        pagination={driversPaginations}
        isLoading={isFetchingDrivers || isLoadingDrivers}
        refetch={refetch}
        clear={clear}
        changeEmployee={onChange}
      />
    )}
  </>
}

const VehiclesStartingPoint = ({
  accordion,
  setAccordion,
  vehicle,
  onChangeTowing,
  onChangeTowed,
  clearTowing,
  clearTowed,
}) => {
  const [{
    items: towings,
    isLoading: isLoadingTowings,
    isFetching: isFetchingTowings,
    refetch: refetchTowings
  }, towingsPagination ] = useListVehicles('TOWING');

  const [{
    items: toweds,
    isLoading: isLoadingToweds,
    isFetching: isFetchingToweds,
    refetch: refetchToweds
  }, towedsPagination ] = useListVehicles('TOWED');

  return <>
    <HighlightedButtonOnSelect
      onClick={() => setAccordion("VEHICLE")}
      text="Seleziona veicoli"
      isSelected={accordion === "VEHICLE"}
      showIcon={true}
    />

    <div>
      { accordion === "VEHICLE" && (
        <VehicleFinder
          label={"Veicolo 1"}
          dropdownLabel={"Veicolo trainante"}
          className={"mb-2 ml-4 w-full flex-1"}
          vehicle={vehicle.towing}
          clear={clearTowing}
          changeVehicle={onChangeTowing}
          vehicles={towings}
          isLoading={isLoadingTowings || isFetchingTowings}
          refetch={refetchTowings}
          pagination={towingsPagination}
        />
      )}

      { accordion === "VEHICLE" && (
        <VehicleFinder
          label={"Veicolo 2"}
          dropdownLabel={"Veicolo trainato"}
          className={"mb-2 ml-4 w-full flex-1"}
          vehicle={vehicle.towed}
          clear={clearTowed}
          changeVehicle={onChangeTowed}
          vehicles={toweds}
          isLoading={isLoadingToweds || isFetchingToweds}
          refetch={refetchToweds}
          pagination={towedsPagination}
        />
      )}
    </div>
  </>
}


// Main component ------------------------------------------------------------------------------------------------------------
export default function TravelWaypointStart ({
  title,
  start,
  driver,
  towingVehicle,
  towedVehicle,
  onChangeWarehouse,
  clearWarehouse,
  onChangeDriver,
  clearDriver,
  onChangeTowingVehicle,
  clearTowingVehicle,
  onChangeTowedVehicle,
  clearTowedVehicle,
}) {
  const [ accordion, setAccordion ] = useState("WAREHOUSE");

  return (
    <li className="h-full flex-1 bg-base-100 rounded-md py-2 px-4 mb-2">
        <TinyTitle styles="mb-2">
          { title }
        </TinyTitle>
        <WarehouseStartingPoint
          accordion={accordion}
          setAccordion={setAccordion}
          start={start}
          onChange={onChangeWarehouse}
          clear={clearWarehouse}
        />
              
        <DriverStartingPoint
          accordion={accordion}
          setAccordion={setAccordion}
          driver={driver}
          onChange={onChangeDriver}
          clear={clearDriver}
        />

        <VehiclesStartingPoint
          accordion={accordion}
          setAccordion={setAccordion}
          vehicle={{ towing: towingVehicle, towed: towedVehicle }}
          onChangeTowing={onChangeTowingVehicle}
          onChangeTowed={onChangeTowedVehicle}
          clearTowing={clearTowingVehicle}
          clearTowed={clearTowedVehicle}
        />
    </li>
  )
}