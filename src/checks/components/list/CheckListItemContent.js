import { Link } from "react-router-dom";
import Currency from "../../../globals/components/dataDisplay/Currency";
import { Paragraph } from "../../../globals/components/typography/paragraphs";

const CheckListItemContent = ({ check }) => {
  return (
    <div className="my-2">
      <Paragraph styles="block pt-1">
        <span className="opacity-60">Rif. ordine: </span>
        <Link
          className="font-bold text-primary-200 hover:text-secondary-200 transition-colors"
          to={`/orders/details?id=${check.orderId}&from=carrier`}
        >
          {check.order.stamp.split("-")[1]}
        </Link>
      </Paragraph>
      <Paragraph styles="block"><span className="opacity-60">Emesso da:</span> {check.receiverName}</Paragraph>
      <Paragraph styles="block"><span className="opacity-60">Trasportato da:</span> {check.carrierName}</Paragraph>
      <Paragraph styles="block"><span className="opacity-60">Destinato a:</span> {check.senderName}</Paragraph>
      <Paragraph styles="mt-4 pt-2 border-t">Importo: <b><Currency value={check.amount || 0} /></b></Paragraph>
    </div>
  )
}

export default CheckListItemContent;