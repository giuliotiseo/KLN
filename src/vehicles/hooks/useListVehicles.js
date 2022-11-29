import { useCallback } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useMotorByCompanyQuery, useSemitrailerByCompanyQuery, useTowedVehiclesQuery, useTowingVehiclesQuery, useTractorByCompanyQuery, useTrailerByCompanyQuery, useVanByCompanyQuery, useVehicleByCompanyQuery } from "../api/vehicles-api-slice";
import { selectCurrentCompany } from "../../company/slices/companySlice";
import { useNextToken } from "../../globals/hooks/useNextToken";
import { changeVehiclesListNextToken, selectVehiclesListFilter, selectVehiclesListLicensePlate, selectVehiclesListLimit, selectVehiclesListNextToken } from "../slices/vehiclesListSlice";

const queryController = {
  ALL: useVehicleByCompanyQuery,
  TRATTORE: useTractorByCompanyQuery,
  FURGONE: useVanByCompanyQuery,
  MOTRICE: useMotorByCompanyQuery,
  RIMORCHIO: useTrailerByCompanyQuery,
  SEMIRIMORCHIO: useSemitrailerByCompanyQuery,
  TOWING: useTowingVehiclesQuery,
  TOWED: useTowedVehiclesQuery,
}

export default function useListVehicles(type) {
  const { id: companyId } = useSelector(selectCurrentCompany);
  const filter = useSelector(selectVehiclesListFilter);
  const limit = useSelector(selectVehiclesListLimit);
  const licensePlate = useSelector(selectVehiclesListLicensePlate);
  const nextToken = useSelector(selectVehiclesListNextToken);
  const [{ goNext, goBack, reset }, token, previousTokens, page ] = useNextToken(nextToken);
  const dispatch = useDispatch();
  // Query args
  let args = { companyId, licensePlate: licensePlate || undefined, nextToken: token, filter, limit };

  if(type !== "ALL") args.type = type;
  const { data, isLoading, isFetching, refetch } = queryController[type](args);

  const updateNextToken = useCallback((nextToken) => {
    dispatch(changeVehiclesListNextToken(nextToken));
  }, []);

  useEffect(() => {
    if(data?.nextToken) {
      updateNextToken(data.nextToken);
    } else {
      updateNextToken(null);
    }
  }, [data?.nextToken])
  
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