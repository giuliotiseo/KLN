import React from 'react'
import { useDispatch } from 'react-redux'
import SafeCol from '../../../globals/components/layout/SafeCol'
import CheckCompilerAttachments from '../create/CheckCompilerAttachments'
import CheckCompilerContent from '../create/CheckCompilerContent'
import CheckCompilerDates from '../create/CheckCompilerDates'
import { FiInbox } from 'react-icons/fi'
// Actions
import { addFileToCheckCreatorThunk, addImageToCheckCreatorThunk } from '../../api/check-thunks'
import { changeCheckCreatorForm, removeCheckCreatorFile, removeCheckCreatorImage } from '../../slices/checkCreatorSlice'

// Sub components -------------------------------------------------------------------------------------------------------------------
const CheckCreatorHeading = () => (
  <h4 styles="title-3">Compilatore assegni</h4>
)

const CheckCreatorForm = ({ check, order }) => {
  const dispatch = useDispatch();
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
function CheckDataCompiler({
  order,
  check
}) {
  return (
    <SafeCol id="CheckDataCompiler">
      { order && <CheckCreatorHeading /> }
      <CheckCreatorForm order={order} check={check} />
    </SafeCol>
  )
}

export default CheckDataCompiler
