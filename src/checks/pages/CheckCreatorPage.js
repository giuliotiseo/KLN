import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useAddCheckByCarrierMutation } from "../api/checks-api-slice";
// Components
import CheckCreatorLayout from "../layout/CheckCreatorLayout";
import CheckValidationModal from "../components/CheckValidationModal";
// Helpers and hooks
import { MdOutlineSend } from "react-icons/md";
import { resetCheckCreatorContent, selectCheckCreator, selectCheckCreatorKeyDocNum, selectCheckCreatorOrderDocsRef, selectCheckCreatorOrderRef } from "../slices/checkCreatorSlice";
import { useCreateCheck } from "../hooks/useCreateCheck";

// Functions ------------------------------------------------------------------------------------------------------------------------------------------------------------------
const handleCreateCheck = async ({ check, createCheck, validation, setModal }) => {
  const validation_ids = validation ? Object.keys(validation) : [];
  let error = "";
  if(validation_ids.length > 0) {
    for(let id of validation_ids) {
      if(error === true) return;
      if(validation[id].status === "ERROR") {
        error = true;
        setModal(true);
      } else {
        error = false;
      }
    }
  } else {
    error = false;
  }

  // Se supera la validazione
  if(error === false) {
    // Registra i dati nel database
    createCheck(check);
    setModal(false);
  }
}

// Main component -----------------------------------------------------------------------------------------------
export default function CheckCreatorPage() {
  const [ modal, setModal ] = useState(false);
  const [ createCheck, { isLoading: isCreating } ] = useCreateCheck();
  const check = useSelector(selectCheckCreator);
  const order = useSelector(selectCheckCreatorOrderRef);
  const docsRef = useSelector(selectCheckCreatorOrderDocsRef);
  const keyDocNum = useSelector(selectCheckCreatorKeyDocNum);
  const { pathname } = useLocation();
  const queryFrom = pathname.split('/').at(-1).toLowerCase();
  const dispatch = useDispatch();

    // Shared creation function
    const runCreateCheck = ({ validation }) => {
      handleCreateCheck({
        check,
        createCheck,
        queryFrom,
        validation: validation ? check?.validation : null,
        setModal
      })
    }

  // Button save config
  const buttons = {
    save: {
      text: "Registra assegno",
      loading: isCreating,
      onClick: () => runCreateCheck({ validation: true })
    },
    reset: {
      text: "Reset",
      onClick: () => dispatch(resetCheckCreatorContent)
    }
  } 

  // Good to go
  return (
    <>
      <CheckCreatorLayout
        check={check}
        order={order}
        docs={{ docsRef, keyDocNum }}
        queryFrom={queryFrom}
        buttons={buttons}
      />

      {/* Floating elements */}
      <CheckValidationModal
        modal={modal}
        setModal={setModal}
        loading={isCreating}
        validation={check?.validation}
        confirm={() => handleCreateCheck({ validation: false })}
      />
    </>
  )
}
