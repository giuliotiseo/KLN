import { LargeParagraph, SmallParagraph } from "../../../globals/components/typography/paragraphs";
import { SmallTitle } from "../../../globals/components/typography/titles";

export default function PalletVehicleInfo({
  vehicle
}) {
  if(!vehicle?.licensePlate) {
    return (
      <section className="mt-4">
        <SmallTitle styles="mb-2">Info mezzo di trasporto</SmallTitle>
        <div className="bg-base-100 p-4 rounded-md">
          <LargeParagraph>Nessun mezzo selezionato</LargeParagraph>
          <SmallParagraph styles="text-gray-400 dark:text-gray-500">Mezzo di trasporto non previsto per questa operazione</SmallParagraph>
        </div>
      </section>
    )
  }

  return (
    <section className="mt-4">
      <SmallTitle styles="mb-2">Info mezzo di trasporto</SmallTitle>
      <div className="bg-base-100 p-4 rounded-md">
        <LargeParagraph>{ vehicle.licensePlate }</LargeParagraph>
        <SmallParagraph styles="text-gray-400 dark:text-gray-500">{vehicle.vehicleName}</SmallParagraph>
      </div>
    </section>
  )
}