import { useState } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { selectCurrentCompany } from "../../company/slices/companySlice";
import { useAuth } from "../../globals/hooks/useAuth";
import { generateUid } from "../../globals/libs/helpers";
import { digestMessage } from "../../globals/libs/sha256";
import { saveCheckFileToS3 } from "../api/check-thunks";
import { useCreateCheckMutation } from "../api/checks-api-slice";
import { resetCheckCreatorContent } from "../slices/checkCreatorSlice";

export function useCreateCheck() {
  const { auth } = useAuth();
  const { id } = useSelector(selectCurrentCompany);
  const [ createCheck, { isLoading }] = useCreateCheckMutation();
  const [ internalLoading, setInternalLoading ] = useState(false);
  const dispatch = useDispatch();

  const handleCreateCheck = useCallback(async (check) => {
    setInternalLoading(true);
    const uuid = generateUid(16);
    const stamp = `CHK-${uuid}`;
    const timestamp = Date.now();
    const checkId_raw = `${uuid}-${check.order.id}-${timestamp}`;
    const checkId = await digestMessage(checkId_raw);
    
    try {
      const result = await createCheck({
        check: {...check, stamp },
        checkId,
        companyType: id === check.order?.carrierId ? "carrier" : "receiver",
        owner: `${auth.attributes.sub}`,
      });

      if (result) {
        // Carica i files all'interno dello Store S3
        await dispatch(saveCheckFileToS3([ ...check.files, check.image ]));
      }
      
      setInternalLoading(false);
      dispatch(resetCheckCreatorContent());
    } catch (err) {
      console.error("Errore:", err);
      toast.error("Errore durante la creazione dell'assegno");
      setInternalLoading(false);
    }
  }, []);

  return [
    handleCreateCheck,
    {
      isLoading: isLoading || internalLoading,
    }
  ]

}