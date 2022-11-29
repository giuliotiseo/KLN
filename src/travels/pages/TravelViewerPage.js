// Helpers and hooks
import TravelViewerContainer from "../containers/TravelViewerContainer";
import { useQueryStringId } from "../../globals/libs/hooks";
import FullSpinner from "../../globals/components/spinners/FullSpinner";

export default function TravelViewerPage() {
  // Get id and run search
  const searchId = useQueryStringId();

  if(!searchId) return <FullSpinner /> 

  return (
    <TravelViewerContainer id={searchId} />
  )
}