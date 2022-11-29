import { SmallTitle } from "../../../globals/components/typography/titles";
import { Paragraph, SmallParagraph } from "../../../globals/components/typography/paragraphs";
// Helpers
import { TRANSPORT_SUPPORTS, DANGER_LABELS } from "../../libs/helpers";
// Icons
import { FiBox, FiAlertTriangle, FiCheckSquare, FiSquare } from "react-icons/fi";

// Main component ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default ({ order }) => {
  return (
    <>
      <SmallTitle styles="flex items-center justify-between mb-4">
        {/* <img src={deliveryIcon} className='w-[30px] mr-2' /> */}
        <div className="flex items-center">
          <FiBox className="text-lg mr-1" />
          <span>Info unità di carico</span>
        </div>
      </SmallTitle>

      <section>
        <div className="flex justify-between py-2 my-1 border-b border-light-50 dark:border-dark-200">
          <Paragraph>Numero ordine</Paragraph>
          <Paragraph>{order.orderNumber}</Paragraph>
        </div>

        <div className="flex justify-between py-2 my-1 border-b border-light-50 dark:border-dark-200">
          <Paragraph>Supporto di carico</Paragraph>
          <Paragraph>{TRANSPORT_SUPPORTS[order.support]}</Paragraph>
        </div>

        <div className="flex justify-between py-2 my-1 border-b border-light-50 dark:border-dark-200">
          <Paragraph>Dimensione supporto</Paragraph>
          <Paragraph>{order.size}</Paragraph>
        </div>

        <div className="flex justify-between py-2 my-1 border-b border-light-50 dark:border-dark-200">
          <Paragraph>Quantità {TRANSPORT_SUPPORTS[order.support].toLowerCase()}</Paragraph>
          <Paragraph>{order.quantity}</Paragraph>
        </div>

        
        <div className="flex justify-between py-2 my-1 border-b border-light-50 dark:border-dark-200">
          <Paragraph>Avvertenze</Paragraph>
          <ul>
            { order.warnings.map(warn => (
              <li key={warn} className="flex items-center mb-2">
                <img src={DANGER_LABELS[warn].img} alt={DANGER_LABELS[warn].text} className="mr-2 w-[25px] rounded-full overflow-hidden border-2 border-transparent dark:border-transparent group-hover:border-light-50 dark:group-hover:border-dark-50" />
                <span>{ DANGER_LABELS[warn].text }</span>
              </li>
            )) }
          </ul>
        </div>

        <div className="flex justify-between py-2 my-1">
          <Paragraph>Caratteristiche del trasporto</Paragraph>
        </div>
        <div className="flex justify-between py-2 my-1 bg-light-200 dark:bg-dark-200 mt-2 rounded-md">
          <div className="grid grid-cols-4 gap-2 w-full text-center">
            <div className="col-span-1">
              <SmallParagraph styles="font-bold">Peso lordo</SmallParagraph>
              <Paragraph>{order.grossWeight}</Paragraph>
            </div>
            <div className="col-span-1">
              <SmallParagraph styles="font-bold">Peso netto</SmallParagraph>
              <Paragraph>{order.netWeight}</Paragraph>
            </div>
            <div className="col-span-1">
              <SmallParagraph styles="font-bold">Temperatura</SmallParagraph>
              <Paragraph>{order.temperature}</Paragraph>
            </div>
            <div className="col-span-1">
              <SmallParagraph styles="font-bold">Numero colli</SmallParagraph>
              <Paragraph>{order.packages}</Paragraph>
            </div>
          </div>
        </div>

        <div className="mt-4">
          { order.perishable && <Paragraph styles="flex items-center"><FiAlertTriangle className="mr-2 text-amber-500" /> L'ordine contiene merce deperibile</Paragraph>}
          { order.stackable 
            ? <Paragraph styles="flex items-center"><FiCheckSquare className="mr-2 text-primary-200 dark:text-primary-300" />Unità di carico sovrapponibile</Paragraph>
            : <Paragraph styles="flex items-center"><FiSquare className="mr-2 text-zinc-500" />Unità di carico non sovrapponibile</Paragraph>
          }
        </div>
      </section>
    </>
  )
}