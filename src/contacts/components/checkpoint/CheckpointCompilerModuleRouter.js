import CheckpointCompilerForm from "./CheckpointCompilerForm";
import CheckpointsSummaryList from "./CheckpointsSummaryList";

const CheckpointCompilerModuleRouter = ({
  checkpoints,
  isForm, showForm,
  newCheckpoint,
  editEnabled,
  handleRemoveCheckpoint,
  dispatchNew,
  dispatchEdit,
  setModalAddress,
  hideMap
}) => {
  return (
    <div className="border-collapse table-auto w-full pb-4">
      { isForm 
        ? <CheckpointCompilerForm
            checkpoint={newCheckpoint}
            dispatch={dispatchNew}
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
          />
      }
    </div>
  )
}

export default CheckpointCompilerModuleRouter;