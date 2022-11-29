import { useCallback } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEmployeeByTenantQuery, useGetAdminEmployeeQuery, useGetDriverEmployeeQuery, useGetStorekeeperEmployeeQuery } from "../api/contacts-api-slice";
import { selectCurrentCompany } from "../../company/slices/companySlice";
import { useNextToken } from "../../globals/hooks/useNextToken";
import { changeEmployeesListNextToken, selectEmployeesListFilter, selectEmployeesListLimit, selectEmployeesListNextToken, selectEmployeesListSearchable } from "../slices/employeesListSlice";

const queryController = {
  ALL: useEmployeeByTenantQuery,
  WAREHOUSE: useGetStorekeeperEmployeeQuery,
  DRIVE: useGetDriverEmployeeQuery,
  ADMIN: useGetAdminEmployeeQuery,
}

export default function useListEmployees(job) {
  const { id: companyId } = useSelector(selectCurrentCompany);
  const filter = useSelector(selectEmployeesListFilter);
  const limit = useSelector(selectEmployeesListLimit);
  const searchable = useSelector(selectEmployeesListSearchable);
  const nextToken = useSelector(selectEmployeesListNextToken);
  const [{ goNext, goBack, reset }, token, previousTokens, page ] = useNextToken(nextToken);
  // Query args
  let args = { companyId, searchable, nextToken: token, filter, limit }
  if(job !== "ALL") args.type = job;
  const { data, isLoading, isFetching, refetch } = queryController[job](args);

  const dispatch = useDispatch();
  const updateNextToken = useCallback((nextToken) => {
    dispatch(changeEmployeesListNextToken(nextToken));
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