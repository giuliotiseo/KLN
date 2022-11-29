import InlineSpinner from "../../globals/components/spinners/InlineSpinner";
import ReversalCreatorContainer from "../containers/ReversalCreatorContainer";

function ReversalCreatorPage({ myCompany, companyId, queryFrom }) {
  if(!queryFrom || !myCompany || !companyId) return <InlineSpinner />
  return <ReversalCreatorContainer companyId={companyId} queryFrom={queryFrom} myCompany={myCompany} />
}

export default ReversalCreatorPage;