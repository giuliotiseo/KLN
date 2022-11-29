import { Route, Routes } from "react-router-dom";
// Components
import OrdersLayout from "../layout/OrdersLayout";
import OrdersListContainer from "../containers/OrdersListContainer";
import OrderCreatorRouter from "./OrderCreatorRouter";
import OrderEditorRouter from "./OrderEditorRouter";
import OrderViewerContainer from "../containers/OrderViewerContainer";

export default function OrdersRouter() {
  return (
    <Routes>
      <Route element={<OrdersLayout />}>
        <Route index element={<OrdersListContainer />} />
        <Route path="new/*" element={<OrderCreatorRouter />} />
        <Route path="edit/*" element={<OrderEditorRouter />} />
        <Route path="view/*" element={<OrderViewerContainer />} />
      </Route>
    </Routes>
  )
}