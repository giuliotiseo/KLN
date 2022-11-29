import ActionButtonLink from "../../../globals/components/buttons/ActionButtonLink";
import SafeCol from "../../../globals/components/layout/SafeCol";
import PalletsListSideMenu from "./PalletsListSideMenu";
import { FiPlus, FiCornerUpLeft, FiRepeat, FiX } from "react-icons/fi";
import Dropdown, { DropdownList, DropdownListItem } from "../../../globals/components/navigation/Dropdown";


export default function PalletsListSidebar({ companyKeyToQuery, queryFrom }) {
  return (
    <SafeCol id="pallets-left-sidebar">
      <div className="max-w-full relative my-4 mx-2">
        { companyKeyToQuery === "carrierId" && (
        <Dropdown
          id="pallets-menu-list-dropdown"
          navItem={<div className="ml-2 btn btn-primary flex items-center font-bold text-sm"><FiPlus className="text-lg mr-1" /> Registra</div>}
          navItemOpen={<div className="ml-2 btn btn-primary flex items-center font-bold text-sm"><FiX className="text-lg mr-1" /> Chiudi</div>}
          position="left-0"
          className={`bg-inverse-300 border border-light-100 dark:border-dark-100`}
        >
          <DropdownList id="contact-menu-dropdown-list">
            <DropdownListItem className="flex items-center contact-menu-dropdown-list-item-1 hover:bg-base-200">
              <ActionButtonLink
                text={"Registra movimentazione"}
                styles={`whitespace-normal text-left`}
                to={`/pallets/create?from=${queryFrom}`}
                icon={() => <FiRepeat />}
              />
            </DropdownListItem>
            <DropdownListItem className="flex items-center contact-menu-dropdown-list-item-1 hover:bg-base-200">
              <ActionButtonLink
                text={"Registra storno"}
                styles={`whitespace-normal text-left`}
                to={`/pallets/create_reversal?from=${queryFrom}`}
                icon={() => <FiCornerUpLeft />}
              />
            </DropdownListItem>
          </DropdownList>
        </Dropdown>
        )}

        <PalletsListSideMenu
          companyKeyToQuery={companyKeyToQuery}
        />
      </div>
    </SafeCol>
  )
}