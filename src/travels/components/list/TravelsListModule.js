import { useState } from "react";
import { useTravelsByTenantQuery } from "../../api/travels-api-slice";
import TravelsList from "./TravelsList";
import TravelsListOptions from "./TravelsListOptions";

// Main components ----------------------------------------------------------------------------------------------------------------------------------------------------------
export default function TravelsListModule({
  tenant,
  sortKey,
  departureDate,
  limit,
  filters,
  nextToken
}) {
  const [ multiSelect, setMultiSelect ] = useState(false);
  const { data = [], isLoading, isFetching: isFetchingList, refetch } = useTravelsByTenantQuery({
    tenant,
    sortKey,
    limit,
    filters,
    nextToken
  });
  
  return <section id="checks-list-carrier">
    {/* Options */}
    <TravelsListOptions
      multiselect={multiSelect}
      setMultiselect={setMultiSelect}
      limit={limit}
      refresh={refetch}
      nextToken={data?.nextToken}
      departureDateFrom={new Date(departureDate[0])}
      departureDateTo={new Date(departureDate[1])}
    />
    
    {/* List */}
    <TravelsList
      travels={data}
      isFetching={isLoading || isFetchingList}
    />
  </section>
}