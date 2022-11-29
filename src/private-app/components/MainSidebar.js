import { useScrollFull } from '../../globals/hooks/useScrollFull';
import SidebarNav from './SidebarNav';
import Scrollbar from '../../globals/components/layout/Scrollbar';
import LogoutButton from './LogoutButton';
import { ReactComponent as LogoMark } from '../../globals/assets/kln-logo.svg';
import { FiGitPullRequest, FiHome, FiLayers, FiMap, FiMapPin, FiPackage, FiSend, FiTruck, FiUsers } from 'react-icons/fi';
import { RiBuilding2Line } from 'react-icons/ri';
import { ROLES } from '../../globals/libs/helpers';

// Sidebar menu setting -------------------------------------------------------------------------------------------------------------------------
export const menu = [
  {
    id: 'home',
    text: 'Home',
    path: '/',
    icon: {
      regular: <FiHome className="w-5 h-auto mr-1" />,
    }
  },
  {
    id: 'customers',
    text: 'Clienti',
    path: '/customers?type=ALL',
    icon: { regular: <RiBuilding2Line className="w-5 h-auto mr-1" /> },
    navigation: { path: '/customers?type=ALL' },
  },
  {
    id: 'contacts',
    text: 'Personale',
    path: '/contacts',
    icon: { regular: <FiUsers className="w-5 h-auto mr-1" /> },
    navigation: { path: '/contacts' },
  },
  {
    id: 'warehouse',
    text: 'Magazzini',
    path: '/warehouses',
    icon: {  regular: <FiMapPin className="w-5 h-auto mr-1" /> },
    navigation: { path: '/warehouses' },
  },
  {
    id: 'vehicle',
    text: 'Veicoli',
    path: '/vehicles',
    icon: { regular: <FiTruck className="w-5 h-auto mr-1" /> },
  },
  {
    id: 'preorder',
    text: 'Pre-ordini',
    path: '/pre-orders',
    icon: {
      regular: <FiSend className="w-5 h-auto mr-1" />,
    }  
  },
  {
    id: 'order',
    text: 'Ordini',
    path: '/orders',
    icon: {
      regular: <FiPackage className="w-5 h-auto mr-1" />,
    }  
  },
  {
    id: 'checks',
    text: 'Assegni',
    path: '/checks',
    icon: {
      regular: <FiLayers className="w-5 h-auto mr-1" />,
    }  
  },
  {
    id: 'travels',
    text: 'Viaggi',
    path: '/travels',
    companyType: 'TRANSPORT',
    roles: [ROLES.ADMIN, ROLES.LOGISTICS],
    icon: {
      regular: <FiMap className="w-5 h-auto mr-1" />,
    } 
  },
  {
    id: 'pallets',
    text: 'Pallet',
    path: '/pallets/latest',
    icon: {
      regular: <FiGitPullRequest className="w-5 h-auto mr-1" />,
    }  
  },
]


// Main component -------------------------------------------------------------------------------------------------------------------------
export default function MainSidebar({
  companyType,
}) {
  const scrollableRef = useScrollFull();
  return (
    <aside id="MainSidebar" className={`sticky top-0 h-screen bg-inverse-300 min-w-min px-1 w-[38px] lg:w-[120px]`}>
      <Scrollbar ref={scrollableRef}>
        <div className="flex flex-col h-screen">
          <div className="flex flex-col flex-1">
            <div className="logo mb-6 mt-4">
              <LogoMark height={75} className="block mr-2 ml-auto max-w-full"  />
            </div>

            <div className="flex-1">
              <SidebarNav
                menu={menu}
                companyType={companyType}
              />
            </div>

            <LogoutButton />
          </div> 
        </div>
      </Scrollbar>
    </aside>
  )
}