import { useDispatch } from "react-redux";
import { TinyTitle } from "../../../globals/components/typography/titles";
import { changeTravelEditorStart } from "../../slices/travelEditorSlice";
import PositionLocalizer from "../../../globals/components/dataEntry/PositionLocalizer";
import useListWarehouses from "../../../warehouses/hooks/useListWarehouses";

// Sub-components ------------------------------------------------------------------------------------------------------------------------
function SearchStartCheckpointInput({
  checkpoint,
  onChange
}) {
  // Fetch data
    const [{
      items: inputWarehouses, 
      isLoading,
      isFetching, 
    }, pagination
  ] = useListWarehouses("ALL");

  return (
    <>
      <PositionLocalizer
        location={checkpoint?.location}
        label={null}
        styles="mb-2"
        clearLocation={true}
        inputWarehouses={inputWarehouses}
        isLoading={isLoading || isFetching}
        pagination={pagination}
        setCheckpoint={(value) => {
          onChange(value);
        }}
      />
    </>
  )
}

// Main component ------------------------------------------------------------------------------------------------------------------------
export default function TravelEditorStartCheckpoint({ checkpoint }) {
  const dispatch = useDispatch();

  return (
    <div className="mt-2 pb-4">
      <header className="flex items-center justify-between pb-2 mb-4 border-b border-light-50 dark:border-dark-100">
        <TinyTitle>Punto di partenza</TinyTitle>
      </header>

      <SearchStartCheckpointInput
        checkpoint={checkpoint}
        onChange={(value) => dispatch(changeTravelEditorStart(value))}
      />
    </div>
  )
}