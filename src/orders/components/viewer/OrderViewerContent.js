import React from 'react'
import SafeCol from '../../../globals/components/layout/SafeCol'
import PalletInfoVisualizer from './PalletInfoVisualizer'
import UdcVisualizer from './UdcVisualizer'
import PickupDeliveryMap from '../../../_orders/components/PickupDeliveryMap'
import DocsViewer from './DocsViewer'
import AdditionalRequestViewer from './AdditionalRequestViewer'
import OrderPaymentDetails from './OrderPaymentDetails'
import OrderBillingTypeDetails from './OrderBillingTypeDetails'
import OrderViewerLogs from './OrderViewerLogs'
import { formatDistanceDate } from '../../../globals/libs/helpers'

const OrderViewerContent = ({
  order,
  showAttachments
}) => {
  return (
    <SafeCol id="OrderViewerContent">
      <div className='pl-2'>
        <div className="h-[300px] mr-4 rounded-md overflow-hidden">
          <PickupDeliveryMap
            pickup={order.pickupCheckpoint}
            depot={order?.depotCheckpoint ? order.depotCheckpoint : null}
            delivery={order.deliveryCheckpoint}
          />
        </div>

        <div className='mt-2 mb-4 mr-4'>        
          <h2 className="title-3 mt-6 mb-4">Informazioni sul carico</h2>

          <div className="mb-2">
            <UdcVisualizer order={order} />
          </div>
          
          <div className="mb-2">
            <PalletInfoVisualizer order={order} />
          </div>

          <div className="mb-2">
            <DocsViewer
              docs={order.docs}
              showAttachments={showAttachments}
            />
          </div>

          <div className="mb-2">
            <AdditionalRequestViewer
              collectChecks={order.collectChecks}
              checksAmount={order.checksAmount}
            />
          </div>

          <div className="mb-2">
            <OrderPaymentDetails
              paymentCondition={order.paymentCondition}
            />
          </div>

          <div className="mb-2">
            <OrderBillingTypeDetails
              customer={order.customer}
              billingType={order.billingType}
            />
          </div>

          <div>
            <OrderViewerLogs logs={order.log || []} />
          </div>

          <div className='p-2'>
            <p className='text-sm italic text-gray-400 dark:text-gray-500'>
              Ultima modifica: { formatDistanceDate(new Date(order.updatedAt), new Date())}
            </p>
          </div>
        </div>
      </div>
    </SafeCol>
  )
}

export default OrderViewerContent
