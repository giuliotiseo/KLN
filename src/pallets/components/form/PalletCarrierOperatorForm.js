import InputText from "../../../globals/components/dataEntry/InputText";
import { SmallTitle } from "../../../globals/components/typography/titles";
import { FiCheck } from "react-icons/fi";

export default function PalletCarrierOperatorForm({
  carrierOperator,
  changePalletOperator,
}) {
  if(!carrierOperator) {
    return (
      <section className="mt-4">
        <SmallTitle>Operatore scambio</SmallTitle>
        <div className="mt-2 bg-base-100 p-4 rounded-md text-gray-500 italic">
          Operatore trasporto non disponibile per la modifica
        </div>
      </section>
    )
  }

  return (
    <section className="mt-4">
      <SmallTitle>Operatore scambio</SmallTitle>
      <div className="mt-2 bg-base-100 p-4 rounded-md">
        <InputText
          id="name"
          label={`Nome`}
          selected={carrierOperator.name}
          callback={(value) => changePalletOperator({...value, carrierOperator })}
          className="mb-2"
          iconButton={() => <FiCheck />}
          contentClassName="flex-1"
          labelClassName="mr-2 w-auto min-w-[70px]"
          forceUpperCase={false}
          onBlurCallback={true}
        />

        <InputText
          id="email"
          label={`Email`}
          selected={carrierOperator?.email || ""}
          callback={(value) => changePalletOperator({...value, carrierOperator })}
          className="mb-2"
          iconButton={() => <FiCheck />}
          contentClassName="flex-1"
          labelClassName="mr-2 w-auto min-w-[70px]"
          forceUpperCase={false}
          onBlurCallback={true}
        />

        <InputText
          id="phone"
          label={`Telefono`}
          selected={carrierOperator?.phone || ""}
          callback={(value) => changePalletOperator({...value, carrierOperator })}
          className="mb-2"
          iconButton={() => <FiCheck />}
          contentClassName="flex-1"
          labelClassName="mr-2 w-auto min-w-[70px]"
          forceUpperCase={false}
          onBlurCallback={true}
        />
      </div>
    </section>
  )
}