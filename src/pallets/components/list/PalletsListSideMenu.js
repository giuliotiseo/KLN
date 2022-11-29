import { NavLink } from "react-router-dom";
// Icons
import { MdSearch } from "react-icons/md";
import { SmallParagraph } from "../../../globals/components/typography/paragraphs";

let palletsMenu = {
  carrierId: {
    "latest": {
      text: "Ultime movimentazioni", 
    },
    "report": {
      text: "Rapporto clienti", 
    },
    "search?from=carrier": {
      text: "Ricerca cliente", 
    },
    "type": {
      text: "Tipo movimentazione", 
    },
    "travel?from=carrier": {
      text: "Rapporto viaggi", 
    },
  },
  customerId: {
    "latest": {
      text: "Ultime movimentazioni", 
    },
    "report": {
      text: "Rapporto clienti", 
    },
    "search?from=customer": {
      text: "Rapporti vettori", 
    },
    "type": {
      text: "Tipo movimentazione", 
    },
  }
}

export default function PalletsListSideMenu({ companyKeyToQuery }) {
  const menu = palletsMenu[companyKeyToQuery];
  return (
    <nav className="my-4">
      <SmallParagraph styles="flex w-full items-center font-bold">
        <MdSearch className="mr-1 text-lg" />
        <span>Visualizza</span>
      </SmallParagraph>
      <ul className="mx-2">
        { Object.keys(menu).map(item => (
          <li key={item} className="block">
            <NavLink
              to={`/pallets/${item}`}
              className={({ isActive }) =>
                isActive 
                ? 'font-bold flex items-center opacity-100 px-2 py-1 my-1 rounded-full text-secondary-200 dark:text-secondary-300' 
                : 'flex items-center px-2 py-1 my-1 rounded-full opacity-80 hover:opacity-100 hover:bg-light-200 dark:hover:bg-dark-200'
              }
            >
              <span>{menu[item].text}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}