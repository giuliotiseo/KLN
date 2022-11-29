import { LargeParagraph, SmallParagraph } from "../../../globals/components/typography/paragraphs";
import { SmallTitle } from "../../../globals/components/typography/titles";

export default function PalletCarrierOperator({
  carrierOperator
}) {
 if(!carrierOperator) {
   return (
    <section className="mt-4">
      <SmallTitle>Operatore trasporto</SmallTitle>
      <div className="mt-2 bg-base-100 p-4 rounded-md">
        <LargeParagraph>Operazione amministrativa</LargeParagraph>
        <SmallParagraph styles="text-gray-400 dark:text-gray-500">Questa operazione non ha impiegato autisti</SmallParagraph>
      </div>
    </section>
   )
 }

  return (
    <section className="mt-4">
      <SmallTitle>Operatore trasporto</SmallTitle>
      <div className="mt-2 bg-base-100 p-4 rounded-md">
        <LargeParagraph>{carrierOperator.name}</LargeParagraph>
        <SmallParagraph styles="text-gray-400 dark:text-gray-500">Email: {carrierOperator.email}</SmallParagraph>
        <SmallParagraph styles="text-gray-400 dark:text-gray-500">Tel: {carrierOperator.phone}</SmallParagraph>
      </div>
    </section>
  )
}