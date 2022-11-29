import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentCompany } from "../../company/slices/companySlice";
// Components
import ErrorPage from "../../globals/components/dataDisplay/ErrorPage";
import Drawer from "../../globals/components/layout/Drawer";
import PalletsListBoundles from "../components/bundles/PalletsListBundles";
// Selectors
import {
  changePalletsListCompany,
  initPalletListParam,
  resetPalletsList,
} from "../slices/palletsListSlice";

// Main component -----------------------------------------------------------------------------------------------
export default function PalletsListDrawerContainer({
  drawer,
  setDrawer,
  queryFrom = "carrier",
  customer
}) {
  const { id } = useSelector(selectCurrentCompany);
  const dispatch = useDispatch();

  // Trigger
  useEffect(() => {
    if(queryFrom && id) dispatch(initPalletListParam({ key: queryFrom, value: id }));
    return () => dispatch(resetPalletsList());
  }, [queryFrom, id]);

  useEffect(() => {
    if(customer?.id) {
      dispatch(changePalletsListCompany({
        value: { ...customer, company: {...customer, owner: customer.tenant }},
        key: "customer"
      }));
    }
  }, [customer]);

  // Error
  if(!queryFrom || !id) return <ErrorPage title="Accesso negato">È stato riscontrato un errore in <code>PalletsListContainer</code></ErrorPage>

  return (
    <Drawer title={`Situazione contabile con ${customer?.name}`} isOpen={drawer} setIsOpen={setDrawer}>
      <PalletsListBoundles
        listType={"search"}
        companyId={id}
        companyKeyToQuery={"carrierId"}
        hideInput={true}
        isShowReversals={true}
        classNameQuantityResult='absolute bottom-20'
      />
    </Drawer>
  )
}
