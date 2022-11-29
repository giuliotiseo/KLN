// Components
import ActionButton from "../../globals/components/buttons/ActionButton";
import ActionButtonLink from "../../globals/components/buttons/ActionButtonLink";
import Dropdown, { DropdownList, DropdownListItem } from "../../globals/components/navigation/Dropdown";
// Icons
import { FiDownload, FiMoreVertical, FiPlus, FiRefreshCw, FiUpload, FiX } from "react-icons/fi";
import { readExcel } from "../../globals/libs/helpers";
import UploadButton from "../../globals/components/buttons/UploadButton";
import DownloadXlsButton from "../../globals/components/buttons/DownloadXlsButton";

const cta_list = {
  to: "/warehouses/create",
  text: "Nuovo",
  icon: () => <FiPlus />
}

export default function WarehouseMenuDropdown({ vatNumber, setUploadedWarehouses, warehouses, profileName, tableHeadings, refresh }) {
  return (
    <Dropdown
      id="contact-menu-dropdown-container"
      navItem={<div className="ml-2"><FiMoreVertical className="text-3xl" /></div>}
      navItemOpen={<div className="ml-2"><FiX className="text-3xl" /></div>}
      position="right-0"
      className="bg-inverse-300 ml-4 border border-light-100 dark:border-dark-100"
    >
      <DropdownList id="contact-menu-dropdown-list">
        <DropdownListItem id="contact-menu-dropdown-list-item-1" className='md:hidden'>
          <ActionButtonLink
            styles="hover:text-primary-200 dark:hover:text-primary-300"
            {...cta_list} 
          />
        </DropdownListItem>
        <DropdownListItem id="contact-menu-dropdown-list-item-1 text-left">
          <ActionButton
            icon={() => <FiRefreshCw />}
            text="Aggiorna lista"
            styles="btn-dropdown-item"
            onClick={refresh}
          />
        </DropdownListItem>
        {/* <DropdownListItem id="contact-menu-dropdown-list-item-1 text-left">
          <DownloadXlsButton
            text="Esporta (.xlsx)"
            styles="btn-dropdown-item"
            title={`lista-magazzini-${vatNumber}-${Date.now().toString()}`}
            subject={`Esportazione lista magazzini ${Date.now().toString()}`}
            author={profileName}
            data={warehouses}
            dataType="warehouses"
            headings={tableHeadings}
            icon={() => <FiDownload />}
          />
        </DropdownListItem> */}
        <DropdownListItem id="contact-menu-dropdown-list-item-2 text-left">
          <UploadButton 
            text="Importa (.xlsm)"
            icon={() => <FiUpload />}
            styles="btn-dropdown-item items-center text-left flex justify-start"
            onUpload={(file) => readExcel(file, setUploadedWarehouses)}
          />
        </DropdownListItem>
      </DropdownList>
    </Dropdown>
  )
}