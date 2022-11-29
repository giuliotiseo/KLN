import CardDetails from "../../../globals/components/dataDisplay/CardDetails";
import { SmallParagraph } from "../../../globals/components/typography/paragraphs";
import { formatDate } from "../../../globals/libs/helpers";

const DATE_DESCRIPTIONS = {
  issuingDate: "Data di emissione",
  pickupDate: "Data di ritiro",
  checkInDate: "Data di registrazione",
  checkOutDate: "Data di uscita",
  deliveryDate: "Data di consegna",
  expiration: "Scadenza"
}

export default ({ dates }) => (
  <CardDetails
    header={<h3 className="title-3">Date rilevanti</h3>}
    footer={null}
    className={`mb-4`}
    clear={false}
  >
    <ul>
      {!Object.values(dates).some((val) => Boolean(val))
        ? <SmallParagraph styles="italic">Nessuna informazione fornita</SmallParagraph>
        : Object.keys(dates).map((date_el) => (
          dates[date_el] && (
            <li key={date_el} className="flex justify-between py-2 my-1 first:mt-0 first:pt-0 border-b border-light-50 dark:border-dark-200 last:border-0 last:pb-0">
              <span>
                { DATE_DESCRIPTIONS[date_el]}
              </span>
              <span>
                {formatDate(new Date(dates[date_el]), "Ppp")}
              </span>
            </li>
        )))
      }
    </ul>
  </CardDetails>
)