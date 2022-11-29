import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectCompanyInfo } from "../../company/slices/companyInfoSlice";

export default function ChecksListRedirection() {
  const { type } = useSelector(selectCompanyInfo);

  return (
    type === "TRANSPORT"
      ? <Navigate to={`/checks?from=carrier&status=pending`} replace />
      : <Navigate to={`/checks?from=sender&status=pending`} replace />
  )
}