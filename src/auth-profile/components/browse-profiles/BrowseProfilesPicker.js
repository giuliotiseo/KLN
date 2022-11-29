import { useDispatch } from "react-redux";
// Components
import InputText from "../../../globals/components/dataEntry_v2/InputText";
import Scrollbar from "../../../globals/components/layout/Scrollbar";
import BrowseProfileItem from "./BrowseProfileItem";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
// Helpers
import { profileLogOut, setProfileCredentials } from "../../slices/authProfileSlice";

export default function BrowseProfilesPicker({
  profiles,
  company,
  searchValue,
  setSearchValue,
  selectedProfile,
}) {
  const dispatch = useDispatch();
  return (
    <div className="relative flex h-full justify-center items-center">
      <div className="absolute h-full w-full flex flex-wrap">
        <Scrollbar>
          <div className="flex flex-col">
            <p className="text-2xl lg:text-4xl text-center mt-[100px] mb-8 sticky">Seleziona il tuo profilo utente</p>
            <div className={`w-3/4 max-w-[350px] mx-auto relative transition-all ${selectedProfile ? 'opacity-0 pointer-events-none translate-y-[50px]' : 'opacity-100 pointer-events-auto translate-y-0'}`}>
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
                { profiles.map(profile => (
                  <BrowseProfileItem
                    key={profile.id}
                    profile={profile}
                    company={company}
                    isProfileSelected={selectedProfile ? true : false}
                    isActive={selectedProfile === profile.id}
                    callback={() => dispatch(setProfileCredentials({ id: profile.id, token: null, isPassword: profile?.psw ? true : false }))}
                    clear={() => dispatch(profileLogOut())}
                  />
                ))}
              </div>
            }
          </div>
        </Scrollbar>
      </div>

      {!selectedProfile && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2">
          <Link to="/manage" className="inline-block px-4 py-2 rounded-md btn-outline uppercase text-sm">
            Gestisci profili
          </Link>
        </div>
      )}
    </div>
  )
}