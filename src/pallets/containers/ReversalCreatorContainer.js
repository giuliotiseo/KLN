import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Components
import ReversalCreatorLayout from "../layout/ReversalCreatorLayout";
// Actions
import {
  changePalletCreatorReversal,
  changePalletCreatorReversalNote,
  changePalletCreatorReversalQuantity,
  changePalletCreatorTravel,
  initStaticPalletCreator,
  resetPalletCreator,
  selectPalletCreator,
} from "../slices/palletCreatorSlice";
// Api
import { handleCreatePalletReversal } from "../api/pallets-preprocessors";
import { useAddReversalHandlingMutation } from "../api/pallets-api-slice";
// Icons
import  { MdOutlineSend } from "react-icons/md";
import { selectPalletsListLimit, selectPalletsListNextToken, selectPalletsListOperationDateRange } from "../slices/palletsListSlice";
import { resetCustomersList } from "../../customers/slices/customersListSlice";

export default function ReversalCreatorContainer({ companyId, myCompany, queryFrom }) {
  const [ createReversal, { isLoading: isCreating }] = useAddReversalHandlingMutation();
  const palletHandling = useSelector(selectPalletCreator);
  const operationDateRange = useSelector(selectPalletsListOperationDateRange);
  const limit = useSelector(selectPalletsListLimit);
  const nextToken = useSelector(selectPalletsListNextToken);
  
  const dispatch = useDispatch();
  
  // Spread values from store
  const {
    files, image, operationDate, customerName, palletHandlingRef,
    adminValidation, reversal, companiesPalletInfo, note
  } = palletHandling;

  // On page load
  useEffect(() => {
    dispatch(changePalletCreatorTravel("NO_TRAVEL"));
    dispatch(initStaticPalletCreator({ company: myCompany, queryFrom }));
    return () => {
      dispatch(resetPalletCreator());
      dispatch(resetCustomersList());
    }
  }, []);

  // Shared creation function
  const runCreateReversal = async ({ validation }) => {
    await handleCreatePalletReversal({
      palletHandling,
      createReversal,
      dispatch,
      validation: validation ? palletHandling?.validation : null, // validazione non sviluppata in questo modulo
    });
  }

  // Button save config
  const btn_save = {
    text: "Registra storno",
    icon: <MdOutlineSend />,
    loading: isCreating,
    onClick: () => runCreateReversal({ validation: false })
  }

  return (
    <main className="h-full w-full">
      <ReversalCreatorLayout
        companyId={companyId}
        companiesPalletInfo={companiesPalletInfo}
        isCreating={isCreating}
        customerName={customerName}
        reversal={reversal}
        operationDate={operationDate}
        adminValidation={adminValidation}
        files={files}
        image={image}
        note={note}
        palletHandlingRef={palletHandlingRef}
        save={btn_save}
        isLoading={isCreating}
        changeReversal={(value) => dispatch(changePalletCreatorReversal(value))}
        onChangeReversalValue={payload => dispatch(changePalletCreatorReversalQuantity(payload))}
        onChangeReversalNote={payload => dispatch(changePalletCreatorReversalNote(payload))}
        listOptions={{operationDateRange, limit, nextToken }}
      />
    </main>
  )
};