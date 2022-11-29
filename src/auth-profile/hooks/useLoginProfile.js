import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoginProfileMutation } from "../api/auth-profile-api-slice";
import { setProfileCredentials } from "../slices/authProfileSlice";

export default function useLoginProfile(inputProfileId, inputCompanyId) {
  const [ profileId, setProfileId ] = useState(inputProfileId);
  const [ companyId, setCompanyId ] = useState(inputCompanyId);
  const [ loadingMessage, setLoadingMessage ] = useState("Accesso in corso");
  const [ password, setPassword ] = useState("");
  const [ login, { isLoading }] = useLoginProfileMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginProfile = async (password) => {
    try {
      const result = await login({
        profileId,
        companyId,
        psw: password,
      }).unwrap();

      console.log("Login result: ", result);

      dispatch(setProfileCredentials({
        ...result,
        token: result.accessToken,
        id: profileId,
        companyId,
      }));

      setProfileId("");
      setCompanyId("");
      setPassword("");
      setLoadingMessage("");
      navigate("/");
    } catch(err) {
      console.error("Error", err);
      if(!err?.originalStatus) {
        console.log("No server response");
        toast.error("Nessuna risposta dal server");
      } else if(err?.response?.status === 400) {
        console.log("Missing username or password");
        toast.error("Username e password mancanti");
      } else if(err.response?.status === 401) {
        console.log("Unauthorized");
        toast.error("Autorizzazione negata");
      } else {
        console.log("Login failed");
        toast.error("Login fallito");
      }
    }
  }

  return [{
    password,
    setPassword,
    loadingMessage,
    setLoadingMessage,
    setProfileId,
    loading: isLoading,
  }, handleLoginProfile]
}
