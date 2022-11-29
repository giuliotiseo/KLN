import { useState } from "react";
import { useDispatch } from "react-redux";
import { TinyTitle } from "../../../globals/components/typography/titles";
import { changeTravelEditorEnd } from "../../slices/travelEditorSlice";
import useListWarehouses from "../../../warehouses/hooks/useListWarehouses";
import PositionLocalizer from "../../../globals/components/dataEntry/PositionLocalizer";

// Sub-components ------------------------------------------------------------------------------------------------------------------------
function SearchEndCheckpointInput({
  checkpoint,
  onChange
}) {
  const [clear, setClear ] = useState(false);
  // Fetch data
  const [{
    items: inputWarehouses, 
    isLoading,
    isFetching, 
}, pagination] = useListWarehouses("ALL");

  return (
    <PositionLocalizer
      location={clear ? null : checkpoint?.location}
      inputWarehouses={inputWarehouses}
      isLoading={isLoading || isFetching}
      pagination={pagination}
      label={null}
      clearLocation={true}
      setCheckpoint={(value) => {
        !value ? setClear(true) : setClear(false);
        onChange(value);
      }}
    />
  )
}

// Main component ------------------------------------------------------------------------------------------------------------------------
export default function TravelEditorEndCheckpoint({ checkpoint }) {
  const dispatch = useDispatch();

  return (
    <div className="pb-4 mt-2">
      <header className="flex items-center justify-between mb-4 pb-2 border-b border-light-50 dark:border-dark-100">
        <TinyTitle>Punto di arrivo</TinyTitle>
      </header>

      <SearchEndCheckpointInput
        checkpoint={checkpoint}
        onChange={(value) => dispatch(changeTravelEditorEnd(value))}
      />
    </div>
  )
}