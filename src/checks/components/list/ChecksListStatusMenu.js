import { Link, useMatch } from "react-router-dom";
// Icons
import {
  MdNotificationsNone,
  MdOutbox,
  MdToll,
  MdTrendingFlat,
  MdViewInAr,
} from "react-icons/md";


let checksMenu = {
  "pending": {
    text: "Da ritirare", 
    icon: () => <MdNotificationsNone className="text-lg" />
  },
  "pickedup": {
    text: "Ritirati",
    icon: () => <MdOutbox className="text-lg" />
  },
  "recording": {
    text: "Registrazione",
    icon: () => <MdToll className="text-lg" />
  },
  "delivering": {
    text: "In consegna",
    icon: () => <MdTrendingFlat className="text-lg" />
  },
  "delivered": {
    text: "Consegnati",
    icon: () => <MdViewInAr className="text-lg" />
  },
}

export default function ChecksListStatusMenu({ queryStatus, queryFrom }) {
  let { url } = useMatch();

  return (
    <nav className="my-4">
      <ul className="mx-2">
        { Object.keys(checksMenu).map(item => (
          <li key={item} className="block">
            <Link
              className={queryStatus === item ? `font-bold flex items-center opacity-100 px-2 py-1 my-1 rounded-full` : 'flex items-center px-2 py-1 my-1 rounded-full opacity-80 hover:opacity-100 hover:bg-light-200 dark:hover:bg-dark-200'}
              to={`${url}?from=${queryFrom}&status=${item}`}
            >
              <span className={`mr-1 ${queryStatus === item && 'text-secondary-200 dark:text-secondary-300'}`}>{ checksMenu[item].icon && checksMenu[item].icon()}</span>
              <span>{checksMenu[item].text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}