import { useDispatch } from "react-redux";
import { SmallTitle } from "../../globals/components/typography/titles";
import {
  changeCheckCreatorForm,
  removeCheckCreatorFile,
  removeCheckCreatorImage,
} from "../slices/checkCreatorSlice";
import { addFileToCheckCreatorThunk, addImageToCheckCreatorThunk } from "../api/check-thunks";
import CheckCompilerDates from "../components/create/CheckCompilerDates";
import CheckCompilerContent from "../components/create/CheckCompilerContent";
import CheckCompilerAttachments from "../components/create/CheckCompilerAttachments";
import { FiInbox } from "react-icons/fi";
import StatusPicker from "../../globals/components/pickers/StatusPicker";
import { CHECK_STATUS_DESCRIPTION } from "../libs/constants";

// Sub components -------------------------------------------------------------------------------------------------------------------
const CheckCreatorHeading = () => (
  <SmallTitle styles="my-4">Compilatore assegni</SmallTitle>
)

const CheckCreatorForm = ({ check, order, dispatch }) => {
  const validation = check?.validation || null;

  if(!order) return <div
    className="absolute flex w-full h-full flex-col items-center justify-center opacity-50"
  >
    <FiInbox className="text-4xl" />
    <p className="text-2xl font-bold max-w-[320px] text-center">
      Seleziona un ordine per proseguire
    </p>
  </div>

  return <>
    <div className="bg-base-100 rounded-md mb-4 p-4">
      <StatusPicker
        id="status"
        element={check}
        callback={(payload) => dispatch(changeCheckCreatorForm({ id: payload.name, value: payload.value }))}
        // callback={(payload) =>  console.log({ payload })}
        label="Stato assegno"
        optionsObj={CHECK_STATUS_DESCRIPTION}
      />
    </div>

    <CheckCompilerDates
      fields={check}
      changeData={(payload) => dispatch(changeCheckCreatorForm(payload))}
      validation={validation}
    />

    <CheckCompilerContent
      fields={check}
      changeData={(payload) => dispatch(changeCheckCreatorForm(payload))}
      validation={validation}
    />

    <CheckCompilerAttachments
      files={check?.files}
      image={check?.image ? check.image : null}
      addImage={(payload) => dispatch(addImageToCheckCreatorThunk(payload))}
      removeImage={() => check?.image ? dispatch(removeCheckCreatorImage(check.image)) : null}
      addFile={(payload) => dispatch(addFileToCheckCreatorThunk(payload))}
      removeFile={(index) => check?.files?.length > 0 
        ? dispatch(removeCheckCreatorFile({ indexToRemove: index })) 
        : null
      }
    />
  </>
}

// Main component -------------------------------------------------------------------------------------------------------------------
export default function CheckCreatorContainer({ check, order }) {
  const dispatch = useDispatch();
  return (
    <section>
      { order && <CheckCreatorHeading /> }
      <CheckCreatorForm order={order} check={check} dispatch={dispatch} />
    </section>
  )
}