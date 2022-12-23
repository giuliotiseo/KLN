import { useAuth } from "../../globals/hooks/useAuth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import PalletEditorLayout from "../layout/PalletEditorLayout";
import FullSpinner from "../../globals/components/spinners/FullSpinner";
import { usePalletByIdForCustomerQuery, useUpdatePalletHandlingMutation } from "../api/pallets-api-slice";
import { changePalletEditorForm, resetPalletEditor, selectPalletEditor } from "../slices/palletEditorSlice";
import { FiCheck } from "react-icons/fi";
import { handleUpdatePallet } from "../api/pallets-preprocessors";
import { toast } from "react-toastify";
import { selectCurrentCompany } from "../../company/slices/companySlice";

export default function PalletEditorContainer({
  id,
  companyId,
  queryFrom,
  companyType,
  isEdited
}) {
  const currentCompany = useSelector(selectCurrentCompany);
  const [ modal, setModal ] = useState(false);
  const [ drawer, setDrawer ] = useState(false);
  const { data: fetchedPalletHandling = {}, isFetching } = usePalletByIdForCustomerQuery({ id });
  const palletEditor = useSelector(selectPalletEditor);
  const [ updatePalletHandling, { data, isLoading: isUpdating, isSuccess, isError }] = useUpdatePalletHandlingMutation();
  const { auth: cognitoUser, profile } = useAuth();
  const { search: searchFromUrl } = useLocation();

  // Action
  const dispatch = useDispatch();
  const renderPalletHandling = { ...fetchedPalletHandling, ...palletEditor };

  // Reset when user leave the page
  useEffect(() => {
    return () => dispatch(resetPalletEditor());
  }, []);

  // Toast trigger
  useEffect(() => {
    if(isSuccess) {
      console.log("Aggiornamento operazione effettuato con successo", data);
      toast.success(`L'operazione ${data.stamp} è stata aggiornata con successo`);
    }
  }, [isSuccess]);

  useEffect(() => {
    if(isError) {
      console.error("Errore durante l'aggiornamento", data);
      toast.error(`Abbiamo riscontrato un errore durante l'aggiornamento di questa operazione. Controlla che tutti i campi siano corretti`);
    }
  }, [isError]);

  // Shared update function
  const runUpdatePalletHandling = ({ skipValidation }) => {
    // Execute the update
    handleUpdatePallet({
      palletEditor,
      domain: currentCompany,
      fetchedPalletHandling,
      skipValidation,
      cognitoUser,
      profile,
      queryFrom,
      updatePalletHandling,
      dispatch,
      setModal
    })
  }

  // Button save config
  const btn_save = {
    text: "Salva modifiche",
    icon: <FiCheck />,
    loading: isUpdating,
    onClick: () => runUpdatePalletHandling({ skipValidation : false }),
  }

  // Await data
  if(!id || !renderPalletHandling?.id || isFetching) return <FullSpinner />

  return (
    <div id="pallet-editor-container" className="h-full w-full">
      <PalletEditorLayout
        companyId={companyId}
        queryFrom={queryFrom}
        companyType={companyType}
        palletHandling={renderPalletHandling}
        save={isEdited ? btn_save : null}
        changeEditorData={(payload) => dispatch(changePalletEditorForm(payload))}
        searchFromUrl={searchFromUrl}
        drawerState={[ drawer, setDrawer ]}
      />
    </div>
  )
}