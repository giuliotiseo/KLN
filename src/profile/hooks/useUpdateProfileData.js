import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { selectCurrentProfile } from "../../auth-profile/slices/authProfileSlice";
import { capitalizeFullName } from "../../globals/libs/helpers";
import { useUpdateProfileDataMutation } from "../api/profile-api-slice";

export default function useUpdateProfileData() {
  const profileId = useSelector(selectCurrentProfile);
  const [ updateProfileData, { isLoading }] = useUpdateProfileDataMutation();

  const handleUpdateProfile = async (profile) => {
    try {
      const result = await updateProfileData({ ...profile, id: profileId });
      console.log("Result", result);
      if(result?.data?.searchable) {
        toast.success(`${capitalizeFullName(result.data.searchable)} aggiornato con successo`);
      }
    } catch(err) {
      throw new Error("Error during registration", err);
    }
  }

  return [
    handleUpdateProfile,
    { isLoading }
  ]
}