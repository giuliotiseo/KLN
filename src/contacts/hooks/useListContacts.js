import { useCallback } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useContactByCompanyQuery, useGetAdminContactQuery, useGetDriverContactQuery, useGetStorekeeperContactQuery } from "../api/contacts-api-slice";
import { selectCurrentCompany } from "../../company/slices/companySlice";
import { useNextToken } from "../../globals/hooks/useNextToken";
import { changeContactsListNextToken, selectContactsListFilter, selectContactsListLimit, selectContactsListNextToken, selectContactsListSearchable } from "../slices/contactsListSlice";

const queryController = {
  ALL: useContactByCompanyQuery,
  WAREHOUSE: useGetStorekeeperContactQuery,
  DRIVE: useGetDriverContactQuery,
  ADMIN: useGetAdminContactQuery
}

export default function useListContacts(job) {
  const { id: companyId } = useSelector(selectCurrentCompany);
  const filter = useSelector(selectContactsListFilter);
  const limit = useSelector(selectContactsListLimit);
  const searchable = useSelector(selectContactsListSearchable);
  const nextToken = useSelector(selectContactsListNextToken);
  const [{ goNext, goBack, reset }, token, previousTokens, page ] = useNextToken(nextToken);
  const dispatch = useDispatch();
  // Query args
  let args = { companyId, searchable, nextToken: token, filter, limit };

  if(job !== "ALL") args.type = job;
  const { data, isLoading, isFetching, refetch } = queryController[job](args);

  const updateNextToken = useCallback((nextToken) => {
    dispatch(changeContactsListNextToken(nextToken));
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