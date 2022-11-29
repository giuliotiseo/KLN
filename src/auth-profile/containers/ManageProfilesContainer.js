import { useCallback, useEffect, useState } from "react";
import ManageCompanyProfilesRouter from "../router/ManageCompanyProfilesRouter";

export default function ManageProfilesContainer({
  profiles,
  company
}) {
  const [ searchValue, setSearchValue ] = useState("");
  const [ visibleProfiles, setVisibileProfiles ] = useState(profiles);

  const filterProfiles = useCallback((searchValue) => {
    if(profiles?.length > 0) {
      console.log("Profiles", profiles);
      setVisibileProfiles(() => profiles.filter(profile => profile.searchable.includes(searchValue.toLowerCase())));
    }
  }, [profiles]);
  
  useEffect(() => {
    filterProfiles(searchValue);
  }, [searchValue, filterProfiles]);


  return (
    <section id="ManageProfilesContainer" className="h-full w-full">
      <ManageCompanyProfilesRouter
        company={company}
        visibleProfiles={visibleProfiles}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
    </section>
  )
}