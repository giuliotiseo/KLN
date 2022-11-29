import { useCallback } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectCurrentCompany } from "../../company/slices/companySlice";
import { useNextToken } from "../../globals/hooks/useNextToken";
import { useCustomerByCarrierRelationshipQuery, useCustomerByOwnerCompanyQuery, useCustomerByReceiverRelationshipQuery, useCustomerBySenderRelationshipQuery } from "../api/customers-api-slice";
import { changeCustomersListNextToken, selectCustomersListFilter, selectCustomersListLimit, selectCustomersListNextToken, selectCustomersListSearchable } from "../slices/customersListSlice";

const queryController = {
  ALL: useCustomerByOwnerCompanyQuery,
  SENDER: useCustomerBySenderRelationshipQuery,
  RECEIVER: useCustomerByReceiverRelationshipQuery,
  CARRIER: useCustomerByCarrierRelationshipQuery
}

export default function useListCustomers(relationship, extSearchable, extFilter) {
  const { id: ownerCompanyId } = useSelector(selectCurrentCompany);
  const filter = useSelector(selectCustomersListFilter);
  const limit = useSelector(selectCustomersListLimit);
  const searchable = useSelector(selectCustomersListSearchable);
  const nextToken = useSelector(selectCustomersListNextToken);
  const [{ goNext, goBack, reset }, token, previousTokens, page ] = useNextToken(nextToken);
  const { data, isLoading, isFetching, refetch } = queryController[relationship]({
    ownerCompanyId,
    searchable: extSearchable || searchable,
    nextToken: token,
    filter: extFilter || filter,
    limit
  });

  const dispatch = useDispatch();
  const updateNextToken = useCallback((nextToken) => {
    dispatch(changeCustomersListNextToken(nextToken));
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