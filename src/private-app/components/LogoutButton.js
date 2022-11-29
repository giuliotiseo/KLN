import Button from "../../globals/components/buttons_v2/Button";
import { FiPower } from 'react-icons/fi';
import { useDispatch } from "react-redux";
import { changeLogoutScreen } from "../slices/appSlice";


export default function LogoutButton() {
  const dispatch = useDispatch();
  return (
    <Button
      icon={<FiPower className="text-xl" />}
      className="mx-auto btn-ghost"
      onClick={() => dispatch(changeLogoutScreen(true))}
    />
  )
}