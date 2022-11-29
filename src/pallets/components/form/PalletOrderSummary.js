import { SmallParagraph } from "../../../globals/components/typography/paragraphs"
import { TinyTitle } from "../../../globals/components/typography/titles"
import PalletInfoVisualizer from "../../../orders/components/viewer/PalletInfoVisualizer"
import { OPERATION_DESCRIPTION } from "../../../travels/libs/helpers"

export default ({
  operation,
  order
}) => {
  return (
    <div className="mb-2 bg-base-100 p-2 rounded-md">
      { operation && <TinyTitle styles="mb-2 text-secondary-200 dark:text-secondary-300">{ order.name }  - {OPERATION_DESCRIPTION[operation]} merce</TinyTitle> }
      <SmallParagraph><b>Mittente: </b> {order.senderName}</SmallParagraph>
      <SmallParagraph><b>Dest. carico: </b> {order.pickupStorageName}</SmallParagraph>
      <SmallParagraph><b>Vettore: </b> {order.carrierName}</SmallParagraph>
      <SmallParagraph><b>Dest. consegna: </b> {order.deliveryStorageName}</SmallParagraph>
      <SmallParagraph><b>Destinatario: </b> {order.receiverName}</SmallParagraph>

      <div className="mt-4">
        <TinyTitle>Informazioni di scambio legni: </TinyTitle>
        <PalletInfoVisualizer
          order={order}
          className="text-sm mt-2"
          showTitle={false}
        />
      </div>
    </div>
  )
}