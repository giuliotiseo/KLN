import { Route, Routes } from "react-router-dom";
import DashboardContainer from "../../dashboard/containers/DashboardContainer";
// Company containers
import BrowseProfilesContainer from "../../auth-profile/containers/BrowseProfilesContainer";
import ManageProfilesContainer from "../../auth-profile/containers/ManageProfilesContainer";
import ManageProfilesLayout from "../../auth-profile/layout/ManageProfilesLayout";
// Require components
import RequireProfile from "../components/RequireProfile";
import RequireRoles from "../components/RequireRoles";
import Unauthorized from "../components/Unauthorized";
import PersistProfileLogin from "../../auth-profile/components/PersistProfileLogin";
import PageSpinner from "../../globals/components/layout/PageSpinner";
import SettingsContainer from "../../profile/containers/SettingsContainer";
// Branches
import ProfileRouter from "../../profile/router/ProfileRouter";
import CustomersRouter from "../../customers/router/CustomersRouter";
import ContactsRouter from "../../contacts/router/ContactsRouter";
import WarehousesRouter from "../../warehouses/router/WarehousesRouter";
import VehiclesRouter from "../../vehicles/router/VehiclesRouter";
import PreOrdersRouter from "../../pre-orders/router/PreOrdersRouter";
import OrdersRouter from "../../orders/router/OrdersRouter";
import ChecksRouter from "../../checks/router/ChecksRouter";
import TravelsRouter from "../../travels/router/TravelsRouter";
// Helpers
import { ROLES } from "../../globals/libs/helpers";
import RequireCompanyType from "../components/RequireCompanyType";
import PalletsRouter from "../../pallets/router/PalletsRouter";

const PrivateAppRouter = ({
  company,
  profiles
}) => {
  if(!company) return <PageSpinner />
  return (
    <Routes>
      {/* Need to choose profile */}
      <Route element={<ManageProfilesLayout heading={company?.name} />}>
        <Route path='browse' element={<BrowseProfilesContainer company={company} profiles={profiles} />} />
        <Route path='manage/*' element={<ManageProfilesContainer company={company} profiles={profiles} />} />
        <Route path='unauthorized' element={<Unauthorized />} />
      </Route>

      {/* Profile already choosen */}
      <Route element={<PersistProfileLogin company={company} />}>
        <Route element={<RequireProfile />}>
          <Route index element={<DashboardContainer />} />
          <Route path="dashboard" element={<DashboardContainer />} />
          <Route element={<RequireRoles allowedRoles={[ ROLES.ADMIN, ROLES.ACCOUNTING, ROLES.LOGISTICS ]} />}>
            <Route path="profile/*" element={<ProfileRouter />} />
            <Route path="settings" element={<SettingsContainer />} />
            <Route path="customers/*" element={<CustomersRouter />} />
            <Route path="contacts/*" element={<ContactsRouter />} />
            <Route path="warehouses/*" element={<WarehousesRouter />} />
            <Route path="vehicles/*" element={<VehiclesRouter />} />
            <Route path="pre-orders/*" element={<PreOrdersRouter />} />
            <Route path="orders/*" element={<OrdersRouter />} />
            <Route path="checks/*" element={<ChecksRouter />} />
            <Route path="pallets/*" element={<PalletsRouter />} />
          </Route>
          
          <Route element={<RequireCompanyType allowedRoles={["TRANSPORT"]} />}>
            <Route element={<RequireRoles allowedRoles={[ ROLES.ADMIN, ROLES.LOGISTICS ]} />}>
              <Route path="travels/*" element={<TravelsRouter />} />
            </Route>
          </Route>

        </Route>
      </Route>
    </Routes>
  )
}

export default PrivateAppRouter;