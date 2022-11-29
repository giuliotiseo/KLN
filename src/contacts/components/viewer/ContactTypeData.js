import { TbDeviceDesktopAnalytics, TbSteeringWheel, TbTruckLoading } from "react-icons/tb"
import { CONTACT_TYPE_DESCRIPTION } from "../../libs/helpers"

const ContactTypeIconFinder = {
  WAREHOUSE: <TbTruckLoading className='text-lg md:text-xl' />,
  ADMIN: <TbDeviceDesktopAnalytics className='text-lg md:text-xl' />,
  DRIVE: <TbSteeringWheel className='text-lg md:text-xl' />,
}

const ContactTypeData = ({ type }) => {
  return (
    <div className='bg-base-100 p-2 rounded-md'>
      <div className="flex items-center gap-2 text-lg">
        { ContactTypeIconFinder[type]}
        <span>{CONTACT_TYPE_DESCRIPTION[type]}</span>
      </div>
    </div>
  )
}

export default ContactTypeData
