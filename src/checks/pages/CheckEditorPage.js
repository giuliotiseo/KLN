import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import usePrompt from "../../globals/hooks/useUnsafeReactRouter";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../../globals/hooks/useAuth";
import { useUpdateCheck } from "../hooks/useUpdateCheck";
// Components
import CheckEditorLayout from "../layout/CheckEditorLayout";
import CheckValidationModal from "../components/CheckValidationModal";
import PageSpinner from "../../globals/components/layout/PageSpinner";
// Helpers and hooks
import { handleUpdateCheck } from "../api/checks-preprocessors";
import { useCheckByIdQuery } from "../api/checks-api-slice";
import { resetCheckContentEditor, resetCheckEditor, selectCheckEditor } from "../slices/checkEditorSlice";


// Main component -----------------------------------------------------------------------------------------------
export default function CheckEditorPage() {
  const { auth, profile } = useAuth();
  const [ modal, setModal ] = useState(false);
  const [ searchParams ] = useSearchParams();
  const id = searchParams.get('id');
  const queryFrom = searchParams.get('from');
  const { data: fetchedCheck = {}, isFetching } = useCheckByIdQuery({ id });
  const [ updateCheck, { isLoading: isUpdating } ] = useUpdateCheck();
  const checkEditor = useSelector(selectCheckEditor);
  const isDirty = Object.keys(checkEditor).length ? true : false
  usePrompt('Attenzione! Perderai tutte le modifiche, vuoi davvero uscire?', isDirty);

  // Action
  const dispatch = useDispatch();
  const renderCheck = { ...fetchedCheck, ...checkEditor };

  // Reset callback (when user leave the page)
  const resetData = useCallback(() => {
    dispatch(resetCheckEditor());
  }, [fetchedCheck])

  // When run a new fetch (when user leave the page)
  useEffect(() => {
    resetData(fetchedCheck);
  }, [fetchedCheck]);

  // Await data
  if(!id || !renderCheck?.id || isFetching) return <PageSpinner message="Accesso editor assegni" />

  // Dynamic variables
  const { docsRef, keyDocNum } = renderCheck;

  // Shared update function
  const runUpdateCheck = ({ skipValidation }) => {
    // Execute the update
    handleUpdateCheck({
      checkEditor,
      fetchedCheck,
      skipValidation,
      cognitoUser: auth,
      profile,
      queryFrom,
      updateCheck,
      dispatch,
      setModal
    })
  }

  // Button save config
  const buttons = {
    save: {
      text: "Salva modifiche",
      loading: isUpdating,
      onClick: () => runUpdateCheck({ skipValidation : false }),
    },
    reset: {
      text: "Reset",
      onClick: () => dispatch(resetCheckContentEditor)
    }
  } 

  // Good to go
  return (
    <>
      <CheckEditorLayout
        order={renderCheck.order}
        check={renderCheck}
        docs={{ docsRef, keyDocNum }}
        queryFrom={queryFrom}
        buttons={buttons}
      />

      <CheckValidationModal
        modal={modal}
        setModal={setModal}
        loading={isUpdating}
        validation={renderCheck?.validation}
        confirm={() => runUpdateCheck({ skipValidation: true })}
      />
    </>
  )
}
