import { Route, Routes } from "react-router-dom";
// Components
import ChecksListContainer from "../containers/ChecksListContainer";
import ChecksLayout from "../layout/ChecksLayout";
import CheckCreatorPage from "../pages/CheckCreatorPage";
import CheckEditorPage from "../pages/CheckEditorPage";
import CheckViewerPage from "../pages/CheckViewerPage";

export default function ChecksRouter() {
  return (
  <Routes>
    <Route element={<ChecksLayout />}>
      <Route index element={<ChecksListContainer />} />
      <Route path='new/*' element={<CheckCreatorPage />} />
      <Route path='edit/*' element={<CheckEditorPage />} />
      <Route path='view/*' element={<CheckViewerPage />} />
    </Route>
  </Routes>
)}