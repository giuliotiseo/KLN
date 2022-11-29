import { useAuth } from "./useAuth";

export default function useCompanyType() {
  const { auth } = useAuth();
  return auth.attributes["custom:companyType"];
}