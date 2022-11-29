import { FiLogOut, FiPower, FiUsers } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useSignOut } from "../../auth-user/hooks";
import { useLogoutProfile } from "../hooks";
import Button from "../../globals/components/buttons_v2/Button";
import Spinner from "../../globals/components/layout/Spinner";
import { changeLogoutScreen } from "../../private-app/slices/appSlice";

export default function LogoutOverlay() {
  const { signOut } = useSignOut(); // logout from cognito 
  const [{ loading }, handleLogoutProfile ] = useLogoutProfile();
  const dispatch = useDispatch();

  console.log("Loading logout", loading);

  return (
    <div className="flex flex-col items-center justify-center fixed top-0 left-0 w-screen h-screen bg-base-100 opacity-95 z-50">
      <FiPower className="mb-4 text-3xl text-primary-200 dark:text-primary-300 mr-2" />
      
      <div className="items-center">
        <h1 className="title-3 mb-8">Stai chiudendo la sessione</h1>
      </div>

      <ul className="flex flex-col items-center">
        <li>
          <Button
            text="Cambia profilo"
            icon={<FiUsers />}
            onClick={handleLogoutProfile}
            className="text-center btn-ghost text-lg"
            disabled={loading}
          />
        </li>
        <li>
          <Button
            text="Disconnetti"
            icon={<FiLogOut />}
            onClick={signOut}
            className="text-center btn-ghost text-lg"
            disabled={loading}
          />
        </li>
        <li>
          <Button
            text="Annulla"
            onClick={() => dispatch(changeLogoutScreen(false))}
            className="mt-4 text-center btn-ghost text-base btn-outline px-4 py-1"
            disabled={loading}
          />
        </li>
      </ul>

      { loading && (
        <Spinner className="relative top-8 h-6 w-6 text-primary-200 dark:text-primary-300" />
      )}
    </div>
  )
}