import CardDetails from "../../../globals/components/dataDisplay/CardDetails";
import InputText from "../../../globals/components/dataEntry/InputText";
import InputDate from "../../../globals/components/dataEntry/InputDate";
import InputCurrency from "../../../globals/components/dataEntry/InputCurrency";
import InputIban from "../../../globals/components/dataEntry/InputIban";
import { Paragraph } from "../../../globals/components/typography/paragraphs";
import TextEditor from "../../../globals/components/dataEntry/TextEditor";
import { FiCheck } from "react-icons/fi";

// Sub components -------------------------------------------------------------------------------------------------------------------
const CheckCompilerContentHeader = () => <Paragraph styles="font-bold py-2">
  Info assegno
</Paragraph>

// Main component -------------------------------------------------------------------------------------------------------------------
export default function CheckCompilerContent({
  fields,
  validation,
  changeData,
}) {
  const { checkNum, iban, expiration, beneficiary, amount, note } = fields;

  return (
    <CardDetails
      className="mb-4"
      header={<CheckCompilerContentHeader />}
    >
      {/* Importo */}
      <InputCurrency
        id="amount"
        label="Importo"
        selected={amount}
        callback={(value) => changeData(value)}
        className="mb-2"
        labelClassName="w-[150px] min-w-[150px]"
        onBlurCallback={true}
        iconButton={() => <FiCheck />}
      />

      {/* Numero assegno */}
      <InputText
        id="checkNum"
        label="Numero assegno"
        selected={checkNum}
        callback={(value) => changeData(value)}
        className="mb-2"
        labelClassName="w-[150px] min-w-[150px]"
        iconButton={() => <FiCheck />}
        contentClassName="w-full"
        forceUpperCase={true}
        onBlurCallback={true}
      />

      {/* Iban */}
      <InputIban
        id="iban"
        label="IBAN"
        selected={iban}
        callback={(value) => changeData(value)}
        className="mb-2"
        labelClassName="w-[150px] min-w-[150px]"
        iconButton={() => <FiCheck />}
        onBlurCallback={true}
        forceUpperCase={true}
        isError={validation?.iban?.response === "ERROR"}
      />

      {/* Beneficiario */}
      <InputText
        id="beneficiary"
        label="Beneficiario"
        selected={beneficiary}
        callback={(value) => changeData(value)}
        className="mb-2"
        labelClassName="w-[150px] min-w-[150px]"
        iconButton={() => <FiCheck />}
        forceUpperCase={true}
        onBlurCallback={true}
        contentClassName="w-full"
      />

      {/* Data di scadenza */}
      <InputDate
        id="expiration"
        label="Scadenza"
        selected={expiration}
        callback={(value) => changeData(value)}
        className="mb-2"
        labelClassName="w-[150px] min-w-[150px]"
        iconButton={() => <FiCheck />}
      />

      {/* Note essegno */}
      <TextEditor
        content={note}
        controlled={true}
        onSaveTextEditor={(content) => changeData({ id: "note", value: content})} 
        label="Aggiungi annotazioni"
        actionButtonPosition="INTERNAL"
        showList={false}
        className="mt-4"
      />
    </CardDetails>
  )
}