import { FiMail, FiPhone } from "react-icons/fi";

export default function ContactRegistryBasics({
  contact
}) {
  const { name, surname, fiscalCode, phone, email  } = contact;

  return (
    <div className="py-4 px-2 mb-4 bg-base-100 rounded-md">
      <div className="flex justify-between mb-2">
        <p className='text-xl'>
          <span>{name} {surname}</span>
        </p>
        { fiscalCode && <p className='text-lg text-gray-400 dark:text-gray-500'>
          <span className="tracking-wide">{fiscalCode}</span>
        </p> }
      </div>

      { email && <div className='flex items-center text-base gap-2'>
        <FiMail />
        <span>{email}</span>
      </div> }

      { phone && <div className='flex items-center text-base gap-2'>
        <FiPhone />
        <span>{phone}</span>
      </div> }
    </div>
  )
}