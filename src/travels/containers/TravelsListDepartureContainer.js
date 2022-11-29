import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import TravelsListDepartureModule from "../components/list/TravelsListDepartureModule";
import { selectTravelsListDepartureDateRange, selectTravelsListLimit } from "../slices/travelsListSlice";

// Main component -----------------------------------------------------------------------------------------------
export default function TravelsListDepartureContainer() {
  const [ searchParams ] = useSearchParams();
  const companyListType = searchParams.get('from'); 
  const departureDate = useSelector(selectTravelsListDepartureDateRange);
  const limit = useSelector(selectTravelsListLimit);

  // Good to go
  return (
    <TravelsListDepartureModule
      companyListType={companyListType} // carrier || customer
      departureDate={departureDate}
      limit={limit}
    />
  )
}
