import { useDispatch } from "react-redux";
import { TinyTitle } from "../../../globals/components/typography/titles";
import { addFileToPalletCreatorThunk, addImageToPalletCreatorThunk, changePalletCreatorHandlingRefThunk } from "../../api/pallets-thunks";
import { changePalletCreatorAdminValidation, changePalletCreatorNote, changePalletCreatorOperationDate, removePalletCreatorFile, removePalletCreatorImage } from "../../slices/palletCreatorSlice";
import PalletAdminValidations from "./PalletAdminValidations";
import PalletAttachmentsForm from "./PalletAttachmentsForm";
import PalletHandlingRefSelector from "./PalletHandlingRefSelector";
import PalletInputItem from "./PalletInputItem";
import PalletOperationDateInput from "./PalletOperationDateInput";

export default function ReversalCreatorForm({
  title,
  reversal,
  onChangeReversalValue,
  onChangeReversalNote,
  note,
  operationDate,
  companyId,
  tenant,
  adminValidation,
  files,
  image,
  palletHandlingRef,
}) {
  const dispatch = useDispatch();
  if(reversal?.length <= 0) return null;

  return (
    <section className="pr-4 pl-2 bg-base-200">
      <TinyTitle styles="uppercase">{title}</TinyTitle>
      { reversal.map((rev, index) => {
        return (
          <div key={rev.id} className="mt-2">
            <PalletInputItem
              type="REVERSAL"
              balance={null}
              showBadge={false}
              title={`Pallet stornati dal conto di ${rev.name}`}
              value={rev.value}
              note={""}
              onChangeValue={(value) => onChangeReversalValue({ value, index })}
              onChangeNote={(value) => onChangeReversalNote({ value, index })}
              showText="Aggiungi annotazione"
              company={{ name: rev.name, tenant: rev.tenant, id: rev.id }}
              onChangeCompany={null}
            />
          </div>
        )}
      )}

      <PalletOperationDateInput
        operationDate={operationDate}
        callback={(data) => dispatch(changePalletCreatorOperationDate(data.value))}
      />

      <PalletHandlingRefSelector
        palletHandlingRef={palletHandlingRef}
        callback={(value) => dispatch(changePalletCreatorHandlingRefThunk(value))}
      />

      <PalletAdminValidations
        adminValidation={adminValidation}
        note={note}
        callbackValidator={(validator) => dispatch(changePalletCreatorAdminValidation(validator))}
        callbackNote={(note) => dispatch(changePalletCreatorNote(note))}
      />

      <PalletAttachmentsForm
        files={files}
        image={image ? image : null}
        addImage={(payload) => dispatch(addImageToPalletCreatorThunk(payload))}
        removeImage={() => image ? dispatch(removePalletCreatorImage(image)) : null}
        addFile={(payload) => dispatch(addFileToPalletCreatorThunk(payload))}
        removeFile={(index) => files?.length > 0 
          ? dispatch(removePalletCreatorFile({ indexToRemove: index })) 
          : null
        }
      />
    </section>
  )
}