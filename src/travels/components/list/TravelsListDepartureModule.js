import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useListTravels from "../../hooks/useListTravels";
import TravelsList from "./TravelsList";
import TravelsListOptions from "./TravelsListOptions";
import { resetTravelsList } from "../../slices/travelsListSlice";

// Main components ----------------------------------------------------------------------------------------------------------------------------------------------------------
export default function TravelsListDepartureModule({
  companyListType,
  departureDate,
  limit,
}) {
  const [{ items, isLoading, isFetching, refetch }, pagination ] = useListTravels({
    companyType: companyListType?.toUpperCase() || "CARRIER", // Carrier
    status: 'ALL'
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetTravelsList());
  }, [])
  
  return <section id="checks-list-carrier">
    <TravelsListOptions
      dateFrom={new Date(departureDate[0])}
      dateTo={new Date(departureDate[1])}
      limit={limit}
      pagination={pagination}
      refetch={refetch}
      companyRole={companyListType}
    />
    
    {/* List */}
    <TravelsList
      travels={items}
      isFetching={isLoading || isFetching}
      showPalletHandlingsStatus={true}
    />
  </section>
}