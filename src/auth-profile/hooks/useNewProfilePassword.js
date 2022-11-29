import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUpdateNewPasswordMutation } from "../api/auth-profile-api-slice";
import { setProfileCredentials } from "../slices/authProfileSlice";

export default function useNewProfilePassword(profileId) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [update, { isLoading }] = useUpdateNewPasswordMutation();

  const handleUpdatePassword = async (password) => {
    try {
      const result = await update({ profileId, psw: password });
      console.log("Result new profile password", result);
      toast.success(`Password profilo aggiornata con successo`);
      navigate("/");
    } catch (err) {
      dispatch(setProfileCredentials({
        id: null,
        token: null,
        isPassword: false,
        roleIds: []
      }));

      if(!err?.response) {
        console.error('No server response')
        toast.error(`Errore ${err.response?.status}: nessuna risposta dal server`);
      } else if(err.response?.status === 400) {
        console.log('Missing Username or Password')
        toast.error(`Errore ${err.response?.status}: profileId o password mancanti`);
      } else if(err.response?.status === 401) {
        console.log('Unauthorized')
        toast.error(`Errore ${err.response?.status}: autorizzazione negata`);
      } else {
        console.log('Update failed')
        toast.error(`Errore ${err.response?.status}: aggiornamento fallito`);
      }
    }
  }

  return [{ isLoading }, handleUpdatePassword];
}