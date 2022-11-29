import Avatar from "react-avatar";
import Scrollbar from "../../../globals/components/layout/Scrollbar"

const ProfilesDialogPicker = ({
  profiles,
  callback
}) => {
  return (
    <Scrollbar>
      <div className="my-6 max-h-[200px]">
          <ul className="w-full">
            { profiles.map(profile => (
              <li key={profile.id}>
                <button onClick={() => callback(profile)} className="block p-2 border-b border-light-300 dark:border-dark-100 w-full text-left hover:bg-light-200 dark:hover:bg-dark-200">
                  <div className="flex items-center text-base">
                    <Avatar name={profile.searchable} size="40" round={true} color="#0277BD" />
                    <div className="inline-block ml-2">
                      {profile.name} {profile.surname}
                      <span className="block text-sm">{profile.email}</span>
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
      </div>
    </Scrollbar>
  )
}

export default ProfilesDialogPicker;