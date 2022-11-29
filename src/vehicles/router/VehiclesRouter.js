import { Route, Routes } from "react-router-dom";
// Components
import VehiclesLayout from "../layout/VehiclesLayout";
import VehicleCreatorContainer from "../containers/VehicleCreatorContainer";
import VehiclesListContainer from "../containers/VehiclesListContainer";
import VehicleEditorContainer from "../containers/VehicleEditorContainer";
import VehicleViewerContainer from "../containers/VehicleViewerContainer";

export default function VehiclesRouter() {
  return (
    <Routes>
      <Route element={<VehiclesLayout />}>
        <Route index element={<VehiclesListContainer />} />
        <Route path='new' element={<VehicleCreatorContainer />} />
        <Route path='edit' element={<VehicleEditorContainer />} />
        <Route path='view' element={<VehicleViewerContainer />} />
      </Route>
    </Routes>
  )
}