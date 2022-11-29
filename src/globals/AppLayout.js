import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AppLayout = () => {
  return (
    <div id="AppLayout">
      <Outlet />
      <ToastContainer />
    </div>
  )
}

export default AppLayout;