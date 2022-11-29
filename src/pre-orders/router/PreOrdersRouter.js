import { Route, Routes } from "react-router-dom";
// Components
import PreOrdersLayout from "../layout/PreOrdersLayout";
import PreOrdersListContainer from "../containers/PreOrdersListContainer";
import PreOrderCreatorRouter from "./PreOrderCreatorRouter";
import PreOrderEditorRouter from "./PreOrderEditorRouter";
import PreOrderViewerContainer from "../containers/PreOrderViewerContainer";

export default function PreOrdersRouter() {
  return (
    <Routes>
      <Route element={<PreOrdersLayout />}>
        <Route index element={<PreOrdersListContainer />} />
        <Route path="new/*" element={<PreOrderCreatorRouter />} />
        <Route path="edit/*" element={<PreOrderEditorRouter />} />
        <Route path="view/*" element={<PreOrderViewerContainer />} />
      </Route>
    </Routes>
  )
}