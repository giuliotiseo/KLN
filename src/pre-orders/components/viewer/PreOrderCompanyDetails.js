import React from 'react'
import { useCustomerByCompanyIdQuery } from '../../../customers/api/customers-api-slice'
import { Link } from 'react-router-dom'
import { formatDistanceDate } from '../../../globals/libs/helpers'

const PreOrderCompanyLink = ({ label, response, companyName }) => {
  if(!response?.data?.id){
    return (
      <div>{label} <span className='font-bold'>{companyName}</span></div>
    )
  }

  return (
    <div>{label} <Link className='font-bold text-primary-200 dark:text-primary-300' to={`/customers/view?id=${response.data.id}`}>{companyName}</Link></div>
  )
}

const PreOrderCompanyDetails = ({
  preOrder,
  currentRole
}) => {
  const oppositeRoles = { SENDER: "carrierId", CARRIER: "senderId"}
  const response = useCustomerByCompanyIdQuery({
    companyId: preOrder[oppositeRoles[currentRole]]
  });

  return (
    <div className="w-full text-base">
      <div className='text-lg'>
        { currentRole === "CARRIER"
          ? <PreOrderCompanyLink label="Inviato da: " response={response} companyName={preOrder.senderName} />
          : <PreOrderCompanyLink label="Inviato a: " response={response} companyName={preOrder.carrierName} />
        }
      </div>

      <p className='text-gray-400 dark:text-gray-500'>{formatDistanceDate(new Date(preOrder.createdAt), new Date())}</p>
    </div>
  )
}

export default PreOrderCompanyDetails
