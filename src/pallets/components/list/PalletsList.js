import { useLocation, useSearchParams } from "react-router-dom";
import InlineSpinner from "../../../globals/components/spinners/InlineSpinner";
import PalletListItem from "./item/PalletListItem";
import SmartCustomerPalletListItem from "./item/SmartCustomerPalletListItem";
import SmartPalletListItem from "./item/SmartPalletListItem";

// Main component ----------------------------------------------------------------------------------------------------------------------------------------------------------
export default function PalletsList({ pallets, isFetching, type }) {
  const  [ searchParam ] = useSearchParams();
  const { pathname } = useLocation();
  let queryFrom = searchParam.get('from');
  if(!queryFrom) {
    queryFrom = pathname.includes('/create?') ? 'customer' : 'carrier';
  }

  const targetize = {
    carrier: 'customer',
    customer: 'carrier'
  }

  console.log("pallets", pallets);

  if(isFetching) return <InlineSpinner styles="mt-8 text-center" />
  if(pallets?.length <= 0) return <p className="mx-4 mt-8 opacity-50 text-center">Nessuna movimentazione pallet registrata</p>

  if(type === 'latest' || type === "type" || type === "travel") {
    return (
      <ul className="mt-4">
        { pallets.map(pallet => (
          <SmartPalletListItem
            key={pallet.id}
            pallet={pallet}
            handlingRef={pallet.stamp.split('-')[1]}
          />
        ))}
      </ul>
    )
  }

  if(type === "report") {
    return (
      <ul className="mt-4">
        { pallets.map(pallet => (
          <SmartCustomerPalletListItem
            key={pallet.id}
            customer={pallet}
            // handlingRef={pallet.stamp.split('-')[1]}
          />
        ))}
      </ul>
    )
  }

  return (
    <ul className="mt-4">
      { pallets.map(pallet => (
        pallet.type === "REVERSAL"
          ? <PalletListItem key={pallet.id} queryFrom={queryFrom} pallet={pallet} target={`reversal#${targetize[queryFrom]}`} handlingRef={pallet.stamp.split('-')[1] || null} />
          : <PalletListItem key={pallet.id} queryFrom={queryFrom} pallet={pallet} target={targetize[queryFrom]} />
      ))}
    </ul>
  )
}
