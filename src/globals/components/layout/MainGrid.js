// Components
import LeftNavigation from '../navigation/LeftNavigation';
import MainPage from './MainPage';
import ContactAvatar from '../../../contacts/components/ContactAvatar';
// Helpers
import { roleFinder } from '../../libs/helpers';
// Icons
import { FiUser, FiBriefcase, FiSettings } from 'react-icons/fi';

function MainGrid({ company, profile, children }) {
  const { logo } = company;
  const title = `${profile.name} - ${profile.role?.company?.name} (${roleFinder(profile?.role?.task)})`;

  if(!title) return null;

  const menu = [
    {
      name: 'profile',
      text: 'Profilo',
      icon: profile.avatar ? <ContactAvatar avatar={profile.avatar} size="w-8 h-8" styles="mr-0" type="USER" /> : <FiUser className="h-5 w-auto" />,
      navigation: { path: '/user/profile' },
    },
    {
      name: 'company',
      text: 'Azienda',
      icon: logo ? <ContactAvatar avatar={logo} size="w-8 h-8" styles="mr-0" type="COMPANY" /> : <FiBriefcase className="h-5 w-auto" />,
      navigation: { path: '/company' },
    },
    {
      name: 'settings',
      text: 'Impostazioni',
      icon: <FiSettings className="h-5 w-auto" />,
      navigation: { path: '/user/settings' },
    },
  ]

  return (
    <div id="mainGrid" className="flex">
      <LeftNavigation />
      <MainPage header={{ title, menu }}>
        { children }
      </MainPage>
    </div>
  )
}

export default MainGrid;