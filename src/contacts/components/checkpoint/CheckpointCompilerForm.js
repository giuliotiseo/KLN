import TextEditor from "../../../globals/components/dataEntry/TextEditor";
import CheckpointBasicInfo from "./form/CheckpointBasicInfo";
import CheckpointAccessForm from "./form/CheckpointAccessForm";
import CheckpointAvilabilityForm from "./form/CheckpointAvilabilityForm";
import CheckpointAssetsForm from "./form/CheckpointAssetsForm";
import CheckpointContactsForm from "./form/CheckpointContactsForm";

export default function CheckpointCompilerForm ({ checkpoint, dispatch }) {
  return (
    <div>
      <CheckpointBasicInfo
        checkpoint={checkpoint}
        dispatch={dispatch}
      />

      <CheckpointAccessForm
        checkpoint={checkpoint}
        dispatch={dispatch}
        styles="flex flex-col mt-6"
      />

      <CheckpointAvilabilityForm
        checkpoint={checkpoint}
        dispatch={dispatch}
        styles="mt-6"
      />

      <CheckpointAssetsForm
        checkpoint={checkpoint}
        dispatch={dispatch}
        styles="mt-6"
      />

      <CheckpointContactsForm
        checkpoint={checkpoint}
        dispatch={dispatch}
        styles="mt-6"
      />

      <div className="mt-6 pb-4">
        <TextEditor
          content={checkpoint?.note}
          onSaveTextEditor={(content) => dispatch({ type: "change_checkpoint", name: "note",  value: content })}
          label="Note punto di interesse"
          actionButtonPosition="INTERNAL"
          showList={true}
        />
      </div>
    </div>
  )
}