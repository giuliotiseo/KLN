import { useCallback } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useDepositByCompanyQuery, useHubByCompanyQuery, useInterByCompanyQuery, useWarehouseByClientQuery, useWarehouseByCompanyQuery } from "../api/warehouses-api-slice";
import { selectCurrentCompany } from "../../company/slices/companySlice";
import { useNextToken } from "../../globals/hooks/useNextToken";
import { changeWarehousesListNextToken, selectWarehousesListFilter, selectWarehousesListLimit, selectWarehousesListNextToken, selectWarehousesListSearchable } from "../slices/warehousesListSlice";

const queryController = {
  ALL: useWarehouseByCompanyQuery,
  DEPOSITO: useDepositByCompanyQuery,
  INTERMEDIO: useInterByCompanyQuery,
  DISTRIBUZIONE: useHubByCompanyQuery,
  CLIENT: useWarehouseByClientQuery, // utilizzato per le query minimizzate rivolte ai clienti
}

// DEPOSITO
// INTERMEDIO
// DISTRIBUZIONE

export default function useListWarehouses(scope, inputId) {
  const { id } = useSelector(selectCurrentCompany);
  const companyId = inputId || id;
  const filter = useSelector(selectWarehousesListFilter);
  const limit = useSelector(selectWarehousesListLimit);
  const searchable = useSelector(selectWarehousesListSearchable);
  const nextToken = useSelector(selectWarehousesListNextToken);
  const [{ goNext, goBack, reset }, token, previousTokens, page ] = useNextToken(nextToken);
  const dispatch = useDispatch();
  // Query args
  let args = {
    companyId,
    searchable,
    nextToken: token,
    filter, 
    limit
  };

  if(scope !== "ALL") args.type = scope;
  const { data, isLoading, isFetching, refetch } = queryController[inputId ? "CLIENT" : scope](args);

  const updateNextToken = useCallback((nextToken) => {
    dispatch(changeWarehousesListNextToken(nextToken));
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