import { Route, Routes } from 'react-router-dom';
// Containers
import ProfileContainer from '../containers/ProfileContainer';
// import SettingsContainer from '../containers/SettingsContainer';
// import AdminContainer from '../containers/AdminContainer';

/* - Main component ---------------------------------------------------------------------------- */
export default function ProfileRouter() {
  return (
    <Routes>
      <Route index element={<ProfileContainer />} />
      {/* <Route exact path={`/user`}>
        <ProfileContainer />
      </Route>

      <Route exact path={`/user/profile`}>
        <ProfileContainer />
      </Route>

      { role === 'admin' && (
        <Route exact path={`/user/company`}>
          <AdminContainer />
        </Route>
      )}
      <Route exact path={`/user/settings`}>
        <SettingsContainer />
      </Route> */}
    </Routes>
  );
}
