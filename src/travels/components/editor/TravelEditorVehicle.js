import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useListVehicles from "../../../vehicles/hooks/useListVehicles";
import { TinyTitle } from "../../../globals/components/typography/titles";
import VehicleFinder from "../../../globals/components/dataEntry/VehicleFinder";
import InlineSpinner from "../../../globals/components/spinners/InlineSpinner";
import { changeTravelEditorTowedVehicle, changeTravelEditorTowingVehicle } from "../../slices/travelEditorSlice";
import { useVehicleByLicensePlateQuery } from "../../../vehicles/api/vehicles-api-slice";
import { selectCurrentCompany } from "../../../company/slices/companySlice";

// Sub-components ------------------------------------------------------------------------------------------------------------------------
function SearchTowingVehiclesInput({
  companyId,
  vehicle,
  onChange,
  dropdownLabel,
  title
}) {
  const [clear, setClear ] = useState(false);
  const { data: current = [], isFetching: isFetchingCurrent } = useVehicleByLicensePlateQuery({
    companyId,
    licensePlate: { eq: vehicle.licensePlate },
  })

  const [{
    items: myTowingVehicles,
    isFetching,
    isLoading,
    refetch
  }, pagination] = useListVehicles('TOWING');


  const dispatch = useDispatch();

  useEffect(() => {
    if(current?.licensePlate) {
      dispatch(changeTravelEditorTowingVehicle(current));
    }
  }, [current, dispatch]);

  if(isFetching || isFetchingCurrent) return <InlineSpinner />

  return (
    <VehicleFinder
      label={title}
      dropdownLabel={dropdownLabel}
      className={"mb-2 w-full flex-1"}
      vehicles={myTowingVehicles}
      vehicle={ clear ? null : current}
      clear={() => setClear(true)}
      isLoading={isLoading || isFetching}
      refetch={refetch}
      pagination={pagination}
      changeVehicle={(value) => {
        onChange(value);
        setClear(false);
      }}
    />
  )
}

function SearchTowedVehiclesInput({
  vehicle,
  companyId,
  onChange,
  dropdownLabel,
  title
}) {
  const [clear, setClear ] = useState(false);

  const { data: current = {}, isFetching: isFetchingCurrent } = useVehicleByLicensePlateQuery({
    companyId,
    licensePlate: { eq: vehicle.licensePlate },
  })

  const [{
    items: myTowedVehicles,
    isLoading,
    isFetching,
    refetch,
  }, pagination] = useListVehicles('TOWED');

  const dispatch = useDispatch();

  useEffect(() => {
    if(current?.licensePlate) {
      dispatch(changeTravelEditorTowedVehicle(current));
    }
  }, [current, dispatch]);

  if(isFetching || isFetchingCurrent) return <InlineSpinner />

  return (
    // <VehicleFinder
    //   label={title}
    //   dropdownLabel={dropdownLabel}
    //   className={"mb-2 w-full flex-1"}
    //   vehicles={myTowingVehicles}
    //   vehicle={ clear ? null : current}
    //   clear={() => setClear(true)}
    //   isLoading={isLoading || isFetching}
    //   refetch={refetch}
    //   pagination={pagination}
    //   changeVehicle={(value) => {
    //     onChange(value);
    //     setClear(false);
    //   }}
    // />

    <VehicleFinder
      label={title}
      dropdownLabel={dropdownLabel}
      className={"mb-2 w-full flex-1"}
      vehicles={myTowedVehicles}
      vehicle={clear ? null : current}
      clear={() => setClear(true)}
      isLoading={isLoading || isFetching}
      refetch={refetch}
      pagination={pagination}
      changeVehicle={(value) => {
        onChange(value);
        setClear(false);
      }}
    />
  )
}

// Main component ------------------------------------------------------------------------------------------------------------------------
export default function TravelEditorVehicle ({ towing, towed }){
  const { id: companyId } = useSelector(selectCurrentCompany);
  const dispatch = useDispatch();
  return (
    <div>
      <header className="flex items-center justify-between py-2 my-4 border-b border-light-50 dark:border-dark-100">
        <TinyTitle>Mezzo selezionato</TinyTitle>
      </header>

      { towing?.licensePlate && (
        <SearchTowingVehiclesInput
          vehicle={towing}
          title="Veicolo 1"
          dropdownLabel="Veicolo trainante"
          companyId={companyId}
          onChange={(value) => dispatch(changeTravelEditorTowingVehicle(value))}
        />
      )}

      { towed?.licensePlate && (
        <SearchTowedVehiclesInput
          vehicle={towed}
          onChange={(value) => dispatch(changeTravelEditorTowedVehicle(value))}
          title="Veicolo 2"
          companyId={companyId}
          dropdownLabel="Veicolo trainato"
        />
      )}

    </div>
  )
}