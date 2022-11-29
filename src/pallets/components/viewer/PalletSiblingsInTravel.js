import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { SmallTitle } from "../../../globals/components/typography/titles";
import { globalStatusColorsBorder } from "../../../globals/libs/helpers";

// Sub components --------------------------------------------------------------------------------------------------------------------------------
const PalletSiblingCustomer = ({ customerName, address }) => {
  return <div className="font-normal">
    <p>Cliente: {customerName}</p>
    <p className="text-sm text-gray-400">{ address }</p>
  </div>
}

const PalletSiblingHandlingItem = ({ current, handling, queryFrom, pathname }) => {
  return (
    <div
      key={handling.id}
      className={`bg-base-100 p-2 rounded-md my-2 flex justify-between items-start border-l-4 ${globalStatusColorsBorder.TRADE}
        ${current === handling.id ? 'font-bold' : ''}
        ${handling.id.includes("REV") ? 'ml-6' : ''}
      `}
    >
      <div>
        <Link
          className="inline-block mb-1 flex-1 text-dark-50 dark:text-light-300 hover:text-primary-200 dark:hover:text-primary-300"
          to={`${pathname}?from=${queryFrom}&id=${handling.id}`}
        >
          { handling.stamp }
        </Link>
        <PalletSiblingCustomer
          customerName={handling.customerName}
          address={handling.waypoint.checkpoint.location.address}
        />
      </div>
      <span className={`
        italic text-sm inline-block text-secondary-200 dark:text-secondary-300
      `}>{ handling.id.includes("REV") ? 'Storno' : 'Movimentazione'}</span>
    </div>
  )
}

const PalletSiblingReversalItem = ({ current, reversal, queryFrom, pathname }) => {
  return (
    <div
      key={reversal.id}
      className={`bg-base-100 p-2 rounded-md my-2 flex justify-between items-start border-l-4 ${globalStatusColorsBorder.REVERSAL}
        ${current === reversal.id ? 'font-bold' : ''}
        ${reversal.id.includes("REV") ? 'ml-6' : ''}
      `}
    >
      <div>
        <Link
          className="inline-block mb-1 flex-1 text-dark-50 dark:text-light-300 hover:text-primary-200 dark:hover:text-primary-300"
          to={`${pathname}?from=${queryFrom}&id=${reversal.id}`}
        >
          { reversal.stamp }
        </Link>

        <PalletSiblingCustomer
          customerName={reversal.reversalName}
          address={reversal?.waypoint?.checkpoint?.location?.address || "Storno amministrativo"}
        />
      </div>
      <span className={`
        italic text-sm inline-block text-secondary-200 dark:text-secondary-300
      `}>{ reversal.id.includes("REV") ? 'Storno' : 'Movimentazione'}</span>
    </div>
  )
}


// Main components --------------------------------------------------------------------------------------------------------------------------------
export default function PalletSiblingsInTravel({
  queryFrom,
  currentHandlingId = "",
  travelStamp = "",
  palletHandlings = []
}) {
  const { pathname } = useLocation();
  return (
    <section>
      <SmallTitle styles="my-4">Altre movimentazioni nel viaggio {travelStamp.split("-")[1]}</SmallTitle>
      { palletHandlings.map(ph => {
        return ph.id.includes("REV")
          ? <PalletSiblingReversalItem
              key={ph.id}
              reversal={ph}
              current={currentHandlingId}
              queryFrom={queryFrom}
              pathname={pathname}
            />
          : <PalletSiblingHandlingItem
              key={ph.id}
              handling={ph}
              current={currentHandlingId}
              queryFrom={queryFrom}
              pathname={pathname}
            />
      })}
    </section>
  )
}