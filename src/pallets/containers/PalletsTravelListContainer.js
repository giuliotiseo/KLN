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
  selectPalletsListTravelStamp,
} from "../slices/palletsListSlice";

// Main component -----------------------------------------------------------------------------------------------
export default function PalletsTravelListContainer({ queryFrom, companyId }) {
  const partitionKeyParam =  `${queryFrom}Id`;
  const travelStamp = useSelector(selectPalletsListTravelStamp);
  const operationDateRange = useSelector(selectPalletsListOperationDateRange);
  const filters = useSelector(selectPalletsListFilters);
  const limit = useSelector(selectPalletsListLimit);
  const nextToken = useSelector(selectPalletsListNextToken);
  const dispatch = useDispatch();
  const isInit = useRef(false);

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
  if(!partitionKeyParam || !isInit.current) return <InlineSpinner />

  return (
    <PalletsListLayout
      listType="travel"
      companyKeyToQuery={partitionKeyParam}
      companyId={companyId}
      travelStamp={travelStamp}
      operationDateRange={operationDateRange}
      filters={filters}
      limit={limit}
      nextToken={nextToken}
    />
  )
}
