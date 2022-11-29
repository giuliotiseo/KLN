// Components
// import UserNav from '../navigation/UserNav';
// Router
import UserRouter from '../router/UserRouter';
// Styles
import { motion } from "framer-motion";

export default function UserContainer () {
  return (
    <motion.div
      initial={{ opacity: 0}}
      animate={{ opacity: 1 }}
    >
      {/* Navigation */}
      {/* <UserNav title={profile.name} /> */}

      {/* Main content */}
      <UserRouter />
    </motion.div>
  )
}