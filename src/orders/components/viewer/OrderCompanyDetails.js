import React from 'react'
import { useCustomerByCompanyIdQuery } from '../../../customers/api/customers-api-slice'
import { Link } from 'react-router-dom'
import { formatDate } from '../../../globals/libs/helpers'

const OrderCompanyLink = ({ label, response, companyName }) => {
  if(!response?.data?.id){
    return (
      <div>{label} <span className='font-bold'>{companyName}</span></div>
    )
  }

  return (
    <div>{label} <Link className='font-bold text-primary-200 dark:text-primary-300' to={`/customers/view?id=${response.data.id}`}>{companyName}</Link></div>
  )
}

const OrderCompanyDetails = ({
  order
}) => {
  const { senderId, pickupStorageId, receiverId, deliveryStorageId } = order;
  const sender = useCustomerByCompanyIdQuery({ companyId: order.senderId });
  const carrier = useCustomerByCompanyIdQuery({ companyId: order.carrierId });
  const receiver = useCustomerByCompanyIdQuery({ companyId: order.receiverId });
  const pickupStorage = useCustomerByCompanyIdQuery(order.senderId !== order.pickupStorageId ? { companyId: order.pickupStorageId } : null);
  const deliveryStorage = useCustomerByCompanyIdQuery(order.receiverId !== order.deliveryStorageId ? { companyId: order.deliveryStorageId } : null);

  return (
    <div className="w-full text-base">
      <div className='text-base'>
        <OrderCompanyLink label="Inviato da: " response={sender} companyName={order.senderName} />
      </div>
      { senderId !== pickupStorageId && (
        <div className='text-base'>
          <OrderCompanyLink label="Punto di carico gestito da: " response={pickupStorage} companyName={order.pickupStorageName} />
        </div>
      )}

      <div className='text-base'>
        <OrderCompanyLink label="Trasportato da: " response={carrier} companyName={order.carrierName} />
      </div>

      <div className='text-base'>
        <OrderCompanyLink label="Destinato a: " response={receiver} companyName={order.receiverName} />
      </div>

      { receiverId !== deliveryStorageId && (
        <div className='text-base'>
          <OrderCompanyLink label="Punto di scarico gestito da: " response={deliveryStorage} companyName={order.deliveryStorageName} />
        </div>
      )}

      <p className='text-gray-400 dark:text-gray-500 mt-4'>
        Ordine del: {formatDate(new Date(order.createdAt))}
      </p>
    </div>
  )
}

export default OrderCompanyDetails
