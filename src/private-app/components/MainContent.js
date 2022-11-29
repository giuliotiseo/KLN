import { useSelector } from "react-redux";
import { selectProfileById } from "../../auth-profile/api/auth-profile-api-slice";
import { selectCurrentCompany } from "../../company/slices/companySlice";
import HeaderNav from "./HeaderNav";

export default function MainContent({
  profileId,
  children
}) {
  const currentProfile = useSelector(state => selectProfileById(state, profileId))
  const currentCompany = useSelector(selectCurrentCompany);
  return (
    <div className="relative bg-radial-gradient from-light-100 dark:from-dark-300 to-light-300 dark:to-dark-200 min-h-screen flex flex-col flex-1 w-full">
      <header className="mx-4 h-fit py-1 flex items-center">
        <h2 className="title-4 flex-1 uppercase">
          <span className="text-gray-500 dark:text-gray-400">{currentCompany.name} / </span>{ currentProfile.searchable } 
        </h2>
        <HeaderNav />
      </header>

      { children }
    </div>
  )
}