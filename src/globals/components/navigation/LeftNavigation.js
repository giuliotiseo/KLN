import {
  FiHome, FiUsers, FiMapPin, FiLogOut, FiTruck, FiSend, FiPackage, FiLayers, FiMap, FiGitPullRequest
} from 'react-icons/fi';
// Custom components
import NavMenu from './NavMenu';
// Styles
import { ReactComponent as LogoMark } from '../../assets/logo-mark.svg';
// Icons
import { Auth } from 'aws-amplify';
import ActionButton from '../buttons/ActionButton';

const navItems = [
  {
    id: 'home',
    text: 'Home',
    path: '/',
    icon: {
      regular: <FiHome className="w-5 h-auto mr-1" />,
    }
  },
  {
    id: 'addressBook',
    text: 'Rubrica',
    path: '/contacts',
    icon: { regular: <FiUsers className="w-5 h-auto mr-1" /> },
    navigation: { path: '/company/address-book' },
  },
  {
    id: 'warehouse',
    text: 'Magazzini',
    path: '/warehouses',
    icon: { 
      regular: <FiMapPin className="w-5 h-auto mr-1" />
    }
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
    path: '/preorders',
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
  // {
  //   id: 'order_v2',
  //   text: 'Ordini v2',
  //   path: '/orders_v2',
  //   icon: {
  //     regular: <FiPackage className="w-5 h-auto mr-1" />,
  //   }  
  // },
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

function LeftNavigation() {
  return (
    <aside id="leftNavigation" className="h-screen bg-inverse-300 min-w-min px-1">
      <div className="flex flex-col h-full">
          <div className="flex-1">
            <div className="logo mb-6 mt-4">
              <LogoMark height={55} className="block mr-2 ml-auto"  />
            </div>
            {/* Vertical navigation on left side */}
            <NavMenu navItems={navItems} />
          </div>

          {/* Toggle themes */}
          <div className="bottom-0 left-0 mx-auto fixed">
            <ActionButton
              icon={() => <FiLogOut />}
              text="Logout"
              onClick={() => Auth.signOut()}
              styles="btn--center btn-ghost text-center w-full"
            />
          </div>
      </div>
    </aside>
  )
}


export default LeftNavigation;