// Helpers and hooks
import { useSelector } from "react-redux";
import usePrompt from "../../globals/hooks/useUnsafeReactRouter";
import FullSpinner from "../../globals/components/spinners/FullSpinner";
import PalletEditorContainer from "../containers/PalletEditorContainer";
import { selectIsPalletEdited } from "../slices/palletEditorSlice";
import { useQueryStringId } from "../../globals/libs/hooks";
import { selectCurrentCompany } from "../../company/slices/companySlice";

// Main component -----------------------------------------------------------------------------------------------
export default function PalletEditorPage({ queryFrom, companyId }) {
  const searchId = useQueryStringId(); // Get id and run search
  const isEdited = useSelector(selectIsPalletEdited);
  const { type: companyType } = useSelector(selectCurrentCompany);
  usePrompt('Attenzione! Perderai tutte le modifiche, vuoi davvero uscire?', isEdited);
  
  if(!searchId || !companyType) return <FullSpinner />;

  // Good to go
  return (
    <> 
      <PalletEditorContainer
        id={searchId}
        companyId={companyId}
        queryFrom={queryFrom}
        companyType={companyType}
        isEdited={isEdited}
      />
    </>
  )
}
