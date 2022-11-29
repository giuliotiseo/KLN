import { useDispatch } from "react-redux"
import { SmallTitle } from "../../globals/components/typography/titles"
import CheckCompilerDates from "../components/create/CheckCompilerDates";
import CheckCompilerContent from "../components/create/CheckCompilerContent";
import {
  changeCheckEditorForm,
  removeCheckEditorImage,
  removeCheckEditorFile,
} from "../slices/checkEditorSlice";
import CheckRemoteAttachments from "../components/create/CheckRemoteAttachments";
import { addFileToCheckEditorThunk, addImageToCheckEditorThunk } from "../api/check-thunks";
import StatusPicker from "../../globals/components/pickers/StatusPicker";
import { CHECK_STATUS_DESCRIPTION } from "../libs/constants";

// Sub component ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const CheckEditorHeader = () => <SmallTitle styles="my-4">Modifica assegno</SmallTitle>

// Main component ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function CheckEditorContainer({ check }) {
  const dispatch = useDispatch();
  const validation = check?.validation ? check.validation : null;

  return (
    <section>
      <CheckEditorHeader />

      <div className='mb-4 '>
        <section className="p-4 bg-base-100 rounded-md">
          <StatusPicker
            id="status"
            element={check}
            callback={({ value }) => dispatch(changeCheckEditorForm({ id: "status", value }))}
            label="Stato ordine"
            optionsObj={CHECK_STATUS_DESCRIPTION}
          />
        </section>
      </div>


      <CheckCompilerDates
        fields={check}
        changeData={(payload) => dispatch(changeCheckEditorForm(payload))}
        validation={validation}
      />
      
      <CheckCompilerContent
        fields={check}
        changeData={(payload) => dispatch(changeCheckEditorForm(payload))}
        validation={validation}
      />

      <CheckRemoteAttachments
        files={check?.files}
        image={check?.image ? check.image : null}
        addImage={(payload) => dispatch(addImageToCheckEditorThunk(payload))}
        removeImage={() => check?.image ? dispatch(removeCheckEditorImage(check.image)) : null}
        addFile={(payload) => dispatch(addFileToCheckEditorThunk(payload))}
        removeFile={(index) => check?.files?.length > 0 
          ? dispatch(removeCheckEditorFile({
            files: check.files,
            indexToRemove: index
          })) 
          : null
        }
      />
    </section>
  )
}