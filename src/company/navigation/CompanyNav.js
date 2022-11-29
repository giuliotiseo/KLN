import TopNavigation from "../../globals/components/navigation/TopNavigation"
import { FiUser, FiBriefcase, FiSettings } from 'react-icons/fi';

const menuSetup = [
  {
    name: 'profile',
    text: 'Profilo',
    icon: <FiUser className="h-5 w-auto" />,
    navigation: { path: '/user/profile' },
  },
  {
    name: 'company',
    text: 'Azienda',
    icon: <FiBriefcase className="h-5 w-auto" />,
    navigation: { path: '/company' },
  },
  {
    name: 'settings',
    text: 'Impostazioni',
    icon: <FiSettings className="h-5 w-auto" />,
    navigation: { path: '/user/settings' },
  },
]

const CompanyNav = ({ title }) => <TopNavigation pageTitle={title} menu={menuSetup} />
export default CompanyNav;