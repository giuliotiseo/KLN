import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectCompanyInfo } from "../../company/slices/companyInfoSlice";

export default function TravelsListRedirection() {
  const { type } = useSelector(selectCompanyInfo);

  return (
    type === "TRANSPORT"
      ? <Navigate to={`/travels?status=stationary`} />
      : <Navigate to={`/travels`} />
  )
}