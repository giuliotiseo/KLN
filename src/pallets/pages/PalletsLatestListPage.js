import PalletsLatestListContainer from "../containers/PalletsLatestListContainer";

// Main component -----------------------------------------------------------------------------------------------
export default function PalletsLatestListPage({ queryFrom, companyId }) {
  // Good to go
  return <PalletsLatestListContainer companyId={companyId} queryFrom={queryFrom} />
}
