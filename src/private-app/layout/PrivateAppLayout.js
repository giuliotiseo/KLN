import { useSelector } from "react-redux";
import { selectCurrentProfile } from "../../auth-profile/slices/authProfileSlice";
import { useAuth } from "../../globals/hooks/useAuth";
import MainContent from "../components/MainContent";
import MainSidebar from "../components/MainSidebar";

export default function PrivateAppLayout({ children }) {
  const { auth } = useAuth();
  const profileId = useSelector(selectCurrentProfile);
  return (
    <div className="flex">
      {/* Left navigation */}
      <MainSidebar companyType={auth.attributes["custom:companyType"]} />
      {/* Center */}
      <MainContent profileId={profileId}>
        { children }
      </MainContent>
    </div>
  )
}