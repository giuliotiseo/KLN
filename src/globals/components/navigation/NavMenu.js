import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { selectCompanyInfo } from '../../../company/slices/companyInfoSlice';

const NavMenu = ({ navItems }) => {
  const myCompany = useSelector(selectCompanyInfo);
  return (
    <nav className="bg-transparent mt-10">
      <ul className="p-0 m-0 list-none">
        { navItems
          .filter(item => myCompany.type !== "TRANSPORT" ? item.id !== "travels" : item)
          .map(({ id, text, path, icon }) => (
          <li key={id} className="text-right my-3 text-dark-300 dark:text-light-100">
            <NavLink 
              end
              to={path}
              className={({ isActive }) => isActive 
                ? "text-primary-600 dark:text-primary-300 opacity-100 flex font-bold items-center justify-end lg:text-sm text-xs py-2"
                : "opacity-50 hover:opacity-100 flex font-bold items-center justify-end lg:text-sm text-xs py-2" } 
            >
              <span className="hidden md:inline-block mr-2 pl-1">{ text }</span>
              <div className="inline-block">{ icon.regular }</div>
            </NavLink>
          </li>
        )) }
      </ul>
    </nav>
  )
}

export default NavMenu;