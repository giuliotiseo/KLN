import { useCallback } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectCurrentCompany } from "../../company/slices/companySlice";
import { useNextToken } from "../../globals/hooks/useNextToken";
import { useCheckByCarrierArchivedQuery, useCheckByCarrierDeliveredQuery, useCheckByCarrierDeliveringQuery, useCheckByCarrierPendingQuery, useCheckByCarrierPickedupQuery, useCheckByCarrierQuery, useCheckByCarrierRecordingQuery, useCheckByReceiverArchivedQuery, useCheckByReceiverDeliveredQuery, useCheckByReceiverDeliveringQuery, useCheckByReceiverPendingQuery, useCheckByReceiverPickedupQuery, useCheckByReceiverQuery, useCheckByReceiverRecordingQuery, useCheckBySenderArchivedQuery, useCheckBySenderDeliveredQuery, useCheckBySenderDeliveringQuery, useCheckBySenderPendingQuery, useCheckBySenderPickedupQuery, useCheckBySenderQuery, useCheckBySenderRecordingQuery } from "../api/checks-api-slice";
import { changeChecksListNextToken, resetChecksList, selectChecksListDateRange, selectChecksListFilters, selectChecksListLimit, selectChecksListNextToken } from "../slices/checksListSlice";

const queryRoutes = {
  // Carrier
  "CARRIER#ALL": useCheckByCarrierQuery,
  "CARRIER#PENDING": useCheckByCarrierPendingQuery,
  "CARRIER#PICKEDUP": useCheckByCarrierPickedupQuery,
  "CARRIER#RECORDING": useCheckByCarrierRecordingQuery,
  "CARRIER#DELIVERING": useCheckByCarrierDeliveringQuery,
  "CARRIER#DELIVERED": useCheckByCarrierDeliveredQuery,
  "CARRIER#ARCHIVED": useCheckByCarrierArchivedQuery,
  // Sender
  "SENDER#ALL": useCheckBySenderQuery,
  "SENDER#PENDING": useCheckBySenderPendingQuery,
  "SENDER#PICKEDUP": useCheckBySenderPickedupQuery,
  "SENDER#RECORDING": useCheckBySenderRecordingQuery,
  "SENDER#DELIVERING": useCheckBySenderDeliveringQuery,
  "SENDER#DELIVERED": useCheckBySenderDeliveredQuery,
  "SENDER#ARCHIVED": useCheckBySenderArchivedQuery,
  // Receiver
  "RECEIVER#ALL": useCheckByReceiverQuery,
  "RECEIVER#PENDING": useCheckByReceiverPendingQuery,
  "RECEIVER#PICKEDUP": useCheckByReceiverPickedupQuery,
  "RECEIVER#RECORDING": useCheckByReceiverRecordingQuery,
  "RECEIVER#DELIVERING": useCheckByReceiverDeliveringQuery,
  "RECEIVER#DELIVERED": useCheckByReceiverDeliveredQuery,
  "RECEIVER#ARCHIVED": useCheckByReceiverArchivedQuery,
}

export default function useListChecks({ companyType, status }) {
  const { id: companyId } = useSelector(selectCurrentCompany);
  const filter = useSelector(selectChecksListFilters);
  const limit = useSelector(selectChecksListLimit);
  const nextToken = useSelector(selectChecksListNextToken);
  const [ start, end ] = useSelector(selectChecksListDateRange);
  const [{ goNext, goBack, reset }, token, previousTokens, page ] = useNextToken(nextToken);
  const dispatch = useDispatch();

  // Query args
  let args = { companyId, start, end, nextToken: token, filter, limit };

  if(status !== "ALL") args.status = status;
  const { data, isLoading, isFetching, refetch } = queryRoutes[`${companyType}#${status}`](args);

  const updateNextToken = useCallback((nextToken) => {
    dispatch(changeChecksListNextToken(nextToken));
  }, []);

  useEffect(() => {
    dispatch(resetChecksList());
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