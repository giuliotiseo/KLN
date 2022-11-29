import { Route, Routes, useSearchParams } from "react-router-dom";
import usePreOrderToEdit from "../hooks/usePreOrderToEdit";
import RequireOwner from "../../private-app/components/RequireOwner";
import PreOrderEditorContainer from "../containers/PreOrderEditorContainer";
import PageSpinner from "../../globals/components/layout/PageSpinner";
import { useSelector } from "react-redux";
import { selectCurrentCompany } from "../../company/slices/companySlice";

const opposites = {
  sender: "carrier",
  carrier: "sender",
}

// Components
export default function PreOrderEditorRouter() {
  const [ searchParams ] = useSearchParams();
  const { owner } = useSelector(selectCurrentCompany);
  const id = searchParams.get('id');
  const { preOrder, isLoading: isFetchingPreOrder } = usePreOrderToEdit(id);
  const role = preOrder?.tenantCarrier === owner ? "carrier" : "sender";

  if(isFetchingPreOrder || !preOrder.tenantCarrier || !preOrder.tenantSender) return <div>
    <PageSpinner message="Accesso editor pre-ordine" />
  </div>

  return (
    <Routes>
      {/* Route disponibile solo per mittente e vettori: */}
      <Route element={<RequireOwner allowedOwners={[preOrder.tenantCarrier, preOrder.tenantSender]} />}>
        <Route index element={<PreOrderEditorContainer preOrder={preOrder} oppositeCompanyRole={opposites[role]} currentCompanyRole={role} />} />
      </Route>
    </Routes>
  )
}