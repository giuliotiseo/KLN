import { useEffect } from "react";
import { useDispatch } from "react-redux";
// Components
import ErrorPage from "../../globals/components/dataDisplay/ErrorPage";
import PalletsListLayout from "../layout/PalletsListLayout";
// Selectors
import {
  initPalletListParam,
  resetPalletsList,
} from "../slices/palletsListSlice";

// Main component (PalletsCustomersReportContainer) -----------------------------------------------------------------------------------------------
export default function PalletsCustomersReportContainer({ queryFrom, companyId }) {
  const dispatch = useDispatch();
  
  // Trigger
  useEffect(() => {
    if(queryFrom && companyId) {
      dispatch(initPalletListParam({ key: queryFrom, value: companyId }))
    };

    return () => dispatch(resetPalletsList());
  }, [queryFrom, companyId]);

  // Error
  if(!companyId) return <ErrorPage title="Accesso negato">È stato riscontrato un errore in <code>PalletsListContainer</code></ErrorPage>

  return (
    <PalletsListLayout
      listType="report"
      queryFrom={queryFrom}
      companyKeyToQuery={`${queryFrom}Id`}
      companyId={companyId}
    />
  )
}
