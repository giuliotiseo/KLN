import { Link } from 'react-router-dom';
// Components
import Dropdown from "./Dropdown";
// Assets
import { UserIcon } from "../../assets/icons";
// Helpers
import { useRole } from '../../libs/hooks';
import Avatar from '../../../user/components/Avatar';
import { useSelector } from 'react-redux';
import { selectProfile } from '../../../user/state/userSlice';

const ProfileMenu = () => {
  const profile = useSelector(selectProfile);
  const role = useRole();
  const menu = role === 'admin' 
    ? [{
        name: 'profileMenu',
        text: '',
        icon: <Avatar size="w-10 h-10" />,
        // icon: <UserIcon className="fill-current w-10 h-auto block bg-primary-200 p-2 rounded-full mr-3 text-light-100" />,
        navigation: null,
        submenu: {
          "profile": {
            text: profile.name,
            path: '/user/profile'
          },
          "company": {
            text: 'Dati aziendali',
            path: '/user/company'
          },
          "settings": {
            text: 'Impostazioni',
            path: '/user/settings'
          }
        },
        styles: 'right-0 bg-base-100 capitalize font-bold'
      }]
    : [{
      name: 'profileMenu',
      text: '',
      icon:<UserIcon className="fill-current w-10 h-auto block bg-primary-200 p-2 rounded-full mr-3 text-light-100" />,
      navigation: null,
      submenu: {
        "profile": {
          text: 'Profilo utente',
          path: '/user/profile'
        },
        "settings": {
          text: 'Impostazioni',
          path: '/user/settings'
        }
      },
      styles: 'right-0 bg-base-100 capitalize font-bold',
    }
  ];

  return (
    <ul>
      { menu.map(({ name, text, icon, submenu, navigation, styles }, key) => {
        return (
          <li key={name} className="text-sm inline-block uppercase text-dark-200 dark:text-light-100">
            { submenu 
              ? <Dropdown 
                  id={name} 
                  title={text} 
                  icon={icon} 
                  items={submenu}
                  className={styles}
                  hover="hover:bg-primary-200 hover:text-light-100 transition-all"
                  index={key}
              />
              : <Link to={navigation.path || '#'} className="flex items-center">
                  <span className="inline-block ml-2 mr-1 ">{icon}</span>
                  <span className="inline-block  p-2">{text}</span>
                </Link>
            }
          </li>
        )
      })}
    </ul>
  )
}

export default ProfileMenu;