import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { selectCurrentCompany } from "../../company/slices/companySlice";
import { generateProfileId } from "../../globals/libs/generators";
import { capitalizeFullName } from "../../globals/libs/helpers";
import { useUpdateProfileInCompanyMutation } from "../api/auth-profile-api-slice";

export default function useUpdateProfile() {
  const company = useSelector(selectCurrentCompany);
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const [ updateProfileInCompany, { isLoading }] = useUpdateProfileInCompanyMutation();

  const handleUpdateProfile = async (profile) => {
    try {
      const profileId = await generateProfileId(profile.fiscalCode, company.vatNumber);
      const result = await updateProfileInCompany({
        ...profile,
        id: profileId,
        companyId: company.id
      });

      console.log("Result", result);
      if(result?.data?.searchable) {
        toast.success(`${capitalizeFullName(result.data.searchable)} aggiornato con successo`);
      }
      goBack();
    } catch(err) {
      throw new Error("Error during registration", err);
    }
    goBack();
  }

  return [
    handleUpdateProfile,
    { loading: isLoading }
  ]
}