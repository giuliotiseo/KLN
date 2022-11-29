import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentCompany } from "../../company/slices/companySlice";
import { useNextToken } from "../../globals/hooks/useNextToken";
import { usePalletByBookedQuery, usePalletByBookedTypeQuery, usePalletByCarrierCustomerQuery, usePalletByCarrierQuery, usePalletByCarrierTravelQuery, usePalletByCarrierTypeQuery, usePalletByCustomerCarrierQuery, usePalletByCustomerQuery, usePalletByCustomerTravelQuery, usePalletByCustomerTypeQuery, useReportPalletCustomersQuery } from "../api/pallets-api-slice";
import { changePalletsListNextToken, selectPalletsListCarrier, selectPalletsListCustomer, selectPalletsListLimit, selectPalletsListNextToken, selectPalletsListOperationDateRange, selectPalletsListTravelStamp, selectPalletsListType } from "../slices/palletsListSlice";

const queryRoutes = {
  "ALL#LATEST": usePalletByBookedQuery,
  "ALL#TYPE": usePalletByBookedTypeQuery,
  "ALL#TRAVEL": usePalletByCarrierTravelQuery,
  "ALL#REPORT": useReportPalletCustomersQuery,
  // Carrier
  "CARRIER#LATEST": usePalletByCarrierQuery,
  "CARRIER#SEARCH": usePalletByCarrierCustomerQuery,
  "CARRIER#TYPE": usePalletByCarrierTypeQuery,
  "CARRIER#TRAVEL": usePalletByCarrierTravelQuery,
  // Customer
  "CUSTOMER#LATEST": usePalletByCustomerQuery,
  "CUSTOMER#SEARCH": usePalletByCustomerCarrierQuery,
  "CUSTOMER#TYPE": usePalletByCustomerTypeQuery,
  "CUSTOMER#TRAVEL": usePalletByCustomerTravelQuery,
}

export default function useListPallets({ companyType, queryType, isShowReversals = true }) {
  const { id: companyId } = useSelector(selectCurrentCompany);
  const limit = useSelector(selectPalletsListLimit);
  const nextToken = useSelector(selectPalletsListNextToken);
  const customer = useSelector(selectPalletsListCustomer);
  const carrier = useSelector(selectPalletsListCarrier);
  const type = useSelector(selectPalletsListType);
  const travelStamp = useSelector(selectPalletsListTravelStamp);
  const [ start, end ] = useSelector(selectPalletsListOperationDateRange);
  const [{ goNext, goBack, reset }, token, previousTokens, page ] = useNextToken(nextToken);
  const dispatch = useDispatch();

  // Query args
  let args = { start, end, nextToken: token, limit };
  if(queryType !== "all" || queryType === "report") { args.companyId = companyId }
  if(queryType === "type") { args.type = type }
  if(queryType === "travel") { args.travelStamp = travelStamp }

  if(queryType === "search" && companyType === "carrier") {
    args.customerId = customer?.id || "";
    args.isShowReversals = isShowReversals;
  }

  if(queryType === "search" && companyType === "customer") {
    args.carrierId = carrier?.id || "";
    args.isShowReversals = isShowReversals;
  }

  const { data, isLoading, isFetching, refetch } = queryRoutes[`${companyType.toUpperCase()}#${queryType.toUpperCase()}`](args);

  const updateNextToken = useCallback((nextToken) => {
    dispatch(changePalletsListNextToken(nextToken));
  }, []);

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