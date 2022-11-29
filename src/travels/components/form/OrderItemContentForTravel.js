import { SmallParagraph } from "../../../globals/components/typography/paragraphs";
import { MdGpsFixed } from "react-icons/md"
import { CgArrowLongRightC } from "react-icons/cg";
import { formatDate } from "../../../globals/libs/helpers";

const isPickupDone = (status, currentIndexOp) => {
  let result = [0, 0]; // [carico, scarico]

  if(status === "PENDING") {
    if(currentIndexOp !== null && currentIndexOp === 0) {
      result = [1, 0];
    } else if(currentIndexOp !== null && currentIndexOp === 1) {
      result = [1, 1];
    }
  }
  
  if(status === "STOCKED") {
    result = [1, 1];
  }

  return result;
}

const isDepotDone = (status, currentIndexOp) => {
  let result = [0, 0]; // [carico, scarico]

  if(status === "PENDING") {
    if(currentIndexOp === 1) {
      result = [1, 0];
    }
  }

  if(status === "STOCKED") {
    if(currentIndexOp !== null && currentIndexOp === 0) {
      result = [1, 0];
    } else if(currentIndexOp !== null && currentIndexOp === 1) {
      result = [1, 1];
    }
  }
  return result;
}

// Main component ------------------------------------------------------------------------------------------------------------------------------------------
export default function OrderItemContentForTravel({ order, currentIndexOp }) {
  const [ pickupLoad, pickupUnload ] = isPickupDone(order.status, currentIndexOp);
  const [ depotLoad, depotUnload ] = isDepotDone(order.status, currentIndexOp);

  return (
    <div className="grid grid-cols-3 relative gap-4 items-center">
      <div className="col-span-1 flex items-center">
        <div className={`flex-1
          ${(pickupLoad === 1 && pickupUnload === 0) && 'text-secondary-200 dark:text-secondary-300' }
          ${(pickupLoad === 1 && pickupUnload === 1) && 'line-through opacity-40' }`}
        >
          <p className="flex text-sm items-center font-bold">
            { (pickupLoad === 1 && pickupUnload === 0) && <MdGpsFixed className="mr-2" /> } 
            { order.pickupStorageName }
          </p>
          <SmallParagraph>
            { order?.pickupCheckpoint?.location.city } ({ order?.pickupCheckpoint?.location.province }), { order?.pickupCheckpoint?.location.region}
          </SmallParagraph>
          <SmallParagraph styles="text-gray-500">
            dal { formatDate(new Date(order?.pickupDateStart), "PPp")} <br />
            al { formatDate(new Date(order?.pickupDateEnd), "PPp")}
          </SmallParagraph>
        </div>

        <div className="flex flex-col items-center justify-center mx-6">
          <CgArrowLongRightC className="text-2xl text-secondary-100 dark:text-secondary-300" />
        </div>
      </div>

      <div className="col-span-1 flex items-center">
        { order?.depotCheckpoint
          ? <div className={`flex-1
              ${(pickupUnload === 1 && depotLoad === 1 && depotUnload === 0) && 'text-secondary-200 dark:text-secondary-300' }
              ${(depotLoad === 1 && depotUnload === 1) && 'line-through opacity-40' }
            `}>
              <div className="text-sm flex font-bold">
                {(pickupUnload === 1 && depotLoad === 1 && depotUnload === 0) && <MdGpsFixed className="mr-1" /> }
                { order.carrierName }
              </div>
              <SmallParagraph>
                { order?.depotCheckpoint?.location.city } ({ order?.depotCheckpoint?.location.province }), { order?.depotCheckpoint?.location.region}
              </SmallParagraph>
            </div>
          : order?.shipmentType === "GROUPAGE"
            ? <p className="italic block w-full text-center">Scarico vettore non presente</p>
            : <p className="italic block w-full text-center">Ordine diretto</p>
        }

        <div className="flex flex-col items-center justify-center mx-6">
          <CgArrowLongRightC className="text-2xl text-secondary-100 dark:text-secondary-300" />
        </div>
      </div>

      <div className="col-span-1">
        <div className={`flex-1
          ${order?.shipmentType === "GROUPAGE" && depotUnload === 1 && 'text-secondary-200 dark:text-secondary-300'}
          ${order?.shipmentType === "DIRETTO" && pickupUnload === 1 && 'text-secondary-200 dark:text-secondary-300'}`}
        >
          <div className="flex font-bold text-sm">
            {order?.shipmentType === "GROUPAGE" && depotUnload === 1 && <MdGpsFixed className="mr-1" />}
            {order?.shipmentType === "DIRETTO" && pickupUnload === 1 && <MdGpsFixed className="mr-1" />}
            { order.deliveryStorageName }
          </div>
          <SmallParagraph>
            { order?.deliveryCheckpoint?.location.city } ({ order?.deliveryCheckpoint?.location.province }), { order?.deliveryCheckpoint?.location.region}
          </SmallParagraph>
          <SmallParagraph styles="text-gray-500">
            dal { formatDate(new Date(order?.deliveryDateStart), "PPp")} <br />
            al { formatDate(new Date(order?.deliveryDateEnd), "PPp")}
          </SmallParagraph>
        </div>
      </div>
    </div>
  )
}