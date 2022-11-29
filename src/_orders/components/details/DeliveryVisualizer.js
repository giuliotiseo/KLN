import { SmallTitle } from "../../../globals/components/typography/titles";
import { FiCalendar, FiMapPin } from "react-icons/fi";
import { Paragraph, TinyParagraph } from "../../../globals/components/typography/paragraphs";
import ContactCheckpointCompiler from "../../../contacts/components/checkpoint/ContactCheckpointCompiler";
import { formatDate } from "../../../globals/libs/helpers";

export default function DeliveryVisualizer ({ order }) {
  return (
    <div>
      <SmallTitle>Dati destinatario</SmallTitle>
      <div className="mt-2">
        <div>
          <p className="inline-block px-2">Consegna per: {order.receiverName}</p>
        </div>

        <Paragraph styles="flex items-start mt-4">
          <FiMapPin className='mr-2' />
          {order.deliveryCheckpoint.location.address}
        </Paragraph>

        {/* <TinyParagraph styles="chip-neutral inline-block px-2 mt-2 ml-6">lat: {order.deliveryCheckpoint.location.coordinate[0]}, lng: {order.deliveryCheckpoint.location.coordinate[1]}</TinyParagraph> */}

        <Paragraph styles="flex items-start mt-2">
          <FiCalendar className='mr-2 mt-1' />
          Consegna prevista tra: {formatDate(new Date(order.deliveryDateStart), "PPp")} e {formatDate(new Date(order.deliveryDateEnd), "PPp")}
        </Paragraph>

        {/* <TinyParagraph styles="inline-block px-2 mt-2 ml-4">Gli orari hanno valore puramente indicativo e possono subire variazioni dai 15 ai 30 minuti</TinyParagraph> */}
  
        <SmallTitle styles="flex items-start mt-8 mb-2">
          <FiMapPin className='mr-2 mt-1' />
          Info punto di interesse
        </SmallTitle>
        <ContactCheckpointCompiler
          checkpoints={[order.deliveryCheckpoint]}
          editEnabled={false}
          hideTitle={true}
          hideMap={true}
        />
      </div>

    </div>
  )
}