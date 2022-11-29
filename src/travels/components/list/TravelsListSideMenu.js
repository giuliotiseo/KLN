import SafeCol from "../../../globals/components/layout/SafeCol"
import LinkButton from "../../../globals/components/buttons_v2/LinkButton";
// Icons
import { FiPlus } from "react-icons/fi";
import { TbAsterisk, TbChecklist, TbFolders, TbPictureInPictureOff, TbPictureInPictureOn, TbPlayerStop, TbTruckDelivery, TbTruckReturn } from "react-icons/tb";

const menu = [{
  text: "Tutti",
  selected: "ALL",
  icon: <TbAsterisk className='text-sm md:text-md' />
},{
  text: "Fermi",
  selected: "STATIONARY",
  icon: <TbPlayerStop className='text-lg md:text-xl' />
}, {
  text: "In ritiro",
  selected: "PICKUP",
  icon: <TbPictureInPictureOff className='text-lg md:text-xl' />
}, {
  text: "A deposito",
  selected: "DEPOT",
  icon: <TbPictureInPictureOn className='text-lg md:text-xl' />
}, {
  text: "In consegna",
  selected: "DELIVERY",
  icon: <TbTruckDelivery className='text-lg md:text-xl' />
}, {
  text: "Di rientro",
  selected: "RETURN",
  icon: <TbTruckReturn className='text-lg md:text-xl' />
},{
  text: "Completati",
  selected: "COMPLETED",
  icon: <TbChecklist className='text-lg md:text-xl' />
}, {
  text: "Archiviati",
  selected: "ARCHIVED",
  icon: <TbFolders className='text-lg md:text-xl' />
}]


// Main component --------------------------------------------------------------------------------------------------
const TravelsListSideMenu = ({ 
  queryStatus: status,
  companyType = "CARRIER",
  setSearchParams
 }) => {
  const isAddAllowed = companyType === "CARRIER"

  return (
    <SafeCol id="TravelsListSideMenu">
      <div className="max-w-full relative">
        {isAddAllowed && (  
          <LinkButton
            text={`Registra viaggio`}
            className='btn-primary my-4 inline-flex pl-1 whitespace-normal'
            icon={<FiPlus className='text-lg' />}
            to={`new`}
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

export default TravelsListSideMenu;