import { Route, Routes } from "react-router-dom";
import ManageProfilesPicker from "../components/manage-profiles/ManageProfilesPicker";
import AddProfileContainer from "../containers/AddProfileContainer";
import EditProfileRolesContainer from "../containers/EditProfileRolesContainer";

const ManageCompanyProfilesRouter = ({
  company,
  visibleProfiles,
  searchValue,
  setSearchValue,
}) => {
  return (
    <Routes>
      <Route index element={<ManageProfilesPicker
          profiles={visibleProfiles}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          company={company}
        /> }
      />

      <Route path='add-profile' element={<AddProfileContainer />} />
      <Route path=':profileId' element={<EditProfileRolesContainer />} />
    </Routes>
  )
}

export default ManageCompanyProfilesRouter;