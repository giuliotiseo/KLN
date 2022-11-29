import { LargeParagraph, Paragraph, SmallParagraph } from "../../../globals/components/typography/paragraphs";
import { SmallTitle, TinyTitle } from "../../../globals/components/typography/titles";
// Helpers
import { PAYMENT_CONDITION_DESCRIPTION } from "../../libs/helpers";
// Icons
import { RiMoneyEuroCircleLine } from "react-icons/ri";

export default ({ customer, paymentCondition }) => {
  return (
    <>
      <SmallTitle styles="mb-4 flex items-center">
        <RiMoneyEuroCircleLine className="mr-1 text-2xl" />
        <span>Info di fatturazione</span>
      </SmallTitle>

      <section>
        <div className="pb-4">
          <TinyTitle>Condizioni di pagamento</TinyTitle>
          <LargeParagraph styles="mt-2 block">{ PAYMENT_CONDITION_DESCRIPTION[paymentCondition].short }</LargeParagraph>
          <SmallParagraph>{ PAYMENT_CONDITION_DESCRIPTION[paymentCondition].long }</SmallParagraph>
        </div>

        <TinyTitle>Da fatturare a:</TinyTitle>
        { !customer || (!customer?.name && !customer?.vatNumber && !customer?.pec && !customer?.uniqueCode) && <Paragraph>Info di fatturazione non dichiarate</Paragraph>}
        <ul className="w-full">
          { customer?.name && (
          <li className="flex justify-between w-full py-2 border-b border-light-50 dark:border-dark-200">
            <span>Ragione sociale</span>
            <span>{customer.name}</span>
          </li> )}

          { customer?.vatNumber && (
          <li className="flex justify-between w-full py-2 border-b border-light-50 dark:border-dark-200">
            <span>Partita IVA</span>
            <span>{customer.vatNumber}</span>
          </li> )}
          
          { customer?.pec && (
          <li className="flex justify-between w-full py-2 border-b border-light-50 dark:border-dark-200">
            <span>PEC</span>
            <span>{customer.pec}</span>
          </li> )}
          
          { customer?.uniqueCode && (
          <li className="flex justify-between w-full py-2">
            <span>Codice univoco</span>
            <span>{customer.uniqueCode}</span>
          </li> )}
        </ul>
      </section>
    </>
  )
}