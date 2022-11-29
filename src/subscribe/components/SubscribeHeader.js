import LinkButton from '../../globals/components/buttons_v2/LinkButton';
import { FiLogIn } from 'react-icons/fi';
// import { ReactComponent as LogoMark } from '../../globals/assets/k-3-logo.svg';
// import { ReactComponent as LogoMark } from '../../globals/assets/k-2-logo.svg';
// import { ReactComponent as LogoMark } from '../../globals/assets/k-logo.svg';
// import { ReactComponent as LogoMark } from '../../globals/assets/k-green-logo.svg';
// import { ReactComponent as LogoMark } from '../../globals/assets/k-dark-logo.svg';
import { ReactComponent as LogoMark } from '../../globals/assets/kln-logo.svg';

export default function SubscribeHeader() {
  return (
    <div className="flex items-center justify-between container mx-auto border-b border-light-300 dark:border-dark-100">
      <div className='logo flex items-center my-2 justify-start flex-1'>
        <LogoMark height={80} width={80} className="block max-w-full"  />
        <div className='hidden lg:block ml-2'>
          <h1 className="font-bold text-xl">Key Logistic Network</h1>
          <p className='text-sm text-secondary-200 opacity-50'>Il nuovo modo di fare la logistica</p>
        </div>
      </div>

      <div className='text-gray-500 dark:text-gray-400 px-4'>
        <LinkButton
          className='btn-ghost'
          text="Accedi al portale"
          icon={<FiLogIn />}
          to="/login"
        />
      </div>
    </div>
  )
}
