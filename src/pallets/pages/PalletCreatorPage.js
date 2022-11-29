import { useQueryStringId } from "../../globals/libs/hooks";
import PalletCreatorContainer from "../containers/PalletCreatorContainer";

function PalletCreatorPage({ myCompany, companyId }) {
  const travel_id = useQueryStringId("travel_id");
  return <PalletCreatorContainer companyId={companyId} myCompany={myCompany} travel_id={travel_id} />
}

export default PalletCreatorPage;