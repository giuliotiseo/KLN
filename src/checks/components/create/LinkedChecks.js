import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import InlineSpinner from "../../../globals/components/spinners/InlineSpinner";
import Currency from "../../../globals/components/dataDisplay/Currency";
import { Paragraph, SmallParagraph } from "../../../globals/components/typography/paragraphs";
import { SmallTitle, TinyTitle } from "../../../globals/components/typography/titles";
import { globalStatusColorsText, globalStatusDescriptions } from "../../../globals/libs/helpers";
import { useQueryStringId } from "../../../globals/libs/hooks";
// Store
import { useCheckByOrderQuery } from "../../api/checks-api-slice";
// Helpers
import { FiChevronRight } from "react-icons/fi";

// Sub components -------------------------------------------------------------------------------------------------------------------
const LinkedCheckItem = ({ check, selectedId, queryFrom, pathname }) => (
  <li className={`relative bg-base-100 p-4 rounded-md mb-2 ${selectedId === check.id ? `border-2 border-primary-200 dark:border-primary-300 opacity-100` : `${selectedId ? 'opacity-60' : 'opacity-100'}` }`}>
    <div className="flex justify-between">
      <h4 className={`title-4 mb-2 uppercase`}>
        <Link to={`/checks/${pathname.includes("details") ? "details" : "edit"}?from=${queryFrom}&id=${check.id}`}>
          Assegno {check.stamp.split('-')[1]}
        </Link>
      </h4>
      <p className={`text-sm mb-2 font-bold ${selectedId === check.id ? `${globalStatusColorsText[check.status]} ` : ''}`}>{ globalStatusDescriptions[check.status].toUpperCase()}</p>
    </div>
    { check.keyDocNum && <p>Riferimento documento: {check.keyDocNum}</p> }
    { check?.iban && <p>IBAN: {check.iban}</p> }
    { check?.checkNum && <p>N. assegno: {check.checkNum}</p> }
    <div className="flex items-center mt-4 pt-4 border-t">
      <FiChevronRight className="mr-1" />
      <span>Importo: <Currency value={check?.amount || 0} /></span>
    </div>
  </li>
);

// Main component -------------------------------------------------------------------------------------------------------------------
export default function LinkedChecks({ orderId, stamp, queryFrom }) {
  const selectedId = useQueryStringId();  
  const { pathname } = useLocation();

  const { data = null, isFetching } = useCheckByOrderQuery({ orderId });
  if(isFetching) return <InlineSpinner />
  if(!data) return null;

  const checks = data.ids?.length > 0
    ? data.ids.map(id => data.entities[id])
    : [];

  return (
    <section>
      <h3 className="title-5 mt-6 mb-4 uppercase text-gray-500 dark:text-gray-600">Assegni registrati per {stamp.split('-')[1]}:</h3>
      { checks.length <= 0
        ? <p className="italic p-2 bg-base-100 rounded-md">Nessun assegno registrato per quest'ordine</p>
        : <ul>
          { checks.map(check => (
            <LinkedCheckItem
              key={check.id}
              check={check}
              queryFrom={queryFrom}
              pathname={pathname}
              selectedId={selectedId}
            />
          ))}
        </ul>
      }
    </section>
  )
}