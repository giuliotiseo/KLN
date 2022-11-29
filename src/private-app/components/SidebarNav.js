// import { useSelector } from 'react-redux';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { selectCurrentRoles } from '../../auth-profile/slices/authProfileSlice';
import { useAuth } from '../../globals/hooks/useAuth';

const SidebarNav = ({ menu, companyType }) => {
  const { auth } = useAuth();
  const roleIds = useSelector(selectCurrentRoles);
  
  // Filtro il menu in base a companyType
  // Filtro il menu in base a role ids

  return (
    <nav className="bg-transparent mt-4">
      <ul className="p-0 m-0 list-none">
        { menu
          .filter(item => companyType !== "TRANSPORT" ? item.id !== "travels" : item)
          .map(({ id, text, path, icon }) => (
          <li key={id} className="text-right my-2">
            <NavLink 
              to={path}
              end={path === '/'}
              className={({ isActive }) => `flex font-bold items-center justify-end lg:text-sm text-xs py-2 opacity-50 hover:opacity-100
                ${ isActive 
                    ? 'text-primary-600 dark:text-primary-300 opacity-100'
                    : 'text-dark-100 dark:text-light-300'
                }
              `}
            >
              <span className="hidden md:inline-block mr-2 pl-1 font-bold">{ text }</span>
              <div className="inline-block">{ icon.regular }</div>
            </NavLink>
          </li>
        )) }
      </ul>
    </nav>
  )
}

export default SidebarNav;