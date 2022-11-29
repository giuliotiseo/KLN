import Button from "../../../globals/components/buttons_v2/Button";
import TextEditor from "../../../globals/components/dataEntry_v2/TextEditor";
import CheckpointAccessForm from "./form/CheckpointAccessForm";
import CheckpointAssetsForm from "./form/CheckpointAssetsForm";
import CheckpointAvailabilityForm from "./form/CheckpointAvailabilityForm";
import CheckpointBasicInfo from "./form/CheckpointBasicInfo";
import CheckpointContactsForm from "./form/CheckpointContactsForm";
import CheckpointThirdCompanySelector from "./form/CheckpointThirdCompanySelector";

export default function CheckpointCompilerForm ({
  checkpoint,
  dispatch,
  confirmCheckpoint,
  reset,
  className = ""
}) {
  return (
    <div className={className}>
      <CheckpointBasicInfo
        checkpoint={checkpoint}
        dispatch={dispatch}
      />

      <CheckpointThirdCompanySelector
        checkpoint={checkpoint}
        dispatch={dispatch}
      />
      
      <CheckpointAccessForm
        checkpoint={checkpoint}
        dispatch={dispatch}
        className="flex flex-col mt-6"
      />

      <CheckpointAvailabilityForm
        checkpoint={checkpoint}
        dispatch={dispatch}
        className="mt-4"
      />

      <CheckpointAssetsForm
        checkpoint={checkpoint}
        dispatch={dispatch}
        className="mt-6"
      />


      <CheckpointContactsForm
        checkpoint={checkpoint}
        dispatch={dispatch}
        className="mt-6"
      />

      
      <div className="mt-6 pb-4">
        <TextEditor
          title="Annotazioni contatto"
          titleClassName="title-4 block"
          content={checkpoint?.note}
          onSaveTextEditor={(content) => dispatch({ type: "change_checkpoint", name: "note",  value: content })}
          label="Note punto di interesse"
          actionButtonPosition="INTERNAL"
          showList={true}
        />
      </div>

      <div className="flex items-center gap-2">
        <Button
          text="Annulla"
          className="btn-outline flex flex-1 text-center align-items justify-center"
          onClick={reset}
        />

        <Button
          text="Conferma"
          className="btn-primary flex flex-1 text-center align-items justify-center"
          onClick={confirmCheckpoint}
        />
      </div>
    </div>
  )
}