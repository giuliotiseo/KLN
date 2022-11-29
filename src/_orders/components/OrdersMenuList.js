import { Link, useMatch } from "react-router-dom";
// Icons
import {
  MdNotificationsNone,
  MdOutbox,
  MdSendAndArchive,
  MdTrendingFlat,
  MdViewInAr,
} from "react-icons/md";

let ordersMenu = {
  "pending": {
    text: "Da ritirare", 
    icon: () => <MdNotificationsNone className="text-lg" />
  },
  "pickedup": {
    text: "Ritirati",
    icon: () => <MdOutbox className="text-lg" />
  },
  "stocked": {
    text: "In giacenza",
    icon: () => <MdSendAndArchive className="text-lg" />
  },
  "delivering": {
    text: "In consegna",
    icon: () => <MdTrendingFlat className="text-lg" />
  },
  "delivered": {
    text: "Consegnati",
    icon: () => <MdViewInAr className="text-lg" />
  },
  // "billed": {
  //   text: "Fatturati",
  //   icon: () => <MdSettingsEthernet className="text-lg" />
  // },
  // "archived": {
  //   text: "Archiviati",
  //   icon: () => <MdOutlineArchive className="text-lg" />
  // },
}

export default function OrdersMenuList({ queryStatus, queryFrom }) {
  let { url } = useMatch();

  // if(queryFrom !== "carrier") delete ordersMenu["billed"]

  return (
    <nav className="my-4">
      <ul className="mx-2">
        { Object.keys(ordersMenu).map(item => (
          <li key={item} className="block">
            <Link
              className={queryStatus === item ? `font-bold flex items-center opacity-100 px-2 py-1 my-1 rounded-full` : 'flex items-center px-2 py-1 my-1 rounded-full opacity-80 hover:opacity-100 hover:bg-light-200 dark:hover:bg-dark-200'}
              to={`${url}?from=${queryFrom}&status=${item}`}
            >
              <span className={`mr-1 ${queryStatus === item && 'text-secondary-200 dark:text-secondary-300'}`}>{ ordersMenu[item].icon && ordersMenu[item].icon()}</span>
              <span>{ordersMenu[item].text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}