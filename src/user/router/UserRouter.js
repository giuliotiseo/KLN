import { Route, Routes } from 'react-router-dom';
import { useRole } from '../../globals/libs/hooks';
// Containers
import SettingsContainer from '../containers/SettingsContainer';
import AdminContainer from '../containers/AdminContainer';
import ProfileContainer from '../containers/ProfileContainer';

/* - Main component ---------------------------------------------------------------------------- */
export default function UserRouter() {
  const role = useRole();
  return (
    <Routes>
      <Route exact path={`/user`}>
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
      </Route>
    </Routes>
  );
}
