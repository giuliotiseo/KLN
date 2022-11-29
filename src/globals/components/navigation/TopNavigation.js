import { NavLink } from 'react-router-dom';
// Components
import ProfileMenu from './ProfileMenu';
import Dropdown from './Dropdown';

const TopNavigation = ({ title, menu }) => {
  return (
    <header id="topNavigation">
      <div className="flex flex-row max-w-full p-1 items-center rounded-md h-12">
        <h1 className="hidden md:block whitespace-nowrap ml-2 border-r border-light-300 dark:border-dark-100 flex-1 w-full text-dark-300 dark:text-light-100 font-bold text-base">{title}</h1>
        { menu?.length !== 0 && (
          <nav className="w-full md:w-auto">
            <ul className="flex items-center">
              {menu?.map(({ name, text, icon, submenu, navigation, styles }, key) => {
                return (
                  <li key={name} className="font-bold border-r border-light-300 dark:border-dark-100 text-sm inline-block">
                    { submenu 
                      ? <Dropdown 
                          id={name} 
                          title={text} 
                          icon={icon} 
                          items={submenu}
                          hover="hover:bg-primary-200 hover:text-light-100 transition-all"
                          className={styles}
                          index={key}
                      />
                      : <NavLink 
                        to={navigation.path || '#'}
                        className="flex items-center text-dark-100 dark:text-light-300 hover:text-opacity-100 dark:hover:text-opacity-100 transition-all text-opacity-50 dark:text-opacity-50"
                        activeClassName="text-opacity-100 dark:text-opacity-100" 
                      >
                        <span className="inline-block ml-2 mr-1 ">{icon}</span>
                        <span className="hidden md:inline-block p-1">{text}</span>
                      </NavLink>
                    }
                  </li>
              )})}
            </ul>
          </nav>
        )}

        <ProfileMenu />
      </div>
    </header>
  )
}

export default TopNavigation;