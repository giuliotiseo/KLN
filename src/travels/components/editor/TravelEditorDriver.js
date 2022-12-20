import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetAuthProfilesQuery } from "../../../auth-profile/api/auth-profile-api-slice";
import useListContacts from "../../../contacts/hooks/useListContacts";
import EmployeeFinder from "../../../globals/components/dataEntry/EmployeeFinder";
import Select from "../../../globals/components/dataEntry_v2/Select";
import { TinyTitle } from "../../../globals/components/typography/titles";
import { changeTravelEditorDriver } from "../../slices/travelEditorSlice";
import { selectCurrentCompany } from "../../../company/slices/companySlice";
import { ROLES } from "../../../globals/libs/helpers";

// Sub-components ------------------------------------------------------------------------------------------------------------------------
function SearchDriverInput({
  driver,
  onChange,
}) {
  const [ dataOrigin, setDataOrigin ] = useState('PROFILES'); // CONTACTS | PROFILES
  const [ clear, setClear ] = useState(false);
  const [{
    items: driversContacts,
    isFetching: isLoadingDrivers,
    isFetching: isFetchingDrivers,
    refetch: refetch
  }, driversPaginations] = useListContacts("DRIVE");

  const { data: profiles, isLoading: isLoadingProfiles } = useGetAuthProfilesQuery();
  const driversProfiles = profiles.ids.map(profileId => profiles.entities[profileId]).filter(profile => profile.roleIds.includes(ROLES.DRIVE));
  const driverFinder = { CONTACTS: driversContacts, PROFILES: driversProfiles, }
  const drivers = driverFinder[dataOrigin];

  return (
    <>
      { clear && (
        <>
          <p className="text-sm my-2">Per condividere il viaggio su KLN App seleziona <span className="text-cyan-500">`Profili aziendali`</span></p>
          <Select
            id={'select-origin'}
            label={'Seleziona origine dati'}
            value={dataOrigin}
            selectClassName="input block w-full flex-1"
            className='flex-1 text-sm'
            callback={({ value }) => setDataOrigin(value)}
          >
            <option value="CONTACTS">Rubrica contatti</option>
            <option value="PROFILES">Profili aziendali</option>
          </Select>
        </>
      )}

      <EmployeeFinder
        label={null}
        dropdownLabel={"Autisti dipendenti"}
        className={"mt-2"}
        employees={drivers}
        employee={clear ? null : driver}
        pagination={driversPaginations}
        isLoading={isFetchingDrivers || isLoadingDrivers || isLoadingProfiles}
        refetch={refetch}
        clear={() => setClear(true)}
        changeEmployee={(value) => {
          setClear(false);
          onChange(value);
        }}
      />
    </>
  )
}

// Main component ------------------------------------------------------------------------------------------------------------------------
export default function TravelEditorDriver ({ driver }){
  const { owner: tenant } = useSelector(selectCurrentCompany);
  const dispatch = useDispatch();
  return (
    driver?.name
      ? <div>
          <header className="flex items-center justify-between pt-2 pb-4 border-b border-light-50 dark:border-dark-100">
            <TinyTitle>Autista incaricato</TinyTitle>
          </header>

          <SearchDriverInput
            driver={driver}
            onChange={(value) => dispatch(changeTravelEditorDriver({ ...value, tenant }))}
          />
        </div>
      : null
  )
} 