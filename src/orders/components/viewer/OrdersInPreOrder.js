import React from 'react'
import PreOrderDatesDetails from '../../../pre-orders/components/viewer/PreOrderDatesDetails';
import LinkedOrdersByPreOrder from '../form/LinkedOrdersByPreOrder';

function OrdersInPreOrder({
  order,
  selectedPreOrder,
  ordersInPreOrderQuery,
  companyType
}) {
  const { data } = ordersInPreOrderQuery;
  const ordersInPreOrder = data?.ids?.length > 0 ? data.ids.map(id => data.entities[id]) : [];

  return (
    <>
      <h2 className="title-5 mb-4 uppercase text-gray-500 dark:text-gray-600">
        Informazioni pre-ordine
      </h2>
      <div className='w-full'>
        <PreOrderDatesDetails preOrder={selectedPreOrder} />
      </div>
      <div className='w-full mt-4'>
        <LinkedOrdersByPreOrder
          linkedOrders={ordersInPreOrder.filter(orderInPreOrder => orderInPreOrder.id !== order.id)}
          preOrder={selectedPreOrder}
          enableDelete={true}
          companyType={companyType}
          visualization="column"
          itemClassName="bg-base-100 rounded-md p-2 m-0"
        />
      </div>
    </>
  )
}

export default OrdersInPreOrder
