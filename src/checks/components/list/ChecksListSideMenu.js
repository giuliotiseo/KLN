import SafeCol from "../../../globals/components/layout/SafeCol"
import LinkButton from "../../../globals/components/buttons_v2/LinkButton";
import { FiPlus } from "react-icons/fi";
import { TbAsterisk, TbDots, TbUpload, TbBuildingWarehouse, TbTruckDelivery, TbChecklist, TbFolders } from "react-icons/tb";

// Constants --------------------------------------------------------------------------------------------------
const menu = [{
  text: "Tutti",
  selected: "ALL",
  icon: <TbAsterisk className='text-sm md:text-md' />
},{
  text: "Da ritirare",
  selected: "PENDING",
  icon: <TbDots className='text-lg md:text-xl' />
}, {
  text: "Ritirati",
  selected: "PICKEDUP",
  icon: <TbUpload className='text-lg md:text-xl' />
}, {
  text: "Registrazione",
  selected: "RECORDING",
  icon: <TbBuildingWarehouse className='text-lg md:text-xl' />
}, {
  text: "In consegna",
  selected: "DELIVERING",
  icon: <TbTruckDelivery className='text-lg md:text-xl' />
}, {
  text: "Consegnati",
  selected: "DELIVERED",
  icon: <TbChecklist className='text-lg md:text-xl' />
},{
  text: "Archiviati",
  selected: "ARCHIVED",
  icon: <TbFolders className='text-lg md:text-xl' />
}]

// Main component --------------------------------------------------------------------------------------------------
const ChecksListSideMenu = ({ listType, setSearchParams }) => {
  const { status, companyType } = listType;
  const isAddAllowed = !companyType.includes("SENDER");

  return (
    <SafeCol id="ChecksListSideMenu">
      <div className="max-w-full relative">
        {isAddAllowed && (  
          <LinkButton
            text={`${ companyType === 'carrier' ? 'Registra assegno' : 'Emetti assegno'}`}
            className='btn-primary my-4 inline-flex pl-1'
            icon={<FiPlus className='text-lg' />}
            to={`new/${companyType.toLowerCase()}`}
          /> 
        )}
        
        <nav className="mt-2">
          <ul>
            { menu.map(item => (
              <li key={item.selected} className="block">
                <button
                  onClick={() => setSearchParams({ status: item.selected, company: companyType })}
                  className={`flex items-center w-full my-2 px-4 py-2 rounded-l-sm rounded-r-full 
                    ${ status === item.selected
                      ? 'bg-base-100 text-secondary-200 dark:text-secondary-300 shadow-sm' 
                      : 'hover:bg-light-100 dark:hover:bg-dark-100'
                    }`
                  }
                >
                  <span className={`mr-1`}>{ item.icon }</span>
                  <span>{item.text}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </SafeCol>
  )
}

export default ChecksListSideMenu;