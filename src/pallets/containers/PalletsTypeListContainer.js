import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// Components
import ErrorPage from "../../globals/components/dataDisplay/ErrorPage";
import InlineSpinner from "../../globals/components/spinners/InlineSpinner";
import PalletsListLayout from "../layout/PalletsListLayout";
// Selectors
import {
  initPalletListParam,
  resetPalletsList,
  selectPalletsListFilters,
  selectPalletsListLimit, 
  selectPalletsListNextToken,
  selectPalletsListOperationDateRange,
  selectPalletsListType,
} from "../slices/palletsListSlice";

// Main component -----------------------------------------------------------------------------------------------
export default function PalletsTypeListContainer({ queryFrom, companyId }) {
  const partitionKeyParam = `${queryFrom}Id`;
  const type = useSelector(selectPalletsListType);
  const operationDateRange = useSelector(selectPalletsListOperationDateRange);
  const filters = useSelector(selectPalletsListFilters);
  const limit = useSelector(selectPalletsListLimit);
  const nextToken = useSelector(selectPalletsListNextToken);
  const isInit = useRef(false);
  const dispatch = useDispatch();

  // Trigger
  useEffect(() => {
    if(!isInit.current) {
      if(queryFrom && companyId) dispatch(initPalletListParam({ key: queryFrom, value: companyId }));
      isInit.current = true;
    }

    return () => dispatch(resetPalletsList());
  }, [queryFrom, companyId]);

  // Error
  if(!queryFrom || !companyId) return <ErrorPage title="Accesso negato">È stato riscontrato un errore in <code>PalletsListContainer</code></ErrorPage>
  if(!isInit.current) return <InlineSpinner />

  return (
    <PalletsListLayout
      listType="type"
      companyKeyToQuery={partitionKeyParam}
      companyId={companyId}
      queryFrom={queryFrom}
      type={type}
      operationDateRange={operationDateRange}
      filters={filters}
      limit={limit}
      nextToken={nextToken}
    />
  )
}
