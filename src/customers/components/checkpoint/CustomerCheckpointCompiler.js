import { useEffect, useReducer, useState } from "react";
import Button from "../../../globals/components/buttons_v2/Button";
import CheckpointCompilerModuleRouter from "./CheckpointCompilerModuleRouter";
import CheckpointCompilerForm from "./CheckpointCompilerForm";
// Icons
import { FiX, FiCheck, FiPlus, FiMapPin } from "react-icons/fi";
import { starterCheckpoint } from "../../libs/constants";
import { checkpointReducer } from "./reducer";
import { toast } from "react-toastify";

// Functions ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
async function handleCheckpoint({ action, prevCheckpoints, checkpoint, updateForm, index }) {
  if(action === "add") {
    await updateForm({
      name: "customCheckpoints",
      type: "custom",
      value: prevCheckpoints.concat({
        ...checkpoint,
        windows: checkpoint?.windows
      })
    });
  }

  if(action === "edit") {
    await updateForm({ name: "customCheckpoints", type: "custom", value: [
      ...prevCheckpoints.slice(0, parseInt(checkpoint.index)),
      {
        ...checkpoint,
        windows: checkpoint?.windows
      },
      ...prevCheckpoints.slice(parseInt(checkpoint.index) + 1)
    ]});
  }

  if(action === "remove") {
    await updateForm({ name: "customCheckpoints", type: "custom", value: prevCheckpoints.filter((_, doc_idx) => doc_idx !== index) });
  }
}

// Main component ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function CustomerCheckpointCompiler({
  checkpoints,
  updateForm,
  editEnabled = true,
  hideTitle = false,
  hideMap = false,
  setIsChanging,
  setModalAddress = false,
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
    if(!newCheckpoint?.name || !newCheckpoint.location.address) {
      toast.error('Devi attribuire un nome al magazzino e selezionare un indirizzo prima di procedere');
      return null;
    }

    handleCheckpoint({
      action: "add",
      prevCheckpoints: checkpoints,
      checkpoint: newCheckpoint,
      updateForm
    });

    showForm(false);
  }

  const confirmEditCheckpoint = async () => {
    if(!editCheckpoint?.name || !editCheckpoint.location.address) {
      toast.error('Devi attribuire un nome al magazzino e selezionare un indirizzo prima di procedere');
      return null;
    }

    handleCheckpoint({
      action: "edit",
      prevCheckpoints: checkpoints,
      checkpoint: editCheckpoint,
      updateForm
    });

    dispatchEdit({ type: "reset", value: null });
  }

  const resetView = () => {
    showForm(false);
    dispatchNew({ type: "reset", value: starterCheckpoint })
  }

  const handleRemoveCheckpoint = (index) => {
    handleCheckpoint({
      action: "remove",
      prevCheckpoints: checkpoints,
      index,
      updateForm
    })
  }

  return (
    <>
      { !hideTitle && (
        <div className="sticky justify-between top-0 bg-base-200 py-2 flex items-center z-10">
          <div className="title-3 mb-2 flex items-center">
            <FiMapPin className="text-lg mr-2" />
            <h3>Punti di interesse</h3>
          </div>

          { !form && updateForm && !editCheckpoint && editEnabled && (
            <Button
              text="Aggiungi punto"
              icon={<FiPlus className="text-xl" />}
              className="my-0 hover:text-primary-200 dark:hover:text-primary-300"
              onClick={() => showForm(true)}
            />
          )}

          { form && updateForm && !editCheckpoint && editEnabled && (
            <div className="flex items-center">
              <Button
                icon={<FiCheck />}
                text="Conferma"
                onClick={() => confirmNewCheckpoint()}
                className="text-sm btn-primary"
              />

              <Button
                icon={<FiX />}
                onClick={resetView}
                className="bg-light-300 dark:bg-dark-300 hover:bg-light-200 dark:hover:bg-dark-200 flex items-center justify-center w-[40px] h-[40px] text-center p-1 rounded-full ml-2"
              />
            </div>
          )}

          { updateForm && editCheckpoint && editEnabled && (
            <div className="flex items-center">
              <Button
                text="Conferma"
                icon={<FiCheck />}
                onClick={() => confirmEditCheckpoint()}
                className="text-sm btn-primary"
              />

              <Button
                icon={<FiX />}
                onClick={() => dispatchEdit({ type: "reset", value: null })}
                className="bg-light-300 dark:bg-dark-300 hover:bg-light-200 dark:hover:bg-dark-200 flex items-center justify-center w-[40px] h-[40px] text-center p-1 rounded-full ml-2"
              />
            </div>
          )}
        </div>
      )}

      <div className={`${contentStyles}`}>
        { !editCheckpoint
          ? <CheckpointCompilerModuleRouter
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
              confirmCheckpoint={confirmNewCheckpoint}
              reset={resetView}
            />
          : <CheckpointCompilerForm
              checkpoint={editCheckpoint}
              dispatch={dispatchEdit}
              confirmCheckpoint={confirmEditCheckpoint}
              reset={() => dispatchEdit({ type: "reset", value: null })}
              className="bg-base-100 p-4 rounded-md"
            />
        }
      </div>
    </>
  )
}