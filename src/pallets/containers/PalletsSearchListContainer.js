import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// Components
import ErrorPage from "../../globals/components/dataDisplay/ErrorPage";
import InlineSpinner from "../../globals/components/spinners/InlineSpinner";
import PalletsListLayout from "../layout/PalletsListLayout";
// Actions & Selectors
import { resetCustomersList } from "../../customers/slices/customersListSlice";
import {
  initPalletListParam,
  resetPalletsList,
  selectPalletsListCarrierName,
  selectPalletsListCustomerName,
  selectPalletsListFilters,
  selectPalletsListIsShowRev,
  selectPalletsListLimit,
  selectPalletsListOperationDateRange,
} from "../slices/palletsListSlice";

// Main component -----------------------------------------------------------------------------------------------
export default function PalletsSearchListContainer({ queryFrom, companyId }) {
  const partitionKeyParam = `${queryFrom}Id`;
  const carrierName = useSelector(selectPalletsListCarrierName);
  const customerName = useSelector(selectPalletsListCustomerName);
  const operationDateRange = useSelector(selectPalletsListOperationDateRange);
  const filters = useSelector(selectPalletsListFilters);
  const limit = useSelector(selectPalletsListLimit);
  const isShowReversals = useSelector(selectPalletsListIsShowRev);
  const isInit = useRef(false);
  const dispatch = useDispatch();

  // Trigger
  useEffect(() => {
    if(!isInit.current) {
      if(queryFrom && companyId) dispatch(initPalletListParam({ key: queryFrom, value: companyId }));
      isInit.current = true;
    }

    return () => {
      dispatch(resetPalletsList())
      dispatch(resetCustomersList())
    };
  }, [queryFrom, companyId]);

  // Error
  if(!queryFrom || !companyId) return <ErrorPage title="Accesso negato">È stato riscontrato un errore in <code>PalletsListContainer</code></ErrorPage>
  if(!isInit.current) return <InlineSpinner />

  return (
    <PalletsListLayout
      listType="search"
      companyKeyToQuery={partitionKeyParam}
      companyId={companyId}
      carrierName={carrierName}
      customerName={customerName}
      operationDateRange={operationDateRange}
      filters={filters}
      limit={limit}
      isShowReversals={isShowReversals}
    />
  )
}
