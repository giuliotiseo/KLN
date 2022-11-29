import ListItem from "../../../../globals/components/lists/ListItem"
import PalletListItemReversalContent from "./PalletListItemReversalContent";
import PalletListItemTradeContent from "./PalletListItemTradeContent";
// Icons
import  { FiCornerUpLeft, FiRepeat } from "react-icons/fi";
import { globalStatusBackground } from "../../../../globals/libs/helpers";

// Components manager ----------------------------------------------------------------------------------------------------------------------------------------------------------
const componentsManager = {
  'reversal#carrier': {
    name: "carrierName",
    icon: () => <FiCornerUpLeft className={`flex items-center justify-center p-2 text-light-300 w-[40px] h-[40px] rounded-full ${globalStatusBackground.REVERSAL}`} />,
    content: (pallet, handlingRef) => <PalletListItemReversalContent pallet={pallet} handlingRef={handlingRef} queryFrom="customer" />
  },
  'reversal#customer': {
    name: "reversalName",
    icon: () => <FiCornerUpLeft className={`flex items-center justify-center p-2 text-light-300 w-[40px] h-[40px] rounded-full ${globalStatusBackground.REVERSAL}`} />,
    content: (pallet, handlingRef) => <PalletListItemReversalContent pallet={pallet} handlingRef={handlingRef} queryFrom="carrier" />
  },
  carrier: {
    name: "carrierName",
    icon: () => <FiRepeat className={`flex items-center justify-center p-2 text-light-300 w-[40px] h-[40px] rounded-full ${globalStatusBackground.TRADE}`} />,
    content: (pallet) => <PalletListItemTradeContent pallet={pallet} queryFrom="customer" />
  },
  customer: {
    name: "customerName",
    icon: () => <FiRepeat className={`flex items-center justify-center p-2 text-light-300 w-[40px] h-[40px] rounded-full ${globalStatusBackground.TRADE}`} />,
    content: (pallet) => <PalletListItemTradeContent pallet={pallet} queryFrom="carrier" />
  },
}

// Main component ----------------------------------------------------------------------------------------------------------------------------------------------------------
const PalletListItem = ({
  queryFrom,
  pallet,
  target = "customer",
  handlingRef = null
}) => {
  console.log("target...", target);
  return (
    <div className="mt-2">
      <ListItem
        key={pallet.id}
        topTitle={pallet.type === 'REVERSAL' ? 'Storno' : 'Movimentazione'}
        title={`${pallet[componentsManager[target].name]}`}
        item={pallet}
        path={`/pallets/details?from=${queryFrom}&id=${pallet.id}`}
        aside={componentsManager?.[target]?.icon() || null}
        forcedStatus={pallet.type}
        subtitle={<p className="whitespace-nowrap text-sm text-secondary-200 dark:text-secondary-300">MOV. {pallet.stamp.split("-")[1]}</p>}
      >
        { componentsManager?.[target]?.content(pallet, handlingRef) }
      </ListItem>
    </div>
  )
}

export default PalletListItem;