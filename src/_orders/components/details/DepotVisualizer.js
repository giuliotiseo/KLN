import { SmallTitle } from "../../../globals/components/typography/titles";
import { FiCalendar, FiMapPin } from "react-icons/fi";
import { Paragraph } from "../../../globals/components/typography/paragraphs";
import ContactCheckpointCompiler from "../../../contacts/components/checkpoint/ContactCheckpointCompiler";
import { formatDate } from "../../../globals/libs/helpers";

export default function DepotVisualizer ({ order }) {
  return (
    <div>
      <SmallTitle>Dati vettore</SmallTitle>
      <div className="mt-2">
        <div>
          <p className="inline-block px-2">Deposito presso: {order.carrierName}</p>
        </div>

        <Paragraph styles="flex items-start mt-4">
          <FiMapPin className='mr-2' />
          {order.depotCheckpoint.location.address}
        </Paragraph>


        <Paragraph styles="flex items-start mt-2">
          <FiCalendar className='mr-2 mt-1' />
          Deposito previsto tra: {formatDate(new Date(order.depotDateStart), "PPp")} e {formatDate(new Date(order.depotDateEnd), "PPp")}
        </Paragraph>

        <SmallTitle styles="flex items-start mt-8 mb-2">
          <FiMapPin className='mr-2 mt-1' />
          Info punto di interesse
        </SmallTitle>
        <ContactCheckpointCompiler
          checkpoints={[order.depotCheckpoint]}
          editEnabled={false}
          hideTitle={true}
          hideMap={true}
        />
      </div>

    </div>
  )
}