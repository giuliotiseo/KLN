import { Route, Routes } from "react-router-dom";
// Components
import RequireCompanyType from "../../private-app/components/RequireCompanyType";
import OrderCreatorCarrierContainer from "../containers/OrderCreatorCarrierContainer";
import OrderCreatorSenderContainer from "../containers/OrderCreatorSenderContainer";

export default function OrderCreatorRouter() {
  return (
    <Routes>
      {/* Route disponibile solo per vettori: */}
      <Route element={<RequireCompanyType allowedRoles={["TRANSPORT"]} />}>
        <Route path="carrier" element={<OrderCreatorCarrierContainer />} />
      </Route>

      <Route path="sender" element={<OrderCreatorSenderContainer />} />
    </Routes>
  )
}