import { useState, useCallback } from 'react';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import Button from '../../../globals/components/buttons_v2/Button';
import SafeCol from '../../../globals/components/layout/SafeCol';
import CheckpointVisualizer from './CheckpointVisualizer';
import OrderCompanyDetails from './OrderCompanyDetails';
import OrderViewerHeading from './OrderViewerHeading';
import {ReactComponent as SenderIcon} from "../../../globals/assets/orders/sender.svg";
import {ReactComponent as CarrierIcon} from "../../../globals/assets/orders/delivery.svg";
import {ReactComponent as ReceiverIcon} from "../../../globals/assets/orders/receiver.svg";


// Sub component --------------------------------------------------------------------------------------------------------------------------------
const ButtonAccordion = ({
  accordion,
  accordionId,
  text,
  onClick
}) => (
  <Button
    text={text}
    onClick={() => onClick(accordionId)}
    icon={accordion.includes(accordionId) ? <FiChevronDown /> : <FiChevronRight />}
    className={`
      title-5 my-2 uppercase px-0
      ${ accordion.includes(accordionId)
        ? ' text-black dark:text-white'
        : ' text-gray-500 dark:text-gray-600 hover:text-secondary-200 hover:dark:text-secondary-300 transition-all'
      }
    `}
  />
)

// Main component --------------------------------------------------------------------------------------------------------------------------------
function OrderViewerBasicData ({
  order,
  currentCompanyRole,
}) {
  const [ accordion, setAccordion ] = useState(["PICKUP", "DEPOT", "DELIVERY"]);

  const handleAccordion = useCallback((accordionId) => {
    setAccordion(prev => prev.includes(accordionId) 
      ? prev.filter(p => p !== accordionId)
      : prev.concat(accordionId)
    );
  }, [accordion]);

  console.log(order)

  return (
    <SafeCol id="OrderViewerBasicData">
      <div className="mr-4">
        <OrderViewerHeading order={order} />

        <section className="bg-base-100 p-4 rounded-md mt-2 shadow-sm">
          <OrderCompanyDetails
            order={order}
            currentCompanyRole={currentCompanyRole}
          />
        </section>

        <h2 className="title-3 mt-4">Info viaggio ordine</h2>

        <div>
          <ButtonAccordion
            text="Informazioni di ritiro"
            accordionId="PICKUP"
            accordion={accordion}
            onClick={handleAccordion}
          />

          { accordion.includes("PICKUP") && (
            <section>
              <CheckpointVisualizer
                order={order}
                companyTarget="sender"
                checkpoint={order.pickupCheckpoint}
                title="Info mittente"
                icon={<SenderIcon className='w-[35px] h-auto' />}
                summaryTitle="Info appuntamento per ritiro"
                windowsToShow={["CARICO"]}
                start={order?.pickupDateStart}
                end={order?.pickupDateEnd}
              />
            </section>
          )}
        </div>

        { order?.depotCheckpoint?.location?.place_id && (
          <div>
            <ButtonAccordion
              text="Informazioni scarico vettore"
              accordionId="DEPOT"
              accordion={accordion}
              onClick={handleAccordion}
            />

            { accordion.includes("DEPOT") && (
              <section>
                <CheckpointVisualizer
                  order={order}
                  companyTarget="carrier"
                  checkpoint={order.depotCheckpoint}
                  title="Info vettore"
                  summaryTitle="Info scarico vettore"
                  icon={<CarrierIcon className='w-[35px] h-auto' />}
                  windowsToShow={["SCARICO"]}
                />
              </section>
            )}
          </div>
        )}

        <div>
          <ButtonAccordion
            text="Informazioni consegna"
            accordionId="DELIVERY"
            accordion={accordion}
            onClick={handleAccordion}
          />

          { accordion.includes("DELIVERY") && (
            <section>
              <CheckpointVisualizer
                order={order}
                companyTarget="receiver"
                checkpoint={order.deliveryCheckpoint}
                title="Info destinatario"
                icon={<ReceiverIcon className='w-[35px] h-auto' />}
                summaryTitle="Info appuntamento per consegna"
                windowsToShow={["SCARICO"]}
                start={order?.deliveryDateStart}
                end={order?.deliveryDateEnd}
              />
            </section>
          )}
        </div>
      </div>
    </SafeCol>
  )
}

export default OrderViewerBasicData
