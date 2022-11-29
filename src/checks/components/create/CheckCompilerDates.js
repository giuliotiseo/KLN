import CardDetails from "../../../globals/components/dataDisplay/CardDetails";
import { Paragraph } from "../../../globals/components/typography/paragraphs";
import InputDate from "../../../globals/components/dataEntry/InputDate";

// Sub components -------------------------------------------------------------------------------------------------------------------
const CheckCompilerDatesHeader = () => <Paragraph styles="font-bold py-2">
  Date rilevanti
</Paragraph>

// Main component -------------------------------------------------------------------------------------------------------------------
export default function CheckCompilerDates({
  fields,
  validation,
  changeData,
}) {
  const {
    issuingDate,
    pickupDate,
    checkInDate,
    checkOutDate,
    deliveryDate
  } = fields;

  return (
    <CardDetails
      className="mb-4"
      header={<CheckCompilerDatesHeader />}
    >
      {/* Data di emissione */}
      <InputDate
        id="issuingDate"
        label="Data di emissione"
        selected={issuingDate}
        placeholder="Data di emissione dell'assegno"
        callback={(payload) => changeData(payload)}
        className="mb-2"
        maxDate={pickupDate || checkInDate || checkOutDate || deliveryDate}
        labelClassName="w-[150px] min-w-[150px]"
        nowButton={true}
        isError={validation && validation?.issuingDate?.response === "ERROR"}
      />

      {/* Data di ritiro */}
      <InputDate
        id="pickupDate"
        label="Data di ritiro"
        selected={pickupDate}
        callback={(payload) => changeData(payload)}
        showTimeInput={true}
        timeInputLabel="Orario ritiro: "
        dateFormat="Pp"
        placeholder="Data di ritiro da parte dell'autista"
        className="mb-2"
        labelClassName="w-[150px] min-w-[150px]"
        nowButton={true}
        minDate={issuingDate}
        maxDate={checkInDate || checkOutDate || deliveryDate}
        isError={validation && validation?.pickupDate?.response === "ERROR"}
      />

      {/* Data di registrazione */}
      <InputDate
        id="checkInDate"
        label="Data di registrazione"
        selected={checkInDate}
        callback={(payload) => changeData(payload)}
        showTimeInput={true}
        timeInputLabel="Orario registrazione: "
        dateFormat="Pp"
        placeholder="Data di registrazione presso l'amministrazione"
        className="mb-2"
        labelClassName="w-[150px] min-w-[150px]"
        nowButton={true}
        minDate={pickupDate || issuingDate}
        maxDate={checkOutDate || deliveryDate}
        isError={validation && validation?.checkInDate?.response === "ERROR"}
      />

      {/* Data di uscita */}
      <InputDate
        id="checkOutDate"
        label="Data di uscita"
        selected={checkOutDate}
        callback={(payload) => changeData(payload)}
        showTimeInput={true}
        timeInputLabel="Orario uscita: "
        placeholder="Data di partenza dalla sede amministrativa"
        dateFormat="Pp"
        className="mb-2"
        labelClassName="w-[150px] min-w-[150px]"
        nowButton={true}
        minDate={checkInDate || pickupDate || issuingDate}
        maxDate={deliveryDate}
        isError={validation && validation?.checkOutDate?.response === "ERROR"}
      />

      {/* Data di consegna */}
      <InputDate
        id="deliveryDate"
        label="Data di consegna"
        selected={deliveryDate}
        placeholder="Data di consegna al cliente"
        callback={(payload) => changeData(payload)}
        showTimeInput={true}
        dateFormat="Pp"
        className="mb-2"
        labelClassName="w-[150px] min-w-[150px]"
        nowButton={true}
        minDate={checkOutDate || checkInDate || pickupDate || issuingDate}
        isError={validation?.deliveryDate?.response === "ERROR"}
      />
    </CardDetails>
  )
}