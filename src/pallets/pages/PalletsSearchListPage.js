import { Navigate } from "react-router-dom";
import PalletsSearchListContainer from "../containers/PalletsSearchListContainer";

// Main component -----------------------------------------------------------------------------------------------
export default function PalletsSearchListPage({ queryFrom, companyType, companyId }) {
  if(companyType && !queryFrom) {
    return companyType === "TRANSPORT"
      ? <Navigate to={`/pallets/search?from=carrier`} />
      : <Navigate to={`/pallets/search?from=customer`} />
  }
  
  // Good to go
  return <PalletsSearchListContainer companyId={companyId} queryFrom={queryFrom} />
}
