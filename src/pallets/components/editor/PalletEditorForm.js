import { useDispatch } from "react-redux";
import PalletsListDrawerContainer from "../../containers/PalletListDrawerContainer";
import PalletEditorQuantityBundle from "../bundles/PalletEditorQuantityBundle";
import PalletAdminValidationSelect from "../form/PalletAdminValidationSelect";
import PalletCompaniesTrialBalance from "../form/PalletCompaniesTrialBalance";
import PalletReversalForm from "../form/PalletReversalForm";
import PalletRemoteAttachments from "./PalletRemoteAttachments";
import PalletOperationDateInput from "../form/PalletOperationDateInput";
import { addFileToPalletEditorThunk, addImageToPalletEditorThunk } from "../../api/pallets-thunks";
import { removePalletEditorFile, removePalletEditorImage } from "../../slices/palletEditorSlice";


export default function PalletEditorForm({
  queryFrom,
  palletHandling,
  changeEditorData,
  drawerState
}) {
  const [ drawer, setDrawer ] = drawerState;
  const dispatch = useDispatch();
  return (
    <section className="pt-4 bg-base-200 pl-2">
      { palletHandling.reversalId === "NO_REVERSAL"
        ? <PalletEditorQuantityBundle
            palletHandling={palletHandling}
            changeEditorData={changeEditorData}
          />
        : <PalletReversalForm
            title="Storno"
            reversal={[{ tenant: palletHandling.tenantReversal, id: palletHandling.reversalId, name: palletHandling.reversalName, value: palletHandling.reversalQuantity }]}
            companiesPalletInfo={null}
            onChangeReversalValue={payload => changeEditorData({ id: "reversalQuantity", value: payload.value })}
            onChangeReversalNote={payload => changeEditorData({ id: "reversalNote", value: payload.value })}
            isBadge={false}
          />
      }

      <PalletOperationDateInput
        operationDate={palletHandling.operationDate}
        callback={(data) => changeEditorData({ id: "operationDate", value: data.value })}
      />

      <PalletCompaniesTrialBalance
        customers={[{
          id: palletHandling.customerId,
          name: palletHandling.customerName,
          tenant: palletHandling.tenantCustomer,
        }].concat(palletHandling?.reversalId !== 'NO_REVERSAL' ? {
          id: palletHandling.reversalId,
          name: palletHandling.reversalName,
          tenant: palletHandling.tenantReversal,
        } : [])}
        drawer={drawer}
        setDrawer={setDrawer}
      />

      <PalletAdminValidationSelect
        validationMessage={palletHandling[`${queryFrom}ValidationMessage`]}
        validation={palletHandling[`${queryFrom}Validation`]}
        origin={queryFrom}
      />

      <PalletRemoteAttachments
        files={palletHandling?.files}
        image={palletHandling?.voucherImage ? palletHandling.voucherImage : null}
        addImage={(payload) => dispatch(addImageToPalletEditorThunk(payload))}
        removeImage={() => palletHandling?.voucherImage ? dispatch(removePalletEditorImage(palletHandling.voucherImage)) : null}
        addFile={(payload) => dispatch(addFileToPalletEditorThunk(payload))}
        removeFile={(index) => palletHandling?.files?.length > 0 
          ? dispatch(removePalletEditorFile({
            files: palletHandling.files,
            indexToRemove: index
          })) 
          : null
        }
      />

      <PalletsListDrawerContainer
        customer={drawer}
        drawer={drawer}
        setDrawer={setDrawer}
      />
    </section>
  )
}