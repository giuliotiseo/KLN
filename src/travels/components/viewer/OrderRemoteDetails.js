import Drawer from "../../../globals/components/layout/Drawer";
import InlineSpinner from "../../../globals/components/spinners/InlineSpinner";
import { useOrderByIdQuery } from "../../../orders/api/orders-api-slice";
import AdditionalRequestViewer from "../../../orders/components/viewer/AdditionalRequestViewer";
import CheckpointVisualizer from "../../../orders/components/viewer/CheckpointVisualizer";
import DocsViewer from "../../../orders/components/viewer/DocsViewer";
import OrderBillingTypeDetails from "../../../orders/components/viewer/OrderBillingTypeDetails";
import OrderPaymentDetails from "../../../orders/components/viewer/OrderPaymentDetails";
import OrderViewerLogs from "../../../orders/components/viewer/OrderViewerLogs";
import PalletInfoVisualizer from "../../../orders/components/viewer/PalletInfoVisualizer";
import UdcVisualizer from "../../../orders/components/viewer/UdcVisualizer";
import PickupDeliveryMap from "../../../_orders/components/PickupDeliveryMap";
import TravelOrderStatusVisualizer from "../form/TravelOrderStatusVisualizer";

// Sub components -----------------------------------------------------------------------------------------------------------------------------
const OrderDetailsForTravelContent = ({ order }) => {
  if(!order) return null;

  return (
    <>
      <div className="bg-base-100 rounded-md mx-2">
        <div className="py-2 text-lg font-bold">
          <TravelOrderStatusVisualizer status={order?.status} />
        </div>
      </div>
      
      <div className="px-2">
        <div className="relative w-full max-w-full h-[250px] mb-4 mt-2 rounded-md overflow-hidden">
          <PickupDeliveryMap
            pickup={order.pickupCheckpoint}
            depot={order?.depotCheckpoint ? order.depotCheckpoint : null}
            delivery={order.deliveryCheckpoint}
          />
        </div>
      </div>

      {/* Pickup */}
      <div className="mx-2">
        <CheckpointVisualizer
          order={order}
          companyTarget="sender"
          checkpoint={order.pickupCheckpoint}
          title="Info mittente"
          icon={null}
          summaryTitle="Info appuntamento per ritiro"
          windowsToShow={["CARICO"]}
          start={order?.pickupDateStart}
          end={order?.pickupDateEnd}
        />
      </div>

      { order?.depotCheckpoint && (
        <div className="mx-2">
          <CheckpointVisualizer
            order={order}
            companyTarget="carrier"
            checkpoint={order.depotCheckpoint}
            title="Info vettore"
            summaryTitle="Info scarico vettore"
            icon={null}
            windowsToShow={["SCARICO"]}
          />
        </div>
      )}

      <div className='mx-2'>
        <CheckpointVisualizer
          order={order}
          companyTarget="receiver"
          checkpoint={order.deliveryCheckpoint}
          title="Info destinatario"
          icon={null}
          summaryTitle="Info appuntamento per consegna"
          windowsToShow={["SCARICO"]}
          start={order?.deliveryDateStart}
          end={order?.deliveryDateEnd}
        />
      </div>

      <div className='mx-2'>
        <UdcVisualizer order={order} />
      </div>

      <div className='mx-2'>
        <PalletInfoVisualizer order={order} />
      </div>

      <div className='mx-2'>
        <DocsViewer
          docs={order.docs}
          showAttachments={false}
        />
      </div>

      <div className='mx-2'>
        <AdditionalRequestViewer
          collectChecks={order.collectChecks}
          checksAmount={order?.checksAmount}
        />
      </div>

      <div className='mx-2'>
        <OrderPaymentDetails
          paymentCondition={order.paymentCondition}
        />
      </div>

      <div className='mx-2'>
        <OrderBillingTypeDetails
          customer={order.customer}
          billingType={order.billingType}
        />
      </div>

      <div className='mx-2'>
        <OrderViewerLogs logs={order.log || []} />
      </div>
    </>
  )
}

// Main component -----------------------------------------------------------------------------------------------------------------------------
export default function OrderRemoteDetails({
  orderId,
  orderDetailsDrawer,
  showOrderDetailsDrawer
}) {
  const { data: order = {}, isFetching, isLoading } = useOrderByIdQuery({ id: orderId });
  return (
    <Drawer
      title={order?.stamp ? `Dettagli ordine ${order.stamp}` : "Caricamento in corso"}
      isOpen={orderDetailsDrawer}
      setIsOpen={() => showOrderDetailsDrawer(prev => !prev)}
      sectionClassName="bg-base-300 pl-0"
      articleClassName="block"
    >
      { !order || isFetching || isLoading
        ? <div className="flex items-center justify-center"><InlineSpinner /></div>
        : Object.keys(order)?.length <= 0
          ? <p>Nessun risultato trovato</p>
          : <OrderDetailsForTravelContent order={order} />
      }
    </Drawer>
  )
}