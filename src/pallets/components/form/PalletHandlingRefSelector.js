import CardDetails from "../../../globals/components/dataDisplay/CardDetails";
import InputText from "../../../globals/components/dataEntry/InputText";
import { TinyTitle } from "../../../globals/components/typography/titles";
import { FiSearch } from "react-icons/fi";

export default function PalletHandlingRefSelector({
  palletHandlingRef,
  callback
}) {
  const selected = palletHandlingRef?.stamp 
    ? palletHandlingRef.stamp.split('-')[1]
    : "";
  return (
    <CardDetails
      className="mb-4"
      header={<TinyTitle styles="py-2">Collega ad una movimentazione</TinyTitle>}
    >
      {/* Content */}
      <section>
        <InputText
          id="search-palletHandlingRef"
          label="Cerca movimentazione"
          selected={selected}
          callback={(payload) => callback(payload.value)}
          className="mb-2"
          labelClassName="w-auto mr-2 mb-0"
          iconButton={() => <FiSearch />}
          contentClassName="w-full flex-1"
          forceUpperCase={true}
          onBlurCallback={false}
          placeholder="Inserisci codice movimentazione"
          isError={palletHandlingRef.status === "error"}
          loading={palletHandlingRef.status === "loading"}
        />
      </section>
    </CardDetails>
  )
}