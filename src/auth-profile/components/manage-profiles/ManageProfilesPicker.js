import { Link } from "react-router-dom"
import Scrollbar from "../../../globals/components/layout/Scrollbar"
import ManageProfileItem from "./ManageProfileItem"
import AddProfileItem from "./AddProfileItem";
import InputText from "../../../globals/components/dataEntry_v2/InputText";
import { FiSearch } from "react-icons/fi";
import { ROLES } from "../../../globals/libs/helpers";

export default function ManageProfilesPicker({
  profiles,
  searchValue,
  setSearchValue,
  company
}) {
  const adminsLength = profiles.filter(profile => profile.roleIds.includes(ROLES.ADMIN))?.length;
  const isDeleteAvailable = (profile) => profile.roleIds.includes(ROLES.ADMIN) 
    ? adminsLength > 1 
      ? true  
      : false
    : true;

  return (
    <div className="relative flex h-full justify-center items-center">
      <div className="absolute h-full w-full flex flex-wrap">
        <Scrollbar>
          <div className="flex flex-col">
            <p className="text-4xl text-center mt-[100px] mb-8 sticky">Gestione profili</p>
            <div className="w-3/4 max-w-[350px] mx-auto relative transition-all">
              <InputText
                value={searchValue}
                className="w-full"
                contentClassName="w-full border-b"
                inputClassName="text-left pr-6 border-none border-b"
                placeholder="Cerca il nome del profilo"
                callback={({ value }) => setSearchValue(value)}
              />
              <FiSearch className="absolute right-2 top-1/2 -translate-y-1/2" />
            </div>

            { profiles?.length <= 0
              ? <p className="empty-response mt-4">Nessun profilo trovato</p>
              : <div className="flex flex-wrap justify-center items-start mt-16">
                {!searchValue && (
                  <AddProfileItem />
                )}

                { profiles.map((profile, index) => (
                  <ManageProfileItem
                    key={profile.id}
                    index={index}
                    companyId={company.id}
                    profiles={profiles}
                    profile={profile}
                    isDeleteAvailable={isDeleteAvailable(profile)}
                  />
                ))}
              </div>
            }
          </div>
        </Scrollbar>
      </div>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2">
        <Link to="/browse" className="inline-block px-4 py-2 rounded-md btn-outline uppercase text-sm">
          Torna indietro
        </Link>
      </div>
    </div>
  )
}