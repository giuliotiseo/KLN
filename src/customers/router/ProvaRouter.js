import { Route, Routes } from "react-router-dom";
import CustomersListContainer from "../containers/CustomersListContainer";
import CustomersLayout from "../layout/CustomersLayout";

const ProvaRouter = () => {
  return (
    <Routes elemet={<CustomersLayout />}>
      <Route index element={<CustomersListContainer />} />
    </Routes>
  )
}

export default ProvaRouter;