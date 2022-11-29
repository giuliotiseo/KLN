import { Navigate } from "react-router-dom";
import PalletsTravelListContainer from "../containers/PalletsTravelListContainer";

// Main component -----------------------------------------------------------------------------------------------
export default function PalletsTravelListPage({ queryFrom, companyType, companyId }) {
  if(companyType && !queryFrom) {
    return companyType === "TRANSPORT"
      ? <Navigate to={`/pallets/travel?from=carrier`} />
      : <Navigate to={`/pallets/travel?from=customer`} />
  }
  
  // Good to go
  return <PalletsTravelListContainer companyId={companyId} queryFrom={queryFrom} />
}
