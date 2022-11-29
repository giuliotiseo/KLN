import { useCallback } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectCurrentCompany } from "../../company/slices/companySlice";
import { useNextToken } from "../../globals/hooks/useNextToken";
import { useTravelByCarrierCompletedQuery, useTravelByCarrierDeliveryQuery, useTravelByCarrierDepotQuery, useTravelByCarrierPickupQuery, useTravelByCarrierQuery, useTravelByCarrierReturnQuery, useTravelByCarrierStationaryQuery } from "../api/travels-api-slice";
import { changeTravelsListNextToken, resetTravelsList, selectTravelsListDepartureDateRange, selectTravelsListFilters, selectTravelsListLimit, selectTravelsListNextToken } from "../slices/travelsListSlice";

const queryRoutes = {
  // Carrier
  "CARRIER#ALL": useTravelByCarrierQuery,
  "CARRIER#STATIONARY": useTravelByCarrierStationaryQuery,
  "CARRIER#PICKUP": useTravelByCarrierPickupQuery,
  "CARRIER#DEPOT": useTravelByCarrierDepotQuery,
  "CARRIER#DELIVERY": useTravelByCarrierDeliveryQuery,
  "CARRIER#RETURN": useTravelByCarrierReturnQuery,
  "CARRIER#COMPLETED": useTravelByCarrierCompletedQuery,
}

export default function useListTravels({ companyType, status }) {
  const { id: carrierId } = useSelector(selectCurrentCompany);
  const limit = useSelector(selectTravelsListLimit);
  const nextToken = useSelector(selectTravelsListNextToken);
  const filter = useSelector(selectTravelsListFilters);
  const [ start, end ] = useSelector(selectTravelsListDepartureDateRange);
  const [{ goNext, goBack, reset }, token, previousTokens, page ] = useNextToken(nextToken);
  const dispatch = useDispatch();
  // Query args
  let args = { carrierId, start, end, nextToken: token, filter, limit };

  if(status !== "ALL") args.status = status;
  const { data, isLoading, isFetching, refetch } = queryRoutes[`${companyType}#${status}`](args);


  const updateNextToken = useCallback((nextToken) => {
    dispatch(changeTravelsListNextToken(nextToken));
  }, []);

  useEffect(() => {
    dispatch(resetTravelsList());
  }, [companyType]);

  useEffect(() => {
    if(data?.nextToken) {
      updateNextToken(data.nextToken);
    } else {
      updateNextToken(null);
    }
  }, [data?.nextToken]);

  
  return [{
    items: data?.ids?.length > 0
      ? data.ids.map(id => data.entities[id])
      : [],
    isLoading,
    isFetching,
    refetch
  }, { 
    page, goNext, goBack, reset, previousTokens, nextToken
  }]
}