import { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTenant } from "../../company/slices/companyInfoSlice";
// Components
import OrdersListContainer from "../containers/OrdersListContainer";
import CreateOrderContainer from "../containers/CreateOrderContainer";
import EditOrderContainer from "../containers/EditOrderContainer";
import DetailsOrderContainer from "../containers/DetailsOrderContainer";
import EditOrderBySenderContainer from "../containers/EditOrderBySenderContainer";

export default function OrdersRouter() {
  const [ queryFrom, setQueryFrom ] = useState(null);
  const [ queryStatus, setQueryStatus ] = useState(null);
  const tenant = useSelector(selectTenant);
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const origin = query.get("from");
    setQueryFrom(origin);
    setQueryStatus(() => query.get("status"));
  }, [location.search, tenant]);

  return (
    <Routes>
      <Route index element={<OrdersListContainer queryStatus={queryStatus} queryFrom={queryFrom} />} />
      <Route path='create' element={<CreateOrderContainer queryFrom={queryFrom} />} />
      <Route path='edit' element={<EditOrderContainer queryFrom={queryFrom} />} />
      <Route path=":tenant/edit" element={<EditOrderBySenderContainer queryFrom={queryFrom} />} />
      <Route path='details' element={<DetailsOrderContainer queryFrom={queryFrom} />} /> 
    </Routes>
  )
}