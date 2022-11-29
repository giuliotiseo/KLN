import ListItem from "../../../../globals/components/lists/ListItem"
import PalletListItemReversalContent from "./PalletListItemReversalContent";
import PalletListItemTradeContent from "./PalletListItemTradeContent";
import  { FiCornerUpLeft, FiRepeat } from "react-icons/fi";
import { capitalize, globalStatusBackground } from "../../../../globals/libs/helpers";
import { useSelector } from "react-redux";
import { selectCurrentCompany } from "../../../../company/slices/companySlice";
import { getRoleFromPalletHandling } from "../../../libs/calculatePalletResult";

// Components manager ----------------------------------------------------------------------------------------------------------------------------------------------------------
const componentsManager = {
  carrier: {
    name: "carrierName",
    icon: {
      TRADE: <FiRepeat className={`flex items-center justify-center p-2 text-light-300 w-[40px] h-[40px] rounded-full ${globalStatusBackground.TRADE}`} />,
      REVERSAL: <FiCornerUpLeft className={`flex items-center justify-center p-2 text-light-300 w-[40px] h-[40px] rounded-full ${globalStatusBackground.REVERSAL}`} />,
    },
    content: {
      TRADE: (pallet) => <PalletListItemTradeContent pallet={pallet} queryFrom="carrier" />,
      REVERSAL: (pallet, handlingRef) => <PalletListItemReversalContent pallet={pallet} queryFrom="carrier" handlingRef={handlingRef} />,
    }
  },
  customer: {
    name: "customerName",
    icon: {
      TRADE: <FiRepeat className={`flex items-center justify-center p-2 text-light-300 w-[40px] h-[40px] rounded-full ${globalStatusBackground.TRADE}`} />,
      REVERSAL: <FiCornerUpLeft className={`flex items-center justify-center p-2 text-light-300 w-[40px] h-[40px] rounded-full ${globalStatusBackground.REVERSAL}`} />,
    },
    content: {
      TRADE: (pallet) => <PalletListItemTradeContent pallet={pallet} queryFrom="customer" />,
      REVERSAL: (pallet, handlingRef) => <PalletListItemReversalContent pallet={pallet} queryFrom="customer" handlingRef={handlingRef} />
    }
  },
  reversalFromReversal: {
    name: "carrierName",
    icon: {
      TRADE: <FiRepeat className={`flex items-center justify-center p-2 text-light-300 w-[40px] h-[40px] rounded-full ${globalStatusBackground.TRADE}`} />,
      REVERSAL: <FiCornerUpLeft className={`flex items-center justify-center p-2 text-light-300 w-[40px] h-[40px] rounded-full ${globalStatusBackground.REVERSAL}`} />,
    },
    content: {
      TRADE: (pallet) => <PalletListItemTradeContent pallet={pallet} queryFrom="customer" />,
      REVERSAL: (pallet, handlingRef) => <PalletListItemReversalContent pallet={pallet} queryFrom="customer" handlingRef={handlingRef} />
    }
  },
  reversalFromCarrier: {
    name: "reversalName",
    icon: {
      TRADE: <FiRepeat className={`flex items-center justify-center p-2 text-light-300 w-[40px] h-[40px] rounded-full ${globalStatusBackground.TRADE}`} />,
      REVERSAL: <FiCornerUpLeft className={`flex items-center justify-center p-2 text-light-300 w-[40px] h-[40px] rounded-full ${globalStatusBackground.REVERSAL}`} />,
    },
    content: {
      TRADE: (pallet) => <PalletListItemTradeContent pallet={pallet} queryFrom="carrier" />,
      REVERSAL: (pallet, handlingRef) => <PalletListItemReversalContent pallet={pallet} queryFrom="carrier" handlingRef={handlingRef} />
    }
  },
  reversalFromCustomer: {
    name: "carrierName",
    icon: {
      TRADE: <FiRepeat className={`flex items-center justify-center p-2 text-light-300 w-[40px] h-[40px] rounded-full ${globalStatusBackground.TRADE}`} />,
      REVERSAL: <FiCornerUpLeft className={`flex items-center justify-center p-2 text-light-300 w-[40px] h-[40px] rounded-full ${globalStatusBackground.REVERSAL}`} />,
    },
    content: {
      TRADE: (pallet) => <PalletListItemTradeContent pallet={pallet} queryFrom="customer" />,
      REVERSAL: (pallet, handlingRef) => <PalletListItemReversalContent pallet={pallet} queryFrom="customer" handlingRef={handlingRef} />
    }
  },
}

const inversalRoles = {
  customer: "carrier",
  carrier: "customer",
  reversal: "carrier"
}

// Main component ----------------------------------------------------------------------------------------------------------------------------------------------------------
const SmartPalletListItem = ({
  pallet,
  handlingRef = null
}) => {
  const { id } = useSelector(selectCurrentCompany);
  const role = getRoleFromPalletHandling(pallet, id);
  let companyTarget = pallet.type === "REVERSAL" ? `reversalFrom${capitalize(role)}` : inversalRoles?.[role];
  if(!role || !companyTarget) return null;
  
  return (
    <div className="mt-2">
      <ListItem
        key={pallet.id}
        topTitle={pallet.type === 'REVERSAL' ? 'Storno' : 'Movimentazione'}
        title={`${pallet[componentsManager[companyTarget].name]}`}
        item={pallet}
        path={`/pallets/details?from=${role}&id=${pallet.id}`}
        aside={componentsManager?.[companyTarget]?.icon?.[pallet.type] || null}
        forcedStatus={pallet.type}
        subtitle={<p className="whitespace-nowrap text-sm text-secondary-200 dark:text-secondary-300">MOV. {pallet.stamp.split("-")[1]}</p>}
      >
        {/* <p>Company Target: {companyTarget}</p>
        <p>Carrier: {pallet.carrierName}</p>
        <p>Customer: {pallet.customerName}</p>
        <p>Reversal: {pallet?.reversalName}</p> */}
        { componentsManager?.[companyTarget]?.content?.[pallet.type](pallet, handlingRef) }
      </ListItem>
    </div>
  )
}

export default SmartPalletListItem;