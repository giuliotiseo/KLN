import useListWarehouses from "../../../warehouses/hooks/useListWarehouses";
import PositionLocalizer from "../../../globals/components/dataEntry/PositionLocalizer";
import { TinyTitle } from "../../../globals/components/typography/titles"

const TravelWaypointEnd = ({
  title,
  end,
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

  return (
    <li className="flex-1 bg-base-100 rounded-md py-2 px-4 mb-2">
      <TinyTitle>
        { title }
      </TinyTitle>
      
      <PositionLocalizer
        location={end?.location}
        label={"Punto di ritorno dal viaggio"}
        styles="mb-4"
        clearLocation={clear}
        setCheckpoint={onChange}
        inputWarehouses={inputWarehouses}
        isLoading={isLoading || isFetching}
        pagination={pagination}
      />

    </li>
  )
}
export default TravelWaypointEnd;