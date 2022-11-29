import PalletViewerContainer from "../containers/PalletViewerContainer";
import { useQueryStringId } from "../../globals/libs/hooks";

export default function PalletViewerPage({ queryFrom }) {
  // Get id and run search
  const travel_id = useQueryStringId();

  return (
    <PalletViewerContainer
      id={travel_id}
      queryFrom={queryFrom}
    />
  )
}