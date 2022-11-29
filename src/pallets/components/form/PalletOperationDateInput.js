import CardDetails from "../../../globals/components/dataDisplay/CardDetails";
import InputDate from "../../../globals/components/dataEntry/InputDate";
import { TinyTitle } from "../../../globals/components/typography/titles";

export default function PalletOperationDateInput({
  operationDate = null,
  callback = () => console.log("Default callback for <PalletOperationDateInput />")
}) {
  return (
    <CardDetails
      className="bg-base-100 my-4 rounded-md"
      header={<TinyTitle styles="py-2">Info operazione</TinyTitle>}
    >
      <InputDate
        id="operationDate"
        label="Data di esecuzione scambio"
        selected={operationDate}
        callback={(payload) => callback(payload)}
        showTimeInput={true}
        timeInputLabel="Orario esecuzione: "
        dateFormat="Pp"
        className="mb-2"
        labelClassName="w-auto mr-2 mb-0"
        nowButton={true}
        // minDate={pickupDate || issuingDate}
        // maxDate={checkOutDate || deliveryDate}
        // isError={validation && validation?.checkInDate?.response === "ERROR"}
      />
    </CardDetails>
  )
}