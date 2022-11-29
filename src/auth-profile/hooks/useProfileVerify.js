import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { selectCurrentCompany } from "../../company/slices/companySlice";
import { useLoginProfileMutation } from "../api/auth-profile-api-slice";

export default function useProfileVerify({
  callback,
  availableRoles,
  inputProfileId = ""
}) {
  const [ password, setPassword ] = useState("");
  const [ profileId, setProfileId ] = useState(inputProfileId);
  const [ login, { isLoading }] = useLoginProfileMutation();
  const { id: companyId } = useSelector(selectCurrentCompany);

  const handleVerifyAccess = async () => {
    if(!profileId || !companyId || !password) {
      toast.error("Inserisci i dati richiesti");
      return false;
    }

    try {
      const result = await login({
        profileId,
        companyId,
        psw: password,
      }).unwrap();

      if(availableRoles?.length > 0) {
        if(result?.roleIds?.filter(role => availableRoles.includes(role))?.length <= 0) {
          throw new Error("Error 401: Unauthorized - You can't access to this action because of your role", availableRoles);
        }
      }

      try {
        callback();
      } catch(err) {
        console.error("Error inside callback operation", err);
        return false;   
      }
    } catch(err) {
      console.error("Error", err);
      if(!err?.originalStatus) {
        toast.error("Nessuna risposta dal server");
        console.log("No server response");
        return false;
      } else if(err?.response?.status === 400) {
        toast.error("Seleziona il profilo e scegli una password");
        console.log("Missing username or password");
        return false;
      } else if(err.response?.status === 401) {
        toast.error("Non disponi dell'autorizzazione per compiere questa azione");
        console.log("Unauthorized");
        return false;
      } else {
        toast.error("Autenticazione fallita");
        console.log("Login failed");
        return false;
      }
    }
  }

  return [
  handleVerifyAccess,
  {
    loading: isLoading,
    profileId, setProfileId,
    password, setPassword
  }]
}