import Avatar from "../../globals/components/layout/Avatar";
import Spinner from "../../globals/components/layout/Spinner"
import ReactTooltip from "react-tooltip";
import { companyTypeDescriptor, ROLES_DESCRIPTORS } from "../../globals/libs/helpers";
import { FiEdit, FiKey } from "react-icons/fi"

//  Sub components: Sections --------------------------------------------------------------------------------
const ProfileCardHeader = ({ profile, setModal }) => {
  if(!profile?.searchable) return <Spinner />

  return (
    <header className="relative block py-2">
      <div className="flex items-start ">
        <div className="flex flex-1">
          <Avatar
            name={profile.searchable}
            size={80}
            stepColor={100}
            src={profile?.avatar}
          />

          <div className="mb-2 px-4">
            <h1 className="title-2 uppercase">{ profile.searchable }</h1>
            <p className="text-base md:text-lg">
              {profile.company.name} - {companyTypeDescriptor(profile.company.type)}
            </p>

            <ul>
              { profile.roleIds.map(roleId => (
                <li key={roleId} className="chip-neutral inline-block mr-2 ml-0">{ROLES_DESCRIPTORS[roleId]}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div>
          <button
            className="block cursor-pointer p-3 my-2 text-center top-4 right-4 rounded-full bg-light-300 hover:bg-light-100 dark:bg-dark-300 dark:hover:bg-dark-200" 
            onClick={() => setModal('EDIT_INFO')}
            data-tip="Modifica contatto"
          >
            <FiEdit className="w-5 h-auto" />
          </button>

          <button
            className="block cursor-pointer p-3 my-2 text-center top-4 right-4 rounded-full bg-light-300 hover:bg-light-100 dark:bg-dark-300 dark:hover:bg-dark-200" 
            onClick={() => setModal('EDIT_PASS')}
            data-tip="Cambia la password"
          >
            <FiKey className="w-5 h-auto" />
          </button>
        </div>
      </div>

      <ReactTooltip />
    </header>
  )
}

export default ProfileCardHeader;