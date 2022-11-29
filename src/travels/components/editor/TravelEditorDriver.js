import { useState } from "react";
import { TinyTitle } from "../../../globals/components/typography/titles";
import useListContacts from "../../../contacts/hooks/useListContacts";
import EmployeeFinder from "../../../globals/components/dataEntry/EmployeeFinder";
import InlineSpinner from "../../../globals/components/spinners/InlineSpinner";
import { useDispatch, useSelector } from "react-redux";
import { changeTravelEditorDriver } from "../../slices/travelEditorSlice";
import { selectCurrentCompany } from "../../../company/slices/companySlice";

// Sub-components ------------------------------------------------------------------------------------------------------------------------
function SearchDriverInput({
  driver,
  onChange,
}) {
  const [clear, setClear ] = useState(false);
  const [{
    items: myDrivers,
    isFetching: isLoadingDrivers,
    isFetching: isFetchingDrivers,
    refetch: refetch
  }, driversPaginations] = useListContacts("DRIVE");

  return (
    <EmployeeFinder
      label={null}
      dropdownLabel={"Autisti dipendenti"}
      className={"mt-2"}
      employees={myDrivers}
      employee={clear ? null : driver}
      pagination={driversPaginations}
      isLoading={isFetchingDrivers || isLoadingDrivers}
      refetch={refetch}
      clear={() => setClear(true)}
      changeEmployee={(value) => {
        setClear(false);
        onChange(value);
      }}
    />

    // <EmployeeFinder
    //   label={null}
    //   dropdownLabel={"Autisti dipendenti"}
    //   className={"mt-2"}
    //   employees={myDrivers}
    //   employee={clear ? null : driver}
    //   clear={() => setClear(true)}
    //   changeEmployee={(value) => {
    //     onChange(value);
    //     setClear(false);
    //   }}
    // />
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