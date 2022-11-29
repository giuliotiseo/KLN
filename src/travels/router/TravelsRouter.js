import { Route, Routes } from "react-router-dom";
import TravelsLayout from "../layout/TravelsLayout";
import TravelsListContainer from "../containers/TravelsListContainer";
import TravelCreatorContainer from "../containers/TravelCreatorContainer";
import TravelEditorPage from "../pages/TravelEditorPage";
import TravelViewerPage from "../pages/TravelViewerPage";

export default function TravelsRouter() {
  return (
    <Routes>
      <Route element={<TravelsLayout />}>
        <Route index element={<TravelsListContainer />} />
        <Route path='new/*' element={<TravelCreatorContainer />} />
        <Route path='edit/*' element={<TravelEditorPage />} />
        <Route path='view/*' element={<TravelViewerPage />} />
      </Route>
    </Routes>
  )
}