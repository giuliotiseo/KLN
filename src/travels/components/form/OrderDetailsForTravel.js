import { useSelector } from "react-redux";
import Drawer from "../../../globals/components/layout/Drawer";
import TravelOrderStatusVisualizer from "./TravelOrderStatusVisualizer";
import PickupDeliveryMap from "../../../_orders/components/PickupDeliveryMap";
import CheckpointVisualizer from "../../../orders/components/viewer/CheckpointVisualizer";
import {
  // changeTravelCreatorOrderDetails,
  selectTravelCreatorOrderDetails
} from "../../slices/travelCreatorSlice";
import UdcVisualizer from "../../../orders/components/viewer/UdcVisualizer";
import PalletInfoVisualizer from "../../../orders/components/viewer/PalletInfoVisualizer";
import DocsViewer from "../../../orders/components/viewer/DocsViewer";
import AdditionalRequestViewer from "../../../orders/components/viewer/AdditionalRequestViewer";
import OrderPaymentDetails from "../../../orders/components/viewer/OrderPaymentDetails";
import OrderBillingTypeDetails from "../../../orders/components/viewer/OrderBillingTypeDetails";
import OrderViewerLogs from "../../../orders/components/viewer/OrderViewerLogs";
import { useOrderByIdQuery } from "../../../orders/api/orders-api-slice";
import Spinner from "../../../globals/components/layout/Spinner";

// Sub components -----------------------------------------------------------------------------------------------------------------------------
const OrderDetailsForTravelContent = ({ order, loading }) => {
  if(loading) return <Spinner className="h-3 w-3"/>

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
export default function OrderDetailsForTravel({
  orderDetailsDrawer,
  showOrderDetailsDrawer,
  selectedOrder
}) {
  const { data: order, isLoading, isFetching } = useOrderByIdQuery({ id: selectedOrder?.id});

  return (
    <Drawer
      title={`Dettagli ordine ${selectedOrder?.stamp}`}
      isOpen={orderDetailsDrawer}
      setIsOpen={() => showOrderDetailsDrawer(prev => !prev)}
      sectionClassName="bg-base-300 pl-0"
      articleClassName="block"
    >
      { selectedOrder?.id
        ? <OrderDetailsForTravelContent order={order} loading={isLoading || isFetching} />
        : <p>Fai click sulla marca di un ordine per visualizzarne i dettagli</p>
      }
    </Drawer>
  )
}