import { Route, Routes } from "react-router-dom";
// Components
import WarehousesLayout from "../layout/WarehousesLayout";
import WarehousesListContainer from "../containers/WarehousesListContainer";
import WarehouseCreatorContainer from "../containers/WarehouseCreatorContainer";
import WarehouseEditorContainer from "../containers/WarehouseEditorContainer";
import WarehouseViewerContainer from "../containers/WarehouseViewerContainer";

export default function WarehousesRouter() {
  return (
    <Routes>
      <Route element={<WarehousesLayout />}>
        <Route index element={<WarehousesListContainer />} />
        <Route path='new' element={<WarehouseCreatorContainer />} />
        <Route path='edit' element={<WarehouseEditorContainer />} />
        <Route path='view' element={<WarehouseViewerContainer />} />
      </Route>
    </Routes>
  )
}