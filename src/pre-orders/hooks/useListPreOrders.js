import { useCallback } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectCurrentCompany } from "../../company/slices/companySlice";
import { useNextToken } from "../../globals/hooks/useNextToken";
import { changePreOrdersListNextToken, resetPreOrdersList, selectPreOrdersListEnd, selectPreOrdersListFilter, selectPreOrdersListLimit, selectPreOrdersListNextToken, selectPreOrdersListStart } from "../slices/preOrdersListSlice";
import { usePreOrderByCarrierAcceptedQuery, usePreOrderByCarrierFromOrderQuery, usePreOrderByCarrierPendingQuery, usePreOrderByCarrierQuery, usePreOrderByCarrierRejectedQuery, usePreOrderBySenderAcceptedQuery, usePreOrderBySenderFromOrderQuery, usePreOrderBySenderPendingQuery, usePreOrderBySenderQuery, usePreOrderBySenderRejectedQuery, usePreOrderByStorageAcceptedQuery, usePreOrderByStoragePendingQuery, usePreOrderByStorageQuery, usePreOrderByStorageRejectedQuery } from "../api/pre-orders-api-slice";

const queryController = {
  // Carrier
  "CARRIER#ALL": usePreOrderByCarrierQuery,
  "CARRIER#PENDING": usePreOrderByCarrierPendingQuery,
  "CARRIER#ACCEPTED": usePreOrderByCarrierAcceptedQuery,
  "CARRIER#REJECTED": usePreOrderByCarrierRejectedQuery,
  // Sender
  "SENDER#ALL": usePreOrderBySenderQuery,
  "SENDER#PENDING": usePreOrderBySenderPendingQuery,
  "SENDER#ACCEPTED": usePreOrderBySenderAcceptedQuery,
  "SENDER#REJECTED": usePreOrderBySenderRejectedQuery,
  // Storage
  "STORAGE#ALL": usePreOrderByStorageQuery,
  "STORAGE#PENDING": usePreOrderByStoragePendingQuery,
  "STORAGE#ACCEPTED": usePreOrderByStorageAcceptedQuery,
  "STORAGE#REJECTED": usePreOrderByStorageRejectedQuery,
  // Order specific query
  "CARRIER#ORDER": usePreOrderByCarrierFromOrderQuery,
  "SENDER#ORDER": usePreOrderBySenderFromOrderQuery,
}

export default function useListPreOrders({ companyType, status }) {
  const { id: companyId } = useSelector(selectCurrentCompany);
  const filter = useSelector(selectPreOrdersListFilter);
  const limit = useSelector(selectPreOrdersListLimit);
  const nextToken = useSelector(selectPreOrdersListNextToken);
  const start = useSelector(selectPreOrdersListStart);
  const end = useSelector(selectPreOrdersListEnd);
  const [{ goNext, goBack, reset }, token, previousTokens, page ] = useNextToken(nextToken);
  const dispatch = useDispatch();

  // Query args
  let args = { companyId, start, end, nextToken: token, filter, limit };

  if(status !== "ALL") args.status = status;
  const { data, isLoading, isFetching, refetch } = queryController[`${companyType}#${status}`](args);

  const updateNextToken = useCallback((nextToken) => {
    dispatch(changePreOrdersListNextToken(nextToken));
  }, []);

  useEffect(() => {
    dispatch(resetPreOrdersList());
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