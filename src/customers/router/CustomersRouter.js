import { Route, Routes } from "react-router-dom";
import CustomerCreatorContainer from "../containers/CustomerCreatorContainer";
import CustomerEditorContainer from "../containers/CustomerEditorContainer";
import CustomersListContainer from "../containers/CustomersListContainer";
import CustomerViewerContainer from "../containers/CustomerViewerContainer";
import CustomersLayout from "../layout/CustomersLayout";

const CustomersRouter = () => {
  return (
    <Routes>
      <Route element={<CustomersLayout />}>
        <Route index element={<CustomersListContainer /> } />
        <Route path="new" element={<CustomerCreatorContainer /> } />
        <Route path="view" element={<CustomerViewerContainer /> } />
        <Route path="edit" element={<CustomerEditorContainer /> } />
      </Route>
    </Routes>
  )
}

export default CustomersRouter;