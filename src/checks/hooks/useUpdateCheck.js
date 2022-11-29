import { useState } from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useUpdateCheckMutation } from "../api/checks-api-slice";
import { resetCheckCreatorContent } from "../slices/checkCreatorSlice";

export function useUpdateCheck() {
  const [ updateCheck, { isLoading }] = useUpdateCheckMutation();
  const [ internalLoading, setInternalLoading ] = useState(false);
  const dispatch = useDispatch();
  const handleUpdateCheck = useCallback(async (check) => {
    setInternalLoading(true);
    try {
      const result = await updateCheck(check);
      if(result) {
        toast.success(`Assegno ${check.stamp.split('-')[1]} aggiornato correttamente`)
        dispatch(resetCheckCreatorContent());
      }

      setInternalLoading(false);
    } catch (err) {
      console.error("Errore:", err);
      toast.error("Errore durante la creazione dell'assegno");
      setInternalLoading(false);
    }
  }, []);

  return [
    handleUpdateCheck,
    {
      isLoading: isLoading || internalLoading,
    }
  ]

}