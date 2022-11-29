import PalletsReportListContainer from "../containers/PalletsReportListContainer";

// Main component -----------------------------------------------------------------------------------------------
export default function PalletsReportListPage({ queryFrom, companyId }) {
  // Good to go
  return <PalletsReportListContainer companyId={companyId} queryFrom={queryFrom} />
}
