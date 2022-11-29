import CheckpointCompilerForm from "./CheckpointCompilerForm";
import CheckpointsSummaryList from "./CheckpointsSummaryList";

const CheckpointCompilerModuleRouter = ({
  checkpoints,
  isForm,
  showForm,
  newCheckpoint,
  editEnabled,
  handleRemoveCheckpoint,
  dispatchNew,
  dispatchEdit,
  setModalAddress,
  confirmCheckpoint,
  reset,
  hideMap
}) => {
  return (
    <div className="border-collapse table-auto w-full pb-4">
      { isForm 
        ? <CheckpointCompilerForm
            checkpoint={newCheckpoint}
            dispatch={dispatchNew}
            confirmCheckpoint={confirmCheckpoint}
            reset={reset}
            className="bg-base-100 p-4 rounded-md "
          />
        : <CheckpointsSummaryList
            checkpoints={checkpoints}
            handleRemoveCheckpoint={handleRemoveCheckpoint}
            showForm={showForm}
            dispatchNew={dispatchNew}
            dispatchEdit={dispatchEdit}
            editEnabled={editEnabled}
            setModalAddress={setModalAddress}
            hideMap={hideMap}
            noItemsText="Nessun checkpoint personalizzato"
          />
      }
    </div>
  )
}

export default CheckpointCompilerModuleRouter;