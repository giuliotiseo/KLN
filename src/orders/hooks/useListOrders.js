import { useCallback } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectCurrentCompany } from "../../company/slices/companySlice";
import { useNextToken } from "../../globals/hooks/useNextToken";
import { useOrderByCarrierPendingQuery, useOrderByCarrierQuery, useOrderBySenderPendingQuery, useOrderBySenderQuery, useOrderByStoragePendingQuery, useOrderByStorageQuery, useOrderByCarrierPickedupQuery, useOrderByCarrierStockedQuery, useOrderByCarrierDeliveringQuery, useOrderByCarrierDeliveredQuery, useOrderBySenderPickedupQuery, useOrderBySenderStockedQuery, useOrderBySenderDeliveringQuery, useOrderBySenderDeliveredQuery, useOrderByStoragePickedupQuery, useOrderByStorageStockedQuery, useOrderByStorageDeliveringQuery, useOrderByStorageDeliveredQuery, useOrderByReceiverQuery, useOrderByReceiverPendingQuery, useOrderByReceiverPickedupQuery, useOrderByReceiverStockedQuery, useOrderByReceiverDeliveringQuery, useOrderByReceiverDeliveredQuery, useOrderByPickupStorageQuery, useOrderByPickupStoragePendingQuery, useOrderByPickupStoragePickedupQuery, useOrderByPickupStorageStockedQuery, useOrderByPickupStorageDeliveringQuery, useOrderByPickupStorageDeliveredQuery, useOrderByDeliveryStorageQuery, useOrderByDeliveryStoragePendingQuery, useOrderByDeliveryStoragePickedupQuery, useOrderByDeliveryStorageStockedQuery, useOrderByDeliveryStorageDeliveringQuery, useOrderByDeliveryStorageDeliveredQuery, useOrderByPreOrderIdQuery, useOrderByCarrierArchivedQuery, useOrderBySenderArchivedQuery, useOrderByReceiverArchivedQuery, useOrderByPickupStorageArchivedQuery, useOrderByDeliveryStorageArchivedQuery, useOrderByCarrierCollectChecksQuery, useOrderByReceiverCollectChecksQuery, useOrderByCarrierForTravelQuery } from "../api/orders-api-slice";
import { changeOrdersListNextToken, resetOrdersList, selectOrdersListEnd, selectOrdersListFilter, selectOrdersListLimit, selectOrdersListNextToken, selectOrdersListSortDirection, selectOrdersListStart } from "../slices/ordersListSlice";

const queryController = {
  // Carrier
  "CARRIER#ALL": useOrderByCarrierQuery,
  "CARRIER#PENDING": useOrderByCarrierPendingQuery,
  "CARRIER#PICKEDUP": useOrderByCarrierPickedupQuery,
  "CARRIER#STOCKED": useOrderByCarrierStockedQuery,
  "CARRIER#DELIVERING": useOrderByCarrierDeliveringQuery,
  "CARRIER#DELIVERED": useOrderByCarrierDeliveredQuery,
  "CARRIER#ARCHIVED": useOrderByCarrierArchivedQuery,
  // Sender
  "SENDER#ALL": useOrderBySenderQuery,
  "SENDER#PENDING": useOrderBySenderPendingQuery,
  "SENDER#PICKEDUP": useOrderBySenderPickedupQuery,
  "SENDER#STOCKED": useOrderBySenderStockedQuery,
  "SENDER#DELIVERING": useOrderBySenderDeliveringQuery,
  "SENDER#DELIVERED": useOrderBySenderDeliveredQuery,
  "SENDER#ARCHIVED": useOrderBySenderArchivedQuery,
  // Receiver
  "RECEIVER#ALL": useOrderByReceiverQuery,
  "RECEIVER#PENDING": useOrderByReceiverPendingQuery,
  "RECEIVER#PICKEDUP": useOrderByReceiverPickedupQuery,
  "RECEIVER#STOCKED": useOrderByReceiverStockedQuery,
  "RECEIVER#DELIVERING": useOrderByReceiverDeliveringQuery,
  "RECEIVER#DELIVERED": useOrderByReceiverDeliveredQuery,
  "RECEIVER#ARCHIVED": useOrderByReceiverArchivedQuery,
  // Pickup Storage
  "PICKUP_STORAGE#ALL": useOrderByPickupStorageQuery,
  "PICKUP_STORAGE#PENDING": useOrderByPickupStoragePendingQuery,
  "PICKUP_STORAGE#PICKEDUP": useOrderByPickupStoragePickedupQuery,
  "PICKUP_STORAGE#STOCKED": useOrderByPickupStorageStockedQuery,
  "PICKUP_STORAGE#DELIVERING": useOrderByPickupStorageDeliveringQuery,
  "PICKUP_STORAGE#DELIVERED": useOrderByPickupStorageDeliveredQuery,
  "PICKUP_STORAGE#ARCHIVED": useOrderByPickupStorageArchivedQuery,
  // Delivery Storage
  "DELIVERY_STORAGE#ALL": useOrderByDeliveryStorageQuery,
  "DELIVERY_STORAGE#PENDING": useOrderByDeliveryStoragePendingQuery,
  "DELIVERY_STORAGE#PICKEDUP": useOrderByDeliveryStoragePickedupQuery,
  "DELIVERY_STORAGE#STOCKED": useOrderByDeliveryStorageStockedQuery,
  "DELIVERY_STORAGE#DELIVERING": useOrderByDeliveryStorageDeliveringQuery,
  "DELIVERY_STORAGE#DELIVERED": useOrderByDeliveryStorageDeliveredQuery,
  "DELIVERY_STORAGE#ARCHIVED": useOrderByDeliveryStorageArchivedQuery,
  // PreOrder
  "PREORDER#ALL": useOrderByPreOrderIdQuery,
  // Check 
  "CARRIER#CHECK": useOrderByCarrierCollectChecksQuery,
  "RECEIVER#CHECK": useOrderByReceiverCollectChecksQuery,
  // Travel
  "CARRIER#TRAVEL": useOrderByCarrierForTravelQuery,
}

export default function useListOrders({ companyType, status }) {
  const { id: companyId } = useSelector(selectCurrentCompany);
  const filter = useSelector(selectOrdersListFilter);
  const limit = useSelector(selectOrdersListLimit);
  const sortDirection = useSelector(selectOrdersListSortDirection);
  const nextToken = useSelector(selectOrdersListNextToken);
  const start = useSelector(selectOrdersListStart);
  const end = useSelector(selectOrdersListEnd);
  const [{ goNext, goBack, reset }, token, previousTokens, page ] = useNextToken(nextToken);
  const dispatch = useDispatch();

  // Query args
  let args = { companyId, start, end, nextToken: token, filter, limit, sortDirection };

  if(status !== "ALL") args.status = status;
  const { data, isLoading, isFetching, refetch } = queryController[`${companyType}#${status}`](args);

  const updateNextToken = useCallback((nextToken) => {
    dispatch(changeOrdersListNextToken(nextToken));
  }, []);

  useEffect(() => {
    dispatch(resetOrdersList());
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