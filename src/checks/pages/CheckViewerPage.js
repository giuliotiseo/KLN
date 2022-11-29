import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useCheckByIdQuery } from "../api/checks-api-slice";
import useDeleteCheck from "../hooks/useDeleteCheck";
// Components
import PageSpinner from "../../globals/components/layout/PageSpinner";
import CheckViewerLayout from "../layout/CheckViewerLayout";
// Icons
import { selectCurrentCompany } from "../../company/slices/companySlice";

// Main component -----------------------------------------------------------------------------------------------
export default function CheckViewerPage() {
  // Get id and run search
  const  { id: currentCompanyId } = useSelector(selectCurrentCompany);
  const [ searchParams ] = useSearchParams();
  const id = searchParams.get('id');
  const { data: check = {}, isFetching } = useCheckByIdQuery({ id });
  const [ deleteCheck, { isLoading: isDeleting }] = useDeleteCheck();
  const { order } = check;
  let queryFrom = null;


  // Delete callback function
  const handleDeleteCheck = useCallback(async (check) => {
    try {
      await deleteCheck(check);
    } catch(err) {
      console.error(err);
    }
  }, [id, check]); 

  if(order && (currentCompanyId === order?.senderId)) queryFrom = 'sender';
  if(order && (currentCompanyId === order?.carrierId)) queryFrom = 'carrier';
  if(order && (currentCompanyId === order?.receiverId)) queryFrom = 'receiver';
  
  // Await data
  if(!id || !check || !queryFrom || isFetching ) return <PageSpinner message="Caricamento dati assegno" />

  // Button save config
  const buttons = {
    delete: [{
      text: "Conferma",
      loading: isDeleting,
      onClick: () => handleDeleteCheck(check)
    }],
    edit: {
      text: "Modifica assegno",
      to: `/checks/edit?from=${queryFrom}&id=${check.id}`,
    }
  } 

  // Good to go
  return (
    <CheckViewerLayout
      check={check}
      queryFrom={queryFrom}
      buttons={buttons}
    />
  )
}
