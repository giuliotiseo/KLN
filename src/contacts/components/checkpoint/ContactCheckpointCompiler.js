import { useEffect, useReducer, useState } from "react";
import ActionButton from "../../../globals/components/buttons/ActionButton";
import { SmallTitle } from "../../../globals/components/typography/titles";
import CheckpointCompilerForm from "./CheckpointCompilerForm";
import CheckpointCompilerModuleRouter from "./CheckpointCompilerModuleRouter";
// Helpers
import { starterCheckpoint } from "../../libs/helpers";
// Reducer
import { checkpointReducer } from "../../libs/reducers";
// Icons
import { FiMapPin, FiPlusCircle, FiX, FiCheck } from "react-icons/fi";

// Functions ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
async function handleCheckpoint({ action, prevCheckpoints, checkpoint, updateForm, index }) {
  if(action === "add") {
    await updateForm({ target: { name: "checkpoints", type: "object", value: prevCheckpoints.concat(checkpoint)}});
  }

  if(action === "edit") {
    await updateForm({ target: { name: "checkpoints", type: "object", value: [
      ...prevCheckpoints.slice(0, parseInt(checkpoint.index)),
      { ...checkpoint },
      ...prevCheckpoints.slice(parseInt(checkpoint.index) + 1)
    ]}});
  }

  if(action === "remove") {
    await updateForm({ target: { name: "checkpoints", type: "object", value: prevCheckpoints.filter((_, doc_idx) => doc_idx !== index)}});
  }
}

// Main component ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function ContactCheckpointCompiler({
  checkpoints,
  updateForm,
  editEnabled = true,
  hideTitle = false,
  hideMap = false,
  setIsChanging,
  setModalAddress = false,
  titleStyles = "",
  contentStyles = ""
}) {
  const [ form, showForm ] = useState(false);
  const [ newCheckpoint, dispatchNew ] = useReducer(checkpointReducer, starterCheckpoint);
  const [ editCheckpoint, dispatchEdit ] = useReducer(checkpointReducer, null);

  // Let to know to parent component if the compiler is in edit mode (typical case: when the user don't press on confirm button)
  useEffect(() => {
    if(setIsChanging) {
      if(form || editCheckpoint) {
        setIsChanging(true);
      } else {
        setIsChanging(false);
      }
    }
  }, [form, editCheckpoint, setIsChanging]);

  useEffect(() => {
    if(!form) dispatchNew({ type: "reset", value: starterCheckpoint })
  }, [form]);

  const confirmNewCheckpoint = async () => {
    handleCheckpoint({ action: "add", prevCheckpoints: checkpoints, checkpoint: newCheckpoint, updateForm });
    showForm(false);
  }

  const confirmEditCheckpoint = async () => {
    handleCheckpoint({ action: "edit", prevCheckpoints: checkpoints, checkpoint: editCheckpoint, updateForm });
    dispatchEdit({ type: "reset", value: null });
  }

  const resetView = () => {
    showForm(false);
    dispatchNew({ type: "reset", value: starterCheckpoint })
  }

  const handleRemoveCheckpoint = (index) => {
    handleCheckpoint({ action: "remove", prevCheckpoints: checkpoints, index, updateForm })
  }

  return (
    <>
      { !hideTitle && <SmallTitle styles={`bg-base-100 z-50 flex items-center justify-between ${titleStyles}`}>
        <div className="flex items-center">
          <FiMapPin className="text-lg mr-1" />
          <span>Punti di interesse</span>
        </div>

        { !form && updateForm && !editCheckpoint && editEnabled && (
          <ActionButton
            text="Aggiungi"
            icon={() => <FiPlusCircle />}
            styles="text-sm btn-primary my-0"
            onClick={() => showForm(true)}
          />
        )}

        { form && updateForm && !editCheckpoint && editEnabled && (
          <div className="flex items-center">
            <ActionButton
              text="Conferma"
              icon={() => <FiCheck />}
              onClick={() => confirmNewCheckpoint()}
              styles="text-sm btn-primary"
            />

            <ActionButton
              icon={() => <FiX />}
              onClick={resetView}
              styles="bg-light-100 dark:bg-dark-100 hover:bg-light-200 dark:hover:bg-dark-200 flex items-center justify-center w-[40px] h-[40px] text-center p-1 rounded-full ml-2"
            />
          </div>
        )}

        { updateForm && editCheckpoint && editEnabled && (
          <div className="flex items-center">
            <ActionButton
              text="Conferma"
              icon={() => <FiCheck />}
              onClick={() => confirmEditCheckpoint()}
              styles="text-sm btn-primary"
            />

            <ActionButton
              icon={() => <FiX />}
              onClick={() => dispatchEdit({ type: "reset", value: null })}
              styles="bg-light-100 dark:bg-dark-100 hover:bg-light-200 dark:hover:bg-dark-200 flex items-center justify-center w-[40px] h-[40px] text-center p-1 rounded-full ml-2"
            />
          </div>
        )}
      </SmallTitle> }

      <div className={`${contentStyles}`}>
        { !editCheckpoint
          ? (
            <CheckpointCompilerModuleRouter
              checkpoints={checkpoints}
              isForm={form}
              showForm={showForm}
              newCheckpoint={newCheckpoint}
              handleRemoveCheckpoint={handleRemoveCheckpoint}
              dispatchNew={dispatchNew}
              dispatchEdit={dispatchEdit}
              editEnabled={editEnabled}
              setModalAddress={setModalAddress}
              hideMap={hideMap}
            />
          )
          : <CheckpointCompilerForm
              checkpoint={editCheckpoint}
              dispatch={dispatchEdit}
            />
        }
      </div>
    </>
  )
}