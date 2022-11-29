import { useEffect, useState } from "react";
import { useGetUrlFile } from "../../globals/libs/hooks";
import CheckViewerDates from "../components/display/CheckViewerDates";
import CheckViewerContent from "../components/display/CheckViewerContent";
import CheckViewerImage from "../components/display/CheckViewerImage";
import CheckViewerAttachments from "../components/display/CheckViewerAttachments";
import Currency from "../../globals/components/dataDisplay/Currency";
import CheckViewerLogs from "../components/display/CheckViewerLogs";
import CopyOnClipboard from "../../globals/components/buttons_v2/CopyOnClipboard";
// Helpers
import { globalStatusColorsText, globalStatusDescriptions } from "../../globals/libs/helpers";
import { EditorReader } from "../../globals/components/dataEntry_v2/TextEditor";
import CardDetails from "../../globals/components/dataDisplay/CardDetails";
import CheckNoteReader from "../components/display/CheckNoteReader";

// Main component ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function CheckViewerContainer({ check }) {
  const [ loading, setLoading ] = useState(true);
  const { fileUrl, setData } = useGetUrlFile(check?.image || null);

  useEffect(() => {
    setLoading(true);
    if(check?.image) {
      setData(check.image.db_format);
      setLoading(false);
    } else {
      setData(null);
      setLoading(false);
    }

    return () => setData(null);
  }, [check?.image]);

  const dates = {
    issuingDate: check.issuingDate,
    pickupDate: check.pickupDate,
    checkInDate: check.checkInDate,
    checkOutDate: check.checkOutDate,
    deliveryDate: check.deliveryDate,
    expiration: check.expiration
  };

  const content = {
    status: <span className={`${globalStatusColorsText[check.status]}`}>{globalStatusDescriptions[check.status]}</span>,
    beneficiary: check.beneficiary,
    checkNum: check.checkNum,
    iban: check?.iban ? <CopyOnClipboard inputData={check.iban} tipMessage='Copia IBAN' tipSuccess="IBAN copiato!" /> : "",
    amount: check?.amount ? <Currency value={check.amount} currency="EUR" className="w-full text-right" /> : ""
  };

  const attachments = check?.files || [];
  
  return (
    <section>
      <header>
        <h4 className="title-5 my-4 uppercase text-gray-500 dark:text-gray-600">
          Dettagli assegno
        </h4>
      </header>

      { check?.image && fileUrl && <CheckViewerImage src={fileUrl} raw_image={check?.image} loading={loading} /> }
      <CheckViewerContent data={content} />
      <CheckViewerDates dates={dates} />
      <CheckViewerAttachments data={attachments} />
      { check?.note && ( <CheckNoteReader note={check.note} /> )}

      <CheckViewerLogs logs={check.log} />
    </section>
  )
}