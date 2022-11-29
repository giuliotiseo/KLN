import { FiBriefcase, FiSettings, FiUser } from "react-icons/fi"
import { NavLink } from "react-router-dom"
import Dropdown from "../../globals/components/navigation/Dropdown"

// Menu settings ------------------------------------------------------------------------------------------------------------------------------------------------
export const menu = [
  {
    name: 'company',
    text: 'Azienda',
    icon: <FiBriefcase className="h-5 w-auto" />,
    // navigation: { path: '/company' },
    navigation: { path: '/unauthorized' },
  },
  {
    name: 'profile',
    text: 'Profilo',
    icon: <FiUser className="h-5 w-auto" />,
    navigation: { path: '/profile' },
  },
  {
    name: 'settings',
    text: 'Impostazioni',
    icon: <FiSettings className="h-5 w-auto" />,
    navigation: { path: '/settings' },
  },
]


// Main component ------------------------------------------------------------------------------------------------------------------------------------------------
export default function HeaderNav() {
  return (
    <nav>
      <ul className="flex items-center">
        { menu.map(({ name, text, icon, submenu, navigation, className }, key) => {
          return (
            <li key={name} className="font-bold text-sm inline-block">
              { submenu 
                ? <Dropdown
                    id={name} 
                    title={text} 
                    icon={icon} 
                    items={submenu}
                    hover="hover:bg-primary-200 hover:text-light-300 transition-all"
                    className={className}
                    index={key}
                /> // vecchio dropdown, non funziona
                : <NavLink
                    to={navigation.path}
                    // className={({ isActive }) =>
                    //   isActive 
                    //     ? 'text-opacity-100 dark:text-opacity-100'
                    //     : 'text-dark-300 dark:text-light-100 hover:text-opacity-100 dark:hover:text-opacity-100 '
                    // }
                    className={({ isActive }) => `flex font-bold items-center justify-end lg:text-sm text-xs py-2
                      ${ isActive 
                        ? 'text-opacity-100 dark:text-opacity-100'
                        : 'text-dark-300 dark:text-light-100 text-opacity-50 hover:text-opacity-100 dark:hover:text-opacity-100 '
                      }
                    `}
                  >
                    { icon && <span className="inline-block ml-2 mr-1 ">{icon}</span> }
                    <span className="hidden md:inline-block p-1 font-bold ">{text}</span>
                  </NavLink>
              }
            </li>
        )})}
      </ul>
    </nav>
  )
}