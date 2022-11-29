import { Route, Routes } from "react-router-dom";
// Components
import RequireCompanyType from "../../private-app/components/RequireCompanyType";
import PreOrderCreatorCarrierContainer from "../containers/PreOrderCreatorCarrierContainer";
import PreOrderCreatorSenderContainer from "../containers/PreOrderCreatorSenderContainer";

export default function PreOrderCreatorRouter() {
  return (
    <Routes>
      {/* Route disponibile solo per vettori: */}
      <Route element={<RequireCompanyType allowedRoles={["TRANSPORT"]} />}>
        <Route path="carrier" element={<PreOrderCreatorCarrierContainer />} />
      </Route>

      <Route path="sender" element={<PreOrderCreatorSenderContainer />} />
    </Routes>
  )
}