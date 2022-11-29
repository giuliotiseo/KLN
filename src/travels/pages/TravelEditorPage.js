import usePrompt from "../../globals/hooks/useUnsafeReactRouter";
import { useSelector } from "react-redux";
import { useQueryStringId } from "../../globals/libs/hooks";
import FullSpinner from "../../globals/components/spinners/FullSpinner";
import TravelEditorContainer from "../containers/TravelEditorContainer";
import { selectIsTravelEdited } from "../slices/travelEditorSlice";
import { selectCurrentCompany } from "../../company/slices/companySlice";

// Main component -----------------------------------------------------------------------------------------------
export default function TravelEditorPage() {
  const searchId = useQueryStringId(); // Get id and run search
  const isEdited = useSelector(selectIsTravelEdited);
  const { type: companyType } = useSelector(selectCurrentCompany);
  // usePrompt('Attenzione! Perderai tutte le modifiche, vuoi davvero uscire?', isEdited);

  if(!searchId || !companyType) return <FullSpinner />;

  // Good to go
  return (
    <> 
      <TravelEditorContainer
        id={searchId}
        companyType={companyType}
        isEdited={isEdited}
      />
    </>
  )
}
