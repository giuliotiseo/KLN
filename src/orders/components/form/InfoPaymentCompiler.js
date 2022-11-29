import Select from "../../../globals/components/dataEntry_v2/Select";
import CardDetails from "../../../globals/components/dataDisplay/CardDetails";
import InputEmail from "../../../globals/components/dataEntry_v2/InputEmail";
import InputText from "../../../globals/components/dataEntry_v2/InputText";
// Helpers
import { PAYMENT_CONDITION, PAYMENT_CONDITION_DESCRIPTION } from "../../libs/constants";

export default function InfoPaymentCompiler({ order, updateForm, updateCustomer }) {
  const { paymentCondition, customer } = order;

  return (
    <CardDetails
      header={<h3 className='title-3'>Condizioni di pagamento</h3>}
      className="mt-4"
    >
      <Select
        id="paymentCondition"
        label="Scegli condizione"
        value={paymentCondition}
        selectClassName="input block w-full"
        className='mb-2'
        callback={updateForm}
      >
        { Object.keys(PAYMENT_CONDITION).map(pc => (
          <option key={pc} value={pc}>{PAYMENT_CONDITION_DESCRIPTION[pc].short}</option>
        ))}
      </Select>

      <p className="mb-2 mx-1 text-sm">{PAYMENT_CONDITION_DESCRIPTION[paymentCondition].long}</p>

      { paymentCondition !== "SCONOSCIUTO" &&  <>      
        <h3 className="title-5 my-4">Controlla i dati</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputText
            id="name"
            label="Ragione sociale"
            className="col-span-1 flex-col w-full"
            contentClassName="w-full text-lg"
            labelClassName="block"
            value={customer?.name || ""}
            callback={updateCustomer}
            forceUpperCase={true}
          />
  
          <InputText
            id="vatNumber"
            label="Partita IVA"
            className="col-span-1 flex-col w-full"
            contentClassName="w-full text-lg"
            labelClassName="block"
            value={customer?.vatNumber || ""}
            callback={updateCustomer}
            forceUpperCase={true}
          />
  
          <InputEmail
            id="pec"
            label="Indirizzo PEC"
            className="col-span-1 flex-col w-full"
            contentClassName="w-full text-lg"
            labelClassName="block"
            value={customer?.company?.pec || customer?.customPec || customer?.pec || ""}
            callback={updateCustomer}
          />
  
          <InputText
            id="uniqueCode"
            label="Codice univoco"
            className="col-span-1 flex-col w-full"
            contentClassName="w-full text-lg"
            labelClassName="block"
            value={customer?.company?.uniqueCode || customer?.customUniqueCode || customer?.uniqueCode || ""}
            callback={updateCustomer}
            forceUpperCase={true}
          />
        </div>
      </> }
    </CardDetails>
  )
}