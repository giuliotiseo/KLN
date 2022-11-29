import { SmallTitle, TinyTitle } from "../../../globals/components/typography/titles";
import { FiCalendar, FiMapPin } from "react-icons/fi";
import { Paragraph } from "../../../globals/components/typography/paragraphs";
import ContactCheckpointCompiler from "../../../contacts/components/checkpoint/ContactCheckpointCompiler";
import { formatDate } from "../../../globals/libs/helpers";
import { SHIPMENT_METHOD_DESCRIPTION } from "../../../globals/libs/models";

export default function PickupVisualizer ({
  order,
  className = "mt-2"
}) {
  return (
    <div className={`${className}`}>
      <div className="bg-base-100 px-4 py-4 rounded-md">
        <SmallTitle styles="mb-2">Dati mittente</SmallTitle>
        <div>
          <p className="inline-block px-2">
            Inviato da: {order.senderName}
          </p>
        </div>
      </div>

      <div className="bg-base-100 px-4 py-4 rounded-md mt-4">
        <SmallTitle styles="mb-2">Info appuntamento ritiro</SmallTitle>
        <Paragraph styles="flex items-start mt-4">
          <FiMapPin className='mr-2' />
          {order.pickupCheckpoint.location.address}
        </Paragraph>

        {/* <TinyParagraph styles="chip-neutral inline-block px-2 mt-2 ml-6">lat: {order.pickupCheckpoint.location.coordinate[0]}, lng: {order.pickupCheckpoint.location.coordinate[1]}</TinyParagraph> */}

        <Paragraph styles="flex items-start mt-2">
          <FiCalendar className='mr-2 mt-1' />
          Ritiro previsto tra: {formatDate(new Date(order.pickupDateStart), "PPp")} e {formatDate(new Date(order.pickupDateEnd), "PPp")}
        </Paragraph>
      </div>

      {/* <TinyParagraph styles="inline-block px-2 mt-2 ml-4">Gli orari hanno valore puramente indicativo e possono subire variazioni dai 15 ai 30 minuti</TinyParagraph> */}
      <div className="bg-base-100 px-4 py-4 rounded-md mt-4">
        <SmallTitle styles="flex items-start mb-2">
          <FiMapPin className='mr-2 mt-1' />
          Info punto di interesse
        </SmallTitle>
        
        <ContactCheckpointCompiler
          checkpoints={[order.pickupCheckpoint]}
          editEnabled={false}
          hideTitle={true}
          hideMap={true}
        />

        <div className="text-right">
          <TinyTitle styles="mr-2 mt-4 uppercase text-secondary-200 dark:text-secondary-300">{SHIPMENT_METHOD_DESCRIPTION[order.shipmentType]}</TinyTitle>
        </div>
      </div>
    </div>
  )
}