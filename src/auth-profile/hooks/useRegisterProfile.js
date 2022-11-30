import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCurrentCompany } from "../../company/slices/companySlice";
import { useAuth } from "../../globals/hooks/useAuth";
import { generateProfileId } from "../../globals/libs/generators";
import { useAddProfileToCompanyMutation } from "../api/auth-profile-api-slice";

export default function useRegisterProfile() {
  const company = useSelector(selectCurrentCompany);
  const { auth } = useAuth();
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const [ addProfileToCompany, { isLoading }] = useAddProfileToCompanyMutation();

  const handleRegisterProfile = async (profile) => {
    const profileId = await generateProfileId(profile.fiscalCode, company.vatNumber);
    try {
      const result = await addProfileToCompany({
        ...profile,
        id: profileId,
        tenant: auth.attributes.sub,
        companyId: company.id,
      });

      console.log("Result", result);
    } catch(err) {
      throw new Error("Error during registration", err);
    }
    goBack();
  }

  return [
    handleRegisterProfile,
    { loading: isLoading }
  ]
}
