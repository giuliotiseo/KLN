import React from 'react'
import { formatDistanceDate } from '../../../globals/libs/helpers'

const PreOrderCompanyLink = ({ label, companyName }) => {
  return (
    <div>{label} <span className='font-bold'>{companyName}</span></div>
    )
}

const PreOrderCompanyDetails = ({
  preOrder,
  currentRole
}) => {
  return (
    <div className="w-full text-base">
      <div className='text-lg'>
        { currentRole === "CARRIER"
          ? <PreOrderCompanyLink label="Inviato da: " companyName={preOrder.senderName} />
          : <PreOrderCompanyLink label="Inviato a: " companyName={preOrder.carrierName} />
        }
      </div>

      <p className='text-gray-400 dark:text-gray-500'>{formatDistanceDate(new Date(preOrder.createdAt), new Date())}</p>
    </div>
  )
}

export default PreOrderCompanyDetails
