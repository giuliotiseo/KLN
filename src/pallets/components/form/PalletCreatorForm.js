import { useDispatch, useSelector } from "react-redux";
import SafeCol from "../../../globals/components/layout/SafeCol";
import PalletCreatorQuantityBundle from "../bundles/PalletCreatorQuantityBundle";
import PalletAdminValidations from "./PalletAdminValidations";
import PalletAttachmentsForm from "./PalletAttachmentsForm";
import PalletCompaniesTrialBalance from "./PalletCompaniesTrialBalance";
import PalletOperationDateInput from "./PalletOperationDateInput";
import PalletsListDrawerContainer from "../../containers/PalletListDrawerContainer";
// Store
import { addFileToPalletCreatorThunk, addImageToPalletCreatorThunk } from "../../api/pallets-thunks";
import { changePalletCreatorAdminValidation, changePalletCreatorNote, changePalletCreatorOperationDate, removePalletCreatorFile, removePalletCreatorImage, selectPalletCreatorCompanies, selectPalletCreatorCompaniesNames } from "../../slices/palletCreatorSlice";

export default function PalletCreatorForm({
  loads,
  unloads,
  reversal,
  hasDelivery,
  companiesPalletInfo,
  note,
  operationDate,
  adminValidation,
  files,
  image,
  drawerState
}) {
  const [ drawer, setDrawer ] = drawerState;
  const customersList = useSelector(selectPalletCreatorCompanies);

  const dispatch = useDispatch();
  
  return (
    <SafeCol id="pallet-creator-inputs">
      <div className="pl-2 pr-4 bg-base-300">
        <PalletCreatorQuantityBundle
          loads={loads}
          unloads={unloads}
          reversal={reversal}
          hasDelivery={hasDelivery}
          companiesPalletInfo={companiesPalletInfo}
          note={note}
        />

        <PalletCompaniesTrialBalance
          customers={customersList}
          drawer={drawer}
          setDrawer={setDrawer}
        />

        <PalletOperationDateInput
          operationDate={operationDate}
          callback={(data) => dispatch(changePalletCreatorOperationDate(data.value))}
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

        <PalletsListDrawerContainer
          customer={drawer}
          drawer={drawer}
          setDrawer={setDrawer}
        />
      </div>
    </SafeCol>
  )
}