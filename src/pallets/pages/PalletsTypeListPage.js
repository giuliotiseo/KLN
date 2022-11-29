import PalletsTypeListContainer from "../containers/PalletsTypeListContainer";

// Main component -----------------------------------------------------------------------------------------------
export default function PalletsTypeListPage({ queryFrom, companyId }) {
  // Good to go
  return <PalletsTypeListContainer companyId={companyId} queryFrom={queryFrom} />
}
