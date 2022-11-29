import { Route, Routes, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useOrderToEdit from "../hooks/useOrderToEdit";
import RequireOwner from "../../private-app/components/RequireOwner";
import PageSpinner from "../../globals/components/layout/PageSpinner";
import OrderEditorContainer from "../containers/OrderEditorContainer";
import { selectCurrentCompany } from "../../company/slices/companySlice";

// Components
export default function OrderEditorRouter() {
  const [ searchParams ] = useSearchParams();
  const id = searchParams.get('id');
  const { owner } = useSelector(selectCurrentCompany);
  const { order, isLoading: isFetchingOrder } = useOrderToEdit(id);
  let role = null;

  if(isFetchingOrder || !order.tenantCarrier || !order.tenantSender) return <div>
    <PageSpinner message="Accesso editor ordine" />
  </div>

  if(order.tenantCarrier === owner) role = "CARRIER";
  if(order.tenantSender === owner) role = "SENDER";

  return (
    <Routes>
      {/* Route disponibile solo per mittente e vettori: */}
      <Route element={<RequireOwner allowedOwners={[order.tenantCarrier, order.tenantSender]} />}>
        <Route index element={<OrderEditorContainer order={order} currentCompanyRole={role} />} />
      </Route>
    </Routes>
  )
}