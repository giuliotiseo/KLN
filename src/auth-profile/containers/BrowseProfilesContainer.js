import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import BrowseProfilesPicker from "../components/browse-profiles/BrowseProfilesPicker";
import { selectCurrentProfile } from "../slices/authProfileSlice";

export default function BrowseProfilesContainer({ company, profiles }) {
  const [ searchValue, setSearchValue ] = useState("");
  const [ visibleProfiles, setVisibileProfiles ] = useState(profiles);
  const selectedProfile = useSelector(selectCurrentProfile);

  const filterProfiles = useCallback((searchValue) => {
    if(profiles?.length > 0) {
      setVisibileProfiles(() => profiles.filter(profile => profile.searchable.includes(searchValue.toLowerCase())));
    }
  }, [profiles]);
  
  useEffect(() => {
    filterProfiles(searchValue);
  }, [searchValue, filterProfiles]);

  return (
    <section id="BrowseProfileContainer" className="h-full w-full">
      <BrowseProfilesPicker
        profiles={visibleProfiles}
        company={company}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        selectedProfile={selectedProfile}
      />
    </section>
  )
}