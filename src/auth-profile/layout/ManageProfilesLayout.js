import { useSignOut } from '../../auth-user/hooks';
import { Outlet } from 'react-router-dom';
import Button from '../../globals/components/buttons_v2/Button';
import SignOutOverlay from '../../private-app/components/SignOutOverlay';
import { FiLogOut } from 'react-icons/fi';
import { ReactComponent as LogoMark } from '../../globals/assets/kln-logo.svg';

export default function ManageProfilesLayout({
  heading = "Titolo pagina",
}) {
  const { signOut, isLoading } = useSignOut();
  return (
    <div className="relative h-screen flex flex-col bg-radial-gradient from-light-300 dark:from-dark-300  to-light-100 dark:to-dark-100">
      <header id="manageProfilesHeader" className="h-[90px] p-4 flex items-center justify-between bg-gradient-to-l from-white top-0 z-20 w-full">
        <div className="logo">
          <LogoMark height={75} className="block mr-auto"  />
        </div>

        <p className="font-bold text-sm text-center mx-2 md:text-lg text-gray-500 flex-1">{ heading }</p>

        <Button
          text="Esci"
          className='text-xl btn-ghost'
          icon={<FiLogOut className='text-lg' />}
          onClick={signOut}
        />
      </header>

      <Outlet />

      { isLoading && <SignOutOverlay />}
    </div>
  )
}